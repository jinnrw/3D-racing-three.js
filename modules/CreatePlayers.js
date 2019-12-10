import Shadow from '../utilities/Shadow.js';

export default function CreatePlayers(settings, scene, player) {
    let geometry = new THREE.CubeGeometry(
        settings.playerDimension.width,
        settings.playerDimension.height,
        settings.playerDimension.depth
    );
    let material = new THREE.MeshStandardMaterial({
        color: 0xFBE538,
    });

    let gapBetweenPlayers = settings.playerDimension.width * 2;
    let startPosX = -settings.road.width / 2 + 200;

    // let startPosX = -300;

    for (let i = 0; i < player.length; i++) {
        player[i].mesh = new THREE.Mesh(geometry, material);
        player[i].mesh.position.set(
            startPosX + (gapBetweenPlayers * i),
            geometry.parameters.height / 2,
            0
        );
        Shadow(player[i].mesh, true, true);
        scene.add(player[i].mesh);
    }

    return player;
}