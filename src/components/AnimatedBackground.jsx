import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function AnimatedBackground() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: '#6366F1',
      transparent: true,
      opacity: 0.8,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Camera position
    camera.position.z = 3;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 1000;
      mouseY = (event.clientY - window.innerHeight / 2) / 1000;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += mouseX * 0.5;
      particlesMesh.rotation.y += mouseY * 0.5;

      rendererRef.current.render(sceneRef.current, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      // Clean up Three.js resources
      particlesGeometry.dispose();
      material.dispose();
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none'
      }} 
    />
  );
}