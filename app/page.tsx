import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { TwitterFeed } from '@/components/site/twitter-feed'
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-screen">
      <WebGLShader/>

      {/* Hero Section */}
      <div className="relative w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="border border-[#27272a] p-2 w-full mx-auto max-w-3xl mb-16">
            <main className="relative border border-[#27272a] py-10 overflow-hidden">
              <h1 className="mb-3 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
                Design is Everything
              </h1>
              <p className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg">
                Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
              </p>
              <div className="my-8 flex items-center justify-center gap-1">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <p className="text-xs text-green-500">Available for New Projects</p>
              </div>

              <div className="flex justify-center gap-4">
                <Link href="/contact">
                  <LiquidButton className="text-white border rounded-full" size={'xl'}>
                    Let's Go
                  </LiquidButton>
                </Link>
                <Link href="/services">
                  <LiquidButton variant="outline" className="text-white border rounded-full" size={'xl'}>
                    View Services
                    <ArrowRight className="h-5 w-5" />
                  </LiquidButton>
                </Link>
              </div>
            </main>
          </div>

          {/* Latest Tweets Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Latest Updates
              </span>
            </h2>
            <TwitterFeed limit={4} />
            <div className="text-center mt-6">
              <Link href="/blog" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2">
                View all posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-2 text-blue-400">AI-Powered</h3>
              <p className="text-gray-400">
                Cutting-edge AI solutions for hospitality and home decor industries.
              </p>
            </div>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-2 text-purple-400">Seamless Integration</h3>
              <p className="text-gray-400">
                Easy integration with Shopify, WooCommerce, and custom platforms.
              </p>
            </div>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-2 text-pink-400">Proven Results</h3>
              <p className="text-gray-400">
                Increase conversions by up to 35% with our intelligent solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}