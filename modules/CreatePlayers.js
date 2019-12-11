import Shadow from '../utilities/Shadow.js';
import CreateText from '/modules/CreateText.js';
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

    let playersPositionX = [];
    let playersPositionY = [];

    // let startPosX = -300;

    for (let i = 0; i < namesArray.length; i++) {
        // Clone car object
        let playerMesh = carObject.clone();
        playerMesh.position.set(
            startPosX + ( gapBetweenPlayers * i),
            -12,
            0
        );

        player.push({
            name: namesArray[i].user,
            mesh: playerMesh,
        })

        scene.add(player[i].mesh);

        playersPositionX.push(startPosX + (gapBetweenPlayers * i));
        playersPositionY.push(geometry.parameters.height / 2); 
    }

    CreateText(scene, playersPositionX, playersPositionY)
        console.log(player[i]);

    }

    console.log(player);

    return player;
}