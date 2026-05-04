"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  "500+ Curated, High-Converting AI Portrait Prompts",
  "Editorial, Lifestyle & Content Creator Styles",
  "Beauty, Fashion & Wellness Collections",
  "Works with Midjourney, DALL-E & All AI Generators",
  "Instant Access After Purchase",
  "Lifetime Updates with Weekly New Drops",
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export function WhatsInsideSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-16 md:py-28 overflow-hidden">
      {/* Velvet texture background */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url('/images/velvet-texture.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/70 to-[#0a0a0a]/85" />
      
      {/* Burgundy ambient glow effects */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #6B1B2D 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-6">
        {/* Header with decorative line */}
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <motion.span 
            className="inline-block px-3 md:px-4 py-1 md:py-1.5 mb-4 md:mb-6 text-[10px] md:text-xs font-medium uppercase tracking-widest text-white/70 border border-white/20 rounded-full bg-white/5"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            The Complete Package
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            What&apos;s Inside
          </h2>
        </motion.div>

        {/* Feature list with styled container */}
        <motion.div 
          className="relative rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >
          {/* Decorative corner accents - hidden on small mobile */}
          <motion.div 
            className="absolute top-0 left-8 w-16 h-[1px] bg-gradient-to-r from-white/20 to-transparent hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ originX: 0 }}
          />
          <motion.div 
            className="absolute top-0 left-8 w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ originY: 0 }}
          />
          <motion.div 
            className="absolute bottom-0 right-8 w-16 h-[1px] bg-gradient-to-l from-white/15 to-transparent hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ originX: 1 }}
          />
          <motion.div 
            className="absolute bottom-0 right-8 w-[1px] h-16 bg-gradient-to-t from-white/15 to-transparent hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ originY: 1 }}
          />

          <motion.ul 
            className="grid gap-4 md:gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <motion.span
                  className="flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-lg shadow-lg shadow-[#9E3248]/25"
                  style={{
                    background: "linear-gradient(135deg, #7D2235 0%, #6B1B2D 100%)",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" strokeWidth={3} />
                </motion.span>
                <span className="text-sm md:text-base text-white/70 group-hover:text-white/90 transition-colors leading-relaxed pt-0.5">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Bottom accent */}
        <motion.div 
          className="flex justify-center mt-8 md:mt-12"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
