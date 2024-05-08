import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function App() {
  useEffect(() => {
    const three = new SceneInit('c')
    three.initialize();
    three.animate();
    
    console.log(`${process.env.PUBLIC_URL}/models/tracheostomy_tube_cleaned.gltf`);
    
    const gltfLoader = new GLTFLoader();

    let result;

    gltfLoader.load(`${process.env.PUBLIC_URL}/models/tracheostomy_tube_cleaned.gltf`,
      //called once resource is loaded
      function (gltf){
        result = gltf;
        console.log('finished loading')
        three.scene.add(gltf.scene);
      },
      //called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded/xhr.total * 100) + '% loaded')
      },
      function (error) {
        console.error(error)
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
    };
    animate();

  }, []);
  
  return (
    <div>
      <canvas id='c'/>
    </div>
  );
}

export default App;
