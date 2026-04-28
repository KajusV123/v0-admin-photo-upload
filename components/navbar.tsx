"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { smoothScrollTo, handleSmoothScroll, scrollToTop } from "@/lib/smooth-scroll"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Add background blur when scrolled
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`
              flex items-center gap-1 px-2 py-1.5 sm:py-2 rounded-full
              border border-white/10 backdrop-blur-xl
              transition-all duration-500 ease-out
              ${isScrolled 
                ? "bg-black/60 shadow-lg shadow-black/20" 
                : "bg-white/5"
              }
            `}
          >
            {/* Logo */}
            <button 
              type="button"
              onClick={() => scrollToTop({ duration: 1000 })}
              className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors hover:bg-white/10 cursor-pointer"
            >
              <Image
                src="/images/logo.png"
                alt="DEMO Studio"
                width={140}
                height={36}
                className="h-6 sm:h-8 w-auto"
              />
            </button>

            {/* Divider - hidden on mobile */}
            <div className="w-px h-6 bg-white/10 hidden sm:block" />

            {/* Nav Links - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-0.5">
              <NavLink href="#full-access">Prompts</NavLink>
              <NavLink href="#full-access">Pricing</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
            </div>

            {/* Divider - hidden on mobile */}
            <div className="w-px h-6 bg-white/10 hidden sm:block" />

            {/* CTA Button */}
            <motion.a
              href="#full-access"
              onClick={(e) => handleSmoothScroll(e, { duration: 1200, offset: 80 })}
              className="relative ml-1 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-black bg-white overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Access</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
              />
            </motion.a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={(e) => handleSmoothScroll(e, { duration: 1200, offset: 80 })}
      className="relative px-3 py-1.5 text-sm text-white/70 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10 group"
    >
      {children}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-4" />
    </a>
  )
}
