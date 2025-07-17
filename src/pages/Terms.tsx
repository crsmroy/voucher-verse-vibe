
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navigation />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-55">
        {/* Original elements */}
        <div className="absolute top-20 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-15 float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 gradient-tertiary rounded-full opacity-8 float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-warm-orange rounded-full opacity-25 float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-32 left-1/3 w-16 h-16 bg-neon-pink rounded-lg rotate-12 opacity-20 float" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-60 right-1/3 w-28 h-28 bg-electric-blue rounded-full opacity-15 float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-lime-green rounded-lg rotate-45 opacity-18 float" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-3/4 left-16 w-36 h-36 gradient-primary rounded-full opacity-12 float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-16 left-2/3 w-20 h-20 bg-teal rounded-lg rotate-30 opacity-22 float" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-32 left-1/2 w-18 h-18 bg-warm-orange rounded-full opacity-16 float" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-14 h-14 gradient-secondary rounded-lg rotate-60 opacity-14 float" style={{animationDelay: '2.2s'}}></div>
        <div className="absolute bottom-60 left-20 w-22 h-22 bg-neon-pink rounded-full opacity-19 float" style={{animationDelay: '0.7s'}}></div>
      </div>
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-center mb-8 bounce-in text-shadow">
            📋 Terms & Conditions
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                Welcome to our funky terms! These keep everything fair and fun for everyone! 🎉
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🎯 Acceptance of Terms</h2>
              <p className="text-purple-700 mb-4">
                By accessing and using FunkyCart, you accept and agree to be bound by the terms 
                and provision of this agreement. These terms apply to all users of the site.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🛍️ Use of Service</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>You must be at least 13 years old to use this service</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You will not use the service for any unlawful purposes</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">💳 Orders and Payments</h2>
              <p className="text-purple-700 mb-4">
                All orders are subject to acceptance and availability. Prices are subject to change 
                without notice. We accept various payment methods and all transactions are secure.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">📦 Product Availability</h2>
              <p className="text-purple-700 mb-4">
                We strive to ensure all products listed are available, but cannot guarantee 
                availability. In case of unavailability, we will notify you and offer alternatives 
                or a full refund.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">⚖️ Limitation of Liability</h2>
              <p className="text-purple-700 mb-4">
                FunkyCart shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of the service.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔄 Changes to Terms</h2>
              <p className="text-purple-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be posted on 
                this page and your continued use constitutes acceptance of modified terms.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                Last updated: December 2024 ✨
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
