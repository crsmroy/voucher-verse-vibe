import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import { ArrowLeft } from 'lucide-react';

const ShippingDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    alternatePhone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navigation />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
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
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                <span className="ml-2 text-sm font-medium text-green-600">Product</span>
              </div>
              <div className="w-12 h-0.5 bg-neon-pink"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
                <span className="ml-2 text-sm font-medium text-neon-pink">Shipping</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">3</div>
                <span className="ml-2 text-sm font-medium text-gray-500">Payment</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shipping <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Details</span>
            </h1>
            <p className="text-xl text-gray-600">Where should we deliver your amazing purchase?</p>
          </div>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🏠</span>
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base font-medium flex items-center gap-2">
                    👤 Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="h-12 text-base"
                  />
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
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone" className="text-base font-medium flex items-center gap-2">
                    📱 Alternate Phone Number
                  </Label>
                  <Input
                    id="alternatePhone"
                    placeholder="+91 88888 88888"
                    value={formData.alternatePhone}
                    onChange={(e) => setFormData({...formData, alternatePhone: e.target.value})}
                    className="h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber" className="text-base font-medium flex items-center gap-2">
                    💬 WhatsApp Number <span className="text-sm text-gray-500">(Optional - for billing details)</span>
                  </Label>
                  <Input
                    id="whatsappNumber"
                    placeholder="+91 77777 77777"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                  📧 Email Address <span className="text-sm text-gray-500">(Optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-medium flex items-center gap-2">
                  🏠 Complete Address
                </Label>
                <Input
                  id="address"
                  placeholder="House/Flat No., Street, Area"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="h-12 text-base"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-base font-medium flex items-center gap-2">
                    🏙️ City
                  </Label>
                  <Input
                    id="city"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-base font-medium flex items-center gap-2">
                    🗺️ State
                  </Label>
                  <Input
                    id="state"
                    placeholder="Your state"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="h-12 text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pincode" className="text-base font-medium flex items-center gap-2">
                    📍 Pincode
                  </Label>
                  <Input
                    id="pincode"
                    placeholder="123456"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="landmark" className="text-base font-medium flex items-center gap-2">
                  🏛️ Landmark (Optional)
                </Label>
                <Input
                  id="landmark"
                  placeholder="Near any famous place or building"
                  value={formData.landmark}
                  onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                  className="h-12 text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link to="/product" className="flex-1">
                  <Button variant="outline" className="w-full h-12 text-lg font-semibold border-2">
                    ← Back to Product
                  </Button>
                </Link>
                <Link to="/payment" className="flex-1">
                  <Button className="w-full btn-glow gradient-primary text-white h-12 text-lg font-semibold border-0">
                    Continue to Payment →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
