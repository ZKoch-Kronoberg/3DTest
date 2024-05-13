import './App.css';
import Viewer from './Viewer';


function App() {

  return (
    <>
      <header class="bg-gradient-to-r from-krono-lime via-krono-green to-krono-pink py-4">
        <div class="container mx-auto">
          <h1 class="text-white text-3xl font-bold text-left">3D-Test</h1>
        </div>
      </header>
      <Viewer/>
    </>
  );
}

export default App;
