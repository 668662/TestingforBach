import * as THREE from 'three';

export function createPlane() {
  // Create the texture loader
  const textureLoader = new THREE.TextureLoader();
  const planeTexture = textureLoader.load('../public/images/road.png'); // Replace with your image path

  // Set texture properties to lay it flat on the plane
  planeTexture.wrapS = THREE.RepeatWrapping; // Repeat horizontally
  planeTexture.wrapT = THREE.RepeatWrapping; // Repeat vertically
  planeTexture.repeat.set(1, 1); // Repeat texture once along each axis

  // Create the plane material using the texture
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: planeTexture, // Apply the texture to the material
  });

  // Create the plane geometry
  const planeGeometry = new THREE.PlaneGeometry(10, 100, 32, 32); // Adjust size as needed
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // Optionally, rotate the plane to align it with the scene's ground (if needed)
  plane.rotation.x = -Math.PI / 2;  // Rotate the plane to lie flat on the x-z plane

  // Return the plane object
  return { plane, material: planeMaterial };
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
