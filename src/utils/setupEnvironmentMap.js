import * as THREE from 'three'

export const setupEnvironmentMap = (scene) => {
    //environment map
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    const environmentMap = cubeTextureLoader.load([
      './textures/Standard-Cube-Map/px.png', // positive x
      './textures/Standard-Cube-Map/nx.png', // negative x
      './textures/Standard-Cube-Map/py.png', // positive y
      './textures/Standard-Cube-Map/ny.png', // negative y
      './textures/Standard-Cube-Map/pz.png', // positive z
      './textures/Standard-Cube-Map/nz.png'  // negative z
    ])
    // Set the scene's environment map
    scene.environment = environmentMap
    // Optional: Also use it as background
    scene.background = environmentMap
}