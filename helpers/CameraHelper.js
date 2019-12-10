// To do: need to hook and bind into app.js

// export default function cameraHelper(settings) {
//     let cameraX = document.getElementById("cameraX");
//     let cameraY = document.getElementById("cameraY");
//     let cameraZ = document.getElementById("cameraZ");

//     function updateCamera() {
//     camera.position.set(
//         settings.camera.x,
//         settings.camera.y,
//         settings.camera.z
//     );
//     camera.lookAt(0, 0, 0);
// }
//     // Event Listener
//     cameraX.oninput = function () {
//         settings.camera.x = cameraX.value;
//         updateCamera();
//     }
//     cameraY.oninput = function () {
//         settings.camera.y = cameraY.value;
//         updateCamera();
//     }
//     cameraZ.oninput = function () {
//         settings.camera.z = cameraZ.value;
//         updateCamera();
//     }
// }