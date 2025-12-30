"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift, Sparkles, Check } from 'lucide-react'

export default function NewsletterSection() {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true)
            setIsLoading(false)
            setEmail('')
        }, 1500)
    }

    return (
        <section className="py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20"
                        >
                            <Gift className="w-10 h-10 text-yellow-300" />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Join Our Wellness Community
                        </h2>
                        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                            Subscribe to get exclusive offers, wellness tips, and be the first to know about new products
                        </p>

                        {/* Benefits */}
                        <div className="flex flex-wrap justify-center gap-6 mb-10">
                            {[
                                "10% Off First Order",
                                "Exclusive Wellness Tips",
                                "Early Access to Sales",
                                "Free Ayurvedic Guides"
                            ].map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-2 text-white"
                                >
                                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-900" />
                                    </div>
                                    <span className="font-semibold">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="max-w-2xl mx-auto"
                    >
                        {!isSubscribed ? (
                            <form onSubmit={handleSubmit} className="relative">
                                <div className="relative flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-8 py-4 bg-white hover:bg-green-50 text-green-900 font-bold rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Subscribe Now
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="text-center text-green-100 text-sm mt-4">
                                    By subscribing, you agree to our Privacy Policy and consent to receive updates
                                </p>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl p-8 text-center"
                            >
                                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Welcome to the Family! 🎉
                                </h3>
                                <p className="text-green-100">
                                    Check your inbox for your exclusive 10% discount code
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-12 text-green-100"
                    >
                        <p className="text-sm">
                            Join <span className="font-bold text-white">25,000+</span> wellness enthusiasts already subscribed
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
