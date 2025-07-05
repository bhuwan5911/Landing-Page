import * as THREE from "three";

export interface Scene3D {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: any;
  animate: () => void;
  cleanup: () => void;
}

export const setupMotorcycleScene = (container: HTMLDivElement): Scene3D => {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf7fafc);
  
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Controls - simplified for now
  const controls = {
    update: () => {},
    dispose: () => {},
    enableDamping: true,
    dampingFactor: 0.25
  };
  
  // Create a simple motorcycle placeholder with geometry
  const geometry = new THREE.BoxGeometry(2, 1, 4);
  const material = new THREE.MeshPhongMaterial({ color: 0x121212 });
  const motorcycle = new THREE.Mesh(geometry, material);
  scene.add(motorcycle);
  
  // Add wheels
  const wheelGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 32);
  const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  
  const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  frontWheel.rotation.x = Math.PI / 2;
  frontWheel.position.set(0, -0.5, 1.5);
  motorcycle.add(frontWheel);
  
  const rearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  rearWheel.rotation.x = Math.PI / 2;
  rearWheel.position.set(0, -0.5, -1.5);
  motorcycle.add(rearWheel);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    motorcycle.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  };
  
  // Handle resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  
  window.addEventListener("resize", handleResize);
  
  // Cleanup
  const cleanup = () => {
    window.removeEventListener("resize", handleResize);
    scene.clear();
    renderer.dispose();
    controls.dispose();
    container.removeChild(renderer.domElement);
  };
  
  return {
    scene,
    camera,
    renderer,
    controls,
    animate,
    cleanup,
  };
};

export const setupGymScene = (container: HTMLDivElement): Scene3D => {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf7fafc);
  
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Controls - simplified for now
  const controls = {
    update: () => {},
    dispose: () => {},
    enableDamping: true,
    dampingFactor: 0.25
  };
  
  // Create a simple gym equipment placeholder with geometry
  const benchGeometry = new THREE.BoxGeometry(2, 0.3, 4);
  const benchMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  const bench = new THREE.Mesh(benchGeometry, benchMaterial);
  scene.add(bench);
  
  // Add weight rack
  const rackGeometry = new THREE.BoxGeometry(3, 2, 0.3);
  const rackMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const rack = new THREE.Mesh(rackGeometry, rackMaterial);
  rack.position.set(0, 1, -2.5);
  scene.add(rack);
  
  // Add dumbbells
  const dumbbellGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 32);
  const dumbbellMaterial = new THREE.MeshPhongMaterial({ color: 0xe53e3e });
  
  const dumbbell1 = new THREE.Mesh(dumbbellGeometry, dumbbellMaterial);
  dumbbell1.rotation.z = Math.PI / 2;
  dumbbell1.position.set(-1, 0.5, -2.2);
  scene.add(dumbbell1);
  
  const dumbbell2 = new THREE.Mesh(dumbbellGeometry, dumbbellMaterial);
  dumbbell2.rotation.z = Math.PI / 2;
  dumbbell2.position.set(1, 0.5, -2.2);
  scene.add(dumbbell2);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    bench.rotation.y += 0.002;
    rack.rotation.y += 0.002;
    dumbbell1.rotation.y += 0.002;
    dumbbell2.rotation.y += 0.002;
    controls.update();
    renderer.render(scene, camera);
  };
  
  // Handle resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  
  window.addEventListener("resize", handleResize);
  
  // Cleanup
  const cleanup = () => {
    window.removeEventListener("resize", handleResize);
    scene.clear();
    renderer.dispose();
    controls.dispose();
    container.removeChild(renderer.domElement);
  };
  
  return {
    scene,
    camera,
    renderer,
    controls,
    animate,
    cleanup,
  };
};
