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
        this.scene = THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        this.camera.position.z = 10;

        const canvas = document.getElementById(this.canvasID);
        this.renderer = new THREE.WebGLRenderer({canvas});

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    }

    /*
        the article i took this from had something for animation here but I
        don't intend to use animations so I'm leaving it out
    */

    render() {
        this.renderer.render(this.scene, this.camera);
    };
}