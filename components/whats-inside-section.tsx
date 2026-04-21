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
    <section className="relative bg-[#0a0a0a] py-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,250,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,250,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            What&apos;s Inside
          </h2>
        </div>

        <ul className="mt-12 space-y-5">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-4"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, #f472b6 0%, #c084fc 100%)",
                }}
              >
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              <span className="text-lg text-white/80">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
