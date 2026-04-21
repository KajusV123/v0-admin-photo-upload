"use client"

import { useState } from "react"

export function AccessSection() {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [accessCode, setAccessCode] = useState("")

  return (
    <section className="relative bg-[#0a0a0a] pt-48 pb-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,250,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,250,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Get Full Access
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Unlock all premium prompts and start creating stunning AI portraits today.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Get Access Button */}
          <div
            className="inline-block rounded-full p-[2px]"
            style={{
              background: "linear-gradient(135deg, #f8b4d9 0%, #c084fc 25%, #f8b4d9 50%, #c084fc 75%, #f8b4d9 100%)",
            }}
          >
            <button className="flex items-center gap-2 rounded-full bg-[#0a0a0a] px-8 py-4 text-base font-medium text-white transition-all hover:bg-white hover:text-black">
              <span>Get Access</span>
              <span className="text-white/60 group-hover:text-black/60">$50</span>
            </button>
          </div>

          {/* Access Code Button */}
          {!showCodeInput ? (
            <button
              onClick={() => setShowCodeInput(true)}
              className="rounded-full border border-white/20 bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              Access Code
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter code"
                className="rounded-full border border-white/20 bg-transparent px-6 py-4 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <button
                className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base font-medium text-white transition-all hover:bg-white hover:text-black"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
