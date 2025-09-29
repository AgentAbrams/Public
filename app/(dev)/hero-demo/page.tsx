import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { WebGLShader } from "@/components/ui/web-gl-shader"

export default function HeroDemoPage() {
  return (
    <>
      <WebGLShader />
      <HeroGeometric
        badge="Demo Badge"
        title1="Hero Demo"
        title2="Component Test"
        primaryCTA={{ text: "Primary Action", href: "#" }}
        secondaryCTA={{ text: "Secondary Action", href: "#" }}
      />
    </>
  )
}