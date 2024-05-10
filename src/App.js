import './App.css';
import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';
import * as THREE from 'three'

function App() {
  useEffect(() => {
    const scene = new SceneInit('c');
    scene.initialize();
    scene.animate();

    //just some box for testing
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.scene.add(boxMesh);
  }, []);
  
  return (
    <div>
      <canvas id='c'/>
    </div>
  );
}

export default App;
