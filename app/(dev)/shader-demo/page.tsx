import { WebGLShader } from "@/components/ui/web-gl-shader"

export default function ShaderDemoPage() {
  return (
    <>
      <WebGLShader />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              WebGL Shader Demo
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Background shader effect demonstration
          </p>
        </div>
      </div>
    </>
  )
}