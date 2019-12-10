export default function Shadow(obj, isCast, isReceive) {
    // if (obj instanceof THREE.Mesh) {
    //     obj.castShadow = isCast;
    //     obj.receiveShadow = isReceive;
    // }

    obj.castShadow = isCast;
    obj.receiveShadow = isReceive;
}