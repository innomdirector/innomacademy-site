import React, { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, } from "@react-three/drei";

const FLOAT_BASE_Y = -2;
const FLOAT_SPEED = 0.55;
const FLOAT_AMPLITUDE = 0.15;

function InnomModel() {
  const primitiveRef = useRef();
  const gltf = useGLTF("/models/innom3dv3.glb");
  const scene = gltf.scene;
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set("#FFFFFF");
      child.material.emissive.set("#000000");
      child.material.metalness = 0.3;
      child.material.roughness = 0.4;
    }
  });

  useFrame(({ clock }) => {
    if (!primitiveRef.current) return;
    const t = clock.getElapsedTime();
    primitiveRef.current.position.y = FLOAT_BASE_Y + Math.sin(t * FLOAT_SPEED) * FLOAT_AMPLITUDE;
  });

  const xCorrection = -Math.PI / 36;
  return (
    <group rotation={[xCorrection, 0, 0]}>
      <primitive ref={primitiveRef} object={gltf.scene} scale={2} position={[0, FLOAT_BASE_Y, 2.5]} />
    </group>
  );
}

function InnoM3D() {
  return(
    <Canvas 
      camera={{ position: [0, 1, 8], fov: 70 }} 
      style={{ maxWidth: '300px', margin: '0 auto', height: window.innerWidth < 768 ? '200px' : '500px' }} // Responsive height
    >
      <ambientLight intensity={2} /> {/* Increase ambient light */}
      <directionalLight position={[0, 5, 11]} intensity={5} /> {/* Adjust position and intensity */}
      <pointLight position={[-5, 5, 5]} intensity={0.8} /> {/* Add point light */}
      <InnomModel />
      <OrbitControls enableZoom={false} mouseButtons={{ LEFT: null, RIGHT: null }} />
    </Canvas>
  )
}

export default InnoM3D