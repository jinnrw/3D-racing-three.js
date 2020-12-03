import * as THREE from "three";

export default function CreateText(scene, player) {
  let loader = new THREE.FontLoader();
  let texts = [];

  loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
    let material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    for (let i = 0; i < player.length; i++) {
      let geometry = new THREE.TextGeometry(player[i].name, {
        font: font,
        size: 30,
        height: 5,
        curveSegments: 12,
        bevelEnabled: false,
      });

      texts.push(new THREE.Mesh(geometry, material));

      // if (i%2 === 0) {
      //     texts[i].position.y = 60;
      //     texts[i].position.z = 90;
      // } else {
      //     texts[i].position.y = 130;
      //     texts[i].position.z = -10;
      // }

      // if (i < 10) {
      //     texts[i].position.x = player[i].mesh.position.x;
      //     texts[i].position.y = 150;
      //     texts[i].rotation.x = -Math.PI/5;
      //     texts[i].rotation.y = Math.PI/5;
      // } else {
      //     texts[i].position.x = player[i].mesh.position.x -40;
      //     texts[i].rotation.x = -Math.PI/2;
      // }

      //original
      texts[i].position.x = player[i].mesh.position.x + 10;
      texts[i].position.y = 10;
      texts[i].position.z = 260;

      texts[i].rotation.z = Math.PI / 2;
      texts[i].rotation.x = -Math.PI / 2;

      // texts[i].rotation.x = -Math.PI/3;

      scene.add(texts[i]);
    }
  });

  return texts;
}
