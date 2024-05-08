import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const three = new SceneInit('c')
    three.initialize();
  })
  
  return (
    <div>
      <canvas id='c'/>
    </div>
  );
}

export default App;
