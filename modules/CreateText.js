export default function CreateText(scene, namesArray, player) {
    let loader = new THREE.FontLoader();
    let texts = [];

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        let material = new THREE.MeshPhongMaterial({color:0x000000});

        for (let i = 0; i < namesArray.length; i++) {
            let geometry = new THREE.TextGeometry( namesArray[i].user, {
                font: font,
                size: 10,
                height: 5,
                curveSegments: 12,
                bevelEnabled: false,
            });

            texts.push(new THREE.Mesh(geometry, material));
            
            texts[i].position.x = player[i].mesh.position.x - 20;
            texts[i].position.y = 80;
            texts[i].rotation.y = -Math.PI/4;

            scene.add(texts[i]);
        }
    });

    return texts;
}








