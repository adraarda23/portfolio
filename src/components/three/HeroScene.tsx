import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WARM = ['#ef7d22', '#f4c54a', '#e2673f', '#f59e3b']

/**
 * Lightweight Three.js backdrop for the hero: a slowly rotating wireframe
 * icosahedron wrapped in a warm particle field that drifts toward the cursor.
 */
export default function HeroScene() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xef7d22, wireframe: true, transparent: true, opacity: 0.28 }),
    )
    group.add(shell)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 2),
      new THREE.MeshBasicMaterial({ color: 0xf4c54a, wireframe: true, transparent: true, opacity: 0.35 }),
    )
    group.add(core)

    const count = 420
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const palette = WARM.map((c) => new THREE.Color(c))
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 3.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[i % palette.length]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      seeds[i] = Math.random() * Math.PI * 2
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true, depthWrite: false }),
    )
    group.add(points)

    const base = positions.slice()
    const target = new THREE.Vector2()
    const pointer = new THREE.Vector2()

    const onPointer = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) loop()
    })
    io.observe(el)

    const clock = new THREE.Clock()
    const loop = () => {
      if (!visible) {
        raf = 0
        return
      }
      const t = clock.getElapsedTime()
      pointer.lerp(target, 0.04)

      group.rotation.y = t * 0.12 + pointer.x * 0.35
      group.rotation.x = Math.sin(t * 0.18) * 0.18 - pointer.y * 0.25
      core.rotation.y = -t * 0.3
      core.rotation.z = t * 0.17
      shell.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02)

      const pos = geo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < count; i++) {
        const k = seeds[i] + t * 0.6
        pos.array[i * 3] = base[i * 3] + Math.sin(k) * 0.08
        pos.array[i * 3 + 1] = base[i * 3 + 1] + Math.cos(k * 1.3) * 0.08
        pos.array[i * 3 + 2] = base[i * 3 + 2] + Math.sin(k * 0.7) * 0.08
      }
      pos.needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      geo.dispose()
      ;(points.material as THREE.Material).dispose()
      shell.geometry.dispose()
      ;(shell.material as THREE.Material).dispose()
      core.geometry.dispose()
      ;(core.material as THREE.Material).dispose()
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mount} className="h-full w-full [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" aria-hidden />
}
