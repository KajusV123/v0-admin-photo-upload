"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, Lock, Unlock, X } from "lucide-react"
import Image from "next/image"

// ========================================
// ACCESS CODE - Change this value anytime
// ========================================
const ACCESS_CODE = "1234"
// ========================================

// Categories for filtering
const categories = ["All", "Podcast", "Lifestyle", "Beauty", "Fashion", "Fitness", "Portrait"]

// Prompt gallery data - each item has an image and its prompt
const promptGallery = [
  {
    id: 1,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop",
    title: "Glowing Skin Close-up",
    prompt: "Professional beauty portrait, extreme close-up shot, glowing dewy skin, natural makeup look, soft diffused studio lighting, clean minimal background, beauty campaign aesthetic, sharp focus on facial features, high-end skincare advertisement style, 8K resolution, subtle highlight on cheekbones",
  },
  {
    id: 2,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    title: "Editorial Studio Shot",
    prompt: "High fashion editorial portrait, sleek straight hair, navy blue crop top, professional studio setup, dramatic side lighting, confident powerful pose, Vogue magazine aesthetic, clean gray background, fashion photography, intense eye contact with camera",
  },
  {
    id: 3,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    title: "Casual Behind the Scenes",
    prompt: "Candid behind the scenes portrait, casual gray t-shirt, hair in messy clips, playful tongue out expression, natural relaxed pose, wardrobe rack in background, authentic lifestyle moment, soft natural lighting, relatable influencer aesthetic",
  },
  {
    id: 4,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    title: "Makeup Application",
    prompt: "Beauty tutorial style portrait, applying lip gloss with applicator, glowing sun-kissed skin, professional makeup look, natural window lighting from side, clean minimal background, beauty content creator aesthetic, focus on lips and product",
  },
  {
    id: 5,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    title: "Studio Interview",
    prompt: "Professional podcast setup portrait, subject looking at camera monitor, interview lighting with soft key light, studio environment with equipment visible, elegant wavy hair, black fitted top, professional yet approachable expression, content creator aesthetic",
  },
  {
    id: 6,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
    title: "Glamour Mirror Shot",
    prompt: "Old Hollywood glamour portrait, auburn bangs hairstyle, elegant diamond necklace, holding compact mirror, warm golden lighting, luxurious setting, classic beauty pose, vintage glamour aesthetic, soft focus background, timeless elegance",
  },
  {
    id: 7,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop",
    title: "Natural Glow Makeup",
    prompt: "Professional makeup portrait, applying foundation with brush, high messy bun hairstyle, dewy glowing skin, natural beauty look, soft studio lighting, beauty tutorial thumbnail style, clean white background, skincare advertisement quality",
  },
  {
    id: 8,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    title: "Hair Rollers Glam",
    prompt: "Behind the scenes glamour shot, pink velcro hair rollers in styled updo, dramatic smokey eye makeup, hands framing face elegantly, soft beauty lighting with ring light reflection in eyes, getting ready aesthetic, beauty preparation moment",
  },
  {
    id: 9,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1526510747491-312a5e5cc51c?w=400&h=500&fit=crop",
    title: "Athletic Portrait",
    prompt: "Fitness lifestyle portrait, athletic wear, toned physique, natural confident expression, gym or outdoor setting, motivational aesthetic, strong lighting emphasizing muscle definition, wellness brand style, empowering pose",
  },
  {
    id: 10,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    title: "Contour Tutorial",
    prompt: "Makeup contouring tutorial portrait, applying contour with brush to cheekbone, professional beauty look, clean elegant updo hairstyle, extreme focus on technique, beauty education content, high-end cosmetics advertisement, soft studio lighting",
  },
  {
    id: 11,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
    title: "Coffee Shop Casual",
    prompt: "Casual lifestyle portrait, cozy coffee shop setting, natural window light, relaxed genuine smile, everyday fashion, warm color tones, authentic influencer aesthetic, candid moment captured, inviting atmosphere",
  },
  {
    id: 12,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    title: "High Fashion Editorial",
    prompt: "High fashion runway portrait, avant-garde styling, dramatic studio lighting, bold confident pose, designer clothing, editorial magazine quality, striking composition, powerful feminine energy, luxury fashion brand aesthetic",
  },
]

function PromptModal({ 
  item, 
  onClose 
}: { 
  item: typeof promptGallery[0]
  onClose: () => void 
}) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#141414] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
              {item.category}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
          
          {/* Prompt box */}
          <div className="mt-4 rounded-xl bg-white/5 p-4">
            <p className="text-sm leading-relaxed text-white/70">{item.prompt}</p>
          </div>

          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-base font-medium text-black transition-all hover:bg-white/90"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Copied to Clipboard
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PromptGalleryContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<typeof promptGallery[0] | null>(null)

  const filteredItems = activeCategory === "All" 
    ? promptGallery 
    : promptGallery.filter(item => item.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      {/* Success message */}
      <div className="mb-8 flex items-center justify-center gap-2 text-green-400">
        <Unlock className="h-5 w-5" />
        <span className="text-sm font-medium">Full Access Unlocked</span>
      </div>

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-purple-500 text-white"
                : "border border-white/20 text-white/70 hover:border-white/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4"
        >
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-4">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/60">{item.category}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Stats */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
        <div>
          <p className="text-3xl font-bold text-white">{categories.length - 1}</p>
          <p className="text-sm text-white/50">Categories</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">{promptGallery.length}</p>
          <p className="text-sm text-white/50">Premium Prompts</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">Unlimited</p>
          <p className="text-sm text-white/50">Access</p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <PromptModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
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
            {isUnlocked ? "Prompt Gallery" : "Get Full Access"}
          </motion.h2>
          <motion.p 
            className="mx-auto mt-4 max-w-md text-white/60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          >
            {isUnlocked 
              ? "Click any image to see the exact prompt used to create it."
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
          <PromptGalleryContent />
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
