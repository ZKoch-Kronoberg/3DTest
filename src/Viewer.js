import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function Viewer() {
  useEffect(() => {
    const scene = new SceneInit('c');
    scene.initialize();
    scene.animate();

    /* //just some box for testing
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.scene.add(boxMesh); */

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(`${process.env.PUBLIC_URL}/models/tracheostomy_tube_cleaned.glb`,(gltfScene) =>{
      scene.scene.add(gltfScene.scene);
    })
  }, []);
  
  return (
    <canvas id='c' className='w-5/6 mx-auto'/>
  );
}

export default Viewer;
