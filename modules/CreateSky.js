// Use if need to create a sky map

export default function CreateSky(scene) {
    let geometry = new THREE.CubeGeometry(
        10000,
        10000,
        10000
    );
    let material = [];
    for (let i = 0; i <= 6; i++) {
        let side = new THREE.MeshBasicMaterial({
            color: 0x3C6DB9,
            side: THREE.DoubleSide
        });
        material.push(side);

    }

    let sky = new THREE.Mesh(geometry, material);
    scene.add(sky);
}