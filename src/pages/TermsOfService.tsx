import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="min-h-screen">
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
          <h1 className="font-semibold text-center mb-10 bounce-in text-shadow text-5xl">
            📜 <span className="page-title">Terms of Service</span>
          </h1>
          
          <div className="funky-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-purple-600 text-xl mb-8 text-center">
                These are the rules that keep our funky community awesome and safe! 🌟
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🎪 Service Description</h2>
              <p className="text-purple-700 mb-4">
                FunkyCart provides an artistic e-commerce platform where users can browse, purchase, 
                and enjoy a unique shopping experience with vibrant design and creative flair.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">👤 User Accounts</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>You are responsible for maintaining account security</li>
                <li>One account per person</li>
                <li>Accurate information must be provided</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🚫 Prohibited Uses</h2>
              <ul className="list-disc list-inside text-purple-700 space-y-2 mb-4">
                <li>Fraudulent or deceptive practices</li>
                <li>Harassment or abuse of other users</li>
                <li>Violation of any applicable laws</li>
                <li>Interference with service operation</li>
                <li>Unauthorized access to other accounts</li>
              </ul>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔒 Privacy and Data</h2>
              <p className="text-purple-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand 
                how we collect, use, and protect your information.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">⚡ Service Availability</h2>
              <p className="text-purple-700 mb-4">
                We strive to maintain 99.9% uptime, but cannot guarantee uninterrupted service. 
                Maintenance and updates may temporarily affect availability.
              </p>
              
              <h2 className="section-title text-2xl mt-8 mb-4">🔧 Modifications</h2>
              <p className="text-purple-700 mb-4">
                We reserve the right to modify or discontinue any part of our service with or 
                without notice. We also reserve the right to update these terms at any time.
              </p>
              
              <p className="text-center text-purple-600 mt-12 text-lg font-semibold">
                By using FunkyCart, you agree to these terms! Let's keep it funky! 🎨
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
