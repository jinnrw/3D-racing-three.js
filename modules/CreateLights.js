import Shadow from '../utilities/Shadow.js';

export default function CreateLights(settings, scene) {
    const ambientLight = new THREE.HemisphereLight(
        0xddeeff, // sky color
        0x202020, // ground color
        2, // intensity
    );
    scene.add(ambientLight);

    const light = new THREE.SpotLight(0x202020, 5);
    light.position.set(0, 1000, 300);
    light.distance = 2000;

    const d = 100;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.castShadow = true;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    light.shadow.camera.near = 0.5;    // default
    light.shadow.camera.far = 500;     // default

    // Shadow(light);
    scene.add(light);

    // shadowCameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(shadowCameraHelper);

    // Lights Helper
    // let lightHelper = new THREE.SpotLightHelper(light);
    // scene.add(lightHelper);
}