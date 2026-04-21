"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ShowcaseSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      {/* Subtle top line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main image container */}
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="/images/prompt-bank-showcase.jpg"
              alt="Infinite Prompt Bank showcase - stylish black and white portraits"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
            
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
          </div>

          {/* Caption below image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-white/40 text-sm tracking-widest uppercase">
              Crafted prompts for every style
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle bottom line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        }}
      />
    </section>
  )
}
