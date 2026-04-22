"use client"

import { Sparkles, Palette, Zap, Globe, Clock, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Sparkles,
    title: "500+ Premium Prompts",
    description: "Curated, high-converting AI portrait prompts ready to use",
  },
  {
    icon: Palette,
    title: "Multiple Style Categories",
    description: "Editorial, lifestyle, UGC & content creator aesthetics",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Start creating immediately after your purchase",
  },
  {
    icon: Globe,
    title: "Universal Compatibility",
    description: "Works with Midjourney, DALL-E & all AI generators",
  },
  {
    icon: Clock,
    title: "Beauty & Fashion Focus",
    description: "Specialized collections for wellness & beauty niches",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Updates",
    description: "Weekly new prompt drops at no extra cost",
  },
]

export function WhatsInsideSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-32 overflow-hidden">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Gradient accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(ellipse, #c9184a 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/60">
              Everything You Need
            </span>
          </motion.div>
          
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl mb-4">
            What&apos;s Inside
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Everything you need to create stunning AI portraits that convert
          </p>
        </motion.div>

        {/* Features grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isLarge = index === 0 || index === 3
            
            return (
              <motion.div
                key={index}
                className={`group relative p-8 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm overflow-hidden ${
                  isLarge ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.12)" }}
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(201,24,74,0.08) 0%, transparent 60%)",
                  }}
                />
                
                {/* Icon */}
                <motion.div 
                  className="relative mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-rose-50 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                  {feature.description}
                </p>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 right-4 w-8 h-[1px] bg-gradient-to-l from-rose-500/30 to-transparent" />
                  <div className="absolute top-4 right-4 w-[1px] h-8 bg-gradient-to-b from-rose-500/30 to-transparent" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom stats */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {[
            { value: "500+", label: "Prompts" },
            { value: "12", label: "Categories" },
            { value: "Weekly", label: "Updates" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
