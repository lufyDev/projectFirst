import * as THREE from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export const loadAssets = (scene, onProgress, onComplete) => {
  const loadingManager = new THREE.LoadingManager();
  const assets = [
    // { type: 'fbx', path: './models/side foilagebase.fbx' },
    { type: 'fbx', path: './models/Stairs.FBX' },
    { type: 'glb', path: './models/Train.glb' }
  ];

  // Setup loading manager callbacks
  loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    if (onProgress) onProgress(progress);
  };

  loadingManager.onLoad = () => {
    console.log('Loading complete!');
    if (onComplete) onComplete();
  };

  loadingManager.onError = (url) => {
    console.error('Error loading', url);
  };

  // Load all assets
  assets.forEach(asset => {
    if (asset.type === 'fbx') {
      loadFbxModel(scene, asset.path, loadingManager);
    } else if (asset.type === 'glb') {
      loadGlbModel(scene, asset.path, loadingManager);
    }
  });
}

const loadFbxModel = (scene, modelPath, manager) => {
  const loader = new FBXLoader(manager);
  loader.load(modelPath, (fbx) => {
    // Scale the model to make it visible
    fbx.scale.set(0.01, 0.01, 0.01);
    
    // Center the model
    fbx.position.set(0, 0, 0);
    fbx.rotation.x = -Math.PI / 2;

    // Bounding box
    const box = new THREE.Box3().setFromObject(fbx);
    const center = box.getCenter(new THREE.Vector3());
    fbx.position.sub(center);

    // Add the model to the scene
    scene.add(fbx);
  });
}

const loadGlbModel = (scene, modelPath, manager) => {
  const loader = new GLTFLoader(manager);
  loader.load(modelPath, (gltf) => {
    scene.add(gltf.scene);
  });
}