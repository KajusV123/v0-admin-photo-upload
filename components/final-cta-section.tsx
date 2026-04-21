"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function FinalCtaSection() {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [accessCode, setAccessCode] = useState("")

  return (
    <section className="relative bg-[#0a0a0a] py-32 overflow-hidden">
      {/* Gradient orbs */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Main heading */}
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl leading-tight">
          Ready to Create
          <span 
            className="block mt-2"
            style={{
              background: "linear-gradient(135deg, #f8b4d9 0%, #c084fc 50%, #f8b4d9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stunning Portraits?
          </span>
        </h2>
        
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/50">
          Join thousands of creators using our prompts to generate jaw-dropping AI portraits every day.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div
            className="group inline-block rounded-full p-[2px] transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f8b4d9 0%, #c084fc 25%, #f8b4d9 50%, #c084fc 75%, #f8b4d9 100%)",
            }}
          >
            <button className="flex items-center gap-3 rounded-full bg-[#0a0a0a] px-10 py-5 text-lg font-medium text-white transition-all hover:bg-white hover:text-black">
              <span>Get Instant Access</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Access code */}
        <div className="mt-8">
          {!showCodeInput ? (
            <button
              onClick={() => setShowCodeInput(true)}
              className="text-sm text-white/40 hover:text-white/60 transition-colors underline underline-offset-4"
            >
              Have an access code?
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter code"
                className="rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <button className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black">
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/30">
          <span>Instant Download</span>
          <span className="hidden sm:block">•</span>
          <span>Lifetime Updates</span>
          <span className="hidden sm:block">•</span>
          <span>30-Day Guarantee</span>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(236,72,153,0.3) 50%, transparent 100%)",
        }}
      />
    </section>
  )
}
