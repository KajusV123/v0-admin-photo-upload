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

// Cookie utilities for persistent access
const COOKIE_NAME = "prompt_bank_access"
const COOKIE_EXPIRY_DAYS = 365 // Cookie lasts 1 year

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Categories for filtering
const categories = ["All", "Podcast", "Lifestyle", "Beauty", "Fashion", "Fitness", "Portrait"]

// Using picsum.photos for reliable placeholder images
// Each image has a unique seed to ensure different images
const promptGallery = [
  // BEAUTY CATEGORY (17 prompts)
  {
    id: 1,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty1/400/500",
    title: "Glowing Skin Close-up",
    prompt: "Professional beauty portrait, extreme close-up shot, glowing dewy skin, natural makeup look, soft diffused studio lighting, clean minimal background, beauty campaign aesthetic, sharp focus on facial features, high-end skincare advertisement style, 8K resolution, subtle highlight on cheekbones",
  },
  {
    id: 2,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty2/400/500",
    title: "Makeup Application",
    prompt: "Beauty tutorial style portrait, applying lip gloss with applicator, glowing sun-kissed skin, professional makeup look, natural window lighting from side, clean minimal background, beauty content creator aesthetic, focus on lips and product",
  },
  {
    id: 3,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty3/400/500",
    title: "Natural Glow Makeup",
    prompt: "Professional makeup portrait, applying foundation with brush, high messy bun hairstyle, dewy glowing skin, natural beauty look, soft studio lighting, beauty tutorial thumbnail style, clean white background, skincare advertisement quality",
  },
  {
    id: 4,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty4/400/500",
    title: "Soft Glam Portrait",
    prompt: "Soft glam beauty portrait, flawless base makeup, subtle smokey eye, nude lip, hair pulled back elegantly, butterfly lighting setup, creamy skin texture, high-end beauty editorial, magazine cover quality, pristine skin detail",
  },
  {
    id: 5,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty5/400/500",
    title: "Highlighter Glow",
    prompt: "Beauty close-up focusing on highlighted cheekbones, wet-look dewy skin, professional makeup artistry, strong cheekbone contour, luminous skin, editorial beauty lighting, chrome highlight effect, glass skin aesthetic",
  },
  {
    id: 6,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty6/400/500",
    title: "Red Lip Classic",
    prompt: "Classic beauty portrait, bold red lipstick, vintage Hollywood glamour, porcelain skin, winged eyeliner, elegant updo hairstyle, soft focus background, timeless beauty aesthetic, old Hollywood lighting",
  },
  {
    id: 7,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty7/400/500",
    title: "Skincare Editorial",
    prompt: "Clean skincare editorial portrait, minimal makeup, radiant healthy skin, water droplets on face, fresh dewy look, spa aesthetic, wellness brand photography, natural lighting, hydrated skin texture",
  },
  {
    id: 8,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty8/400/500",
    title: "Bronzed Goddess",
    prompt: "Sun-kissed bronzed beauty portrait, warm golden tones, beach goddess aesthetic, natural glowing tan, subtle bronze eyeshadow, glossy lips, golden hour lighting simulation, summer beauty campaign",
  },
  {
    id: 9,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty9/400/500",
    title: "Eyeshadow Focus",
    prompt: "Close-up eye makeup portrait, colorful eyeshadow palette, precise blending technique, dramatic eye look, perfect brows, false lashes, beauty detail shot, makeup artist portfolio quality",
  },
  {
    id: 10,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty10/400/500",
    title: "Blush Application",
    prompt: "Beauty tutorial portrait, applying blush with fluffy brush, rosy cheeks, fresh-faced makeup look, soft feminine aesthetic, natural daylight, beauty influencer content style, approachable beauty",
  },
  {
    id: 11,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty11/400/500",
    title: "Lip Liner Precision",
    prompt: "Close-up lip makeup portrait, precise lip liner application, ombre lip technique, plump glossy lips, beauty detail macro shot, professional makeup artistry, cosmetics advertisement quality",
  },
  {
    id: 12,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty12/400/500",
    title: "Brow Perfection",
    prompt: "Eyebrow grooming portrait, brushing brows with spoolie, natural fluffy brow look, laminated brow effect, clean beautiful face, brow product advertisement, precise detail focus",
  },
  {
    id: 13,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty13/400/500",
    title: "Mascara Moment",
    prompt: "Mascara application beauty portrait, lengthening lashes, eyes looking up, doe-eyed effect, volumizing mascara, beauty routine moment, intimate close-up, cosmetics brand aesthetic",
  },
  {
    id: 14,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty14/400/500",
    title: "Glass Skin",
    prompt: "Korean glass skin beauty portrait, ultra-dewy luminous skin, minimal makeup, poreless complexion, hydrating skincare glow, K-beauty aesthetic, clean girl look, translucent skin quality",
  },
  {
    id: 15,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty15/400/500",
    title: "Contour Queen",
    prompt: "Contouring tutorial portrait, sculpted cheekbones, defined jawline, professional face sculpting, cream contour technique, beauty guru aesthetic, transformation makeup style",
  },
  {
    id: 16,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty16/400/500",
    title: "Fresh Face Morning",
    prompt: "Morning skincare routine portrait, fresh-faced no makeup look, applying serum droplets, healthy radiant skin, bathroom mirror selfie aesthetic, authentic beauty moment, natural lighting",
  },
  {
    id: 17,
    category: "Beauty",
    image: "https://picsum.photos/seed/beauty17/400/500",
    title: "Glossy Lips Focus",
    prompt: "Extreme close-up glossy lips portrait, high-shine lip gloss, plump hydrated lips, lip care aesthetic, beauty detail macro photography, cosmetics product shot style, mirror-like reflection",
  },

  // FASHION CATEGORY (17 prompts)
  {
    id: 18,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion1/400/500",
    title: "Street Style Chic",
    prompt: "High fashion editorial portrait, sleek straight hair, navy blue crop top, professional studio setup, dramatic side lighting, confident powerful pose, Vogue magazine aesthetic, urban street style, oversized blazer and heels",
  },
  {
    id: 19,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion2/400/500",
    title: "Runway Ready",
    prompt: "Runway model portrait, slicked back wet-look hair, avant-garde fashion outfit, dramatic makeup, catwalk lighting, fierce confident expression, high fashion editorial, designer clothing showcase",
  },
  {
    id: 20,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion3/400/500",
    title: "Minimalist Elegance",
    prompt: "Minimalist fashion portrait, clean lines, neutral color palette, simple elegant outfit, architectural background, editorial lighting, sophisticated modern aesthetic, less is more philosophy",
  },
  {
    id: 21,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion4/400/500",
    title: "Boho Goddess",
    prompt: "Bohemian fashion portrait, flowy maxi dress, natural wavy hair, outdoor golden hour, flower accessories, free-spirited aesthetic, earthy tones, festival fashion vibes",
  },
  {
    id: 22,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion5/400/500",
    title: "Power Suit",
    prompt: "Corporate fashion portrait, tailored power suit, boss woman aesthetic, confident pose, modern office background, professional lighting, empowered feminine style, business chic",
  },
  {
    id: 23,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion6/400/500",
    title: "Vintage Glamour",
    prompt: "Vintage fashion portrait, 1950s inspired outfit, retro hairstyle, classic red lipstick, old Hollywood glamour, film noir lighting, timeless elegance, pin-up aesthetic",
  },
  {
    id: 24,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion7/400/500",
    title: "Athleisure Queen",
    prompt: "Athleisure fashion portrait, sporty chic outfit, matching set, sneakers, urban background, street style photography, comfortable yet stylish, modern casual wear",
  },
  {
    id: 25,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion8/400/500",
    title: "Evening Elegance",
    prompt: "Evening gown portrait, elegant black dress, sophisticated updo, statement jewelry, luxury venue background, dramatic lighting, red carpet ready, glamorous event style",
  },
  {
    id: 26,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion9/400/500",
    title: "Denim Days",
    prompt: "Casual denim fashion portrait, classic jeans and white tee, effortless cool style, natural poses, daylight photography, authentic street style, timeless wardrobe staples",
  },
  {
    id: 27,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion10/400/500",
    title: "Leather Edge",
    prompt: "Edgy fashion portrait, leather jacket, rock and roll aesthetic, bold makeup, urban gritty background, moody lighting, rebellious style, punk-inspired fashion",
  },
  {
    id: 28,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion11/400/500",
    title: "Summer Breeze",
    prompt: "Summer fashion portrait, flowy sundress, straw hat, beach or garden setting, natural sunlight, carefree feminine style, vacation aesthetic, light and airy mood",
  },
  {
    id: 29,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion12/400/500",
    title: "Cozy Knits",
    prompt: "Fall fashion portrait, oversized knit sweater, warm autumn colors, cozy aesthetic, soft natural lighting, comfortable chic style, hygge vibes, seasonal fashion",
  },
  {
    id: 30,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion13/400/500",
    title: "Print Mix Master",
    prompt: "Bold pattern fashion portrait, mixed prints outfit, confident styling, fashion-forward aesthetic, editorial composition, maximalist style, pattern clash done right",
  },
  {
    id: 31,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion14/400/500",
    title: "Silk Sophistication",
    prompt: "Luxury silk fashion portrait, flowing silk dress, elegant draping, soft feminine aesthetic, studio lighting, high-end fashion photography, luxurious fabric texture",
  },
  {
    id: 32,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion15/400/500",
    title: "Urban Explorer",
    prompt: "Urban streetwear portrait, trendy outfit, city background, candid walking shot, natural street photography, contemporary style, metropolitan fashion",
  },
  {
    id: 33,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion16/400/500",
    title: "Resort Wear",
    prompt: "Resort fashion portrait, tropical print outfit, vacation destination, poolside or beach, bright natural light, luxury travel aesthetic, summer getaway style",
  },
  {
    id: 34,
    category: "Fashion",
    image: "https://picsum.photos/seed/fashion17/400/500",
    title: "Monochrome Magic",
    prompt: "Monochromatic fashion portrait, all-black or all-white outfit, clean sophisticated style, editorial lighting, minimalist aesthetic, tonal dressing, chic simplicity",
  },

  // LIFESTYLE CATEGORY (17 prompts)
  {
    id: 35,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle1/400/500",
    title: "Coffee Shop Moment",
    prompt: "Lifestyle portrait in cozy coffee shop, holding artisan latte, casual chic outfit, window seat with natural light, cafe aesthetic, warm and inviting atmosphere, authentic candid moment",
  },
  {
    id: 36,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle2/400/500",
    title: "Morning Routine",
    prompt: "Morning routine lifestyle portrait, just woken up natural beauty, white bedding, soft morning light through curtains, peaceful serene mood, authentic bedroom aesthetic",
  },
  {
    id: 37,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle3/400/500",
    title: "Work From Home",
    prompt: "Work from home lifestyle portrait, laptop and coffee, comfortable stylish loungewear, organized aesthetic desk setup, natural daylight, productive cozy atmosphere",
  },
  {
    id: 38,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle4/400/500",
    title: "Weekend Brunch",
    prompt: "Brunch lifestyle portrait, beautiful food spread, restaurant patio setting, casual weekend outfit, golden morning light, social dining aesthetic, Instagram-worthy moment",
  },
  {
    id: 39,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle5/400/500",
    title: "Bookworm Cozy",
    prompt: "Reading lifestyle portrait, cozy with book, comfortable chair or window nook, warm lighting, intellectual aesthetic, peaceful solitude, book lover vibes",
  },
  {
    id: 40,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle6/400/500",
    title: "Travel Wanderer",
    prompt: "Travel lifestyle portrait, exploring new destination, casual travel outfit, scenic background, adventure aesthetic, wanderlust vibes, authentic travel moment",
  },
  {
    id: 41,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle7/400/500",
    title: "Self-Care Sunday",
    prompt: "Self-care lifestyle portrait, face mask and robe, spa day at home, candles and plants, relaxation aesthetic, wellness routine, peaceful self-love moment",
  },
  {
    id: 42,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle8/400/500",
    title: "Cooking Creative",
    prompt: "Cooking lifestyle portrait, preparing meal in kitchen, fresh ingredients, apron and casual style, warm kitchen lighting, home chef aesthetic, culinary passion",
  },
  {
    id: 43,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle9/400/500",
    title: "Plant Parent",
    prompt: "Plant care lifestyle portrait, tending to houseplants, urban jungle home setting, natural light, green living aesthetic, plant mom vibes, nurturing moment",
  },
  {
    id: 44,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle10/400/500",
    title: "Golden Hour Walk",
    prompt: "Golden hour outdoor lifestyle portrait, casual walk in nature, warm sunset lighting, relaxed peaceful expression, natural beauty, end of day serenity",
  },
  {
    id: 45,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle11/400/500",
    title: "Art Studio Creative",
    prompt: "Creative lifestyle portrait, artist in studio, painting or creating, paint-splattered apron, artistic chaos background, creative process moment, passion project aesthetic",
  },
  {
    id: 46,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle12/400/500",
    title: "Farmers Market",
    prompt: "Farmers market lifestyle portrait, shopping for fresh produce, woven basket, outdoor market setting, authentic community moment, healthy living aesthetic",
  },
  {
    id: 47,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle13/400/500",
    title: "Journaling Moment",
    prompt: "Journaling lifestyle portrait, writing in notebook, cozy corner setting, thoughtful expression, mindfulness practice, personal reflection aesthetic, analog moment",
  },
  {
    id: 48,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle14/400/500",
    title: "Music Lover",
    prompt: "Music lifestyle portrait, listening with headphones, eyes closed enjoying music, urban setting, lost in music moment, authentic emotional connection",
  },
  {
    id: 49,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle15/400/500",
    title: "Beach Day Bliss",
    prompt: "Beach lifestyle portrait, relaxing on sand, swimwear and coverup, ocean background, summer vacation vibes, carefree beach day, sun-kissed aesthetic",
  },
  {
    id: 50,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle16/400/500",
    title: "City Explorer",
    prompt: "Urban exploration lifestyle portrait, walking city streets, stylish city outfit, architecture background, metropolitan adventure, street photography aesthetic",
  },
  {
    id: 51,
    category: "Lifestyle",
    image: "https://picsum.photos/seed/lifestyle17/400/500",
    title: "Sunset Balcony",
    prompt: "Balcony sunset lifestyle portrait, watching sunset from terrace, glass of wine, golden hour lighting, peaceful evening moment, romantic city view aesthetic",
  },

  // PODCAST CATEGORY (17 prompts)
  {
    id: 52,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast1/400/500",
    title: "Studio Interview",
    prompt: "Professional podcast studio portrait, high-end microphone setup, soundproofing panels visible, warm studio lighting, confident host pose, professional audio equipment, engaging conversation aesthetic",
  },
  {
    id: 53,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast2/400/500",
    title: "Home Studio Setup",
    prompt: "Home podcast studio portrait, cozy recording space, ring light illumination, comfortable setting, authentic creator aesthetic, bedroom or office converted studio",
  },
  {
    id: 54,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast3/400/500",
    title: "Microphone Close-up",
    prompt: "Podcast recording close-up, speaking into professional microphone, pop filter visible, focused expression, intimate recording moment, audio content creation",
  },
  {
    id: 55,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast4/400/500",
    title: "Guest Conversation",
    prompt: "Podcast interview scene, two-person setup, engaging conversation moment, professional lighting, talk show aesthetic, dynamic discussion",
  },
  {
    id: 56,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast5/400/500",
    title: "Headphones On",
    prompt: "Podcast host portrait with headphones, professional studio headphones, monitoring audio, focused listening expression, recording session aesthetic",
  },
  {
    id: 57,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast6/400/500",
    title: "Laptop Recording",
    prompt: "Podcast recording with laptop, screen visible, editing software, casual home recording setup, content creator aesthetic, digital workspace",
  },
  {
    id: 58,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast7/400/500",
    title: "Animated Discussion",
    prompt: "Animated podcast moment, expressive hand gestures, passionate speaking, dynamic energy, engaging storytelling, captivating host presence",
  },
  {
    id: 59,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast8/400/500",
    title: "Minimalist Setup",
    prompt: "Minimalist podcast studio, clean aesthetic setup, simple microphone and laptop, uncluttered background, modern creator space, sleek recording environment",
  },
  {
    id: 60,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast9/400/500",
    title: "Neon Studio",
    prompt: "Neon-lit podcast studio, colorful LED background, modern aesthetic, YouTube studio vibes, vibrant atmosphere, contemporary content creator setup",
  },
  {
    id: 61,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast10/400/500",
    title: "Reading Notes",
    prompt: "Podcast host reading show notes, preparing content, professional preparation, behind the scenes, thoughtful moment before recording",
  },
  {
    id: 62,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast11/400/500",
    title: "Laughing Moment",
    prompt: "Candid podcast laughing moment, genuine joy, authentic connection, natural humor, relatable host personality, warm inviting energy",
  },
  {
    id: 63,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast12/400/500",
    title: "Coffee and Mic",
    prompt: "Podcast setup with coffee, cozy recording atmosphere, morning show vibes, comfort and professionalism, warm beverage aesthetic",
  },
  {
    id: 64,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast13/400/500",
    title: "Standing Desk Record",
    prompt: "Standing desk podcast setup, energetic recording posture, active hosting style, modern office aesthetic, health-conscious creator",
  },
  {
    id: 65,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast14/400/500",
    title: "Outdoor Recording",
    prompt: "Outdoor podcast recording, portable setup, nature background, on-location content, field recording aesthetic, adventure podcast vibes",
  },
  {
    id: 66,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast15/400/500",
    title: "Video Podcast",
    prompt: "Video podcast setup, camera and microphone visible, multi-platform content, YouTube podcast aesthetic, professional video recording",
  },
  {
    id: 67,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast16/400/500",
    title: "Mixing Audio",
    prompt: "Podcast post-production, editing audio on computer, mixing board visible, behind the scenes, technical creator moment",
  },
  {
    id: 68,
    category: "Podcast",
    image: "https://picsum.photos/seed/podcast17/400/500",
    title: "Promo Shot",
    prompt: "Podcast promotional portrait, professional headshot style, branding background, marketing material aesthetic, show cover image quality",
  },

  // FITNESS CATEGORY (16 prompts)
  {
    id: 69,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness1/400/500",
    title: "Gym Power",
    prompt: "Gym fitness portrait, weight training pose, athletic wear, gym equipment background, strong confident expression, empowered fitness aesthetic, sweat and determination",
  },
  {
    id: 70,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness2/400/500",
    title: "Yoga Flow",
    prompt: "Yoga pose portrait, graceful asana, yoga studio or outdoor setting, peaceful focused expression, flexibility and strength, mindful movement aesthetic",
  },
  {
    id: 71,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness3/400/500",
    title: "Running Strong",
    prompt: "Running fitness portrait, outdoor jogging, athletic outfit, motion blur background, determined expression, cardio workout, active lifestyle",
  },
  {
    id: 72,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness4/400/500",
    title: "Boxing Power",
    prompt: "Boxing fitness portrait, boxing gloves and stance, punching bag or ring, intense focused expression, combat sport aesthetic, powerful and fierce",
  },
  {
    id: 73,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness5/400/500",
    title: "Pilates Grace",
    prompt: "Pilates workout portrait, reformer or mat exercise, elongated graceful pose, studio setting, controlled movement, core strength aesthetic",
  },
  {
    id: 74,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness6/400/500",
    title: "HIIT Intensity",
    prompt: "High intensity workout portrait, mid-exercise action shot, sweat visible, gym class setting, pushing limits, intense cardio moment",
  },
  {
    id: 75,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness7/400/500",
    title: "Post-Workout Glow",
    prompt: "Post-workout portrait, healthy flushed skin, satisfied expression, gym background, accomplished feeling, fitness journey aesthetic",
  },
  {
    id: 76,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness8/400/500",
    title: "Stretching Session",
    prompt: "Stretching fitness portrait, flexibility pose, warm-up or cool-down, gym mat, focused on form, athletic grace",
  },
  {
    id: 77,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness9/400/500",
    title: "Swimming Strong",
    prompt: "Swimming fitness portrait, pool setting, swimmer aesthetic, athletic form, water sport, competitive or leisure swim",
  },
  {
    id: 78,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness10/400/500",
    title: "Cycling Power",
    prompt: "Cycling fitness portrait, spin class or outdoor cycling, athletic gear, cardio intensity, endurance workout aesthetic",
  },
  {
    id: 79,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness11/400/500",
    title: "Dance Fitness",
    prompt: "Dance workout portrait, energetic movement, dance studio, joyful expression, cardio dance class, fun fitness aesthetic",
  },
  {
    id: 80,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness12/400/500",
    title: "Meditation Calm",
    prompt: "Meditation fitness portrait, peaceful seated pose, eyes closed, serene expression, mindfulness practice, mental fitness aesthetic",
  },
  {
    id: 81,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness13/400/500",
    title: "CrossFit Strong",
    prompt: "CrossFit workout portrait, functional fitness movement, box gym setting, chalk on hands, raw athletic power, gritty fitness aesthetic",
  },
  {
    id: 82,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness14/400/500",
    title: "Outdoor Workout",
    prompt: "Outdoor fitness portrait, park or beach workout, bodyweight exercise, natural setting, fresh air fitness, outdoor training aesthetic",
  },
  {
    id: 83,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness15/400/500",
    title: "Dumbbell Strength",
    prompt: "Dumbbell workout portrait, arm exercise, weight room, focused determination, strength training, muscle building aesthetic",
  },
  {
    id: 84,
    category: "Fitness",
    image: "https://picsum.photos/seed/fitness16/400/500",
    title: "Fitness Model",
    prompt: "Fitness model portrait, athletic physique showcase, professional fitness photography, athletic wear, inspirational fit body aesthetic",
  },

  // PORTRAIT CATEGORY (16 prompts)
  {
    id: 85,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait1/400/500",
    title: "Classic Headshot",
    prompt: "Professional headshot portrait, clean background, flattering lighting, confident approachable expression, corporate or creative professional, LinkedIn profile quality",
  },
  {
    id: 86,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait2/400/500",
    title: "Moody Drama",
    prompt: "Moody dramatic portrait, low-key lighting, shadows and highlights, intense gaze, artistic portrait, emotional depth, fine art photography",
  },
  {
    id: 87,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait3/400/500",
    title: "Golden Hour Magic",
    prompt: "Golden hour outdoor portrait, warm sunset backlight, natural beauty, soft romantic mood, magical lighting, golden glow on skin",
  },
  {
    id: 88,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait4/400/500",
    title: "Black and White Classic",
    prompt: "Black and white portrait, timeless monochrome aesthetic, dramatic contrast, classic photography style, emotional depth, artistic expression",
  },
  {
    id: 89,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait5/400/500",
    title: "Candid Laugh",
    prompt: "Candid laughing portrait, genuine joyful expression, natural moment, authentic emotion, unposed beauty, real happiness captured",
  },
  {
    id: 90,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait6/400/500",
    title: "Environmental Portrait",
    prompt: "Environmental portrait, subject in their element, meaningful location, contextual storytelling, authentic personality, documentary style",
  },
  {
    id: 91,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait7/400/500",
    title: "Studio Dramatic",
    prompt: "Studio dramatic portrait, professional lighting setup, black background, striking pose, high-end portrait photography, magazine quality",
  },
  {
    id: 92,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait8/400/500",
    title: "Soft Natural Light",
    prompt: "Soft natural light portrait, window lighting, gentle shadows, intimate mood, peaceful expression, ethereal quality, delicate beauty",
  },
  {
    id: 93,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait9/400/500",
    title: "Close-up Detail",
    prompt: "Extreme close-up portrait, facial detail focus, eyes and skin texture, intimate perspective, raw beauty, micro portrait photography",
  },
  {
    id: 94,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait10/400/500",
    title: "Outdoor Natural",
    prompt: "Outdoor natural portrait, park or garden setting, dappled sunlight, relaxed natural pose, approachable friendly expression, organic beauty",
  },
  {
    id: 95,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait11/400/500",
    title: "Creative Artistic",
    prompt: "Creative artistic portrait, unique angle or composition, experimental photography, artistic expression, bold creative choices, gallery-worthy",
  },
  {
    id: 96,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait12/400/500",
    title: "Silhouette Drama",
    prompt: "Silhouette portrait, backlit dramatic effect, mysterious mood, shape and form focus, artistic lighting, striking visual impact",
  },
  {
    id: 97,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait13/400/500",
    title: "Reflective Thoughtful",
    prompt: "Thoughtful reflective portrait, contemplative expression, looking away from camera, pensive mood, introspective moment, emotional depth",
  },
  {
    id: 98,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait14/400/500",
    title: "High Key Bright",
    prompt: "High key portrait, bright white background, clean minimal aesthetic, even lighting, fresh and modern look, commercial photography style",
  },
  {
    id: 99,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait15/400/500",
    title: "Freckles Natural",
    prompt: "Natural freckles portrait, embracing unique features, minimal makeup, authentic beauty, celebrating natural characteristics, skin positivity",
  },
  {
    id: 100,
    category: "Portrait",
    image: "https://picsum.photos/seed/portrait16/400/500",
    title: "Urban Portrait",
    prompt: "Urban street portrait, city background, modern metropolitan aesthetic, street photography style, confident city dweller, contemporary look",
  },
]

