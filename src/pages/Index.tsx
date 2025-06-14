import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Navigation from '@/components/Navigation';

const Index = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Product',
      description: 'Browse and select any product from your favorite online stores',
      icon: '🛍️',
      color: 'from-neon-pink to-warm-orange'
    },
    {
      number: '02', 
      title: 'We Buy For You',
      description: 'Our team purchases the item at the best price with premium vouchers',
      icon: '💳',
      color: 'from-electric-blue to-teal'
    },
    {
      number: '03',
      title: 'Get Your Savings',
      description: 'Receive your product while saving money with our voucher system',
      icon: '💰',
      color: 'from-lime-green to-electric-blue'
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
      name: 'Rahul Kumar',
      review: 'Saved ₹2000 on my laptop purchase! Amazing service and super fast delivery.',
      rating: 5,
      product: 'Laptop'
    },
    {
      name: 'Priya Sharma',
      review: 'Love how easy it is to use. Got my favorite dress at 20% off!',
      rating: 5,
      product: 'Fashion'
    },
    {
      name: 'Amit Patel',
      review: 'Trustworthy service. They delivered exactly what they promised.',
      rating: 5,
      product: 'Electronics'
    },
    {
      name: 'Sneha Gupta',
      review: 'Incredible savings on home appliances! Customer support was very helpful throughout.',
      rating: 5,
      product: 'Home & Kitchen'
    },
    {
      name: 'Vikram Singh',
      review: 'Got my gaming headset at 30% discount. Quality is perfect and shipping was quick!',
      rating: 5,
      product: 'Gaming'
    },
    {
      name: 'Anjali Mehta',
      review: 'Best platform for online shopping deals. Saved over ₹5000 in just one month!',
      rating: 5,
      product: 'Beauty Products'
    },
    {
      name: 'Rohan Das',
      review: 'Smooth experience from start to finish. Got my phone at an unbeatable price.',
      rating: 5,
      product: 'Mobile'
    },
    {
      name: 'Kavya Reddy',
      review: 'Amazing voucher system! Books and stationery at such great discounts.',
      rating: 5,
      product: 'Books'
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

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-primary rounded-full opacity-20 float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-30 float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 gradient-tertiary rounded-full opacity-15 float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-warm-orange rounded-full opacity-25 float" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 slide-in">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-neon-pink via-electric-blue to-warm-orange bg-clip-text text-transparent">
                    Freedom
                  </span>
                  <br />
                  <span className="text-gray-900">Vouchers</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Save money on every purchase with our premium voucher reselling service. 
                  Get the products you love at unbeatable prices! 🎯
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/product">
                  <Button 
                    size="lg" 
                    className="btn-glow gradient-primary text-white border-0 px-8 py-4 text-lg font-semibold hover:shadow-2xl group"
                  >
                    Start Saving Now
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
              <div className="flex gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">500+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-electric-blue to-teal bg-clip-text text-transparent">₹2L+</div>
                  <div className="text-gray-600">Money Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-warm-orange to-lime-green bg-clip-text text-transparent">24/7</div>
                  <div className="text-gray-600">Support</div>
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start saving money on all your favorite products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Customer Testimonials Section with Carousel */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
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
              }}
              plugins={[autoplayPlugin()]}
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
                        
                        <div className="border-t pt-4 mt-auto">
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">Purchased: {testimonial.product}</div>
                        </div>
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

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-lg rotate-45 float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white/10 rounded-full float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money every day with FreedomVouchers
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
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Contact Us 💬
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="text-xl font-bold">FreedomVouchers</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for smart shopping and amazing savings.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-neon-pink rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span>📧</span>
                </div>
                <div className="w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span>📱</span>
                </div>
                <div className="w-10 h-10 bg-warm-orange rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span>💬</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/how-it-works" className="hover:text-neon-pink transition-colors">How It Works</Link></li>
                <li><Link to="/contact" className="hover:text-neon-pink transition-colors">Contact Us</Link></li>
                <li><Link to="/admin" className="hover:text-neon-pink transition-colors">Admin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@freedomvouchers.com</li>
                <li>📞 +91 99999 99999</li>
                <li>🕒 24/7 Available</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FreedomVouchers. Made with ❤️ for smart shoppers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
