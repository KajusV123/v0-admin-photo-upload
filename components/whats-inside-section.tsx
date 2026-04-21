"use client"

import { Check } from "lucide-react"

const features = [
  "500+ Curated, High-Converting AI Portrait Prompts",
  "Editorial, Lifestyle & Content Creator Styles",
  "Beauty, Fashion & Wellness Collections",
  "Works with Midjourney, DALL-E & All AI Generators",
  "Instant Access After Purchase",
  "Lifetime Updates with Weekly New Drops",
]

export function WhatsInsideSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Ambient glow effects */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #2a2a2a 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Header with decorative line */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-widest text-pink-400 border border-pink-500/30 rounded-full bg-pink-500/5">
            The Complete Package
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            What&apos;s Inside
          </h2>
        </div>

        {/* Feature list with styled container */}
        <div 
          className="relative rounded-3xl p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-8 w-16 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
          <div className="absolute top-0 left-8 w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="absolute bottom-0 right-8 w-16 h-[1px] bg-gradient-to-l from-white/15 to-transparent" />
          <div className="absolute bottom-0 right-8 w-[1px] h-16 bg-gradient-to-t from-white/15 to-transparent" />

          <ul className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-lg shadow-pink-500/20"
                  style={{
                    background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                  }}
                >
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </span>
                <span className="text-base text-white/70 group-hover:text-white/90 transition-colors leading-relaxed pt-0.5">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-12">
          <div className="h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
