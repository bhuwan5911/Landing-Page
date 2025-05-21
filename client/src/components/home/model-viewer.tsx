import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FaSync, FaExpand, FaLayerGroup, FaPaintBrush, FaSlidersH, FaDownload } from "react-icons/fa";

export default function ModelViewer() {
  const [activeModel, setActiveModel] = useState<"motorcycle" | "gym">("motorcycle");
  const motorcycleRef = useRef<HTMLDivElement>(null);
  const gymRef = useRef<HTMLDivElement>(null);

  // Initialize 3D scene
  useEffect(() => {
    if (!motorcycleRef.current || !gymRef.current) return;

    // Setup motorcycle model viewer
    const motorcycleContainer = motorcycleRef.current;
    const motorcycleScene = new THREE.Scene();
    motorcycleScene.background = new THREE.Color(0xf7fafc);
    
    const motorcycleCamera = new THREE.PerspectiveCamera(75, motorcycleContainer.clientWidth / motorcycleContainer.clientHeight, 0.1, 1000);
    motorcycleCamera.position.z = 5;
    
    const motorcycleRenderer = new THREE.WebGLRenderer({ antialias: true });
    motorcycleRenderer.setSize(motorcycleContainer.clientWidth, motorcycleContainer.clientHeight);
    motorcycleContainer.appendChild(motorcycleRenderer.domElement);
    
    const motorcycleControls = new OrbitControls(motorcycleCamera, motorcycleRenderer.domElement);
    motorcycleControls.enableDamping = true;
    motorcycleControls.dampingFactor = 0.25;
    
    // Create a simple motorcycle placeholder with geometry
    const geometry = new THREE.BoxGeometry(2, 1, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x121212 });
    const motorcycle = new THREE.Mesh(geometry, material);
    motorcycleScene.add(motorcycle);
    
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
    motorcycleScene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    motorcycleScene.add(pointLight);
    
    // Setup gym equipment model viewer
    const gymContainer = gymRef.current;
    const gymScene = new THREE.Scene();
    gymScene.background = new THREE.Color(0xf7fafc);
    
    const gymCamera = new THREE.PerspectiveCamera(75, gymContainer.clientWidth / gymContainer.clientHeight, 0.1, 1000);
    gymCamera.position.z = 5;
    
    const gymRenderer = new THREE.WebGLRenderer({ antialias: true });
    gymRenderer.setSize(gymContainer.clientWidth, gymContainer.clientHeight);
    gymContainer.appendChild(gymRenderer.domElement);
    
    const gymControls = new OrbitControls(gymCamera, gymRenderer.domElement);
    gymControls.enableDamping = true;
    gymControls.dampingFactor = 0.25;
    
    // Create a simple gym equipment placeholder with geometry
    const benchGeometry = new THREE.BoxGeometry(2, 0.3, 4);
    const benchMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const bench = new THREE.Mesh(benchGeometry, benchMaterial);
    gymScene.add(bench);
    
    // Add weight rack
    const rackGeometry = new THREE.BoxGeometry(3, 2, 0.3);
    const rackMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const rack = new THREE.Mesh(rackGeometry, rackMaterial);
    rack.position.set(0, 1, -2.5);
    gymScene.add(rack);
    
    // Add dumbbells
    const dumbbellGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 32);
    const dumbbellMaterial = new THREE.MeshPhongMaterial({ color: 0xe53e3e });
    
    const dumbbell1 = new THREE.Mesh(dumbbellGeometry, dumbbellMaterial);
    dumbbell1.rotation.z = Math.PI / 2;
    dumbbell1.position.set(-1, 0.5, -2.2);
    gymScene.add(dumbbell1);
    
    const dumbbell2 = new THREE.Mesh(dumbbellGeometry, dumbbellMaterial);
    dumbbell2.rotation.z = Math.PI / 2;
    dumbbell2.position.set(1, 0.5, -2.2);
    gymScene.add(dumbbell2);
    
    // Add lights
    const gymAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
    gymScene.add(gymAmbientLight);
    
    const gymPointLight = new THREE.PointLight(0xffffff, 1);
    gymPointLight.position.set(5, 5, 5);
    gymScene.add(gymPointLight);
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      motorcycle.rotation.y += 0.005;
      motorcycleControls.update();
      motorcycleRenderer.render(motorcycleScene, motorcycleCamera);
      
      bench.rotation.y += 0.002;
      rack.rotation.y += 0.002;
      dumbbell1.rotation.y += 0.002;
      dumbbell2.rotation.y += 0.002;
      gymControls.update();
      gymRenderer.render(gymScene, gymCamera);
    }
    
    animate();
    
    // Resize handler
    function handleResize() {
      if (motorcycleRef.current && gymRef.current) {
        const motorcycleWidth = motorcycleRef.current.clientWidth;
        const motorcycleHeight = motorcycleRef.current.clientHeight;
        motorcycleCamera.aspect = motorcycleWidth / motorcycleHeight;
        motorcycleCamera.updateProjectionMatrix();
        motorcycleRenderer.setSize(motorcycleWidth, motorcycleHeight);
        
        const gymWidth = gymRef.current.clientWidth;
        const gymHeight = gymRef.current.clientHeight;
        gymCamera.aspect = gymWidth / gymHeight;
        gymCamera.updateProjectionMatrix();
        gymRenderer.setSize(gymWidth, gymHeight);
      }
    }
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (motorcycleRef.current) {
        motorcycleRef.current.removeChild(motorcycleRenderer.domElement);
      }
      
      if (gymRef.current) {
        gymRef.current.removeChild(gymRenderer.domElement);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gray-100">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto px-4"
      >
        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">
            Interactive <span className="text-secondary">Equipment Models</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our 3D models of fitness equipment and motorcycles to see the quality and details of what we work with.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            variants={fadeIn('right', 'tween', 0.3, 1)}
            className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Royal Enfield Motorcycle</h3>
              <div className="flex space-x-2">
                <button onClick={() => {}} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all">
                  <FaSync className="text-gray-700" />
                </button>
                <button onClick={() => {}} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all">
                  <FaExpand className="text-gray-700" />
                </button>
              </div>
            </div>
            
            <div ref={motorcycleRef} className="w-full h-64 rounded-lg mb-4 bg-gray-50"></div>
            
            <div className="grid grid-cols-4 gap-2">
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaLayerGroup className="text-gray-700 mx-auto" />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaPaintBrush className="text-gray-700 mx-auto" />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaSlidersH className="text-gray-700 mx-auto" />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaDownload className="text-gray-700 mx-auto" />
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn('left', 'tween', 0.5, 1)}
            className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Gym Equipment</h3>
              <div className="flex space-x-2">
                <button onClick={() => {}} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all">
                  <FaSync className="text-gray-700" />
                </button>
                <button onClick={() => {}} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all">
                  <FaExpand className="text-gray-700" />
                </button>
              </div>
            </div>
            
            <div ref={gymRef} className="w-full h-64 rounded-lg mb-4 bg-gray-50"></div>
            
            <div className="grid grid-cols-4 gap-2">
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaLayerGroup className="text-gray-700 mx-auto" />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaPaintBrush className="text-gray-700 mx-auto" />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaSlidersH className="text-gray-700 mx-auto" />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-all">
                <FaDownload className="text-gray-700 mx-auto" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
