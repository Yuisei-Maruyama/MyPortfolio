import { ParallaxProvider } from 'react-scroll-parallax'
import { ScrollAnimationsArea } from '@/components'

const ScrollAnimations = () => {
  return (
    <ParallaxProvider>
      <ScrollAnimationsArea></ScrollAnimationsArea>
    </ParallaxProvider>
  )
}

export default ScrollAnimations
