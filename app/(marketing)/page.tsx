import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { TwitterFeed } from "@/components/site/twitter-feed"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Link from "next/link"
import { ArrowRight, Palette, Tag, Search, Bot } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <WebGLShader />
      <HeroGeometric
        badge="GoodQuestion.AI"
        title1="AI for Hospitality"
        title2="& Home Decor"
        primaryCTA={{ text: "Get Started", href: "/contact" }}
        secondaryCTA={{ text: "Our Services", href: "/services" }}
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ship Beautiful Tools Faster
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We build intelligent AI solutions that transform how businesses operate in the hospitality and home decor industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <Palette className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Color Extraction</h3>
              <p className="text-gray-400">Advanced AI algorithms to extract and analyze color palettes from any product image.</p>
            </div>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <Tag className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Product Tagging</h3>
              <p className="text-gray-400">Intelligent auto-tagging system for inventory management and searchability.</p>
            </div>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <Search className="h-10 w-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visual Search</h3>
              <p className="text-gray-400">Let customers find products using images instead of keywords.</p>
            </div>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
              <Bot className="h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Descriptions</h3>
              <p className="text-gray-400">Generate compelling product descriptions that convert visitors to customers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-4">Seamless Integration</h3>
              <p className="text-gray-400 mb-6">
                Our solutions integrate perfectly with Shopify, WooCommerce, and custom e-commerce platforms.
                Built with n8n workflows and modern APIs for maximum flexibility.
              </p>
              <Link href="/services">
                <LiquidButton variant="outline" className="gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </LiquidButton>
              </Link>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time processing</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">GDPR compliant</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">24/7 support</span>
                </div>
              </div>
            </div>
          </div>

          <TwitterFeed />
        </div>
      </section>
    </>
  )
}