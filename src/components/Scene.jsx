import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { setupEnvironmentMap } from '../utils/setupEnvironmentMap';
import { loadAssets } from '../utils/loadAssets';
import LoadingBar from './LoadingBar';
import gsap from 'gsap';
import '../styles/LoadingBar.css';

const Scene = () => {
  const mountRef = useRef(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene()

    //environment map
    setupEnvironmentMap(scene)

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 5)
    scene.add(ambientLight)

    //Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
    camera.position.z = 5

    //Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef?.current?.appendChild(renderer.domElement)

    //load assets
    loadAssets(
      scene,
      (progress) => {
        setLoadingProgress(progress);
      },
      () => {
        setIsLoading(false);
        // Fade out loading screen
        gsap.to('.loading-container', {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            // Remove loading screen from DOM after fade out
            const loadingContainer = document.querySelector('.loading-container');
            if (loadingContainer) {
              loadingContainer.style.display = 'none';
            }
          }
        });
      }
    )

    //controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    // Animation function
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // Cleanup function
    return () => {
      mountRef?.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <>
      {isLoading && <LoadingBar progress={loadingProgress} />}
      <div ref={mountRef}></div>
    </>
  )
}

export default Scene