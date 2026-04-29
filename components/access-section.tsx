"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Lock, X } from "lucide-react"
import { useRouter } from "next/navigation"

// ========================================
// ACCESS CODE - Change this value anytime
// ========================================
const ACCESS_CODE = "1234"
// ========================================

// Cookie utilities for persistent access
const COOKIE_NAME = "prompt_bank_access"
const COOKIE_EXPIRY_DAYS = 365 // Cookie lasts 1 year

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  // Use max-age for better browser compatibility along with expires
  const maxAge = days * 24 * 60 * 60
  const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; max-age=${maxAge}; path=/; SameSite=Lax`
  document.cookie = cookieString
}

export function AccessSection() {
  const router = useRouter()
  const [accessCode, setAccessCode] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showCodeModal, setShowCodeModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === ACCESS_CODE) {
      setError("")
      setShowCodeModal(false)
      setShowSuccess(true)
      // Set cookie that lasts 1 year so user doesn't need to enter code again
      setCookie(COOKIE_NAME, "unlocked", COOKIE_EXPIRY_DAYS)
      // Show congratulations for 2.5 seconds, then redirect to prompts page
      setTimeout(() => {
        router.push("/prompts")
      }, 2500)
    } else {
      setError("Invalid access code. Please try again.")
      setAccessCode("")
    }
  }

  return (
    <section id="full-access" className="relative z-10 bg-[#0a0a0a] pt-48 pb-24 overflow-hidden">
      {/* Velvet texture background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/velvet-texture.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 to-[#0a0a0a]/70" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            // Success State - Congratulations
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex min-h-[400px] flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8 rounded-full bg-gradient-to-br from-[#8B1E3F]/20 to-[#C44569]/20 p-8"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <Check className="h-16 w-16 text-green-400" />
                </motion.div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-white md:text-4xl"
              >
                Congratulations!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-4 text-lg text-white/60"
              >
                Access granted. Unlocking premium prompts...
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-[#8B1E3F]"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="h-2 w-2 rounded-full bg-[#8B1E3F]"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="h-2 w-2 rounded-full bg-[#8B1E3F]"
                />
              </motion.div>
            </motion.div>
          ) : (
            // Locked State - Access Code Entry
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              {/* Get Full Access Section */}
              <div className="mb-20">
                <h2 className="relative text-3xl font-bold italic text-white md:text-4xl">
                  <span className="relative inline-block">
                    <span className="absolute left-0 top-0 text-[#C44569] opacity-60" style={{ transform: 'translateX(-2px)' }}>Get Full Access</span>
                    <span className="absolute left-0 top-0 text-[#5C1028] opacity-60" style={{ transform: 'translateX(2px)' }}>Get Full Access</span>
                    <span className="relative text-white">Get Full Access</span>
                  </span>
                </h2>
                <p className="mt-4 text-sm text-white/50 md:text-base">
                  Unlock all premium prompts and start creating<br />
                  stunning AI portraits today.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full border border-[#8B1E3F]/60 bg-transparent px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_15px_rgba(139,30,63,0.4)] transition-all hover:shadow-[0_0_25px_rgba(139,30,63,0.6)] hover:bg-[#8B1E3F]/20"
                  >
                    Get Access $50
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCodeModal(true)}
                    className="rounded-full border border-[#C44569]/30 bg-transparent px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-[#C44569]/50"
                  >
                    Access Code
                  </motion.button>
                </div>
              </div>

              {/* Access Code Modal */}
              <AnimatePresence>
                {showCodeModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setShowCodeModal(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="relative w-full max-w-md rounded-3xl bg-[#141414] p-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setShowCodeModal(false)}
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6 rounded-full bg-white/5 p-4">
                          <Lock className="h-10 w-10 text-white/60" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white">Enter Access Code</h3>
                        <p className="mt-2 text-sm text-white/50">
                          Enter your code to unlock premium prompts
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 w-full">
                          <input
                            type="text"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter access code"
                            autoFocus
                            className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-center text-lg tracking-widest text-white placeholder:text-white/30 focus:border-[#8B1E3F]/50 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/20"
                          />
                          
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 text-sm text-red-400"
                            >
                              {error}
                            </motion.p>
                          )}

                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4 w-full rounded-full bg-white py-4 text-base font-semibold text-black transition-colors hover:bg-white/90"
                          >
                            Unlock Access
                          </motion.button>
                        </form>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
