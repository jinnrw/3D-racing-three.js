// Modules
import CreateGate from './modules/CreateGate.js';
import CreatePlayers from './modules/CreatePlayers.js';
import CreateLights from './modules/CreateLights.js';
import CreateRoad from './modules/CreateRoad.js';
import CreateSky from './modules/CreateSky.js';

// Utilities
import WrapTexture from './utilities/WrapTexture.js';
import Shadow from './utilities/Shadow.js';

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

let player = makePlayers(40);

let winner;

let settings = {
    road: {
        width: 1500,
        height: 80,
        depth: 20000,
        color: 0xB2C0C7,
    },
    finishPos: -1000,
    camera: {
        x: -900,
        y: 870,
        z: 450,
        lookAt: {
            x: 0,
            y: 0,
            z: 0
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
    isStarted: false,
    hasWinner: false,
    end: false,
}

let textureLoader = new THREE.TextureLoader();


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
    scene.background = new THREE.Color(0x413F42);

    createCamera();
    createControls();
    CreateLights(settings, scene);

    // Static Objects
    CreateSky(scene);
    CreateRoad(settings, scene);
    CreateGate(settings, scene);

    // Player
    // player = CreatePlayers(settings, scene, player);

    // Renderer
    createRenderer();
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
        10000 // far clipping plane
    );
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
    scene.add(camera);
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

//  Animations
function move() {
    if (states.isStarted) {
        for (let i = 0; i < player.length; i++) {
            if (player[i].mesh.position.z >= settings.finishPos) {
                player[i].mesh.position.z -= 5;
            } else { // trigger win state
                setWinner(player[0].mesh);
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

function setWinner(player) {
    if (!states.hasWinner) {
        states.hasWinner = true;
        states.isStarted = false;
        // Asign winner
        winner = player;
        winnerAnimation();
    }

}

function cameraMove() {
    // camera.lookAt(player.position.x, player.position.y, player.position.z);
    // camera.position.z = player[0].mesh.position.z + 500;
    camera.position.z -= 5;

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
        states.isStarted = true;
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
    renderer.render(scene, camera);
}

init();
animate();
cameraHelper();

// Binding
bindEvents();
bindData();




// 3D loader
// instantiate a loader
// var loader = new OBJLoader2();

// // load a resource
// loader.load(
// 	// resource URL
// 	'models/Low_Poly_City_Cars.obj',
// 	// called when resource is loaded
// 	function ( object ) {

// 		scene.add( object );

// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );


function loader() {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('models/Low_Poly_City_Cars.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('models/Low_Poly_City_Cars.obj', (root) => {
            root.position.y = 9;
            root.rotation.y = Math.PI / 2;

            // Set shadow to true
            // Shadow(root, true, true);
            Shadow(root.children[0], true, true);
            console.log(root);

            let root2 = root.clone();
            root2.position.x = 500;
            scene.add(root);
            // scene.add(root2);
        });
    });

}

loader();