// Prompt Modal Component
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
        className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#141414] md:h-[70vh] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/60 transition-colors hover:bg-black/70 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image - left side on desktop, top on mobile */}
        <div className="relative h-64 w-full shrink-0 md:h-full md:w-[45%]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content - right side on desktop, bottom on mobile */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
                {item.category}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white md:text-xl">{item.title}</h3>
            
            {/* Prompt box */}
            <div className="mt-4 rounded-xl bg-white/5 p-4">
              <p className="text-xs leading-relaxed text-white/70 md:text-sm">{item.prompt}</p>
            </div>
          </div>

          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-black transition-all hover:bg-white/90 md:text-base"
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

export function AccessSection() {
  const [accessCode, setAccessCode] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<typeof promptGallery[0] | null>(null)

  // Check cookie on mount for persistent access
  useEffect(() => {
    const cookieValue = getCookie(COOKIE_NAME)
    if (cookieValue === "unlocked") {
      setIsUnlocked(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === ACCESS_CODE) {
      setIsUnlocked(true)
      setError("")
      // Set cookie that lasts 1 year so user doesn't need to enter code again
      setCookie(COOKIE_NAME, "unlocked", COOKIE_EXPIRY_DAYS)
    } else {
      setError("Invalid access code. Please try again.")
      setAccessCode("")
    }
  }

  const filteredGallery = selectedCategory === "All" 
    ? promptGallery 
    : promptGallery.filter(item => item.category === selectedCategory)

  return (
    <section className="relative z-10 bg-[#0a0a0a] pt-48 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            // Locked State - Access Code Entry
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-8 rounded-full bg-white/5 p-6"
              >
                <Lock className="h-12 w-12 text-white/60" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Exclusive Prompt Bank
              </h2>
              <p className="mt-4 max-w-md text-white/60">
                Enter your access code to unlock 100+ premium AI portrait prompts with example images.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm">
                <div className="relative">
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter access code"
                    className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-center text-lg tracking-widest text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
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
            </motion.div>
          ) : (
            // Unlocked State - Image Gallery
            <motion.div
              key="unlocked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="mb-6 rounded-full bg-green-500/10 p-4"
                >
                  <Unlock className="h-8 w-8 text-green-400" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Prompt Gallery
                </h2>
                <p className="mt-3 text-white/60">
                  Click any image to see the prompt used to create that style
                </p>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-purple-500 text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Image Grid */}
              <motion.div 
                layout
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredGallery.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedItem(item)}
                      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl bg-white/5"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-xs font-medium text-white">{item.title}</p>
                        <p className="mt-0.5 text-xs text-white/60">{item.category}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Count */}
              <p className="text-center text-sm text-white/40">
                Showing {filteredGallery.length} of {promptGallery.length} prompts
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prompt Modal */}
      <AnimatePresence>
        {selectedItem && (
          <PromptModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
