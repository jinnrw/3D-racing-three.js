export default function CreateText(scene, playersPositionX, playersPositionY) {
    let loader = new THREE.FontLoader();
    const names = ['Carlos', 'Francesca', 'Kevin', 'Mich', 'Jinn', 'Michika', 'Will', 'Pablo', 'Vanessa', 'Amir' ];
    let texts = [];

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        let material = new THREE.MeshPhongMaterial({color:0x000000});

        for (let i = 0; i < names.length; i++) {
            let geometry = new THREE.TextGeometry( names[i], {
                font: font,
                size: 10,
                height: 5,
                curveSegments: 12,
                bevelEnabled: false,
            } );

            texts.push(new THREE.Mesh(geometry, material));
            texts[i].position.y = playersPositionY[i];
            texts[i].position.x = playersPositionX[i];
            texts[i].rotation.y = -Math.PI/4;

            scene.add(texts[i]);
        }
    });
}








