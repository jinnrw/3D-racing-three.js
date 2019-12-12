import WrapTexture from '../utilities/WrapTexture.js';

export default function CreateGate(settings, scene) {
    let gateHeight = 200;

    // let gateLeft_geo = new THREE.CubeGeometry(50, gateHeight, 50),
    //     gateRight_geo = gateLeft_geo.clone(),
    let gateTop_geo = new THREE.CubeGeometry(settings.road.width, 1, 100);

    gateTop_geo.rotateX -= Math.PI / 2;

    let textureLoader = new THREE.TextureLoader();
    // let gateTexture = textureLoader.load('../textures/gate.png');
    let gateTextureTop = textureLoader.load('textures/finish-line01.jpg');

    // WrapTexture(gateTexture, 1, 5);
    WrapTexture(gateTextureTop, 50, 2);

    // let gate_material = new THREE.MeshBasicMaterial({
    //     color: 0xf2f2f2,
    //     map: gateTexture,
    // });

    let gateTop_material = new THREE.MeshBasicMaterial({
        // color: 0xd82525,
        map: gateTextureTop,
    });


    // let gateLeft = new THREE.Mesh(gateLeft_geo, gate_material);

    // gateLeft.position.set(
    //     -settings.road.width /2 + gateLeft_geo.parameters.width,
    //     gateLeft_geo.parameters.height / 2,
    //     settings.finishPos
    // );

    // let gateRight = new THREE.Mesh(gateRight_geo, gate_material);
    // gateRight.position.set(
    //     settings.road.width / 2 - gateLeft_geo.parameters.width,
    //     gateLeft_geo.parameters.height / 2,
    //     settings.finishPos
    // );

    let gateTop = new THREE.Mesh(gateTop_geo, gateTop_material);
    gateTop.position.set(
        0,
        0,
        settings.finishPos - 
        gateTop_geo.parameters.depth / 2 - settings.playerDimension.depth // minus player depth
    );

    // scene.add(gateLeft);
    // scene.add(gateRight);
    scene.add(gateTop);
}


