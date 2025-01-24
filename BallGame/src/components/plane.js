import * as THREE from 'three';

export function createPlane() {
  const planeGeometry = new THREE.PlaneGeometry(10, 100, 32, 32);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4b0082 }); // Dark purple
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2; // Make it flat
  return plane;
}

export function createLines() {
  const group = new THREE.Group();
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });

  // Add 5 lines evenly spaced
  for (let i = 0; i <= 5; i++) {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([
      new THREE.Vector3(-5 + i * 2, 0.01, -50), // Start point
      new THREE.Vector3(-5 + i * 2, 0.01, 50),  // End point
    ]);
    const line = new THREE.Line(geometry, material);
    group.add(line);
  }

  return group;
}
