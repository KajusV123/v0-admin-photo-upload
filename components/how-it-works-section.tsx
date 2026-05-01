"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Pick Your Style",
    description: "Browse our curated collection and find prompts that match the exact aesthetic you want to create.",
  },
  {
    number: "02", 
    title: "Copy & Customize",
    description: "Grab the prompt and tweak any details—swap colors, adjust lighting, or add your own creative spin.",
  },
  {
    number: "03",
    title: "Generate & Refine",
    description: "Paste into your favorite AI tool and watch the magic happen. Iterate until it's perfect.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export function HowItWorksSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Velvet texture background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url('/images/velvet-texture.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />
      
      {/* Burgundy gradient accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(158,50,72,0.5) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Script heading with underline - Stan Store style */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <h2 className="font-[family-name:var(--font-corinthia)] text-5xl md:text-7xl text-white tracking-wide">
            How It Works:
          </h2>
          {/* Decorative underline */}
          <motion.div 
            className="mx-auto mt-3 h-[2px] w-32 bg-[#9E3248]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <p className="mt-6 text-white/50">
            From prompt to portrait in minutes
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
            >
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="absolute top-12 left-[calc(50%+60px)] hidden h-px w-[calc(100%-60px)] bg-gradient-to-r from-white/20 to-transparent md:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                  style={{ originX: 0 }}
                />
              )}
              
              <motion.div 
                className="relative rounded-3xl p-8 text-center transition-all duration-500"
                whileHover={{ 
                  backgroundColor: "rgba(255,255,255,0.02)",
                  y: -5,
                }}
              >
                {/* Large number background */}
                <div className="relative mb-6 inline-flex">
                  <motion.span 
                    className="text-8xl font-bold tracking-tighter"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {step.number}
                  </motion.span>
                  {/* Glow on hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
