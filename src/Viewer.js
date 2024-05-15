import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function Viewer() {
  useEffect(() => {
    const scene = new SceneInit('viewerCanvas', 'viewerAnnotation');
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
    <div className='relative'>
      <div id='viewerAnnotation' className='absolute text-white bg-krono-lime p2'>Annotation</div>
      <canvas id='viewerCanvas' className='w-full mx-auto my-4'/>
    </div>
  );
}

export default Viewer;
