import * as THREE from "three";

import { Cloud, Environment, OrbitControls, Sky } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense } from "react";

export const AnimatedBackgroundSky = ({ children }) => {
  return (
    <Canvas shadows camera={{ position: [-50, -25, 150], fov: 15 }}>
      <Html center>
        <div>{children}</div>
      </Html>
      <Suspense fallback={null}>
        <hemisphereLight intensity={0.45} />
        <spotLight
          angle={0.4}
          penumbra={1}
          position={[20, 30, 2.5]}
          castShadow
          shadow-bias={-0.00001}
        />
        <directionalLight
          color="red"
          position={[-10, -10, 0]}
          intensity={1.5}
        />
        <Cloud color={"#F20C5D"} scale={1.5} position={[20, 0, 0]} />
        <Cloud color={"#F20C5D"} scale={2} position={[-10, 10, 0]} />
        <Cloud color={"#0C5DF2"} scale={3} position={[10, -10, 0]} />
        <Cloud color={"#9FFE36"} scale={4} position={[10, 90, 0]} />
        <Cloud color={"#610791"} scale={5} position={[-40, 0, -10]} />

        <Environment preset="city" />
        <Sky />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};
export default AnimatedBackgroundSky;
