"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { FloatingDots } from "./floating-dots"; // Ensure this path is correct

function GlobeCountries() {
  const [countries, setCountries] = useState([]);
  const groupRef = useRef(null);
  const globeRadius = 1.005;

  useEffect(() => {
    fetch("/countries-110m.geojson")
      .then((response) => response.json())
      .then((data) => setCountries(data.features || []))
      .catch((err) => console.error("Error loading geojson:", err));
  }, []);

  const convertCoordinates = (lon, lat) => {
  // Correct math for Three.js spherical coordinates
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(globeRadius * Math.sin(phi) * Math.cos(theta));
  const z = globeRadius * Math.sin(phi) * Math.sin(theta);
  const y = globeRadius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

  return (
    <group ref={groupRef}>
      {countries.map((country, i) => {
        const coordinates =
          country.geometry.type === "MultiPolygon"
            ? country.geometry.coordinates
            : [country.geometry.coordinates];

        return coordinates.flatMap((polygon, pi) =>
          polygon.flatMap((ring, ri) => {
            const positions = ring.map((coord) => {
              const [lon, lat] = coord;
              return convertCoordinates(lon, lat);
            });

            return (
              <Line
                key={`${i}-${pi}-${ri}`}
                points={positions}
                color="white"
                lineWidth={0.5}
                transparent
                opacity={0.8}
              />
            );
          })
        );
      })}
    </group>
  );
}

function Globe() {
  const groupRef = useRef(null);
  const indiaLon = 78.9629; 
  const indiaLat = 20.5937; 

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        THREE.MathUtils.degToRad(-indiaLon) + clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[THREE.MathUtils.degToRad(-indiaLat), 0, 0]}
    >
      {/* Main globe sphere */}
      <Sphere args={[0.97, 64, 64]}>
        <meshPhongMaterial
          color="#182b4b"
          opacity={0.95}
          transparent
          specular="#204080"
          shininess={5}
        />
      </Sphere>

      {/* Country borders */}
      <GlobeCountries />

      {/* Equator positioned correctly */}
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1, 0.2, 64]} />
          <meshBasicMaterial
            color="#2a4a80"
            side={THREE.DoubleSide}
            transparent
            opacity={0}
          />
        </mesh>
      </group>
    </group>
  );
}

export function GlobeHero() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black to-blue-950">
      <FloatingDots
        className="w-full"
        maxRadius={2}
        maxSpeed={0.8}
        minSpeed={9}
      />
      <FloatingDots
        className="w-full"
        maxRadius={2}
        maxSpeed={0.8}
        minSpeed={9}
      />
      
      <div className="absolute inset-0">
        <Canvas
          camera={{
            position: [0, 0.4, 2.2],
            fov: 75,
          }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <Globe />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.3}
            autoRotate
            autoRotateSpeed={0.5}
            minDistance={1.5}
            maxDistance={3}
            target={[0, 0.2, 0]}
          />
        </Canvas>
      </div>
    </div>
  );
}