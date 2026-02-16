
// @ts-nocheck
import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { AnalysisData } from '../types';

interface GlobeProps {
  analyzing: boolean;
  data: AnalysisData | null;
}

const GLOBE_RADIUS = 2.5;

// Convert Lat/Lon to 3D position on globe surface
const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// Shaders for the atmosphere and holographic dots
const atmosphereVertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
varying vec3 vNormal;
void main() {
  float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
  gl_FragColor = vec4(0.2, 0.6, 1.0, 1.0) * intensity * 2.5;
}
`;

const dotsVertexShader = `
varying vec2 vUv;
varying vec3 vPos;
void main() {
  vUv = uv;
  vPos = position;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 1.0 * (50.0 / -mvPosition.z); 
  gl_Position = projectionMatrix * mvPosition;
}
`;

const dotsFragmentShader = `
uniform sampler2D visibilityMap;
uniform vec3 targetPos;
uniform float hasTarget;
uniform vec3 highlightColor;
uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) discard;

  float land = texture2D(visibilityMap, vUv).r;
  vec3 color;
  float alpha;

  if (land < 0.15) {
     if (r > 0.2) discard;
     color = vec3(0.05, 0.15, 0.3);
     alpha = 0.3;
  } else {
     color = vec3(0.2, 0.5, 0.9);
     alpha = 0.6;
     if (hasTarget > 0.5) {
        float dist = distance(vPos, targetPos);
        float regionRadius = 0.8; 
        if (dist < regionRadius) {
          float strength = 1.0 - (dist / regionRadius);
          strength = pow(strength, 2.0);
          float pulse = 0.8 + 0.2 * sin(uTime * 3.0);
          strength *= pulse;
          color = mix(color, highlightColor, strength * 0.9);
          alpha = mix(alpha, 1.0, strength);
        }
     }
  }
  gl_FragColor = vec4(color, alpha);
}
`;

export const Globe: React.FC<GlobeProps> = ({ analyzing, data }) => {
  const globeRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const pointsMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const markerGroupRef = useRef<THREE.Group>(null);
  const coreDotRef = useRef<THREE.Mesh>(null);
  
  const [specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"
  ]);

  const isAlert = useMemo(() => {
    return data && (data.security.status === 'Malicious' || data.security.status === 'Warning');
  }, [data]);

  const highlightColor = useMemo(() => {
    if (!data) return new THREE.Vector3(0.2, 0.5, 0.9);
    return data.security.status === 'Safe' 
      ? new THREE.Vector3(0.2, 0.9, 0.4) 
      : new THREE.Vector3(1.0, 0.2, 0.2);
  }, [data]);

  const highlightColorHex = useMemo(() => {
     if (!data) return '#3b82f6';
     return data.security.status === 'Safe' ? '#34d399' : '#ef4444';
  }, [data]);

  const targetPos = useMemo(() => {
    if (!data) return new THREE.Vector3(0, 0, 0);
    return latLongToVector3(data.location.latitude, data.location.longitude, GLOBE_RADIUS);
  }, [data]);

  useEffect(() => {
    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.uniforms.targetPos.value = targetPos;
      pointsMaterialRef.current.uniforms.highlightColor.value = highlightColor;
      pointsMaterialRef.current.uniforms.hasTarget.value = data ? 1.0 : 0.0;
    }
  }, [data, targetPos, highlightColor]);

  useFrame((state) => {
    // Rotation logic: Idle rotation vs Analysis focus
    if (globeRef.current && (!data || analyzing)) {
      globeRef.current.rotation.y += 0.0015;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.002;
    }
    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    
    // Ensure marker always faces out from the globe
    if (markerGroupRef.current) {
      markerGroupRef.current.lookAt(targetPos.clone().multiplyScalar(2));
    }

    // High Alert Pulse for the core dot
    if (coreDotRef.current && isAlert) {
      const pulseSpeed = 8.0;
      const intensity = 8 + 6 * Math.sin(state.clock.elapsedTime * pulseSpeed);
      coreDotRef.current.material.emissiveIntensity = intensity;
      
      // Subtle scale pulse
      const scaleBase = 1.0;
      const scaleAdd = 0.2 * Math.sin(state.clock.elapsedTime * pulseSpeed);
      coreDotRef.current.scale.setScalar(scaleBase + scaleAdd);
    } else if (coreDotRef.current) {
      coreDotRef.current.material.emissiveIntensity = 10;
      coreDotRef.current.scale.setScalar(1.0);
    }
  });

  // Smooth rotation to target location
  useEffect(() => {
    if (globeRef.current && data) {
      const { latitude, longitude } = data.location;
      
      const targetRotationY = -((longitude + 90) * (Math.PI / 180));
      const targetRotationX = (latitude) * (Math.PI / 180);

      gsap.to(globeRef.current.rotation, {
        y: targetRotationY + Math.PI, 
        x: targetRotationX,
        duration: 2.5,
        ease: "power3.inOut"
      });
    }
  }, [data]);

  return (
    <group ref={globeRef}>
      {/* Atmosphere Glow */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
        />
      </mesh>

      {/* Solid core to hide backside dots */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.02, 32, 32]} />
        <meshBasicMaterial color="#020617" />
      </mesh>

      {/* Holographic Dot Matrix */}
      <points>
        <sphereGeometry args={[GLOBE_RADIUS, 128, 128]} />
        <shaderMaterial 
          ref={pointsMaterialRef}
          vertexShader={dotsVertexShader}
          fragmentShader={dotsFragmentShader}
          uniforms={{
            visibilityMap: { value: specularMap },
            targetPos: { value: new THREE.Vector3(0, 0, 0) },
            hasTarget: { value: 0.0 },
            highlightColor: { value: new THREE.Vector3(0, 0, 0) },
            uTime: { value: 0 }
          }}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle grid wireframe */}
       <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.01, 24, 24]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[GLOBE_RADIUS + 0.06, 32, 32]} />
        <meshBasicMaterial 
          map={cloudsMap} 
          transparent 
          opacity={0.12} 
          blending={THREE.AdditiveBlending} 
          color="#60a5fa"
        />
      </mesh>

      {/* Target Marker (Dot + Ripple) */}
      {data && (
        <group position={targetPos.clone().multiplyScalar(1.01)}>
          <group ref={markerGroupRef}>
            {/* Pulsing Ripple Effect */}
            <Ripple color={highlightColorHex} isAlert={isAlert} />
            
            {/* Core Glowing Dot */}
            <mesh ref={coreDotRef}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial 
                color={highlightColorHex} 
                emissive={highlightColorHex} 
                emissiveIntensity={10} 
                toneMapped={false}
              />
            </mesh>
            
            {/* Inner White Core for contrast */}
            <mesh>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshBasicMaterial color="white" transparent opacity={0.9} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

const Ripple = ({ color, isAlert }: { color: string, isAlert: boolean }) => {
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const mesh3Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = isAlert ? 2.5 : 1.2;
    const maxScale = isAlert ? 6.0 : 2.5;
    const opacityMult = isAlert ? 0.8 : 0.5;
    
    [mesh1Ref, mesh2Ref, mesh3Ref].forEach((ref, i) => {
      if (ref.current) {
        const offset = i * (isAlert ? 0.4 : 0.8);
        const scale = ((t * speed + offset) % maxScale) * 2;
        const opacity = Math.max(0, 1 - (scale / (maxScale * 2)));
        
        ref.current.scale.set(scale, scale, 1);
        (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity * opacityMult;
        (ref.current.material as THREE.MeshBasicMaterial).color.set(color);
      }
    });
  });

  return (
    <group>
      <mesh ref={mesh1Ref}>
        <ringGeometry args={[0.05, 0.06, 32]} />
        <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={mesh2Ref}>
        <ringGeometry args={[0.05, 0.06, 32]} />
        <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={mesh3Ref}>
        <ringGeometry args={[0.05, 0.06, 32]} />
        <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
