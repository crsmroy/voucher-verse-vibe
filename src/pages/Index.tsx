import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Navigation from '@/components/Navigation';
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Noti from "@/components/ui/Noti"

const Index = () => {
  const steps = [
    {
      number: '01',
      title: 'Get Product + Perks',
      description: 'Buy your desired product and receive brand vouchers for your personal use.',
      icon: '🎁',
      color: 'from-neon-pink to-warm-orange'
    },
    {
      number: '02', 
      title: 'Delivered from Flipkart/Amazon/Marketplace',
      description: 'Your order is shipped directly from the actual website — fast and reliable delivery!',
      icon: '🚚',
      color: 'from-electric-blue to-teal'
    },
    {
      number: '03',
      title: 'Get GST Invoice',
      description: 'Get GST invoice from us on the premium amount you\'ve paid.',
      icon: '📄',
      color: 'from-lime-green to-electric-blue'
    },
    {
      number: '04',
      title: 'Claim & Get Reimbursed',
      description: 'Submit the invoice to your company and get your full amount reimbursed smoothly.',
      icon: '💼',
      color: 'from-warm-orange to-neon-pink'
    }
  ];

  const popularProducts = [
    { name: 'Electronics', icon: '📱', percentage: '35%', color: 'from-electric-blue to-teal' },
    { name: 'Fashion & Clothing', icon: '👕', percentage: '28%', color: 'from-neon-pink to-warm-orange' },
    { name: 'Home & Kitchen', icon: '🏠', percentage: '22%', color: 'from-lime-green to-electric-blue' },
    { name: 'Books & Media', icon: '📚', percentage: '15%', color: 'from-warm-orange to-neon-pink' },
    { name: 'Sports & Fitness', icon: '⚽', percentage: '18%', color: 'from-teal to-electric-blue' },
    { name: 'Beauty & Health', icon: '💄', percentage: '12%', color: 'from-neon-pink to-lime-green' },
    { name: 'Toys & Games', icon: '🎮', percentage: '8%', color: 'from-warm-orange to-teal' },
    { name: 'Automotive', icon: '🚗', percentage: '5%', color: 'from-electric-blue to-neon-pink' }
  ];

  const testimonials = [
    {
      review: 'I still laugh at the ukulele I bought last year — never touched it again. But this time, I made a smarter choice with FreedomVouchers!',
      rating: 5
    },
    {
      review: 'I just bought an air fryer from the wellness list and ended up getting my favorite skincare stuff with the voucher. Honestly, I wish I knew about this earlier!',
      rating: 5
    },
    {
      review: 'Thank you so much for these vouchers — finally bought that perfume and cosmetics I\'ve been eyeing for months. Felt like a personal treat!',
      rating: 5
    },
    {
      review: 'Please list Zomato/Swiggy vouchers too! 5 stars for your amazing service 🔥',
      rating: 5
    },
    {
      review: 'That treadmill is literally a clothes rack now. I wish I found this site earlier. But this time, I didn\'t waste a single rupee.',
      rating: 5
    },
    {
      review: 'Bought a mixer grinder using my wellness budget and for once, I didn\'t feel guilty. The voucher I got felt like a bonus gift to myself!',
      rating: 5
    },
    {
      review: 'This platform is a game-changer!',
      rating: 5
    },
    {
      review: 'Honestly, I thought it was a scam at first. But I gave it a try — and wow, this isn\'t like those fake sites. Thank you so much!',
      rating: 5
    }
  ];

  // Create autoplay plugin with proper structure
  const autoplayPlugin = () => ({
    name: 'autoplay',
    options: { active: true },
    init: (embla: any) => {
      let intervalId: NodeJS.Timeout;
      
      const play = () => {
        if (embla.canScrollNext()) {
          embla.scrollNext();
        } else {
          embla.scrollTo(0);
        }
      };
      
      const startAutoplay = () => {
        intervalId = setInterval(play, 3000);
      };
      
      const stopAutoplay = () => {
        if (intervalId) clearInterval(intervalId);
      };
      
      embla.on('pointerDown', stopAutoplay);
      embla.on('pointerUp', startAutoplay);
      
      startAutoplay();
      
      return () => {
        stopAutoplay();
      };
    },
    destroy: () => {}
  });

  // Enhanced autoplay for testimonials with smoother transitions
  const testimonialsAutoplayPlugin = () => ({
    name: 'testimonials-autoplay',
    options: { active: true },
    init: (embla: any) => {
      let intervalId: NodeJS.Timeout;
      
      const play = () => {
        if (embla.canScrollNext()) {
          embla.scrollNext();
        } else {
          embla.scrollTo(0);
        }
      };
      
      const startAutoplay = () => {
        intervalId = setInterval(play, 4000); // Slightly slower for testimonials
      };
      
      const stopAutoplay = () => {
        if (intervalId) clearInterval(intervalId);
      };
      
      // Pause on hover/interaction
      embla.on('pointerDown', stopAutoplay);
      embla.on('pointerUp', startAutoplay);
      embla.on('mouseEnter', stopAutoplay);
      embla.on('mouseLeave', startAutoplay);
      
      startAutoplay();
      
      return () => {
        stopAutoplay();
      };
    },
    destroy: () => {}
  });

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      <Noti message="We're currently processing a high volume of orders! To ensure quality, we're temporarily pausing new orders. Feel free to leave your details in contact us form we'll notify you once we're back!" />
      
      {/* Simplified Background Shapes - Fewer Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
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
        
        {/* Interactive elements - only on larger screens */}
        <div className="hidden lg:block absolute top-24 right-1/3 w-28 h-28 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-12 float items-center justify-center" style={{animationDelay: '0.3s'}}>
          <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
        </div>
        <div className="hidden lg:block absolute top-1/4 left-1/2 w-14 h-14 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg opacity-18 float items-center justify-center text-white text-xs font-bold" style={{animationDelay: '0.9s'}}>
          {}
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 slide-in text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-neon-pink via-electric-blue to-warm-orange bg-clip-text text-transparent">
                    Freedom
                  </span>
                  <br />
                  <span className="text-gray-900">Vouchers</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Get freedom from limited company-listed products — and enjoy brand vouchers on every purchase for your personal use. 🎯
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/product">
                  <Button 
                    size="lg" 
                    className="btn-glow gradient-primary text-white border-0 px-8 py-4 text-lg font-semibold hover:shadow-2xl group"
                  >
                    Start Shopping Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 py-4 text-lg font-semibold border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white transition-all duration-300"
                  >
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-16 pt-8 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent" style={{ WebkitTextStroke: '0.1px black' }}>100+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-warm-orange to-lime-green bg-clip-text text-transparent" style={{ WebkitTextStroke: '0.1px black' }}>24/7</div>
                  <div className="text-gray-600">Support Channel Available</div>
                </div>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 pulse-glow">
                <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="text-lg font-medium">Your Image Here</p>
                    <p className="text-sm">Responsive Container</p>
                  </div>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 gradient-primary rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 gradient-tertiary rounded-lg rotate-12 opacity-15"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section with Carousel */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Most <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Popular</span> Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers love to buy the most and get inspired for your next purchase
            </p>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: false,
                containScroll: "trimSnaps",
              }}
              plugins={[autoplayPlugin()]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {popularProducts.map((product, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${product.color} flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                          {product.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-neon-pink transition-colors duration-300">
                          {product.name}
                        </h3>
                        
                        <div className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-teal bg-clip-text text-transparent">
                          {product.percentage}
                        </div>
                        
                        <p className="text-gray-600 text-sm">of total orders</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to start saving money on all your favorite products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <CardContent className="p-8 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>
                  
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-neon-pink transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
                
                {/* Hover effect background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/product">
              <Button 
                size="lg" 
                className="btn-glow gradient-primary text-white border-0 px-8 py-4 text-lg font-semibold"
              >
                Start Your First Order 🚀
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 lg:p-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What We <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Do</span> and How We <span className="bg-gradient-to-r from-warm-orange to-lime-green bg-clip-text text-transparent">Serve</span> You?
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Stop Wasting Your Wellbeing Budget on Things You'll Never Use.
                </h3>
              </div>

              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">🎸</div>
                      <p className="text-gray-700">
                        Did you ever learn to play that guitar/ukelele you bought with your last wellbeing reimbursement?
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">🏃‍♂️</div>
                      <p className="text-gray-700">
                        Or you are now thinking about selling that treadmill now collecting dust in the corner of your storeroom?
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">⏰</div>
                      <p className="text-gray-700">
                        Or maybe you're that last-minute buyer — rushing to use your wellness budget before it expires, ending up with something you'll never use?
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center space-y-6">
                  <p className="text-xl text-gray-800 font-semibold">
                    We get it. Your company gives you a reimbursement amount, but the product list is boring, limited, or just not what you need. So you either waste it… or force yourself to buy something — anything.
                  </p>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-neon-pink">
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent mb-4">
                      FreedomVouchers is here to fix that.
                    </h4>
                    <p className="text-xl text-gray-700 mb-6">
                      Buy what you actually want — from Flipkart, Amazon, or any platform and get brand vouchers for your own personal use - be it your makeup, clothes or anything.
                    </p>
                  </div>

                  <div className="space-y-4 text-xl font-semibold text-gray-800">
                    <p>No more buying showpieces. No more wasting money. Just freedom, choice, and extra value.</p>
                    <p className="bg-gradient-to-r from-warm-orange to-lime-green bg-clip-text text-transparent">
                      Don't just buy something to spend your budget. Buy what matters. Spend smart. Get rewarded.
                    </p>
                  </div>

                  <div className="pt-8">
                    <Link to="/product">
                      <Button 
                        size="lg" 
                        className="btn-glow gradient-primary text-white border-0 px-8 py-4 text-lg font-semibold"
                      >
                        Start Shopping Smart 🎯
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section with Enhanced Carousel */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from real customers who saved money with FreedomVouchers
            </p>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: false,
                containScroll: "trimSnaps",
                slidesToScroll: 1,
                duration: 25, // Smooth transition duration
              }}
              plugins={[testimonialsAutoplayPlugin()]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 h-full">
                      <CardContent className="p-6 space-y-4 flex flex-col h-full">
                        <div className="flex gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">⭐</span>
                          ))}
                        </div>
                        
                        <p className="text-gray-700 italic leading-relaxed flex-grow">
                          "{testimonial.review}"
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-electric-blue to-teal bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>
          {/* Inserted FAQAccordion */}
          <FaqAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        {/* Simplified CTA background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full float"></div>
          <div className="hidden md:block absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-lg rotate-45 float" style={{animationDelay: '1s'}}></div>
          <div className="hidden lg:block absolute top-1/2 left-1/3 w-12 h-12 bg-white/10 rounded-full float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to use your budget smartly?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of smart shoppers who only buy what they truly need — no regrets, ever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/product">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold border-0 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Shop Now 🛍️
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Contact Us 💬
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
