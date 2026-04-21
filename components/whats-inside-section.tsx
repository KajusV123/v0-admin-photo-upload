"use client"

import { Sparkles, Camera, Palette, Wand2, Zap, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "500+ Curated AI Portrait Prompts",
    description: "Every prompt rigorously tested across multiple AI generators for consistent, stunning results.",
  },
  {
    icon: Camera,
    title: "Studio, Lifestyle & Social Media Styles",
    description: "From polished headshots to candid influencer vibes and cinematic editorial looks.",
  },
  {
    icon: Palette,
    title: "Wellness, Style & Glamour Collections",
    description: "Dedicated prompt sets for fitness, fashion, beauty, and luxury aesthetics.",
  },
  {
    icon: Wand2,
    title: "Universal Compatibility",
    description: "Optimized for Midjourney, DALL-E, Stable Diffusion, and all major AI platforms.",
  },
  {
    icon: Zap,
    title: "Immediate Download Access",
    description: "Start creating within seconds of purchase. No waiting, no approval process.",
  },
  {
    icon: RefreshCw,
    title: "Forever Free Updates",
    description: "New prompt drops added weekly. Your library grows automatically, forever.",
  },
]

export function WhatsInsideSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,250,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,250,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            What&apos;s Inside
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Everything you need to create scroll-stopping AI portraits that stand out.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(248, 180, 217, 0.15) 0%, rgba(192, 132, 252, 0.15) 100%)",
                }}
              >
                <feature.icon className="h-6 w-6 text-pink-300" />
              </div>
              <h3 className="text-lg font-medium text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
