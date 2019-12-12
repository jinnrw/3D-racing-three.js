// Modules
import CreateGate from './modules/CreateGate.js';
import CreatePlayers from './modules/CreatePlayers.js';
import CreateLights from './modules/CreateLights.js';
import CreateRoad from './modules/CreateRoad.js';
import CreateText from './modules/CreateText.js'; //TODO: delete later
// import CreateSky from './modules/CreateSky.js';
import DrawLogic from './modules/DrawLogic.js';
// import GetData from './modules/GetData.js';

// Utilities
import WrapTexture from './utilities/WrapTexture.js';
import Shadow from './utilities/Shadow.js';
import UseLoader from './utilities/UseLoader.js';

// Loader 
import { OBJLoader2 } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

let container,
    camera,
    scene,
    renderer,
    controls,
    lightHelper,
    shadowCameraHelper;

// let player = makePlayers(10);

let namesArray;
let player=[];
let texts = [];
let carObject;
let nominationsArray = [];

// let remainingPlayers = namesArray.length;

let winner;

let settings = {
    road: {
        width: 4500,
        height: 80,
        depth: 4000,
        color: 0xB2C0C7,
    },
    finishPos: -3000,
    camera: {
        x: 0,
        y: 1700,
        z: 1000,
        lookAt: {
            x: 0,
            y: 0,
            z: -500
        }
    },
    gravity: -0.8,
    playerDimension: {
        width: 10,
        height: 30,
        depth: 5,
    },
}

let states = {
    isReadyToStart: false,
    isStarted: false,
    hasWinner: false,
    end: false,
}

let textureLoader = new THREE.TextureLoader();


// Get data
fetch("leaderboard.json")
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function (data) {
                namesArray = data;
                // console.log(namesArray);

                // init after data ready && carOject ready
                let timeInterval = setInterval(() => {
                    if (carObject) {
                        init();
                        animate();
                        clearInterval(timeInterval);
                    } else {
                        console.log('carObject not ready');
                    }
                }, 200);

                return;
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

// Get data: Nominations
fetch("nominations.json")
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function (data) {
                nominationsArray = data;
                // Set state
                states.isReadyToStart = true;
                return;
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });




function cameraHelper() {
    let cameraX = document.querySelector("#cameraX input");
    let cameraY = document.querySelector("#cameraY input");
    let cameraZ = document.querySelector("#cameraZ input");
    // Event Listener
    cameraX.oninput = function () {
        settings.camera.x = cameraX.value;
        document.querySelector("#cameraX span").innerHTML = settings.camera.x;
        updateCamera();
    }
    cameraY.oninput = function () {
        settings.camera.y = cameraY.value;
        document.querySelector("#cameraY span").innerHTML = settings.camera.y;
        updateCamera();
    }
    cameraZ.oninput = function () {
        settings.camera.z = cameraZ.value;
        document.querySelector("#cameraZ span").innerHTML = settings.camera.z;
        updateCamera();
    }
}

// init
function init() {
    container = document.getElementById("app");
    scene = new THREE.Scene();

    // Define scene Background Color
    scene.background = new THREE.Color(0x3C6DB9);


    createCamera();
    createControls();
    CreateLights(settings, scene);

    // Static Objects
    // CreateSky(scene);
    CreateRoad(settings, scene);
    CreateGate(settings, scene);

    //Text TODO:add this to player
    // CreateText(settings, scene); 

    // Player
    player = CreatePlayers(settings, scene, namesArray, player, carObject);

    texts = CreateText(scene, namesArray, player);

    // Renderer
    createRenderer();

    // Update camera loat at
    updateCameraLooAt();
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.shadowMap.enabled = true;
    // renderer.shadowMapEnabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // renderer.gammaFactor = 2.2;
    // renderer.gammaOutput = true;
    // renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);
}

function createControls() {
    controls = new THREE.OrbitControls(camera, container);
    // controls.target.set(0, 5, 0);
    controls.enableZoom = true;
    // controls.autoRotate = true;
    controls.enableKeys = false;
}

// Camera
function createCamera() {
    camera = new THREE.PerspectiveCamera(
        60, //fov
        window.innerWidth / window.innerHeight, //aspect
        1, // near clipping plane
        12000 // far clipping plane
    );
    camera.position.set(
        settings.camera.x,
        settings.camera.y,
        settings.camera.z
    );

    // camera.lookAt(
    //     settings.camera.lookAt.x,
    //     settings.camera.lookAt.y,
    //     settings.camera.lookAt.z
    // );
    scene.add(camera);


    // console.log(settings.camera.lookAt.z);

}

