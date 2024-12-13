import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const RotatingGlobe = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // Load remote textures
    const earthTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-night.jpg",
      () => console.log("Earth texture loaded successfully"),
      undefined,
      (error) => console.error("Error loading Earth texture:", error)
    );

    const bumpMap = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
      () => console.log("Bump map loaded successfully"),
      undefined,
      (error) => console.error("Error loading bump map:", error)
    );

    if (globeRef.current) {
      // Apply textures to the globe material
      if (globeRef.current.material instanceof THREE.MeshStandardMaterial) {
        globeRef.current.material.map = earthTexture;
        globeRef.current.material.bumpMap = bumpMap;
        globeRef.current.material.bumpScale = 0.05;
        globeRef.current.material.needsUpdate = true;
      }
    }
  }, []);

  return (
    <Canvas>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Globe */}
      <mesh ref={globeRef} rotation={[0.5, 0.8, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial />
      </mesh>

      {/* Orbit Controls */}
      <OrbitControls enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default RotatingGlobe;
