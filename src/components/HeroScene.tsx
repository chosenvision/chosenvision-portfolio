import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 34;
const CONNECT_DISTANCE = 2.6;
const RADIUS = 3.4;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function NetworkGraph({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const { positions, links, accentIndices } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // distribute roughly on/inside a sphere for an organic cluster
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = RADIUS * (0.55 + Math.random() * 0.45);
      pts.push(
        new THREE.Vector3(
          2.6 + r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi)
        )
      );
    }
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT_DISTANCE) segs.push([pts[i], pts[j]]);
      }
    }
    const accents = new Set<number>();
    while (accents.size < 5) accents.add(Math.floor(Math.random() * pts.length));
    return { positions: pts, links: segs, accentIndices: accents };
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(links.length * 6);
    links.forEach(([a, b], i) => {
      arr[i * 6] = a.x;
      arr[i * 6 + 1] = a.y;
      arr[i * 6 + 2] = a.z;
      arr[i * 6 + 3] = b.x;
      arr[i * 6 + 4] = b.y;
      arr[i * 6 + 5] = b.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [links]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!reduced) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
      // gentle parallax toward pointer
      const targetX = (state.pointer.x * viewport.width) / 40;
      const targetY = (state.pointer.y * viewport.height) / 40;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.25} />
      </lineSegments>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[accentIndices.has(i) ? 0.06 : 0.04, 12, 12]} />
          <meshBasicMaterial color={accentIndices.has(i) ? "#F59E0B" : "#3B82F6"} />
        </mesh>
      ))}
    </group>
  );
}

const HeroScene = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <NetworkGraph reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
