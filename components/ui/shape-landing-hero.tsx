"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react"
import { LiquidButton } from "./liquid-glass-button"
import Link from "next/link"

interface HeroGeometricProps {
  badge?: string
  title1?: string
  title2?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

export function HeroGeometric({
  badge = "Next-Gen Platform",
  title1 = "Build Something",
  title2 = "Extraordinary",
  primaryCTA = { text: "Get Started", href: "#" },
  secondaryCTA = { text: "Learn More", href: "#" }
}: HeroGeometricProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />

      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl border border-white/20 mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span>{badge}</span>
            <Star className="h-4 w-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-4"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title1}
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8"
          >
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {title2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg text-gray-300 mb-12"
          >
            Revolutionizing the way businesses connect with their customers through cutting-edge AI solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={primaryCTA.href}>
              <LiquidButton size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                {primaryCTA.text}
              </LiquidButton>
            </Link>

            <Link href={secondaryCTA.href}>
              <LiquidButton size="lg" variant="outline" className="gap-2">
                {secondaryCTA.text}
                <ArrowRight className="h-5 w-5" />
              </LiquidButton>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { label: "Active Users", value: "10K+" },
            { label: "Projects", value: "500+" },
            { label: "Success Rate", value: "99%" },
            { label: "Awards", value: "15+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10"
            >
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}