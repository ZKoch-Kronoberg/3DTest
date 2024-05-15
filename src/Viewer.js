import { useEffect, useRef, useState } from 'react';
import SceneInit from './lib/SceneInit';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function Viewer() {
  const sceneRef = useRef(null);
  const [showAnnotation, setShowAnnotation] = useState(false);


  useEffect(() => { //runs only the first time the component is loaded
    sceneRef.current = new SceneInit('viewerCanvas', 'viewerAnnotation');
    sceneRef.current.initialize();
    sceneRef.current.animate();

    /* //just some box for testing
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.scene.add(boxMesh); */

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(`${process.env.PUBLIC_URL}/models/tracheostomy_tube_cleaned.glb`,(gltfScene) =>{
      sceneRef.current.scene.add(gltfScene.scene);
      setShowAnnotation(true);
    })
  }, []);
  
  return (
    <div className='relative'>
      <div id='viewerAnnotation' 
        className={`absolute text-white bg-krono-lime p-1 
        ${showAnnotation ? 'block' : 'hidden'}`}>
        Annotering
      </div>
      <canvas id='viewerCanvas' className='w-full mx-auto my-4'/>
      <div className='flex flex-col gap-y-2 sm:flex-row sm:justify-start sm:gap-x-2  mx-auto'>
        <button onClick={() => setShowAnnotation(!showAnnotation)}
          className='bg-krono-lime text-white rounded-full p-1 text-lg'>
          {showAnnotation ? 'Göm Annoteringar' : 'Visa Annoteringar'}
        </button>
        <button onClick={() => {}}
          className='bg-krono-lime text-white rounded-full p-1 text-lg'>
          Tidigare Annotering
        </button>
        <button onClick={() => {}}
          className='bg-krono-lime text-white rounded-full p-1 text-lg'>
          Nästa Annotering
        </button>
      </div>
    </div>
  );
}

export default Viewer;
