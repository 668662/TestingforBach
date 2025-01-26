import * as THREE from 'three';
import { createPlane, createLines } from './components/plane.js';
import { createBall } from './components/ball.js';

// Scene, Camera, Renderer
const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Soft ambient light
scene.add(ambientLight);

// Add Static Plane
const { plane, material } = createPlane();
scene.add(plane);

const textureSpeed = -0.001; 

// Add Lines
const lines = createLines();
scene.add(lines);

// Add Ball with PNG texture
const ball = createBall('./public/images/texture.png'); // Use PNG texture for the ball
scene.add(ball);

// Define 5 segments (X positions for ball and cube)
const segments = [-4, -2, 0, 2, 4];
let currentSegment = 2; // Start in the middle segment

// Create the initial cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
let cube = null;

// Spawn a single cube at a random segment and Z-value between 25 and 50
function spawnCube() {
  const randomSegment = Math.floor(Math.random() * segments.length); // Random segment
  const randomZ = Math.random() * 25 + 25; // Random Z between 25 and 50
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(segments[randomSegment], 0.5, -randomZ);
  scene.add(cube);
}

// Initial cube spawn
spawnCube();

// Ball Controller
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && currentSegment > 0) {
    currentSegment--; // Move to the left segment
    ball.rotation.z += Math.PI / 2; // Rotate left
  } else if (event.key === 'ArrowRight' && currentSegment < segments.length - 1) {
    currentSegment++; // Move to the right segment
    ball.rotation.z -= Math.PI / 2; // Rotate right
  }
});

// Game variables
let playerScore = 0;
// Create player Score display dynamically
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'score-display';
scoreDisplay.style.position = 'fixed';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.color = 'white';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.zIndex = '1000';
scoreDisplay.innerHTML = `Score: ${playerScore}`;
document.body.appendChild(scoreDisplay);

function updateScore() {
  playerScore += 1;
  scoreDisplay.innerHTML = `Score: ${playerScore}`;
  console.log(`Player Score: ${playerScore}`);
}

// Helper Function: Check for Collision
function checkCollision() {
  if (!cube) return false; // No cube to check collision with
  const distance = ball.position.distanceTo(cube.position);
  return distance < 1; // Threshold: Ball radius (0.5) + Half of cube size (0.5)
}

// Camera Position
camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Move ball to the current segment position
  ball.position.x = segments[currentSegment];

  // Rotate the ball slightly to simulate rolling
  ball.rotation.x -= 0.05; // Continuous forward rotation

  material.map.offset.y -= textureSpeed;

  // Move the cube forward and handle collision
  if (cube) {
    cube.position.z += 0.101;

    // Check for collision with the ball
    if (checkCollision()) {
      scene.remove(cube); // Remove the cube from the scene
      cube = null; // Clear the cube reference
      updateScore();
      spawnCube(); // Spawn a new cube
    }

    // Remove cube if it moves out of bounds
    if (cube && cube.position.z > 10) {
      scene.remove(cube); // Remove from the scene
      cube = null; // Clear the cube reference
      spawnCube(); // Spawn a new cube
    }
  }

  //plane.position.z += 0.1;

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  renderer.setSize(width, height); // Adjust canvas size
  camera.aspect = width / height; // Update camera aspect ratio
  camera.updateProjectionMatrix(); // Update the projection matrix
});
