
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ShippingDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    whatsappNumber: '',
    emailAddress: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    generateCaptcha();
    const orderDataStr = localStorage.getItem('currentOrder');
    if (orderDataStr) {
      try {
        const parsedOrder = JSON.parse(orderDataStr);
        if (parsedOrder.shipping) {
          // Ensure all fields are present to avoid uncontrolled component warnings
          setFormData({
            fullName: parsedOrder.shipping.fullName || '',
            phoneNumber: parsedOrder.shipping.phoneNumber || '',
            alternatePhoneNumber: parsedOrder.shipping.alternatePhoneNumber || '',
            whatsappNumber: parsedOrder.shipping.whatsappNumber || '',
            emailAddress: parsedOrder.shipping.emailAddress || '',
            address: parsedOrder.shipping.address || '',
            city: parsedOrder.shipping.city || '',
            state: parsedOrder.shipping.state || '',
            pincode: parsedOrder.shipping.pincode || '',
            landmark: parsedOrder.shipping.landmark || '',
          });
        }
      } catch (e) {
        console.error("Failed to parse order data from localStorage", e);
      }
    }
  }, []);

  const handleContinue = () => {
    const orderDataStr = localStorage.getItem('currentOrder');
    const orderData = orderDataStr ? JSON.parse(orderDataStr) : {};

    const shippingDetails = { ...formData };

    const updatedOrderData = {
      ...orderData,
      shipping: shippingDetails,
    };

    localStorage.setItem('currentOrder', JSON.stringify(updatedOrderData));
    navigate('/payment');
  };

  const handleCashOnDelivery = async () => {
    // Validate captcha
    if (captchaValue !== captchaCode) {
      toast({
        title: "🤖 Captcha verification failed!",
        description: "Please enter the correct captcha code.",
        variant: "destructive",
        duration: 3000,
      });
      generateCaptcha();
      setCaptchaValue('');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get order data from localStorage
      const orderDataStr = localStorage.getItem('currentOrder');
      const orderData = orderDataStr ? JSON.parse(orderDataStr) : {};

      // Prepare complete order data with shipping details
      const completeOrderData = {
        ...orderData,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        alternate_phone_number: formData.alternatePhoneNumber || null,
        whatsapp_number: formData.whatsappNumber || null,
        email_address: formData.emailAddress || null,
        full_address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark || null,
        status: 'confirmed',
        payment_method: 'cash_on_delivery',
        order_id: `COD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      // Insert order into database
      const { error } = await supabase
        .from('orders')
        .insert([completeOrderData]);

      if (error) throw error;

      // Show success toast
      toast({
        title: "🚪 Order confirmed! We're building Doraemon's Anywhere Door to deliver your product as soon as possible.",
        duration: 4000,
      });

      // Clear localStorage
      localStorage.removeItem('currentOrder');

      // Redirect to homepage after a delay
      setTimeout(() => {
        navigate('/');
      }, 4000);

    } catch (error) {
      console.error('Error submitting cash on delivery order:', error);
      toast({
        title: "🚫 Mojo Jojo hacked the system! Powerpuff Girls are on it. Try again in a second!",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-15 float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 gradient-tertiary rounded-full opacity-8 float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Back Button */}
      <div className="fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
      
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">✓</div>
                <span className="ml-3 text-base font-semibold text-green-600">Product</span>
              </div>
              <div className="w-16 h-1 gradient-primary rounded-full"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">2</div>
                <span className="ml-3 text-base font-semibold text-transparent bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text">Shipping</span>
              </div>
              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">3</div>
                <span className="ml-3 text-base font-semibold text-gray-500">Payment</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 slide-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Shipping <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Details</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">Where should we deliver your amazing purchase?</p>
          </div>

          {/* Shipping Note */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400 slide-in">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Note:</span> Shipping will be handled directly by the respective marketplace (e.g., Amazon, Flipkart). All terms and conditions, including delivery timelines, return/refund policies, and support, will be as per the policies of the selected marketplace.
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 slide-in">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-900">
                <span className="text-4xl">🏠</span>
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              {/* Receiver's Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Receiver's Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-base font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="h-12 text-base border-2 focus:border-neon-pink transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 99999 99999"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      className="h-12 text-base border-2 focus:border-neon-pink transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="alternatePhone" className="text-base font-medium text-gray-700">
                      Alternate Phone Number
                    </Label>
                    <Input
                      id="alternatePhone"
                      placeholder="+91 88888 88888"
                      value={formData.alternatePhoneNumber}
                      onChange={(e) => setFormData({...formData, alternatePhoneNumber: e.target.value})}
                      className="h-12 text-base border-2 focus:border-electric-blue transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="whatsappNumber" className="text-base font-medium text-gray-700">
                      WhatsApp Number <span className="text-sm text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="whatsappNumber"
                      placeholder="+91 77777 77777"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                      className="h-12 text-base border-2 focus:border-electric-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-medium text-gray-700">
                    Email Address <span className="text-sm text-gray-500">(Optional)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                    className="h-12 text-base border-2 focus:border-electric-blue transition-colors"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  Address Details
                </h3>
                
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-base font-medium text-gray-700">
                    Complete Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="House/Flat No., Street, Area"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="h-12 text-base border-2 focus:border-neon-pink transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-base font-medium text-gray-700">
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="Your city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="h-12 text-base border-2 focus:border-neon-pink transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-base font-medium text-gray-700">
                      State *
                    </Label>
                    <Input
                      id="state"
                      placeholder="Your state"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="h-12 text-base border-2 focus:border-neon-pink transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="pincode" className="text-base font-medium text-gray-700">
                      Pincode *
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="123456"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      className="h-12 text-base border-2 focus:border-neon-pink transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="landmark" className="text-base font-medium text-gray-700">
                    Landmark <span className="text-sm text-gray-500">(Optional)</span>
                  </Label>
                  <Input
                    id="landmark"
                    placeholder="Near any famous place or building"
                    value={formData.landmark}
                    onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                    className="h-12 text-base border-2 focus:border-electric-blue transition-colors"
                  />
                </div>
              </div>

              {/* Captcha Section */}
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  Security Verification
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 font-mono text-lg font-bold text-gray-800 select-none">
                      {captchaCode}
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        generateCaptcha();
                        setCaptchaValue('');
                      }}
                      variant="outline"
                      size="sm"
                      className="text-sm"
                    >
                      🔄 Refresh
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="captcha" className="text-base font-medium text-gray-700">
                      Enter the code above *
                    </Label>
                    <Input
                      id="captcha"
                      placeholder="Enter captcha code"
                      value={captchaValue}
                      onChange={(e) => setCaptchaValue(e.target.value)}
                      className="h-12 text-base border-2 focus:border-neon-pink transition-colors max-w-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Link to="/product" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full h-14 text-lg font-semibold border-2 border-gray-300 hover:border-neon-pink hover:text-neon-pink transition-all duration-300"
                  >
                    ← Back to Product
                  </Button>
                </Link>
                
                <Button 
                  onClick={handleCashOnDelivery}
                  disabled={isSubmitting || !formData.fullName || !formData.phoneNumber || !formData.address || !formData.city || !formData.state || !formData.pincode || !captchaValue}
                  className="flex-1 w-full btn-glow bg-gradient-to-r from-warm-orange to-lime-green text-white h-14 text-lg font-semibold border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {isSubmitting ? 'Processing...' : 'Cash on Delivery 💵'}
                </Button>
                
                <Button 
                  onClick={handleContinue}
                  className="flex-1 w-full btn-glow gradient-primary text-white h-14 text-lg font-semibold border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Continue to Payment →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
