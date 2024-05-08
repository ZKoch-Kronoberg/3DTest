/*
    used the code from this article:
    https://www.educative.io/answers/how-to-import-3d-models-in-threejs
*/

import * as THREE from 'three'

export default class SceneInit {
    constructor(canvasID) {
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.canvasID = canvasID;

        this.ambientLight = undefined;
    }

    initialize() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            120,
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        );
        this.camera.position.z = 0;

        const canvas = document.getElementById(this.canvasID);
        this.renderer = new THREE.WebGLRenderer({canvas});

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);

    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
      }

    render() {
        this.renderer.render(this.scene, this.camera);
    };
}