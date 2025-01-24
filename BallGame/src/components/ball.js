import * as THREE from 'three';

export function createBall(texturePath) {
  const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const sphereMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texturePath), // Load texture
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.set(0, 0.5, 5); // Slightly above the plane
  return sphere;
}
