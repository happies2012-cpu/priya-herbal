"use client"

import { motion } from 'framer-motion'
import { Leaf, Heart, Shield, Truck, Award, Users } from 'lucide-react'

const features = [
    {
        icon: Leaf,
        title: "100% Natural",
        description: "Pure herbal ingredients sourced from trusted organic farms",
        color: "from-green-500 to-emerald-600"
    },
    {
        icon: Shield,
        title: "Ayurvedic Certified",
        description: "Authentic formulations backed by 5000 years of Ayurveda",
        color: "from-blue-500 to-cyan-600"
    },
    {
        icon: Award,
        title: "GMP Certified",
        description: "Manufactured in GMP certified facilities with strict quality control",
        color: "from-purple-500 to-pink-600"
    },
    {
        icon: Users,
        title: "50,000+ Customers",
        description: "Trusted by thousands for their wellness journey",
        color: "from-orange-500 to-red-600"
    },
    {
        icon: Truck,
        title: "Free Shipping",
        description: "Free delivery on orders above ₹499 across India",
        color: "from-teal-500 to-green-600"
    },
    {
        icon: Heart,
        title: "Customer Love",
        description: "4.7★ average rating from verified customers",
        color: "from-rose-500 to-pink-600"
    }
]

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Why Choose PriyaHerbal?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Experience the perfect blend of ancient wisdom and modern quality standards
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            {/* Icon */}
                            <div className={`relative mb-6 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
