"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ShowcaseSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 overflow-hidden">
      {/* Top gradient line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
        >
          {/* Image container with aspect ratio */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src="/images/prompt-bank-showcase.jpg"
              alt="Infinite Prompt Bank - Expressive portrait styles"
              fill
              className="object-cover object-center"
              priority
            />
            
            {/* Subtle vignette overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.4) 100%)",
              }}
            />
          </div>

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
        </motion.div>

        {/* Caption */}
        <motion.p
          className="mt-6 text-center text-white/40 text-sm tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Expressive prompts for bold, editorial-style portraits
        </motion.p>
      </div>
    </section>
  )
}
