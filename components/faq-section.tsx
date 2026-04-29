"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "What exactly do I get when I purchase?",
    answer: "You get instant access to our full library of 500+ premium AI portrait prompts, organized by style and category. Each prompt includes detailed parameters, style modifiers, and tips for the best results across any AI image generator.",
  },
  {
    question: "Which AI tools work with these prompts?",
    answer: "Our prompts are optimized for all major AI image generators including Midjourney, DALL-E 3, Stable Diffusion, Leonardo AI, and more. We include format variations so you can use them anywhere.",
  },
  {
    question: "Are updates really free forever?",
    answer: "Yes. When you purchase, you get lifetime access to all current prompts plus every new prompt we add in the future. We drop fresh prompts weekly based on trending styles and techniques.",
  },
  {
    question: "Can I use these for commercial projects?",
    answer: "Absolutely. All prompts come with a full commercial license. Use them for client work, social media, marketing campaigns, or any project you want.",
  },
  {
    question: "What if the prompts don't work for me?",
    answer: "We offer a 30-day money-back guarantee. If you're not seeing the results you want, reach out and we'll make it right—no questions asked.",
  },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Velvet texture background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/velvet-texture.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/75 to-[#0a0a0a]/90" />
      
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(139,30,63,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139,30,63,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Common Questions
          </h2>
          <p className="mt-4 text-white/50">
            Everything you need to know before getting started
          </p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
              variants={itemVariants}
              layout
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <ChevronDown className="h-5 w-5 shrink-0 text-white/50" />
                </motion.div>
              </motion.button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <p className="px-6 pb-6 text-white/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
