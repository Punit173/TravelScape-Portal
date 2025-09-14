import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function TouristMap({ tourists = [], selectedTourist = null }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const materialsRef = useRef([]);
  const geometriesRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    rendererRef.current = renderer;
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // Create a plane to represent the map
    const mapGeometry = new THREE.PlaneGeometry(10, 10);
    const mapMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const map = new THREE.Mesh(mapGeometry, mapMaterial);
    scene.add(map);

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Create tourist markers
    const touristGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    geometriesRef.current.push(touristGeometry);

    tourists.forEach((tourist) => {
      const color = tourist.id === selectedTourist?.id ? 0xff0000 : 0x6366f1;
      const material = new THREE.MeshBasicMaterial({ color });
      materialsRef.current.push(material);
      const sphere = new THREE.Mesh(touristGeometry, material);
      
      // Position based on normalized coordinates
      sphere.position.set(
        (tourist.coordinates.x - 0.5) * 10,
        (tourist.coordinates.y - 0.5) * 10,
        0.1
      );
      
      scene.add(sphere);
    });

    // Camera position
    camera.position.set(0, 0, 5);
    controls.update();

    // Animation
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !controlsRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Initial resize
    handleResize();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js resources
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      // Clean up geometries
      geometriesRef.current.forEach(geometry => {
        if (geometry) geometry.dispose();
      });
      geometriesRef.current = [];

      // Clean up materials
      materialsRef.current.forEach(material => {
        if (material) material.dispose();
      });
      materialsRef.current = [];

      // Clean up renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // Remove renderer from DOM
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      // Clear scene
      if (sceneRef.current) {
        while(sceneRef.current.children.length > 0) { 
          sceneRef.current.remove(sceneRef.current.children[0]);
        }
        sceneRef.current = null;
      }
    };
  }, [tourists, selectedTourist]);

  return (
    <div 
      ref={mountRef} 
      className="bg-gray-900 rounded-lg shadow-lg overflow-hidden"
      style={{ 
        width: '100%', 
        height: '400px',
        position: 'relative'
      }}
    />
  );
}