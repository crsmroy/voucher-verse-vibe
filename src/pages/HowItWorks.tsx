import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [])

  const steps = [
    {
      number: '01',
      title: 'Browse & Choose',
      description: 'Find any product you want from popular online stores like Amazon, Flipkart, Myntra, and more.',
      icon: '🛍️',
      color: 'from-neon-pink to-warm-orange',
      details: ["Copy & Paste the product link", "Enter the product's price as on marketplace final checkout page", "Select quantity", "Choose product category"]
    },
    {
      number: '02',
      title: 'Select Voucher or Free Second Product',
      description: 'Pick from our collection of premium vouchers or get a complimentary product that you want to buy.',
      icon: '🎫',
      color: 'from-electric-blue to-teal',
      details: ["On Choosing Voucher :->", "Choose voucher amount", "Choose any Listed Platform", "On choosing complimentary product :->", "Copy & Paste the product link", "Enter the product's price as on marketplace final checkout page", "Select quantity", "Choose product category"]
    },
    {
      number: '03',
      title: 'Place your order through Cash on Delivery',
      description: '1st time user? Still having doubt on us. No problem, we got you covered.',
      icon: '💳',
      color: 'from-lime-green to-electric-blue',
      details: ["Fill your complete address details", "Place COD and", "Order is placed successfully within minutes", "Order details will be shared directly to your marketplace app like Flipkart and Amazon"]
    },
    {
      number: '04',
      title: 'Get your Order in your hands',
      description: 'Be satisfied first, pay later.',
      icon: '🛒',
      color: 'from-warm-orange to-neon-pink',
      details: ["Shipping and delivery will be handled by marketplace itself", "Verify your order at your doorstep first", "Pay the actual product amount reflecting in marketplace app."]
    },
    {
      number: '05',
      title: 'Claim your reimbursement',
      description: 'Get back the full amount you paid us for the product.',
      icon: '📦',
      color: 'from-electric-blue to-teal',
      details: ["Pay the remaining amount to us and get your invoice", "Generated GST Invoice will be sent over your email and whatsapp", "Upload our invoice and claim your full refund from your company", "Hurray! You just got double benefits"]
    },
    {
      number: '06',
      title: 'Get your Voucher(Only in case if you choosed voucher)',
      description: 'Voucher will be sent along with redeem code and password to your email and WhatsApp.',
      icon: '💰',
      color: 'from-electric-blue to-neon-pink',
      details: ["Pay the remaining amount to us and get your voucher and GST invoice", "Reedem your voucher on the voucher's respective platform", "Return and Replacement will be handled by marketplace directly"]
    },
    {
      number: '07',
      title: 'Raise Replacement or Return',
      description: "Raise Replacement in case of defective product or Return the product if you don't like it. No Questions asked.",
      icon: '💰',
      color: 'from-neon-pink to-warm-orange',
      details: ["Our suggestion would be to not accept any defective product on open box delivery.", "Since you haven't paid yet till this time, you will not be charged even a single penny.", "Even if you missed it during open box delivery and paid for the product, raise replacement/return on our website.", "We will organise a pickup from your same delivered address.", "Return and Replacement will be handled by marketplace directly", "In case of product return, voucher will not be returned/replaced", "In case of product return, product price and its GST would be refunded only", "In case of replacement, you would not be eligible for any refund."]
    }
  ];

  const steps2 = [
    {
      number: '01',
      title: 'Browse & Choose',
      description: 'Find any product you want from popular online stores like Amazon, Flipkart, Myntra, and more.',
      icon: '🛍️',
      color: 'from-neon-pink to-warm-orange',
      details: ["Copy & Paste the product link", "Enter the product's price as on marketplace final checkout page", "Select quantity", "Choose product category"]
    },
    {
      number: '02',
      title: 'Select Voucher or Free Second Product',
      description: 'Pick from our collection of premium vouchers or get a complimentary product that you want to buy.',
      icon: '🎫',
      color: 'from-electric-blue to-teal',
      details: ["On Choosing Voucher :->", "Choose voucher amount", "Choose any Listed Platform", "On choosing complimentary product :->", "Copy & Paste the product link", "Enter the product's price as on marketplace final checkout page", "Select quantity", "Choose product category"]
    },
    {
      number: '03',
      title: 'Place your order and make payment',
      description: 'Scan our QR and pay through your own secure payment app.',
      icon: '💳',
      color: 'from-lime-green to-electric-blue',
      details: ["Fill your complete address details and proceed for payments", "Scan QR code or type our UPI ID in your payment app", "Once paid, Take screenshot of transaction and upload the screenshot", "Type down transaction id (for quick verification)", "Within couple of minutes your payment will be verified", "If not verified, we will contact you with the details"]
    },
    {
      number: '04',
      title: 'Get your Order in your hands',
      description: 'Be satisfied first, pay later.',
      icon: '🛒',
      color: 'from-warm-orange to-neon-pink',
      details: ["Order is placed successfully within minutes", "Order details will be shared directly to your marketplace app like Flipkart and Amazon", "Shipping and delivery will be handled by marketplace itself", "Verify your order at your doorstep"]
    },
    {
      number: '05',
      title: 'Claim your reimbursement',
      description: 'Get back the full amount you paid us for the product.',
      icon: '📦',
      color: 'from-electric-blue to-teal',
      details: ["Pay the remaining amount to us and get your invoice", "Generated GST Invoice will be sent over your email and whatsapp", "Upload our invoice and claim your full refund from your company", "Hurray! You just got double benefits"]
    },
    {
      number: '06',
      title: 'Get your Voucher(Only in case if you choosed voucher)',
      description: 'Voucher will be sent along with redeem code and password to your email and WhatsApp.',
      icon: '💰',
      color: 'from-electric-blue to-neon-pink',
      details: ["Pay the remaining amount to us and get your voucher and GST invoice", "Reedem your voucher on the voucher's respective platform", "Return and Replacement will be handled by marketplace directly"]
    },
    {
      number: '07',
      title: 'Raise Replacement or Return',
      description: "Raise Replacement in case of defective product or Return the product if you don't like it. No Questions asked.",
      icon: '💰',
      color: 'from-neon-pink to-warm-orange',
      details: ["Our suggestion would be to not accept any defective product on open box delivery.", "Since you haven't paid yet till this time, you will not be charged even a single penny.", "Even if you missed it during open box delivery and paid for the product, raise replacement/return on our website.", "We will organise a pickup from your same delivered address.", "Return and Replacement will be handled by marketplace directly", "In case of product return, voucher will not be returned/replaced", "In case of product return, product price and its GST would be refunded only", "In case of replacement, you would not be eligible for any refund."]
    }
  ];

  const [activeTab, setActiveTab] = useState('voucher');

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* Primary large background elements - visible on all screens */}
        <div className="absolute top-20 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 gradient-tertiary rounded-full opacity-8 float blur-sm" style={{animationDelay: '2s'}}></div>
        
        {/* Modern gradient blobs - reduced count */}
        <div className="absolute top-16 right-1/3 w-48 h-48 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 rounded-full opacity-8 float blur-sm" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-56 h-56 bg-gradient-to-tr from-green-300 via-blue-400 to-purple-500 rounded-full opacity-6 float blur-sm" style={{animationDelay: '2.2s'}}></div>
        
        {/* Medium elements - hidden on mobile */}
        <div className="hidden md:block absolute top-40 right-20 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-15 float" style={{animationDelay: '1s'}}></div>
        <div className="hidden md:block absolute top-1/2 right-10 w-20 h-20 bg-warm-orange rounded-full opacity-20 float" style={{animationDelay: '0.5s'}}></div>
        <div className="hidden md:block absolute top-48 left-20 w-24 h-12 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full opacity-15 float" style={{animationDelay: '1.2s'}}></div>
        
        {/* Small accent elements - hidden on mobile */}
        <div className="hidden lg:block absolute top-60 right-20 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg rotate-12 opacity-18 float" style={{animationDelay: '0.6s'}}></div>
        <div className="hidden lg:block absolute bottom-60 left-24 w-16 h-16 bg-gradient-to-tr from-violet-400 to-purple-500 rounded-lg rotate-45 opacity-15 float" style={{animationDelay: '2.1s'}}></div>
        <div className="hidden lg:block absolute top-32 left-2/3 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-25 float" style={{animationDelay: '0.4s'}}></div>
      </div>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto rounded-lg">
          {/* Header */}
          <div className="text-center mb-5 slide-in bg-white py-5 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How It <span className="bg-gradient-to-r from-neon-pink via-electric-blue to-teal bg-clip-text text-transparent">Works</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our simple 6-step process to help you save money on every purchase. 
              It's easy, secure, and designed with you in mind! 🚀
            </p>
            <div className="flex justify-center">
              <Link to="/product">
                <Button className="btn-glow gradient-primary text-white px-8 py-4 text-lg font-semibold border-0">
                  Start Saving Now →
                </Button>
              </Link>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="voucher" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-lime-green data-[state=active]:to-electric-blue data-[state=active]:text-white"
              >
                🎫 Cash On Delivery
              </TabsTrigger>
              <TabsTrigger 
                value="freeProduct" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-blue data-[state=active]:to-teal data-[state=active]:text-white"
              >
                🎁 Prepaid Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voucher" className="space-y-4 animate-fade-in py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-xl">
              {/* Steps */}
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={index} className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Step Content */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold`}>
                          {step.number}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                          <p className="text-lg text-gray-600 mt-2">{step.description}</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 ml-20">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-700">
                            <span className="w-2 h-2 bg-gradient-to-r from-neon-pink to-electric-blue rounded-full"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step Visual */}
                    <div className="flex-1 flex justify-center">
                      <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 w-full max-w-md">
                        <CardContent className="p-8 text-center">
                          <div className="text-6xl mb-4">{step.icon}</div>
                          <div className={`w-full h-2 bg-gradient-to-r ${step.color} rounded-full mb-4`}></div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600">Step {step.number} of our process</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="freeProduct" className="space-y-4 animate-fade-in bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-xl">
              {/* Steps */}
              <div className="space-y-12">
                {steps2.map((step, index) => (
                  <div key={index} className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Step Content */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold`}>
                          {step.number}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                          <p className="text-lg text-gray-600 mt-2">{step.description}</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 ml-20">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-700">
                            <span className="w-2 h-2 bg-gradient-to-r from-neon-pink to-electric-blue rounded-full"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step Visual */}
                    <div className="flex-1 flex justify-center">
                      <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 w-full max-w-md">
                        <CardContent className="p-8 text-center">
                          <div className="text-6xl mb-4">{step.icon}</div>
                          <div className={`w-full h-2 bg-gradient-to-r ${step.color} rounded-full mb-4`}></div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600">Step {step.number} of our process</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          

          {/* Benefits Section */}
          <section className="mt-20 py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="bg-gradient-to-r from-electric-blue to-teal bg-clip-text text-transparent">FreedomVouchers?</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 px-8">
              {[
                {
                  icon: '💯',
                  title: 'Guaranteed Savings',
                  description: 'Save 10-20% on every purchase with our premium voucher system'
                },
                {
                  icon: '🔒',
                  title: 'Completely Safe',
                  description: 'Secure payments, verified vendors, and 100% legitimate transactions'
                },
                {
                  icon: '⚡',
                  title: 'Super Fast',
                  description: 'Quick processing and delivery within 3-7 business days'
                }
              ].map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <div className="bg-gradient-to-r from-neon-pink via-electric-blue to-teal p-1 rounded-2xl inline-block">
              <div className="bg-white rounded-2xl px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Start Saving?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of smart shoppers who save money every day with FreedomVouchers
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/product">
                    <Button className="btn-glow gradient-primary text-white px-8 py-4 text-lg font-semibold border-0">
                      Shop Now 🛍️
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white">
                      Contact Us 💬
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
