// Loader 
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

import Shadow from '../utilities/Shadow.js';


export default function UseLoader(){
    // Use 3D loader
    const mtlLoader = new MTLLoader();
    mtlLoader.load('models/Low-Poly-Racing-Car.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('models/Low-Poly-Racing-Car.obj', (root) => {
            root.position.y = -10;
            root.rotation.y = Math.PI / 8;
            root.scale.set(0.5, 0.5, 0.5);
            Shadow(root.children[0], true, true);

            console.log(root);
            // scene.add(root);
            
            return root;
        });
    });
}