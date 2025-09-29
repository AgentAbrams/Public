"use client"

import { useState } from "react"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://formspree.io/f/xanpevwy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setStatus("success")
        e.currentTarget.reset()
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <>
      <WebGLShader />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to transform your business with AI? Let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-4">Why Choose GoodQuestion.AI?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span>Industry-specific expertise in hospitality & home decor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span>Seamless integration with existing platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span>Scalable solutions that grow with your business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <span>Proven track record of increasing conversions</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-4">What Happens Next?</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>We'll review your inquiry within 24 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Schedule a consultation to discuss your needs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Receive a customized proposal and timeline</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 rounded-xl p-4">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thank you! We'll be in touch soon.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 rounded-xl p-4">
                    <AlertCircle className="h-5 w-5" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <LiquidButton
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </LiquidButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}