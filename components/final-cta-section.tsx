"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function FinalCtaSection() {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [accessCode, setAccessCode] = useState("")

  return (
    <section className="relative bg-[#0a0a0a] py-32 overflow-hidden">
      {/* Velvet texture background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/images/velvet-texture.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/60 to-[#0a0a0a]/90" />
      
      {/* Animated burgundy gradient orbs */}
      <motion.div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-40 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #5C1028 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #3D0F1E 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <Image
            src="/images/logo.png"
            alt="DEMO Studio"
            width={320}
            height={90}
            className="h-24 md:h-32 w-auto"
          />
        </motion.div>

        {/* Main heading */}
        <motion.h2 
          className="text-4xl font-bold tracking-tight text-white md:text-6xl leading-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          Ready to Create
          <motion.span 
            className="block mt-2 text-white/70"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.15 }}
          >
            Stunning Portraits?
          </motion.span>
        </motion.h2>
        
        <motion.p 
          className="mx-auto mt-6 max-w-lg text-lg text-white/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >
          Join thousands of creators using our prompts to generate jaw-dropping AI portraits every day.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
        >
          <motion.div
            className="group inline-block rounded-full p-[2px] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #C44569 0%, #8B1E3F 25%, #C44569 50%, #8B1E3F 75%, #C44569 100%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <button className="flex items-center gap-3 rounded-full bg-[#0a0a0a] px-10 py-5 text-lg font-medium text-white transition-all hover:bg-white hover:text-black">
              <span>Get Instant Access</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>

        {/* Access code */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {!showCodeInput ? (
            <motion.button
              onClick={() => setShowCodeInput(true)}
              className="text-sm text-white/40 hover:text-white/60 transition-colors underline underline-offset-4"
              whileHover={{ scale: 1.05 }}
            >
              Have an access code?
            </motion.button>
          ) : (
            <motion.div 
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter code"
                className="rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <motion.button 
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Trust badges */}
        <motion.div 
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {["Instant Download", "Lifetime Updates", "30-Day Guarantee"].map((badge, index) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(139,30,63,0.4) 50%, transparent 100%)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </section>
  )
}
