"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, Lock, Unlock, ChevronDown, ChevronUp } from "lucide-react"

// ========================================
// ACCESS CODE - Change this value anytime
// ========================================
const ACCESS_CODE = "1234"
// ========================================

// Prompt bank data - organized by category
const promptBank = [
  {
    category: "Professional Headshots",
    prompts: [
      {
        title: "Executive Portrait",
        prompt: "Professional executive portrait, wearing a tailored navy blue suit with white shirt, neutral gray studio background, soft directional lighting from the left, confident yet approachable expression, sharp focus on eyes, shallow depth of field, corporate photography style, 8K resolution",
      },
      {
        title: "Creative Professional",
        prompt: "Modern creative professional portrait, casual smart attire, minimalist white background, natural soft lighting, genuine smile, contemporary business headshot style, clean and polished look, high-end photography",
      },
      {
        title: "Entrepreneur Vibe",
        prompt: "Dynamic entrepreneur portrait, smart casual outfit, urban office background with bokeh, golden hour lighting through window, determined expression, lifestyle business photography, authentic and relatable",
      },
    ],
  },
  {
    category: "Artistic & Editorial",
    prompts: [
      {
        title: "High Fashion Editorial",
        prompt: "High fashion editorial portrait, dramatic studio lighting with strong shadows, avant-garde styling, intense gaze, Vogue magazine aesthetic, striking composition, professional fashion photography, artistic and bold",
      },
      {
        title: "Cinematic Portrait",
        prompt: "Cinematic portrait with dramatic chiaroscuro lighting, film noir aesthetic, moody atmosphere, deep shadows and highlights, movie poster quality, emotional depth, 35mm film look, grain texture",
      },
      {
        title: "Fine Art Portrait",
        prompt: "Fine art portrait inspired by Renaissance paintings, soft diffused natural light, classical composition, timeless elegance, painterly quality, museum-worthy aesthetic, rich warm tones",
      },
    ],
  },
  {
    category: "Lifestyle & Casual",
    prompts: [
      {
        title: "Golden Hour Magic",
        prompt: "Natural golden hour portrait outdoors, warm sunset backlight creating rim lighting, relaxed authentic expression, shallow depth of field with bokeh background, lifestyle photography, warm color palette",
      },
      {
        title: "Cozy Indoor Vibes",
        prompt: "Cozy indoor lifestyle portrait, soft window light, comfortable home setting, genuine candid moment, warm neutral tones, hygge aesthetic, intimate and inviting atmosphere",
      },
      {
        title: "Urban Street Style",
        prompt: "Urban street style portrait, modern cityscape background, trendy casual outfit, natural street photography look, authentic urban aesthetic, contemporary and edgy",
      },
    ],
  },
  {
    category: "Fantasy & Creative",
    prompts: [
      {
        title: "Ethereal Dream",
        prompt: "Ethereal fantasy portrait, soft dreamy lighting, flowing fabrics, magical atmosphere with subtle sparkles, pastel color palette, otherworldly beauty, fairy tale aesthetic, surreal and enchanting",
      },
      {
        title: "Cyberpunk Future",
        prompt: "Futuristic cyberpunk portrait, neon lighting in pink and blue, high-tech urban background, edgy modern styling, sci-fi aesthetic, dramatic contrast, blade runner inspired",
      },
      {
        title: "Vintage Glamour",
        prompt: "Old Hollywood glamour portrait, black and white with high contrast, elegant vintage styling, classic Hollywood lighting, timeless beauty, 1940s aesthetic, sophisticated and alluring",
      },
    ],
  },
]

function PromptCard({ title, prompt }: { title: string; prompt: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-medium text-white">{title}</h4>
        <button
          onClick={copyToClipboard}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70 transition-all hover:bg-white/20 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="mt-3">
        <p className={`text-sm text-white/50 ${expanded ? "" : "line-clamp-2"}`}>
          {prompt}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-xs text-white/40 hover:text-white/60"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Show more
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

function PromptBankContent() {
  const [activeCategory, setActiveCategory] = useState(promptBank[0].category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      {/* Success message */}
      <div className="mb-12 flex items-center justify-center gap-2 text-green-400">
        <Unlock className="h-5 w-5" />
        <span className="text-sm font-medium">Full Access Unlocked</span>
      </div>

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {promptBank.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === cat.category
                ? "bg-white text-black"
                : "border border-white/20 text-white/70 hover:border-white/40 hover:text-white"
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Prompts grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {promptBank
            .find((cat) => cat.category === activeCategory)
            ?.prompts.map((p, i) => (
              <PromptCard key={i} title={p.title} prompt={p.prompt} />
            ))}
        </motion.div>
      </AnimatePresence>

      {/* Stats */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
        <div>
          <p className="text-3xl font-bold text-white">{promptBank.length}</p>
          <p className="text-sm text-white/50">Categories</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">
            {promptBank.reduce((acc, cat) => acc + cat.prompts.length, 0)}
          </p>
          <p className="text-sm text-white/50">Premium Prompts</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">Unlimited</p>
          <p className="text-sm text-white/50">Access</p>
        </div>
      </div>
    </motion.div>
  )
}

export function AccessSection() {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState("")

  // Check localStorage on mount
  useEffect(() => {
    const unlocked = localStorage.getItem("promptBankUnlocked")
    if (unlocked === "true") {
      setIsUnlocked(true)
    }
  }, [])

  const handleSubmit = () => {
    if (accessCode === ACCESS_CODE) {
      setIsUnlocked(true)
      setError("")
      localStorage.setItem("promptBankUnlocked", "true")
    } else {
      setError("Invalid access code. Please try again.")
      setAccessCode("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <section className="relative z-10 bg-[#0a0a0a] pt-48 pb-24">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,250,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,250,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {isUnlocked ? "Your Prompt Bank" : "Get Full Access"}
          </motion.h2>
          <motion.p 
            className="mx-auto mt-4 max-w-md text-white/60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          >
            {isUnlocked 
              ? "Copy any prompt below and use it to create stunning AI portraits."
              : "Unlock all premium prompts and start creating stunning AI portraits today."
            }
          </motion.p>
        </div>
        
        {!isUnlocked ? (
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
                className="flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lock className="h-4 w-4" />
                Access Code
              </motion.button>
            ) : (
              <motion.div 
                className="flex flex-col items-center gap-2 sm:flex-row"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter code"
                  className="rounded-full border border-white/20 bg-transparent px-6 py-4 text-base text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSubmit}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base font-medium text-white transition-all hover:bg-white hover:text-black"
                >
                  Submit
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <PromptBankContent />
        )}

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
