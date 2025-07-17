
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const ShippingPolicy = () => {
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
            🚚 Shipping Policy
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                Get your funky products delivered with style! Here's everything about our shipping! 📦✨
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🌍 Shipping Areas</h2>
              <p className="text-purple-700 mb-4">
                We currently ship to all locations within the United States. International shipping 
                is coming soon - stay tuned for updates!
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">⚡ Processing Time</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Standard orders: 1-2 business days</li>
                <li>Custom/personalized items: 3-5 business days</li>
                <li>Pre-orders: As specified on product page</li>
                <li>Holiday seasons may extend processing time</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🎯 Delivery Options</h2>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">Standard Shipping (FREE)</h3>
                <ul className="list-disc list-inside text-purple-600 space-y-1">
                  <li>5-7 business days delivery</li>
                  <li>Free on orders over $50</li>
                  <li>$5.99 on orders under $50</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">Express Shipping</h3>
                <ul className="list-disc list-inside text-purple-600 space-y-1">
                  <li>2-3 business days delivery</li>
                  <li>$12.99 shipping fee</li>
                  <li>Available for most items</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">Overnight Shipping</h3>
                <ul className="list-disc list-inside text-purple-600 space-y-1">
                  <li>Next business day delivery</li>
                  <li>$24.99 shipping fee</li>
                  <li>Order by 2 PM for next day delivery</li>
                </ul>
              </div>
              
              <h2 className="section-title text-2xl mt-8 mb-4">📱 Order Tracking</h2>
              <p className="text-purple-700 mb-4">
                Once your order ships, you'll receive a tracking number via email. You can track 
                your package in real-time and know exactly when your funky goodies will arrive!
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🏠 Delivery Instructions</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Someone must be available to receive the package</li>
                <li>We'll leave packages in safe locations if no one's home</li>
                <li>Apartment residents: provide buzzer codes if needed</li>
                <li>Special instructions can be added during checkout</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">❓ Shipping Issues</h2>
              <p className="text-purple-700 mb-4">
                Package lost or damaged? Contact us immediately! We'll work with the carrier to 
                resolve the issue and ensure you get your products in perfect condition.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                Questions about shipping? We're here to help make it smooth and funky! 🎨📞
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
