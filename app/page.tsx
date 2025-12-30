import { Suspense } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import EnhancedHeroSlider from "@/components/home/enhanced-hero-slider"
import FeaturesSection from "@/components/home/features-section"
import CategoriesShowcase from "@/components/home/categories-showcase"
import FeaturedProducts from "@/components/home/featured-products"
import AIRecommendations from "@/components/ai/ai-recommendations"
import TestimonialsSlider from "@/components/home/testimonials-slider"
import NewsletterSection from "@/components/home/newsletter-section"
import TrustBadges from "@/components/home/trust-badges"
import WhatsAppWidget from "@/components/home/whatsapp-widget"
import ChatWidget from "@/components/ai/chat-widget"
import { herbalProducts } from "@/lib/data/herbal-products"

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />

      {/* Enhanced Hero Section with 6 Sliders */}
      <EnhancedHeroSlider />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Features Section */}
      <FeaturesSection />

      {/* Categories Showcase */}
      <CategoriesShowcase />

      {/* AI-Powered Recommendations */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>}>
        <AIRecommendations
          allProducts={herbalProducts}
          title="AI-Powered Recommendations Just For You"
          limit={8}
        />
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>}>
        <FeaturedProducts />
      </Suspense>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Newsletter/Registration Section */}
      <NewsletterSection />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* AI Chat Assistant */}
      <ChatWidget />

      <Footer />
    </main>
  )
}

