import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Center } from '@react-three/drei'

const CodeSymbol3D = () => {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <Center>
      <Text
        ref={meshRef}
        fontSize={2}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        {'</>'}
      </Text>
    </Center>
  )
}

export default CodeSymbol3D

