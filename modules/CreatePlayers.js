import Shadow from '../utilities/Shadow.js';
import CreateText from './modules/CreateText.js';
import UseLoader from '../utilities/UseLoader.js';

export default function CreatePlayers(settings, scene, namesArray, player, carObject) {

    let geometry = new THREE.CubeGeometry(
        settings.playerDimension.width,
        settings.playerDimension.height,
        settings.playerDimension.depth
    );
    let material = new THREE.MeshStandardMaterial({
        color: 0xFBE538,
    });

    let startPosX = -settings.road.width / 2 + 200;
    let gapBetweenPlayers = 100;

    console.log(carObject);
    // console.log(carObject[0]);
    // console.log(carObject[5]);

    for (let i = 0; i < namesArray.length; i++) {

        let playerMesh;
        let randomIndex = Math.floor(Math.random() * 3);  // return 0 to 2

        playerMesh = carObject[randomIndex].clone();

        // if (i > 10) {
        //     // Clone car object
        //     playerMesh = carObject[2].clone();
        // } else if (i > 5) {
        //     // Clone car object
        //     playerMesh = carObject[1].clone();
        // } else {
        //     playerMesh = carObject[0].clone();
        // }

        playerMesh.position.set(
            startPosX + (gapBetweenPlayers * i),
            -12,
            0
        );

        player.push({
            name: namesArray[i].user,
            mesh: playerMesh,
            eliminated: false
        })

        scene.add(player[i].mesh);
    }

    

    console.log(player);

    return player;
}