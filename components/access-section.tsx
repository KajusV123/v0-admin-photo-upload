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

// 100+ Prompt gallery data - all focused on girl/women photography
const promptGallery = [
  // BEAUTY CATEGORY (20 prompts)
  {
    id: 1,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop",
    title: "Glowing Skin Close-up",
    prompt: "Professional beauty portrait, extreme close-up shot, glowing dewy skin, natural makeup look, soft diffused studio lighting, clean minimal background, beauty campaign aesthetic, sharp focus on facial features, high-end skincare advertisement style, 8K resolution, subtle highlight on cheekbones",
  },
  {
    id: 2,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    title: "Makeup Application",
    prompt: "Beauty tutorial style portrait, applying lip gloss with applicator, glowing sun-kissed skin, professional makeup look, natural window lighting from side, clean minimal background, beauty content creator aesthetic, focus on lips and product",
  },
  {
    id: 3,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop",
    title: "Natural Glow Makeup",
    prompt: "Professional makeup portrait, applying foundation with brush, high messy bun hairstyle, dewy glowing skin, natural beauty look, soft studio lighting, beauty tutorial thumbnail style, clean white background, skincare advertisement quality",
  },
  {
    id: 4,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop",
    title: "Soft Glam Portrait",
    prompt: "Soft glam beauty portrait, flawless base makeup, subtle smokey eye, nude lip, hair pulled back elegantly, butterfly lighting setup, creamy skin texture, high-end beauty editorial, magazine cover quality, pristine skin detail",
  },
  {
    id: 5,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=400&h=500&fit=crop",
    title: "Highlighter Glow",
    prompt: "Beauty close-up focusing on highlighted cheekbones, wet-look dewy skin, professional makeup artistry, strong cheekbone contour, luminous skin, editorial beauty lighting, chrome highlight effect, glass skin aesthetic",
  },
  {
    id: 6,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop",
    title: "Red Lip Classic",
    prompt: "Classic beauty portrait, bold red lipstick, vintage Hollywood glamour, porcelain skin, winged eyeliner, elegant updo hairstyle, soft focus background, timeless beauty aesthetic, old Hollywood lighting",
  },
  {
    id: 7,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=400&h=500&fit=crop",
    title: "Skincare Editorial",
    prompt: "Clean skincare editorial portrait, minimal makeup, radiant healthy skin, water droplets on face, fresh dewy look, spa aesthetic, wellness brand photography, natural lighting, hydrated skin texture",
  },
  {
    id: 8,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=500&fit=crop",
    title: "Bronzed Goddess",
    prompt: "Sun-kissed bronzed beauty portrait, warm golden tones, beach goddess aesthetic, natural glowing tan, subtle bronze eyeshadow, glossy lips, golden hour lighting simulation, summer beauty campaign",
  },
  {
    id: 9,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=400&h=500&fit=crop",
    title: "Eyeshadow Focus",
    prompt: "Close-up eye makeup portrait, colorful eyeshadow palette, precise blending technique, dramatic eye look, perfect brows, false lashes, beauty detail shot, makeup artist portfolio quality",
  },
  {
    id: 10,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1526045478516-99145907023c?w=400&h=500&fit=crop",
    title: "Blush Application",
    prompt: "Beauty tutorial portrait, applying blush with fluffy brush, rosy cheeks, fresh-faced makeup look, soft feminine aesthetic, natural daylight, beauty influencer content style, approachable beauty",
  },
  {
    id: 11,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1560087637-bf797bc7a589?w=400&h=500&fit=crop",
    title: "Lip Liner Precision",
    prompt: "Close-up lip makeup portrait, precise lip liner application, ombre lip technique, plump glossy lips, beauty detail macro shot, professional makeup artistry, cosmetics advertisement quality",
  },
  {
    id: 12,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1525357816819-392d2380d821?w=400&h=500&fit=crop",
    title: "Brow Perfection",
    prompt: "Eyebrow focused beauty portrait, perfectly groomed brows, brow lamination effect, natural fluffy brows, clean skin around eyes, brow product advertisement, detail-oriented beauty shot",
  },
  {
    id: 13,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=500&fit=crop",
    title: "Mascara Moment",
    prompt: "Mascara application portrait, long voluminous lashes, wide-eyed expression, applying mascara wand, beauty routine capture, doe-eyed look, lash-focused beauty photography",
  },
  {
    id: 14,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop",
    title: "Cream Contour",
    prompt: "Cream contour beauty portrait, sculpted cheekbones, nose contour technique, seamlessly blended makeup, professional MUA technique, beauty education content, cream product application",
  },
  {
    id: 15,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=400&h=500&fit=crop",
    title: "Setting Spray Finish",
    prompt: "Setting spray application portrait, mist catching light, dewy finish look, completed makeup look, beauty routine finale, fresh luminous skin, long-lasting makeup aesthetic",
  },
  {
    id: 16,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1549236177-97ad52f6f67e?w=400&h=500&fit=crop",
    title: "Under-eye Concealer",
    prompt: "Under-eye concealer portrait, brightening technique, triangle method application, fresh awake look, no dark circles, beauty hack demonstration, flawless under-eye area",
  },
  {
    id: 17,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1552066474-87bb1118d634?w=400&h=500&fit=crop",
    title: "Freckle Makeup",
    prompt: "Faux freckles beauty portrait, natural sun-kissed look, subtle freckle placement, youthful fresh face, minimal makeup with freckles, summer girl aesthetic, effortless natural beauty",
  },
  {
    id: 18,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=500&fit=crop",
    title: "Glass Skin",
    prompt: "Korean glass skin beauty portrait, translucent luminous skin, multi-step skincare result, reflective skin surface, dewy chok-chok skin, K-beauty aesthetic, skin so clear it reflects light",
  },
  {
    id: 19,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=500&fit=crop",
    title: "Bold Brow Look",
    prompt: "Bold brow beauty portrait, statement eyebrows, soap brow technique, brushed up fluffy brows, minimal eye makeup, brow-focused beauty, strong brow game aesthetic",
  },
  {
    id: 20,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=500&fit=crop",
    title: "Nude Lip Perfection",
    prompt: "Perfect nude lip portrait, your-lips-but-better shade, subtle lip liner, natural lip color enhancement, everyday glam makeup, wearable beauty look, effortlessly polished",
  },

  // FASHION CATEGORY (20 prompts)
  {
    id: 21,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    title: "Editorial Studio Shot",
    prompt: "High fashion editorial portrait, sleek straight hair, navy blue crop top, professional studio setup, dramatic side lighting, confident powerful pose, Vogue magazine aesthetic, clean gray background, fashion photography",
  },
  {
    id: 22,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
    title: "Glamour Mirror Shot",
    prompt: "Old Hollywood glamour portrait, auburn bangs hairstyle, elegant diamond necklace, holding compact mirror, warm golden lighting, luxurious setting, classic beauty pose, vintage glamour aesthetic",
  },
  {
    id: 23,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    title: "High Fashion Editorial",
    prompt: "High fashion runway portrait, avant-garde styling, dramatic studio lighting, bold confident pose, designer clothing, editorial magazine quality, striking composition, powerful feminine energy",
  },
  {
    id: 24,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
    title: "Street Style Queen",
    prompt: "Street style fashion portrait, urban city backdrop, trendy oversized blazer, confident street pose, natural daylight, candid fashion moment, influencer aesthetic, modern chic styling",
  },
  {
    id: 25,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop",
    title: "Runway Ready",
    prompt: "Runway model portrait, backstage fashion week, sleek pulled back hair, bold makeup, designer outfit, editorial lighting, high fashion aesthetic, model off-duty vibes",
  },
  {
    id: 26,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=500&fit=crop",
    title: "Minimalist Chic",
    prompt: "Minimalist fashion portrait, clean lines, neutral tones, simple elegant outfit, architectural background, modern aesthetic, less is more philosophy, scandinavian style influence",
  },
  {
    id: 27,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
    title: "Boho Summer",
    prompt: "Bohemian fashion portrait, flowy summer dress, natural outdoor setting, golden hour warmth, free-spirited pose, festival fashion vibes, romantic boho aesthetic, wind in hair",
  },
  {
    id: 28,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop",
    title: "Power Suit",
    prompt: "Power dressing portrait, tailored blazer and trousers, boss woman energy, corporate chic, strong confident pose, professional yet stylish, modern businesswoman aesthetic",
  },
  {
    id: 29,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=400&h=500&fit=crop",
    title: "Evening Elegance",
    prompt: "Evening gown portrait, luxurious satin dress, elegant updo, diamond jewelry, grand staircase setting, old money aesthetic, gala event ready, sophisticated glamour",
  },
  {
    id: 30,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=400&h=500&fit=crop",
    title: "Denim Dreams",
    prompt: "Casual denim fashion portrait, vintage jeans jacket, effortless cool girl style, relaxed pose, natural lighting, everyday fashion editorial, classic American style",
  },
  {
    id: 31,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=500&fit=crop",
    title: "Leather Edge",
    prompt: "Edgy leather fashion portrait, black leather jacket, rocker chic aesthetic, dark moody lighting, rebellious attitude, urban night setting, bold fashion statement",
  },
  {
    id: 32,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=500&fit=crop",
    title: "Floral Romance",
    prompt: "Romantic floral fashion portrait, flower print dress, garden setting, soft natural light, feminine graceful pose, spring fashion editorial, dreamy romantic aesthetic",
  },
  {
    id: 33,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&h=500&fit=crop",
    title: "Athleisure Luxe",
    prompt: "Luxury athleisure portrait, designer sportswear, sleek ponytail, modern minimalist setting, comfortable yet chic, elevated casual wear, sporty sophisticated aesthetic",
  },
  {
    id: 34,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1475180429737-5df2e2f77f64?w=400&h=500&fit=crop",
    title: "Vintage Vibes",
    prompt: "Vintage fashion portrait, retro 70s inspired outfit, warm film tones, nostalgic aesthetic, vintage accessories, throwback styling, analog photography feel",
  },
  {
    id: 35,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop",
    title: "Shopping Spree",
    prompt: "Shopping fashion portrait, multiple shopping bags, city street backdrop, excited happy expression, retail therapy vibes, fashionista lifestyle, luxury shopping aesthetic",
  },
  {
    id: 36,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop",
    title: "All White Everything",
    prompt: "Monochromatic white fashion portrait, all white outfit, clean minimal aesthetic, bright airy lighting, fresh modern look, summer whites, crisp elegant styling",
  },
  {
    id: 37,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=400&h=500&fit=crop",
    title: "Cozy Knits",
    prompt: "Cozy knitwear fashion portrait, oversized sweater, warm autumn tones, comfortable chic aesthetic, soft natural lighting, hygge vibes, casual luxury styling",
  },
  {
    id: 38,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=500&fit=crop",
    title: "Trench Coat Classic",
    prompt: "Classic trench coat portrait, timeless outerwear, rainy day aesthetic, Parisian style influence, sophisticated elegance, neutral color palette, effortlessly chic",
  },
  {
    id: 39,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1485968579169-51d61808a57c?w=400&h=500&fit=crop",
    title: "Statement Accessories",
    prompt: "Statement accessories fashion portrait, bold jewelry focus, dramatic earrings, minimal clothing to highlight accessories, editorial accessory shot, luxury jewelry campaign",
  },
  {
    id: 40,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=400&h=500&fit=crop",
    title: "Silk Sophistication",
    prompt: "Silk blouse fashion portrait, luxurious fabric draping, elegant sophisticated styling, soft studio lighting, high-end fashion aesthetic, timeless elegance, refined taste",
  },

  // LIFESTYLE CATEGORY (20 prompts)
  {
    id: 41,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    title: "Casual Behind Scenes",
    prompt: "Candid behind the scenes portrait, casual gray t-shirt, hair in messy clips, playful tongue out expression, natural relaxed pose, wardrobe rack in background, authentic lifestyle moment",
  },
  {
    id: 42,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
    title: "Coffee Shop Casual",
    prompt: "Casual lifestyle portrait, cozy coffee shop setting, natural window light, relaxed genuine smile, everyday fashion, warm color tones, authentic influencer aesthetic, candid moment",
  },
  {
    id: 43,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop",
    title: "Morning Routine",
    prompt: "Morning routine lifestyle portrait, cozy bedroom setting, natural morning light, messy bed hair, comfortable pajamas, holding coffee mug, authentic wake-up moment, relatable content",
  },
  {
    id: 44,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    title: "Golden Hour Walk",
    prompt: "Golden hour lifestyle portrait, outdoor walking shot, beautiful sunset lighting, casual outfit, wind in hair, carefree expression, magic hour photography, warm golden tones",
  },
  {
    id: 45,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    title: "Work From Home",
    prompt: "Work from home lifestyle portrait, home office setup, laptop and coffee, comfortable yet presentable, natural daylight, productive morning vibes, remote work aesthetic",
  },
  {
    id: 46,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=500&fit=crop",
    title: "Brunch Date",
    prompt: "Brunch lifestyle portrait, trendy cafe setting, avocado toast visible, casual chic outfit, laughing with friends implied, weekend vibes, social media worthy moment",
  },
  {
    id: 47,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    title: "Beach Day Vibes",
    prompt: "Beach lifestyle portrait, sandy shore background, sun-kissed skin, beach waves hair, relaxed happy expression, vacation mode, summer lifestyle content, coastal aesthetic",
  },
  {
    id: 48,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop",
    title: "Reading Corner",
    prompt: "Cozy reading lifestyle portrait, curled up with book, comfortable armchair, soft blanket, warm lighting, intellectual aesthetic, peaceful solitude, book lover vibes",
  },
  {
    id: 49,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=400&h=500&fit=crop",
    title: "Plant Mom",
    prompt: "Plant parent lifestyle portrait, surrounded by houseplants, caring for greenery, natural earthy tones, bohemian home decor, plant lover aesthetic, nurturing moment",
  },
  {
    id: 50,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
    title: "Self Care Sunday",
    prompt: "Self care lifestyle portrait, face mask on, hair wrapped in towel, spa day at home, relaxed pampered expression, wellness routine, self-love content, bathroom setting",
  },
  {
    id: 51,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop",
    title: "Cooking Content",
    prompt: "Kitchen lifestyle portrait, cooking homemade meal, apron wearing, fresh ingredients visible, warm home atmosphere, culinary content creator, domestic goddess aesthetic",
  },
  {
    id: 52,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=500&fit=crop",
    title: "Travel Diary",
    prompt: "Travel lifestyle portrait, exploring new city, map or camera in hand, adventure outfit, wanderlust expression, tourist but make it fashion, travel blogger aesthetic",
  },
  {
    id: 53,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?w=400&h=500&fit=crop",
    title: "Sunset Balcony",
    prompt: "Balcony sunset lifestyle portrait, city view background, glass of wine, golden hour glow, relaxed evening vibes, urban lifestyle, contemplative peaceful moment",
  },
  {
    id: 54,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1508835277591-09282e5e621b?w=400&h=500&fit=crop",
    title: "Farmers Market",
    prompt: "Farmers market lifestyle portrait, fresh produce shopping, wicker basket, casual weekend outfit, authentic local experience, healthy living aesthetic, community vibes",
  },
  {
    id: 55,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=500&fit=crop",
    title: "Journaling Moment",
    prompt: "Journaling lifestyle portrait, writing in notebook, thoughtful expression, cozy setting, warm beverage nearby, mindfulness practice, creative moment capture",
  },
  {
    id: 56,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=400&h=500&fit=crop",
    title: "Movie Night In",
    prompt: "Movie night lifestyle portrait, cozy couch setting, popcorn bowl, comfortable loungewear, dim ambient lighting, relaxing evening in, Netflix and chill aesthetic",
  },
  {
    id: 57,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=400&h=500&fit=crop",
    title: "Art Gallery Visit",
    prompt: "Art gallery lifestyle portrait, admiring artwork, sophisticated casual outfit, museum lighting, cultured aesthetic, art appreciator vibes, intellectual outing",
  },
  {
    id: 58,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=500&fit=crop",
    title: "Picnic Perfect",
    prompt: "Picnic lifestyle portrait, blanket in park, fresh fruits and cheese, sun hat, natural outdoor lighting, summer day vibes, Instagram-worthy picnic setup",
  },
  {
    id: 59,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=500&fit=crop",
    title: "Getting Ready",
    prompt: "Getting ready lifestyle portrait, vanity mirror setup, applying final touches, anticipation expression, date night prep, behind the scenes glamour, realistic routine",
  },
  {
    id: 60,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=400&h=500&fit=crop",
    title: "Bike Ride",
    prompt: "Bicycle lifestyle portrait, cruising through neighborhood, basket with flowers, casual summer dress, carefree joyful expression, active lifestyle, vintage bike aesthetic",
  },

  // PODCAST CATEGORY (15 prompts)
  {
    id: 61,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    title: "Studio Interview",
    prompt: "Professional podcast setup portrait, subject looking at camera monitor, interview lighting with soft key light, studio environment with equipment visible, elegant wavy hair, professional yet approachable expression",
  },
  {
    id: 62,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=500&fit=crop",
    title: "Microphone Setup",
    prompt: "Podcast recording portrait, professional microphone in foreground, headphones on, focused recording expression, soundproofed studio background, content creator setup, professional audio equipment",
  },
  {
    id: 63,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=500&fit=crop",
    title: "Guest Speaker",
    prompt: "Podcast guest portrait, conversational setting, two microphones visible, engaged discussion pose, warm studio lighting, interview atmosphere, professional but casual vibe",
  },
  {
    id: 64,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    title: "Home Studio",
    prompt: "Home podcast studio portrait, DIY recording setup, acoustic panels visible, authentic creator space, natural personality showing, indie podcaster aesthetic, relatable content creator",
  },
  {
    id: 65,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1590649880765-91b1956b8276?w=400&h=500&fit=crop",
    title: "Live Recording",
    prompt: "Live podcast recording portrait, animated talking expression, hand gestures mid-conversation, dynamic energy, professional lighting setup, engaging host personality",
  },
  {
    id: 66,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    title: "Podcast Thumbnail",
    prompt: "Podcast thumbnail portrait, direct eye contact with camera, friendly approachable smile, professional yet warm, perfect for podcast cover art, clean simple background",
  },
  {
    id: 67,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=400&h=500&fit=crop",
    title: "Interview Mode",
    prompt: "Interview podcast portrait, listening intently, thoughtful expression, professional attire, studio background with equipment, engaged listener pose, supportive interviewer vibes",
  },
  {
    id: 68,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1560087637-bf797bc7a589?w=400&h=500&fit=crop",
    title: "Solo Episode",
    prompt: "Solo podcast portrait, intimate recording setup, direct camera address, personal connection with audience, cozy studio atmosphere, authentic solo creator content",
  },
  {
    id: 69,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=400&h=500&fit=crop",
    title: "Professional Host",
    prompt: "Professional podcast host portrait, polished appearance, confident hosting energy, broadcast quality setup, media professional aesthetic, established podcaster vibes",
  },
  {
    id: 70,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop",
    title: "Casual Chat",
    prompt: "Casual podcast conversation portrait, relaxed informal setting, laughing mid-conversation, authentic genuine moment, friend-like atmosphere, conversational podcast style",
  },
  {
    id: 71,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=500&fit=crop",
    title: "Tech Setup",
    prompt: "Tech podcast setup portrait, multiple screens visible, professional audio interface, tech-savvy creator, modern equipment, digital content creator aesthetic",
  },
  {
    id: 72,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?w=400&h=500&fit=crop",
    title: "Story Time",
    prompt: "Storytelling podcast portrait, expressive face, animated storytelling, captivating audience attention, dramatic lighting for mood, narrative podcast aesthetic",
  },
  {
    id: 73,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=400&h=500&fit=crop",
    title: "Video Podcast",
    prompt: "Video podcast portrait, camera and microphone setup, YouTube podcast aesthetic, multi-platform creator, professional video lighting, modern content creation",
  },
  {
    id: 74,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=500&fit=crop",
    title: "Group Discussion",
    prompt: "Group podcast portrait, multiple hosts visible, round table discussion, collaborative energy, diverse voices, panel discussion aesthetic, ensemble cast vibes",
  },
  {
    id: 75,
    category: "Podcast",
    image: "https://images.unsplash.com/photo-1573165067541-4cd6d9837902?w=400&h=500&fit=crop",
    title: "Educational Content",
    prompt: "Educational podcast portrait, expert speaking, informative presentation, professional credibility, teaching moment, knowledge sharing aesthetic, authority in field",
  },

  // FITNESS CATEGORY (15 prompts)
  {
    id: 76,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1526510747491-312a5e5cc51c?w=400&h=500&fit=crop",
    title: "Athletic Portrait",
    prompt: "Fitness lifestyle portrait, athletic wear, toned physique, natural confident expression, gym or outdoor setting, motivational aesthetic, strong lighting emphasizing muscle definition",
  },
  {
    id: 77,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    title: "Yoga Flow",
    prompt: "Yoga practice portrait, peaceful meditation pose, natural outdoor setting, serene expression, flexible strong body, wellness aesthetic, mindful movement capture",
  },
  {
    id: 78,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    title: "Gym Session",
    prompt: "Gym workout portrait, lifting weights, determined focused expression, gym equipment background, athletic sports bra, sweat glistening, powerful strong woman aesthetic",
  },
  {
    id: 79,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=500&fit=crop",
    title: "Running Strong",
    prompt: "Running fitness portrait, mid-stride action shot, athletic leggings and top, outdoor trail setting, determined expression, cardio endurance aesthetic, active lifestyle",
  },
  {
    id: 80,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=500&fit=crop",
    title: "Pilates Precision",
    prompt: "Pilates portrait, controlled movement pose, reformer or mat setting, elongated graceful body, focused concentration, core strength aesthetic, toned feminine physique",
  },
  {
    id: 81,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&h=500&fit=crop",
    title: "Post Workout Glow",
    prompt: "Post workout portrait, healthy flush on cheeks, satisfied accomplished expression, towel around neck, water bottle in hand, endorphin high aesthetic, fitness achievement",
  },
  {
    id: 82,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=500&fit=crop",
    title: "Boxing Power",
    prompt: "Boxing fitness portrait, wrapped hands or gloves, powerful stance, intense focused gaze, boxing gym setting, fighter aesthetic, strong empowered woman",
  },
  {
    id: 83,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&h=500&fit=crop",
    title: "Stretching Session",
    prompt: "Stretching fitness portrait, flexibility demonstration, athletic wear, peaceful focused expression, studio or gym setting, recovery and mobility aesthetic, limber body",
  },
  {
    id: 84,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=500&fit=crop",
    title: "CrossFit Athlete",
    prompt: "CrossFit portrait, functional fitness setting, chalk on hands, athletic muscular build, high intensity aesthetic, box gym background, competitive athlete vibes",
  },
  {
    id: 85,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1609899464926-209951de3e54?w=400&h=500&fit=crop",
    title: "Dance Fitness",
    prompt: "Dance fitness portrait, mid-movement capture, joyful energetic expression, colorful athletic wear, studio mirrors background, fun workout aesthetic, dance cardio vibes",
  },
  {
    id: 86,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=500&fit=crop",
    title: "Swimming Strong",
    prompt: "Swimming fitness portrait, poolside or in water, athletic swimsuit, wet hair slicked back, strong swimmer physique, aquatic athlete aesthetic, competitive swimmer",
  },
  {
    id: 87,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1518644961665-ed172691aaa1?w=400&h=500&fit=crop",
    title: "Cycling Session",
    prompt: "Indoor cycling portrait, spin bike setup, intense cardio expression, athletic wear, dramatic studio lighting, high energy workout, cycling class aesthetic",
  },
  {
    id: 88,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=500&fit=crop",
    title: "Barre Beautiful",
    prompt: "Barre fitness portrait, ballet-inspired pose, graceful yet strong, barre studio setting, elegant athletic wear, dancer physique, feminine strength aesthetic",
  },
  {
    id: 89,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=500&fit=crop",
    title: "Outdoor HIIT",
    prompt: "Outdoor HIIT workout portrait, park or beach setting, high intensity movement, natural sunlight, athletic determination, functional fitness aesthetic, outdoor bootcamp",
  },
  {
    id: 90,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=500&fit=crop",
    title: "Wellness Journey",
    prompt: "Fitness transformation portrait, healthy confident glow, athletic casual wear, natural lighting, wellness journey aesthetic, health and fitness lifestyle, inspiring progress",
  },

  // PORTRAIT CATEGORY (15 prompts)
  {
    id: 91,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    title: "Hair Rollers Glam",
    prompt: "Behind the scenes glamour shot, pink velcro hair rollers in styled updo, dramatic smokey eye makeup, hands framing face elegantly, soft beauty lighting with ring light reflection in eyes",
  },
  {
    id: 92,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    title: "Contour Tutorial",
    prompt: "Makeup contouring tutorial portrait, applying contour with brush to cheekbone, professional beauty look, clean elegant updo hairstyle, extreme focus on technique, beauty education content",
  },
  {
    id: 93,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    title: "Natural Light Portrait",
    prompt: "Natural light portrait, soft window lighting, minimal makeup, authentic genuine expression, simple clean background, editorial portrait photography, raw natural beauty",
  },
  {
    id: 94,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    title: "Studio Headshot",
    prompt: "Professional studio headshot, clean backdrop, perfect lighting setup, confident approachable expression, corporate yet creative, LinkedIn profile quality, polished professional image",
  },
  {
    id: 95,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
    title: "Artistic Portrait",
    prompt: "Artistic portrait photography, creative lighting, interesting shadows, unique angle, editorial art direction, gallery-worthy portrait, fine art aesthetic",
  },
  {
    id: 96,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    title: "Candid Moment",
    prompt: "Candid portrait capture, unposed natural moment, genuine laughter or expression, photojournalistic style, authentic emotion, real moment frozen in time",
  },
  {
    id: 97,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    title: "Classic Beauty",
    prompt: "Classic beauty portrait, timeless elegant styling, soft diffused lighting, refined feminine features, traditional portrait composition, museum-quality aesthetic",
  },
  {
    id: 98,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
    title: "Environmental Portrait",
    prompt: "Environmental portrait, subject in their element, contextual background telling story, natural authentic setting, documentary style, character study aesthetic",
  },
  {
    id: 99,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    title: "Close-up Detail",
    prompt: "Extreme close-up portrait, detailed skin texture visible, sharp focus on eyes, intimate personal connection, beauty in details, macro portrait aesthetic",
  },
  {
    id: 100,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop",
    title: "Moody Portrait",
    prompt: "Moody dramatic portrait, low key lighting, intense shadows, emotional depth, cinematic quality, dark aesthetic, powerful brooding expression",
  },
  {
    id: 101,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    title: "Fashion Portrait",
    prompt: "Fashion-forward portrait, editorial styling, bold makeup and hair, high fashion pose, magazine editorial quality, avant-garde aesthetic, striking visual impact",
  },
  {
    id: 102,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=500&fit=crop",
    title: "Golden Hour Magic",
    prompt: "Golden hour portrait, warm sunset backlighting, sun flare and glow, magical hour quality, ethereal romantic lighting, dreamy warm tones",
  },
  {
    id: 103,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop",
    title: "Joyful Expression",
    prompt: "Joyful portrait, genuine happy smile, bright eyes, positive energy radiating, uplifting mood, infectious happiness, feel-good portrait aesthetic",
  },
  {
    id: 104,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop",
    title: "Black and White",
    prompt: "Black and white portrait, high contrast monochrome, timeless classic aesthetic, dramatic shadows, film photography feel, artistic monochromatic beauty",
  },
  {
    id: 105,
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=500&fit=crop",
    title: "Soft Focus Dream",
    prompt: "Soft focus portrait, dreamy ethereal quality, gentle diffusion, romantic soft aesthetic, vintage lens effect, delicate feminine beauty, painterly quality",
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
        className="relative flex h-auto max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#141414] md:flex-row"
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
        <div className="relative flex h-40 w-full shrink-0 items-center justify-center bg-black/50 md:h-full md:w-[40%]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
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
              transition={{ delay: Math.min(index * 0.03, 0.5) }}
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
