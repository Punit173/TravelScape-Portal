import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function BarChart3D({ data, maxHeight = 5 }) {
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

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    rendererRef.current = renderer;
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    // Base plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1,
    });
    geometriesRef.current.push(planeGeometry);
    materialsRef.current.push(planeMaterial);

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // Create text sprite function
    const createTextSprite = (text, position) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;

      context.font = 'bold 24px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      materialsRef.current.push(spriteMaterial);

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.scale.set(1, 0.25, 1);
      
      return sprite;
    };

    // Create bars
    const spacing = 8 / (data.length + 1);
    const maxValue = Math.max(...data.map(d => d.value));

    data.forEach((item, index) => {
      const normalizedHeight = (item.value / maxValue) * maxHeight;
      const barGeometry = new THREE.BoxGeometry(0.5, normalizedHeight, 0.5);
      geometriesRef.current.push(barGeometry);

      const barMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${index * 360 / data.length}, 70%, 50%)`),
      });
      materialsRef.current.push(barMaterial);

      const bar = new THREE.Mesh(barGeometry, barMaterial);
      
      // Position the bar
      const x = -4 + (index + 1) * spacing;
      bar.position.set(x, normalizedHeight / 2, 0);
      scene.add(bar);

      // Add text labels
      const labelPosition = new THREE.Vector3(x, -0.5, 0);
      const nameSprite = createTextSprite(item.name, labelPosition);
      scene.add(nameSprite);

      const valuePosition = new THREE.Vector3(x, normalizedHeight + 0.5, 0);
      const valueSprite = createTextSprite(item.value.toString(), valuePosition);
      scene.add(valueSprite);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Camera position
    camera.position.set(5, 5, 5);
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
    handleResize(); // Initial resize

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose of materials
      materialsRef.current.forEach(material => {
        if (material && material.map) {
          material.map.dispose();
        }
        if (material) {
          material.dispose();
        }
      });
      materialsRef.current = [];

      // Dispose of geometries
      geometriesRef.current.forEach(geometry => {
        if (geometry) {
          geometry.dispose();
        }
      });
      geometriesRef.current = [];

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

      // Dispose controls
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [data, maxHeight]);

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