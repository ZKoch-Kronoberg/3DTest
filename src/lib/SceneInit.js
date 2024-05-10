/*
    based on this tutorial: https://www.youtube.com/watch?v=d63N4g8p_wI
*/

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
    constructor(canvasID) {
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
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.stats = Stats();
        document.body.appendChild(this.stats.dom); //not sure what is wrong with this line

        //ambient light, lights whole scene evenly
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        this.scene.add(this.ambientLight);

        window.addEventListener('resize', () => this.OnWindowResize(), false)
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
      }

    render() {
        this.renderer.render(this.scene, this.camera);
    };

    OnWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}