"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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
        <motion.h2 
          className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          Get Full Access
        </motion.h2>
        <motion.p 
          className="mx-auto mt-4 max-w-md text-white/60"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
        >
          Unlock all premium prompts and start creating stunning AI portraits today.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >
          {/* Get Access Button */}
          <motion.div
            className="inline-block rounded-full p-[2px]"
            style={{
              background: "linear-gradient(135deg, #f8b4d9 0%, #c084fc 25%, #f8b4d9 50%, #c084fc 75%, #f8b4d9 100%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="flex items-center gap-2 rounded-full bg-[#0a0a0a] px-8 py-4 text-base font-medium text-white transition-all hover:bg-white hover:text-black">
              <span>Get Access</span>
              <span className="text-white/60 group-hover:text-black/60">$50</span>
            </button>
          </motion.div>

          {/* Access Code Button */}
          {!showCodeInput ? (
            <motion.button
              onClick={() => setShowCodeInput(true)}
              className="rounded-full border border-white/20 bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Access Code
            </motion.button>
          ) : (
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
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
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
