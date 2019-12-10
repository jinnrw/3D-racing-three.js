import WrapTexture from '../utilities/WrapTexture.js';
import Shadow from '../utilities/Shadow.js';

export default function CreateRoad(settings, scene) {
    let road_geo = new THREE.CubeGeometry(
        settings.road.width,
        settings.road.height,
        settings.road.depth
    );
    let textureLoader = new THREE.TextureLoader();
    // let roadTexture = textureLoader.load('./textures/road.jpg');

    // WrapTexture(roadTexture, 20, 100);

    let road_material = new THREE.MeshStandardMaterial({
        color: settings.road.color,
        // ambient: 0x444444,
        // metalness: 0.0,
        roughness: 0.7,
        // wireframe: true,
        // shading		: THREE.SmoothShading,
        // map		: roadTexture
        // map: roadTexture,
    });

    let road = new THREE.Mesh(road_geo, road_material);
    road.position.set(0, -settings.road.height / 2, -settings.road.depth / 2 + 500);

    // Receive shadow
    Shadow(road, false, true);
    scene.add(road);
}