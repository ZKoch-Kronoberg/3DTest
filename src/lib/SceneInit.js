/*
    based on this tutorial: https://www.youtube.com/watch?v=d63N4g8p_wI
*/

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
    constructor(canvasID, annotationID) {
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.fov = 45;
        this.nearPlane = 0.01;
        this.farPlane = 1000;
        this.canvasID = canvasID;

        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;

        this.ambientLight = undefined;

        this.annotationID = annotationID;
        this.showAnnotations = false;
    }

    initialize() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            this.nearPlane,
            this.farPlane
        );
        this.camera.position.z = 1;

        //get the canvas and make renderer
        const canvas = document.getElementById(this.canvasID);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true
        });

        this.clock = new THREE.Clock();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.stats = Stats();
        //document.body.appendChild(this.stats.dom);

        //ambient light, lights whole scene evenly
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.ambientLight);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
        this.annotate();
      }

    render() {
        if (this.resizeRendererToDisplaysize(this.renderer)){
          const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();  
        }
        
        
        this.renderer.render(this.scene, this.camera);
    };

    resizeRendererToDisplaysize(renderer){
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize){
            renderer.setSize(width, height, false);
        }

        return needResize;
    };

    annotate(){
        const vector = new THREE.Vector3(0.1, 0.1, 0.1);
        const canvas = this.renderer.domElement;

        vector.project(this.camera);

        vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
        vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

        const annotation = document.getElementById(this.annotationID);
        annotation.style.top = `${vector.y}px`;
        annotation.style.left = `${vector.x}px`;

    }
}