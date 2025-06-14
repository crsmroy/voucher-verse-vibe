
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    toast({
      title: "Message Sent! 🎉",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-pink/5 via-electric-blue/5 to-teal/5 overflow-hidden">
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 float"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-15 float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 gradient-tertiary rounded-full opacity-8 float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-warm-orange rounded-full opacity-20 float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-lime-green rounded-lg rotate-12 opacity-25 float" style={{animationDelay: '1.5s'}}></div>
        
        {/* Floating Emojis */}
        <div className="absolute top-20 left-1/4 text-4xl float" style={{animationDelay: '0.8s'}}>💬</div>
        <div className="absolute top-40 right-1/3 text-3xl float" style={{animationDelay: '2.2s'}}>📧</div>
        <div className="absolute bottom-32 left-1/5 text-4xl float" style={{animationDelay: '1.8s'}}>📞</div>
        <div className="absolute bottom-20 right-20 text-3xl float" style={{animationDelay: '0.3s'}}>🚀</div>
      </div>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 slide-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Get In <span className="bg-gradient-to-r from-neon-pink via-electric-blue to-teal bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our service? Need help with an order? We're here to help! 💪
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white text-xl">
                      📧
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                      <p className="text-gray-600">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">support@freedomvouchers.com</p>
                    <p>orders@freedomvouchers.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center text-white text-xl">
                      📞
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                      <p className="text-gray-600">Available 24/7 for urgent queries</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">+91 99999 99999</p>
                    <p className="text-sm text-gray-500">Mon-Sun: 9 AM - 9 PM</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 gradient-tertiary rounded-full flex items-center justify-center text-white text-xl">
                      💬
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Live Chat</h3>
                      <p className="text-gray-600">Instant support when you need it</p>
                    </div>
                  </div>
                  <Button className="btn-glow gradient-primary text-white border-0 hover:shadow-xl">
                    Start Chat Now 🚀
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📱</span>
                    </div>
                    <div className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📘</span>
                    </div>
                    <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📸</span>
                    </div>
                    <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🐦</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="hover:shadow-xl transition-all duration-500 pulse-glow bg-white/90 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-3xl">📝</span>
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
                        👤 Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="h-12 bg-white/70 border-2 focus:border-neon-pink transition-colors"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                        📧 Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-12 bg-white/70 border-2 focus:border-electric-blue transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
                      📞 Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 99999 99999"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12 bg-white/70 border-2 focus:border-teal transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base font-medium flex items-center gap-2">
                      🏷️ Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="h-12 bg-white/70 border-2 focus:border-warm-orange transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium flex items-center gap-2">
                      💬 Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-white/70 border-2 focus:border-lime-green transition-colors resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full btn-glow gradient-primary text-white h-12 text-lg font-semibold border-0"
                  >
                    Send Message 🚀
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-electric-blue to-teal bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does FreedomVouchers work?",
                answer: "We use premium vouchers and discounts to buy products at lower prices and pass the savings to you!",
                icon: "🤔"
              },
              {
                question: "Is it safe to use your service?",
                answer: "Absolutely! We're a legitimate reseller service with 500+ happy customers and secure payment methods.",
                icon: "🔒"
              },
              {
                question: "How long does delivery take?",
                answer: "Delivery usually takes 3-7 business days depending on the product and your location.",
                icon: "📦"
              },
              {
                question: "What if I'm not satisfied?",
                answer: "We offer a 100% satisfaction guarantee. If you're not happy, we'll make it right!",
                icon: "😊"
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white/80">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <span className="text-2xl">{faq.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
