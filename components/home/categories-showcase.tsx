"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

const categories = [
    {
        name: "Hair Care",
        description: "Natural solutions for healthy, lustrous hair",
        productCount: 10,
        image: "/categories/hair-care.jpg",
        gradient: "from-amber-500 to-orange-600",
        href: "/shop?category=hair-care"
    },
    {
        name: "Skin Care",
        description: "Radiant skin with Ayurvedic rituals",
        productCount: 12,
        image: "/categories/skin-care.jpg",
        gradient: "from-pink-500 to-rose-600",
        href: "/shop?category=skin-care"
    },
    {
        name: "Immunity Boosters",
        description: "Strengthen your body's natural defense",
        productCount: 8,
        image: "/categories/immunity.jpg",
        gradient: "from-teal-500 to-cyan-600",
        href: "/shop?category=immunity-boosters"
    },
    {
        name: "Wellness & Energy",
        description: "Vitality and balance for modern life",
        productCount: 8,
        image: "/categories/wellness.jpg",
        gradient: "from-purple-500 to-indigo-600",
        href: "/shop?category=wellness-energy"
    },
    {
        name: "Digestive Health",
        description: "Support your gut with herbal remedies",
        productCount: 6,
        image: "/categories/digestive.jpg",
        gradient: "from-green-500 to-emerald-600",
        href: "/shop?category=digestive-health"
    },
    {
        name: "Women's Health",
        description: "Specially formulated for women's wellness",
        productCount: 6,
        image: "/categories/womens.jpg",
        gradient: "from-violet-500 to-purple-600",
        href: "/shop?category=womens-health"
    }
]

export default function CategoriesShowcase() {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-green-600" />
                        <span className="text-green-600 font-semibold uppercase tracking-wide">Shop by Category</span>
                        <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Explore Our Collections
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover authentic Ayurvedic solutions for every wellness need
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <Link href={category.href}>
                                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />

                                    {/* Pattern Overlay */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                                        }} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-end p-8 text-white">
                                        {/* Product Count Badge */}
                                        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                                            <span className="text-sm font-semibold">{category.productCount} Products</span>
                                        </div>

                                        {/* Category Info */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <h3 className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform">
                                                {category.name}
                                            </h3>
                                            <p className="text-white/90 mb-4">
                                                {category.description}
                                            </p>

                                            {/* CTA */}
                                            <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                                                <span>Explore Collection</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </motion.div>

                                        {/* Decorative Circle */}
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        View All Products
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