function updateCamera() {
    camera.position.set(
        settings.camera.x,
        settings.camera.y,
        settings.camera.z
    );

    camera.lookAt(
        settings.camera.lookAt.x,
        settings.camera.lookAt.y,
        settings.camera.lookAt.z
    );
}

function updateCameraLooAt() {
    camera.lookAt(
        settings.camera.lookAt.x,
        settings.camera.lookAt.y,
        settings.camera.lookAt.z
    );
}

//  Start button
function move() {
    if (states.isStarted) {
        let speed = 5;

        if (nominationsArray.length <= 3) {
            speed = 4800;
        } else if (nominationsArray.length <= 5) {
            speed = 2000;
        } else if (nominationsArray.length <= 10) {
            speed = 1250;
        } else if (nominationsArray.length <= 20) {
            speed = 500;
        }

        // Start draw logic
        if (nominationsArray.length > 1) {

            setTimeout((speed) => {
                let index = Math.floor(Math.random() * nominationsArray.length);
                let drawnName = nominationsArray[index];

                // Remove one value from array
                nominationsArray.splice(index, 1);

                // Check elimination
                if (!nominationsArray.includes(drawnName)) {
                    console.log("Out: "+drawnName);

                    for (let i = 0; i < player.length; i++) {
                        if (player[i].name === drawnName) {
                            player[i].eliminated = true;
                        }
                    }
                }
            }, speed);

            console.log(nominationsArray.length);

        } else if(nominationsArray.length === 1){
            console.log(nominationsArray);
            // Set winner
            setWinner();
        }

        for (let i = 0; i < player.length; i++) {

            if (!player[i].eliminated) {
                player[i].mesh.position.z -= 2;
                texts[i].position.z -= 5;
            } else {
                // Set winner
                // player[i].mesh.position.z;
            }
        }


        cameraMove();
    }
}

function winnerAnimation() {
    // var delta = Math.PI / 2;
    let velocity = 12;
    var timeId = setInterval(() => {
        velocity += settings.gravity;
        winner.position.y += velocity;
        // winner.rotation.x -= delta;

        // Touch the road
        if (winner.position.y <= settings.playerDimension.height / 2) {
            winner.position.y = settings.playerDimension.height / 2;
        }
        //console.log(winner.position.y);
    }, 1000 / 60);

    setTimeout(() => {
        clearInterval(timeId);
    }, 3000);


}

function setWinner() {
    if (!states.hasWinner) {
        states.hasWinner = true;
        states.isStarted = false;
        // Asign winner
        for (let i = 0; i < player.length; i++) {
            if (!player[i].eliminated) {
                winner = player[i]
                console.log("All: ");
                console.log(player);

                console.log("winner is: ");
                console.log(winner);
            }
        }
        // winnerAnimation();
    }

}

function cameraMove() {
    // camera.lookAt(player.position.x, player.position.y, player.position.z);
    // camera.position.z = player[0].mesh.position.z + 500;
    camera.position.z -= 2;

}

function makePlayers(length) {
    let player = [];
    for (let i = 0; i <= length - 1; i++) {
        player.push({
            name: ""
        })
    }
    return player;
};


// Event Binding
function bindEvents() {
    document.getElementById("start").onclick = function () {

        if (states.isReadyToStart) {
            states.isStarted = true;
        }
    }
}

// Data Binding 
function bindData() {
    document.querySelector("#cameraX span").innerHTML = settings.camera.x;
    document.querySelector("#cameraY span").innerHTML = settings.camera.y;
    document.querySelector("#cameraZ span").innerHTML = settings.camera.z;
}

function animate() {
    requestAnimationFrame(animate);
    update();
}

function update() {
    // Update player 
    move();
    // cameraMove();


    // Helper
    // lightHelper.update();
    // shadowCameraHelper.update();

    // console.log(namesObject);

    renderer.render(scene, camera);
}

// init();
// animate();
cameraHelper();

// Binding
bindEvents();
bindData();

let carArray = [];
let gapBetweenPlayers = 60;





// function makeCars(root) {
//     for (let i = 0; i < 40; i++) {
//         let car = root.clone();
//         carArray.push(car);
//         carArray[i].position.x = gapBetweenPlayers * i;
//         carArray[i].position.z = -20 * i;
//         scene.add(car);
//     }
// };



function loader() {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('models/Low-Poly-Racing-Car.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('models/Low-Poly-Racing-Car.obj', (root) => {
            root.position.y = -10;
            root.rotation.y = Math.PI / 8;
            root.scale.set(0.5, 0.5, 0.5);
            // Set shadow to true
            Shadow(root, true, true);
            Shadow(root.children[0], true, true);
            // console.log(root);
            carObject = root;
            // scene.add(root);
            // makeCars(root);
        });
    });

}


loader();

