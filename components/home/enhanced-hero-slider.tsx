"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, Leaf, Heart, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroSlide {
    id: number
    title: string
    subtitle: string
    description: string
    cta: string
    ctaLink: string
    image: string
    bgGradient: string
    badge?: string
}

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: "Discover Ancient Ayurvedic Wisdom",
        subtitle: "50+ Premium Herbal Products",
        description: "Transform your wellness journey with authentic Indian herbal remedies backed by 5000 years of Ayurvedic tradition",
        cta: "Explore Products",
        ctaLink: "/shop",
        image: "/hero/ayurveda-wellness.jpg",
        bgGradient: "from-green-900 via-green-800 to-emerald-900",
        badge: "100% Natural"
    },
    {
        id: 2,
        title: "AI-Powered Personalized Care",
        subtitle: "Smart Recommendations Just For You",
        description: "Get personalized product suggestions powered by advanced AI to match your unique wellness needs",
        cta: "Get Recommendations",
        ctaLink: "#ai-recommendations",
        image: "/hero/ai-wellness.jpg",
        bgGradient: "from-purple-900 via-pink-800 to-rose-900",
        badge: "AI Powered"
    },
    {
        id: 3,
        title: "Premium Hair Care Solutions",
        subtitle: "Natural Hair Growth & Nourishment",
        description: "Revitalize your hair with our bestselling Bhringraj, Onion & Rosemary oils - trusted by 50,000+ customers",
        cta: "Shop Hair Care",
        ctaLink: "/shop?category=hair-care",
        image: "/hero/hair-care.jpg",
        bgGradient: "from-amber-900 via-orange-800 to-red-900",
        badge: "Bestseller"
    },
    {
        id: 4,
        title: "Radiant Skin Naturally",
        subtitle: "Ayurvedic Skincare Rituals",
        description: "Achieve glowing skin with our Turmeric, Kumkumadi & Vitamin C collection - pure, effective, transformative",
        cta: "Discover Skincare",
        ctaLink: "/shop?category=skin-care",
        image: "/hero/skin-care.jpg",
        bgGradient: "from-pink-900 via-rose-800 to-red-900",
        badge: "Glowing Skin"
    },
    {
        id: 5,
        title: "Boost Your Immunity",
        subtitle: "Ancient Herbs, Modern Wellness",
        description: "Strengthen your body's defense with Chyawanprash, Giloy & Ashwagandha - nature's immunity boosters",
        cta: "Build Immunity",
        ctaLink: "/shop?category=immunity-boosters",
        image: "/hero/immunity.jpg",
        bgGradient: "from-teal-900 via-cyan-800 to-blue-900",
        badge: "Immunity"
    },
    {
        id: 6,
        title: "Women's Wellness Essentials",
        subtitle: "Hormonal Balance & Vitality",
        description: "Specially formulated Shatavari, Ashoka & Lodhra for women's health - trusted by Ayurvedic practitioners",
        cta: "Women's Health",
        ctaLink: "/shop?category=womens-health",
        image: "/hero/womens-health.jpg",
        bgGradient: "from-violet-900 via-purple-800 to-fuchsia-900",
        badge: "Women's Care"
    }
]

export default function EnhancedHeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [direction, setDirection] = useState(0)

    const nextSlide = useCallback(() => {
        setDirection(1)
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, [])

    const prevSlide = useCallback(() => {
        setDirection(-1)
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }, [])

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1)
        setCurrentSlide(index)
        setIsAutoPlaying(false)
    }

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            nextSlide()
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [isAutoPlaying, nextSlide])

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        })
    }

    const slide = heroSlides[currentSlide]

    return (
        <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-black">
            {/* Background Slides */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 }
                    }}
                    className="absolute inset-0"
                >
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90 z-10`} />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 z-10 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }} />
                    </div>

                    {/* Background Image (placeholder) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Left Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${currentSlide}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-white space-y-6"
                        >
                            {/* Badge */}
                            {slide.badge && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
                                >
                                    <Sparkles className="w-4 h-4 text-yellow-300" />
                                    <span className="text-sm font-semibold">{slide.badge}</span>
                                </motion.div>
                            )}

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-green-300 font-semibold text-lg tracking-wide uppercase"
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                            >
                                {slide.title}
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-xl text-gray-200 leading-relaxed max-w-xl"
                            >
                                {slide.description}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap gap-4 pt-4"
                            >
                                <Link
                                    href={slide.ctaLink}
                                    className="group relative px-8 py-4 bg-white text-green-900 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {slide.cta}
                                        <ShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>

                                <Link
                                    href="/shop"
                                    className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105 flex items-center gap-2"
                                >
                                    View All
                                    <Leaf className="w-5 h-5" />
                                </Link>
                            </motion.div>

                            {/* Features */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-wrap gap-6 pt-4"
                            >
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>100% Natural</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>Ayurvedic Certified</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>50,000+ Happy Customers</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Right Visual Element */}
                    <motion.div
                        key={`visual-${currentSlide}`}
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                        transition={{ duration: 0.6 }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-lg">
                            {/* Decorative circles */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/20 rounded-full blur-2xl animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

                            {/* Center icon/illustration */}
                            <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
                                <div className="flex items-center justify-center">
                                    <Leaf className="w-48 h-48 text-green-300 animate-float" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/30"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/30"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all ${index === currentSlide
                                ? 'w-12 h-3 bg-white'
                                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                            } rounded-full`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden md:block"
            >
                <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="text-sm">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
