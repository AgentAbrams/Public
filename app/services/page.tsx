import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Link from "next/link"
import { CheckCircle, Palette, Tag, Search, Bot, ShoppingBag, Workflow, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <>
      <WebGLShader />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Development for the Home Decor Industry
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your home decor business with cutting-edge AI solutions. From intelligent product tagging to visual search,
              we help you deliver exceptional customer experiences while streamlining operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 transition-all">
              <Palette className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Color Extraction & Analysis</h3>
              <p className="text-gray-400 mb-6">
                Our advanced AI algorithms extract dominant colors, create palettes, and analyze color trends from product images.
                Perfect for matching complementary products and creating cohesive collections.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Dominant color detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Palette generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Color trend analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Mood-based recommendations</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 transition-all">
              <Tag className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Intelligent Product Tagging</h3>
              <p className="text-gray-400 mb-6">
                Automatically tag products with relevant attributes, styles, materials, and categories. Improve searchability
                and help customers find exactly what they're looking for.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Auto-categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Style detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Material identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Dimension extraction</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 transition-all">
              <Search className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Visual Search Engine</h3>
              <p className="text-gray-400 mb-6">
                Let customers find products by uploading images. Our AI matches visual characteristics to find similar
                items in your catalog, dramatically improving product discovery.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Image-based search</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Similar product matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Style compatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Cross-category discovery</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 transition-all">
              <Bot className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">AI-Generated Descriptions</h3>
              <p className="text-gray-400 mb-6">
                Create compelling, SEO-optimized product descriptions that highlight key features and benefits.
                Save time while maintaining consistent brand voice across your entire catalog.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">SEO optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Brand voice consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Multi-language support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Feature highlighting</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-12 border border-white/10 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Platform Integration</h2>
                <p className="text-gray-400 mb-6">
                  Our solutions seamlessly integrate with your existing e-commerce infrastructure.
                  Whether you're using Shopify, WooCommerce, or a custom platform, we've got you covered.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <ShoppingBag className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Shopify</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <ShoppingBag className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">WooCommerce</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <Workflow className="h-4 w-4 text-pink-400" />
                    <span className="text-sm">n8n Workflows</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Hospitality Focus</h3>
                <p className="text-gray-400 mb-4">
                  Beyond home decor, we specialize in hospitality solutions for hotels, restaurants, and event venues.
                  Our AI tools help create memorable guest experiences through intelligent design and personalization.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Room ambiance optimization</li>
                  <li>• Guest preference learning</li>
                  <li>• Inventory management</li>
                  <li>• Design consultation AI</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can help you deliver exceptional customer experiences
              and drive growth in the competitive home decor market.
            </p>
            <Link href="/contact">
              <LiquidButton size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </LiquidButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}