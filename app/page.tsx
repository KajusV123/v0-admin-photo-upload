"use client"

import type React from "react"

import Image from "next/image"
import { useState, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import VariableProximity from "@/components/variable-proximity"
import { AccessSection } from "@/components/access-section"
import { InfiniteCarousel } from "@/components/infinite-carousel"
import { WhatsInsideSection } from "@/components/whats-inside-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FaqSection } from "@/components/faq-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { ShowcaseSection } from "@/components/showcase-section"
import { smoothScrollTo } from "@/lib/smooth-scroll"
import { Navbar } from "@/components/navbar"

const initialImages = [
  // Top left area
  {
    src: "/portrait-1.jpg",
    alt: "Fashion editorial portrait",
    top: 3,
    left: -2,
    rotate: -12,
    width: 220,
    height: 280,
    mobileTop: 2,
    mobileLeft: -15,
    mobileWidth: 100,
    mobileHeight: 130,
  },
  {
    src: "/portrait-2.jpg",
    alt: "Dreamy ethereal portrait",
    top: 5,
    left: 16,
    rotate: 5,
    width: 180,
    height: 240,
    mobileTop: 5,
    mobileLeft: 15,
    mobileWidth: 85,
    mobileHeight: 110,
  },
  {
    src: "/portrait-3.jpg",
    alt: "High fashion portrait",
    top: -3,
    left: 32,
    rotate: -3,
    width: 200,
    height: 260,
    mobileTop: -2,
    mobileLeft: 75,
    mobileWidth: 90,
    mobileHeight: 120,
  },
  // Top right area
  {
    src: "/portrait-4.jpg",
    alt: "Natural light portrait",
    top: 2,
    left: 52,
    rotate: 8,
    width: 200,
    height: 250,
    mobileTop: 15,
    mobileLeft: -10,
    mobileWidth: 80,
    mobileHeight: 105,
  },
  {
    src: "/portrait-5.jpg",
    alt: "Artistic floral portrait",
    top: 5,
    left: 72,
    rotate: -5,
    width: 180,
    height: 230,
    mobileTop: 18,
    mobileLeft: 80,
    mobileWidth: 85,
    mobileHeight: 110,
  },
  {
    src: "/portrait-6.jpg",
    alt: "Beauty photography",
    top: 0,
    left: 88,
    rotate: 12,
    width: 180,
    height: 240,
    mobileTop: 68,
    mobileLeft: -12,
    mobileWidth: 90,
    mobileHeight: 115,
  },
  // Left side middle
  {
    src: "/portrait-7.jpg",
    alt: "Golden hour portrait",
    top: 32,
    left: -5,
    rotate: 6,
    width: 200,
    height: 260,
    mobileTop: 70,
    mobileLeft: 78,
    mobileWidth: 95,
    mobileHeight: 125,
  },
  {
    src: "/portrait-8.jpg",
    alt: "Cinematic portrait",
    top: 45,
    left: 10,
    rotate: -8,
    width: 160,
    height: 210,
    mobileTop: 75,
    mobileLeft: 20,
    mobileWidth: 75,
    mobileHeight: 100,
  },
  // Right side middle
  {
    src: "/portrait-9.jpg",
    alt: "Fresh natural beauty",
    top: 28,
    left: 82,
    rotate: -6,
    width: 180,
    height: 230,
    mobileTop: 78,
    mobileLeft: 55,
    mobileWidth: 80,
    mobileHeight: 105,
  },
  {
    src: "/portrait-10.jpg",
    alt: "Hollywood glamour",
    top: 48,
    left: 85,
    rotate: 10,
    width: 190,
    height: 250,
    mobileTop: 85,
    mobileLeft: -5,
    mobileWidth: 85,
    mobileHeight: 110,
  },
  // Bottom left area - hide some on mobile for cleaner look
  {
    src: "/portrait-11.jpg",
    alt: "Bohemian style portrait",
    top: 68,
    left: -3,
    rotate: -4,
    width: 200,
    height: 260,
    mobileHidden: true,
  },
  {
    src: "/portrait-12.jpg",
    alt: "Minimalist portrait",
    top: 72,
    left: 15,
    rotate: 7,
    width: 170,
    height: 220,
    mobileHidden: true,
  },
  {
    src: "/portrait-13.jpg",
    alt: "Vintage inspired portrait",
    top: 78,
    left: 30,
    rotate: -2,
    width: 160,
    height: 200,
    mobileHidden: true,
  },
  // Bottom center-right area
  {
    src: "/portrait-14.jpg",
    alt: "Urban chic portrait",
    top: 75,
    left: 46,
    rotate: 4,
    width: 180,
    height: 230,
    mobileHidden: true,
  },
  {
    src: "/portrait-15.jpg",
    alt: "Fantasy portrait",
    top: 72,
    left: 62,
    rotate: -6,
    width: 190,
    height: 250,
    mobileHidden: true,
  },
  {
    src: "/portrait-16.jpg",
    alt: "Professional headshot",
    top: 70,
    left: 78,
    rotate: 8,
    width: 180,
    height: 230,
    mobileHidden: true,
  },
  {
    src: "/portrait-17.jpg",
    alt: "Beach lifestyle portrait",
    top: 65,
    left: 90,
    rotate: -10,
    width: 170,
    height: 220,
    mobileHidden: true,
  },
]

export default function Home() {
  const [images, setImages] = useState(initialImages)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const totalImages = initialImages.length
  const dragOffset = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const pendingPosition = useRef({ left: 0, top: 0 })
  const textContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Only trigger animations after all images are loaded (or mobile subset)
    const mobileVisibleCount = initialImages.filter(img => !img.mobileHidden).length
    const requiredImages = isMobile ? mobileVisibleCount : totalImages
    if (imagesLoaded >= requiredImages) {
      const timer = setTimeout(() => setIsLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [imagesLoaded, totalImages, isMobile])

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    setDraggingIndex(index)
    const rect = (e.target as HTMLElement).closest(".draggable-image")?.getBoundingClientRect()
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  const updatePosition = useCallback(() => {
    if (draggingIndex === null) return

    setImages((prev) =>
      prev.map((img, i) =>
        i === draggingIndex ? { ...img, left: pendingPosition.current.left, top: pendingPosition.current.top } : img,
      ),
    )
    animationFrameRef.current = null
  }, [draggingIndex])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingIndex === null || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      pendingPosition.current = {
        left: ((e.clientX - containerRect.left - dragOffset.current.x) / containerRect.width) * 100,
        top: ((e.clientY - containerRect.top - dragOffset.current.y) / containerRect.height) * 100,
      }

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updatePosition)
      }
    },
    [draggingIndex, updatePosition],
  )

  const handleMouseUp = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    setDraggingIndex(null)
  }, [])

  // Animation variants for images
  const getImageAnimation = (index: number) => {
    const row = Math.floor(index / 6)
    const col = index % 6
    const isLeft = col < 3
    const isTop = row < 2
    
    return {
      hidden: {
        opacity: 0,
        scale: 0.3,
        x: isLeft ? -200 : 200,
        y: isTop ? -150 : 150,
        rotate: initialImages[index].rotate + (isLeft ? -30 : 30),
      },
      visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: initialImages[index].rotate,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 1,
          delay: 0.8 + index * 0.08,
        },
      },
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />
      <main
        ref={containerRef}
        className="relative z-20 h-screen overflow-x-hidden md:overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Velvet texture background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/images/velvet-texture.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]/80" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(139,30,63,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139,30,63,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Burgundy gradient orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(139,30,63,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Scattered draggable images */}
        {images.map((image, index) => {
          const isDragging = draggingIndex === index
          
          // Hide certain images on mobile
          if (isMobile && image.mobileHidden) return null
          
          // Use mobile positions if on mobile and they exist
          const top = isMobile && image.mobileTop !== undefined ? image.mobileTop : image.top
          const left = isMobile && image.mobileLeft !== undefined ? image.mobileLeft : image.left
          const width = isMobile && image.mobileWidth !== undefined ? image.mobileWidth : image.width
          const height = isMobile && image.mobileHeight !== undefined ? image.mobileHeight : image.height
          
          return (
            <motion.div
              key={index}
              className={`draggable-image absolute select-none will-change-transform ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              } ${isMobile ? "pointer-events-none" : ""}`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: width,
                height: height,
                zIndex: isDragging ? 100 : index,
                transform: `rotate(${image.rotate}deg)`,
              }}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={getImageAnimation(index)}
              onMouseDown={(e) => !isMobile && handleMouseDown(e, index)}
            >
              <div 
                className="relative h-full w-full overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2"
                style={{
                  boxShadow: isDragging
                    ? "0 35px 70px -12px rgba(0, 0, 0, 0.9)"
                    : "0 10px 40px -10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 hover:ring-[#C44569]/50 transition-all duration-300" />
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="pointer-events-none object-cover transition-transform duration-500 ease-out hover:scale-110"
                  draggable={false}
                  priority
                  onLoad={() => setImagesLoaded(prev => prev + 1)}
                />
              </div>
            </motion.div>
          )
        })}

        <div
          ref={textContainerRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated subtitle */}
            <motion.p
              className="relative z-10 text-4xl text-white/90 sm:text-5xl md:text-[90px]"
              style={{ fontFamily: "var(--font-corinthia), cursive", marginBottom: isMobile ? "-20px" : "-40px" }}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              AI Portrait
            </motion.p>

            {/* Animated main title */}
            <motion.h1 
              className="text-4xl tracking-tight text-white sm:text-6xl md:text-8xl"
              initial={{ opacity: 0, y: 80, scale: 0.5 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                delay: 0.4,
              }}
            >
              <VariableProximity
                label="Prompt Bank"
                fromFontVariationSettings="'wght' 700"
                toFontVariationSettings="'wght' 900"
                containerRef={textContainerRef}
                radius={150}
                falloff="gaussian"
                className="pointer-events-auto"
                style={{
                  fontFamily: '"Roboto Flex", sans-serif',
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              />
            </motion.h1>

            {/* Animated description */}
            <motion.p 
              className="mx-auto mt-4 sm:mt-6 max-w-xs sm:max-w-lg px-4 sm:px-0 text-xs sm:text-sm leading-relaxed text-white/60 md:text-base"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.6,
              }}
            >
              Unlock stunning AI-generated portraits with my curated collection of premium prompts. 
              Each prompt is crafted to create the exact photo style you see.
            </motion.p>

            {/* Animated button */}
            <motion.div
              className="pointer-events-auto mt-6 sm:mt-8 mb-6 sm:mb-8 inline-block rounded-full p-[2px]"
              style={{
                background: "linear-gradient(135deg, #C44569 0%, #8B1E3F 25%, #C44569 50%, #8B1E3F 75%, #C44569 100%)",
              }}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => smoothScrollTo('full-access', { duration: 1200, offset: 80 })}
                className="rounded-full bg-[#0a0a0a] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
              >
                Browse Prompts
              </button>
            </motion.div>

            {/* Scroll indicator - hidden on mobile */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 2 }}
            >
              <motion.div
                className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-white/40 rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    
      <AccessSection />
      <InfiniteCarousel />
      <HowItWorksSection />
      <ShowcaseSection />
      <WhatsInsideSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  )
}
