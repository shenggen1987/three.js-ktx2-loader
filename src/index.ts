import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Color
} from "three";

import { KTX2Loader } from "./three/loaders/KTX2Loader.js";

const scene = new Scene();
scene.background = new Color("hotpink");
const renderer = new WebGLRenderer({
  canvas: document.getElementById("scene"),
  antialias: true
});

const camera = new PerspectiveCamera(75, 1, 0.1, 100);
camera.position.set(0, 0, 3);

let ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath("/basis/");
ktx2Loader.detectSupport(renderer);

try {
  // const texture = ktx2Loader.load("/texture/sample_etc1s.ktx2");
  const texture = ktx2Loader.load("/texture/sample_austc_zstd.ktx2");

  const box2 = new Mesh(
    new BoxBufferGeometry(1, 1, 1),
    new MeshBasicMaterial({ map: texture })
  );
  box2.rotateX(Math.PI / 4);

  box2.material.needsUpdate = true;
  scene.add(box2);
} catch (e) {
  console.error("wowoow", e);
} finally {
  ktx2Loader.dispose();
}

const render = () => {
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(render);
