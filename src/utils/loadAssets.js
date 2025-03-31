import * as THREE from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';


export const loadModel = (scene, modelPath) => {
    const loader = new FBXLoader()
    loader.load(modelPath, (fbx) => {
      // Scale the model to make it visible
      fbx.scale.set(0.01, 0.01, 0.01)
      
      // Center the model
      fbx.position.set(0, 0, 0)

      fbx.rotation.x = -Math.PI / 2

      //bounding box
      const box = new THREE.Box3().setFromObject(fbx)
      const center = box.getCenter(new THREE.Vector3())
      fbx.position.sub(center)

      // Add the model to the scene
      scene.add(fbx)
      
    }, 
    // Add loading progress callback
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    // Add error callback
    (error) => {
      console.error('An error occurred loading the model:', error)
    })
}