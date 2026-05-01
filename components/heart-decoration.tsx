"use client"

import { motion } from "framer-motion"

interface HeartDecorationProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function HeartDecoration({ className = "", size = "md" }: HeartDecorationProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <motion.div 
      className={`${sizes[size]} ${className}`}
      initial={{ scale: 0, rotate: -15 }}
      whileInView={{ scale: 1, rotate: -15 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Scribble heart effect */}
        <path
          d="M50 85 C25 65 10 50 10 35 C10 20 25 10 40 15 C45 17 48 20 50 25 C52 20 55 17 60 15 C75 10 90 20 90 35 C90 50 75 65 50 85"
          stroke="#E8A4B8"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ 
            strokeDasharray: "5,3",
          }}
        />
        <path
          d="M50 80 C30 62 18 50 18 38 C18 26 30 18 42 22 C46 24 49 27 50 30 C51 27 54 24 58 22 C70 18 82 26 82 38 C82 50 70 62 50 80"
          stroke="#F5D0DC"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}
