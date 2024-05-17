import { useEffect, useRef, useState } from 'react';
import SceneInit from './lib/SceneInit';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import ViewerAnnotation from './ViewerAnnotation';
import { Vector3 } from 'three';

function Viewer() {
  const testAnnotations = [
    {
      title: 'T T T T T T T T T T T T T T T T T T T T T ',
      text: 'första',
      location: {
        x: 0.1,
        y: 0.1,
        z: 0.1,
      },
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst vestibulum rhoncus est pellentesque. Egestas congue quisque egestas diam. Egestas dui id ornare arcu odio ut sem. Enim eu turpis egestas pretium. Dignissim enim sit amet venenatis urna cursus. Tincidunt ornare massa eget egestas. Diam maecenas sed enim ut sem viverra aliquet. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Eget nunc scelerisque viverra mauris in aliquam sem fringilla. Augue ut lectus arcu bibendum at varius vel pharetra vel. Suspendisse sed nisi lacus sed. Ac tincidunt vitae semper quis lectus. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Justo eget magna fermentum iaculis eu. Faucibus in ornare quam viverra orci sagittis. Dui id ornare arcu odio ut sem nulla. Quis viverra nibh cras pulvinar mattis. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in.',
      location: {
        x: -0.1,
        y: 0.1,
        z: 0.1
      },
    },
    {
      title: '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||',
      text: 'tredje',
      location: {
        x: 0.5,
        y: 0.1,
        z: 0.15,
      },
    },
  ]; 
  
  const sceneRef = useRef(undefined);
  
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState(0);
  const [annotations, setAnnotations] = useState([{
    title: 'Inga annoteringar laddade',
    text: `Antingen så har 3D-visaren inte hunnit hämta annoteringarna än, eller så har modellen inga`,
    location: {
      x: 0,
      y: 0,
      z: 0,
    },
  }]);
  


  function incrementSelectedAnnotation() {
    if (!annotations) {
      return;
    } else {
      if (selectedAnnotationIndex === annotations.length - 1) {
        setSelectedAnnotationIndex(0);
      } else {
        setSelectedAnnotationIndex(selectedAnnotationIndex + 1); 
      };
    };
  };

  function decrementSelectedAnnnotationIndex(params) {
    if (!annotations) {
      return;
    } else {
      if (selectedAnnotationIndex === 0) {
        setSelectedAnnotationIndex(annotations.length - 1);
      } else {
        setSelectedAnnotationIndex(selectedAnnotationIndex - 1);
      }
    };
  }

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.annotationPosition = annotations[selectedAnnotationIndex].location;
    }
  }, [selectedAnnotationIndex, annotations]);



  useEffect(() => { //runs only the first time the component is loaded
    sceneRef.current = new SceneInit('viewerCanvas', 'viewerAnnotation');
    sceneRef.current.initialize();
    sceneRef.current.animate();

    /* //just some box for testing
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.scene.add(boxMesh); */

    //load the model, should I should probably make it asynchronous
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(`${process.env.PUBLIC_URL}/models/tracheostomy_tube_cleaned.glb`,(gltfScene) =>{
      sceneRef.current.scene.add(gltfScene.scene);
    });

    //load annotation data, should probably also be asynchronous
    //setAnnotations(testAnnotations);
    const loadedAnnotations = fetch(`${process.env.PUBLIC_URL}/models/annotations.json`)
      .then((fetchedData) => fetchedData.json())
      .then((data) =>{
        setAnnotations(data);
        console.log(data);
      })
    
  }, []);
  
  return (
    <div className='relative'>
      <ViewerAnnotation id='viewerAnnotation'
      show={showAnnotation}
      annotation={annotations[selectedAnnotationIndex]?annotations[selectedAnnotationIndex]:undefined}/>
      <canvas id='viewerCanvas' className='w-full mx-auto my-4'/>
      <div className='flex flex-col gap-y-2 sm:flex-row sm:justify-start sm:gap-x-2  mx-auto'>
        <button onClick={() => setShowAnnotation(!showAnnotation)}
          className='bg-krono-lime text-white rounded-full p-1 text-lg'>
          {showAnnotation ? 'Göm Annoteringar' : 'Visa Annoteringar'}
        </button>
        <button onClick={decrementSelectedAnnnotationIndex}
          className='bg-krono-lime text-white rounded-full p-1 text-lg'>
          Tidigare Annotering
        </button>
        <button onClick={incrementSelectedAnnotation}
          className='bg-krono-lime text-white rounded-full p-1 text-lg'>
          Nästa Annotering
        </button>
      </div>
    </div>
  );
}

export default Viewer;
