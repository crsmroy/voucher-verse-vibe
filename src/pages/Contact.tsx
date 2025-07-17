import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import FaqAccordion from '@/components/FaqAccordion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Footer from "@/components/Footer";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
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

      {/* Contact Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl py-5">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-pink via-electric-blue to-lime-green bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our freedom voucher service? We're here to help you make the most of your corporate well-being allowance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-blue-50/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-neon-pink to-electric-blue hover:from-electric-blue hover:to-neon-pink transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg py-8">
              <div className="space-y-8">
                <div className="funky-card text-center float" style={{animationDelay: '0s'}}>
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Creative Support</h3>
                  <p className="text-purple-600">
                    Our creative team is here to help you with anything you need!
                  </p>
                </div>
                
                <div className="funky-card text-center float" style={{animationDelay: '0.2s'}}>
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Lightning Fast</h3>
                  <p className="text-purple-600">
                    We typically respond within 24 hours, often much faster!
                  </p>
                </div>
                
                <div className="funky-card text-center float" style={{animationDelay: '0.4s'}}>
                  <div className="text-4xl mb-4">💜</div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Made with Love</h3>
                  <p className="text-purple-600">
                    Every interaction is crafted with care and artistic flair!
                  </p>
                </div>
              </div>

              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-neon-pink mr-3" />
                    <h3 className="text-xl font-semibold">Email Us</h3>
                  </div>
                  <p className="text-gray-600">freedomvouchers@gmail.com</p>
                </CardContent>
              </Card>

              {/* <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Phone className="h-6 w-6 text-electric-blue mr-3" />
                    <h3 className="text-xl font-semibold">Call Us</h3>
                  </div>
                  <p className="text-gray-600">+91 98765 43210</p>
                </CardContent>
              </Card> */}

              {/* <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-lime-green mr-3" />
                    <h3 className="text-xl font-semibold">Visit Us</h3>
                  </div>
                  <p className="text-gray-600">
                    123 Business District<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-pink via-electric-blue to-lime-green bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our freedom voucher service
            </p>
          </div>
          
          <FaqAccordion />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
