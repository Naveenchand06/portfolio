import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '@/lib/hooks'

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying float vNoise;
varying vec3 vPos;
${noiseGLSL}
void main(){
  float n = snoise(normal * 1.15 + uTime * 0.18);
  vNoise = n;
  vec3 displaced = position + normal * n * uAmp;
  vPos = displaced;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced,1.0);
}
`

const coreFragment = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform float uTime;
varying float vNoise;
varying vec3 vPos;
void main(){
  // ridge lines where the displacement peaks pick up the accent colour
  float ridge = smoothstep(0.15, 0.75, vNoise);
  vec3 col = mix(uBase, uAccent, ridge);

  // a slow vertical band sweeping the mesh, like a scan
  float sweep = smoothstep(0.0, 1.0, sin(vPos.y * 1.6 - uTime * 0.9) * 0.5 + 0.5);
  col += uAccent * sweep * 0.22;

  float alpha = 0.30 + ridge * 0.55;
  gl_FragColor = vec4(col, alpha);
}
`

/* ------------------------------------------------------------------ */
/* The displaced wireframe core                                        */
/* ------------------------------------------------------------------ */

function Core({ reduced }: { reduced: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const group = useRef<THREE.Group>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.34 },
      uBase: { value: new THREE.Color('#55707e') },
      uAccent: { value: new THREE.Color('#5ef0b4') },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (mat.current && !reduced) mat.current.uniforms.uTime.value += delta
    if (group.current) {
      group.current.rotation.y += delta * (reduced ? 0 : 0.09)
      // ease toward the pointer for a subtle parallax tilt
      const { x, y } = state.pointer
      group.current.rotation.x += (y * 0.22 - group.current.rotation.x) * 0.03
      group.current.position.x += (x * 0.28 - group.current.position.x) * 0.03
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.72, 12]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          wireframe
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* faint solid shell for depth */}
      <mesh scale={0.985}>
        <icosahedronGeometry args={[1.72, 6]} />
        <meshBasicMaterial color="#080b0d" transparent opacity={0.82} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Orbiting service nodes                                              */
/* ------------------------------------------------------------------ */

function OrbitRing({
  radius,
  count,
  tilt,
  speed,
  color,
  reduced,
}: {
  radius: number
  count: number
  tilt: [number, number, number]
  speed: number
  color: string
  reduced: boolean
}) {
  const group = useRef<THREE.Group>(null)

  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2
        return new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius)
      }),
    [count, radius],
  )

  const ringGeo = useMemo(() => {
    const pts = Array.from({ length: 129 }, (_, i) => {
      const a = (i / 128) * Math.PI * 2
      return new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius)
    })
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [radius])

  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.y += delta * speed
  })

  return (
    <group rotation={tilt}>
      <line>
        <primitive object={ringGeo} attach="geometry" />
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>
      <group ref={group}>
        {nodes.map((p, i) => (
          <mesh key={i} position={p}>
            <octahedronGeometry args={[0.055, 0]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Background particle field                                           */
/* ------------------------------------------------------------------ */

function Dust({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)

  const geo = useMemo(() => {
    const n = 420
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 3.1 + Math.random() * 3.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame((_, delta) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y -= delta * 0.02
      ref.current.rotation.x += delta * 0.006
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.02}
        color="#8fa3ad"
        transparent
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */

function Rig() {
  const { camera } = useThree()
  useFrame(() => {
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <group scale={0.95}>
      <Core reduced={reduced} />
      <OrbitRing radius={2.6} count={8} tilt={[0.42, 0, 0.22]} speed={0.16} color="#5ef0b4" reduced={reduced} />
      <OrbitRing radius={3.25} count={5} tilt={[-0.55, 0.3, -0.35]} speed={-0.11} color="#ff4a1c" reduced={reduced} />
      <OrbitRing radius={2.05} count={12} tilt={[1.15, 0, 0.6]} speed={0.23} color="#8fa3ad" reduced={reduced} />
      <Dust reduced={reduced} />
      <Rig />
    </group>
  )
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion()

  return (
    <Canvas
      camera={{ position: [0, 0.4, 9.0], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Scene reduced={reduced} />
      </Suspense>
    </Canvas>
  )
}
