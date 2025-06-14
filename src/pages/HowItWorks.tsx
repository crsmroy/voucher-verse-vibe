import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Browse & Choose',
      description: 'Find any product you want from popular online stores like Amazon, Flipkart, Myntra, and more.',
      icon: '🛍️',
      color: 'from-neon-pink to-warm-orange',
      details: ['Copy the product link', 'Enter the price', 'Select quantity', 'Choose category']
    },
    {
      number: '02',
      title: 'Select Voucher',
      description: 'Pick from our collection of premium vouchers to maximize your savings on the purchase.',
      icon: '🎫',
      color: 'from-electric-blue to-teal',
      details: ['10-20% discount vouchers', 'Platform-specific offers', 'Seasonal promotions', 'Bulk order discounts']
    },
    {
      number: '03',
      title: 'Secure Payment',
      description: 'Pay through our secure payment system and upload your transaction proof for verification.',
      icon: '💳',
      color: 'from-lime-green to-electric-blue',
      details: ['UPI payments', 'QR code scanning', 'Transaction verification', 'Instant confirmation']
    },
    {
      number: '04',
      title: 'We Purchase',
      description: 'Our team uses the vouchers to buy your product at the discounted price from the retailer.',
      icon: '🛒',
      color: 'from-warm-orange to-neon-pink',
      details: ['Professional buyers', 'Best price guarantee', 'Quality verification', 'Fast processing']
    },
    {
      number: '05',
      title: 'Direct Delivery',
      description: 'The product is shipped directly to your address with full tracking and insurance.',
      icon: '📦',
      color: 'from-teal to-lime-green',
      details: ['Direct shipping', 'Package tracking', 'Insurance coverage', '3-7 day delivery']
    },
    {
      number: '06',
      title: 'Save Money',
      description: 'Enjoy your new product while saving money compared to buying it yourself!',
      icon: '💰',
      color: 'from-electric-blue to-neon-pink',
      details: ['Guaranteed savings', '24/7 support', 'Return policy', 'Happy customers']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-15 float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 gradient-tertiary rounded-full opacity-8 float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 slide-in">
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
  );
};

export default HowItWorks;
