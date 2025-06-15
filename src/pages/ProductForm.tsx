import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { supabase } from '@/lib/supabase';

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productLink: '',
    price: '',
    quantity: 1,
    category: '',
    voucherAmount: '',
    voucherPlatform: ''
  });

  const categories = [
    { value: 'electronics', label: 'Electronics', gst: 18, color: 'from-electric-blue to-teal' },
    { value: 'clothing', label: 'Clothing & Fashion', gst: 12, color: 'from-neon-pink to-warm-orange' },
    { value: 'books', label: 'Books & Media', gst: 5, color: 'from-lime-green to-electric-blue' },
    { value: 'home', label: 'Home & Garden', gst: 18, color: 'from-warm-orange to-neon-pink' },
    { value: 'sports', label: 'Sports & Fitness', gst: 18, color: 'from-teal to-lime-green' }
  ];

  const platforms = [
    { 
      value: 'amazon', 
      label: 'Amazon', 
      color: 'bg-orange-500',
      icon: '📦' 
    },
    { 
      value: 'flipkart', 
      label: 'Flipkart', 
      color: 'bg-blue-500',
      icon: '🛒' 
    },
    { 
      value: 'myntra', 
      label: 'Myntra', 
      color: 'bg-pink-500',
      icon: '👗' 
    },
    { 
      value: 'nykaa', 
      label: 'Nykaa', 
      color: 'bg-purple-500',
      icon: '💄' 
    },
    { 
      value: 'meesho', 
      label: 'Meesho', 
      color: 'bg-red-500',
      icon: '🛍️' 
    },
    { 
      value: 'ajio', 
      label: 'Ajio', 
      color: 'bg-yellow-500',
      icon: '👕' 
    }
  ];

  const getVoucherAmounts = () => {
    const price = parseFloat(formData.price) || 0;
    const maxAmount = price * formData.quantity;
    
    if (maxAmount < 250) return [];
    
    // Calculate the maximum number of ₹250 steps possible
    const maxSteps = Math.floor(maxAmount / 250);
    
    // If we have 5 or fewer steps, include all of them
    if (maxSteps <= 5) {
      const amounts = [];
      for (let i = 1; i <= maxSteps; i++) {
        amounts.push(i * 250);
      }
      return amounts;
    }
    
    // Otherwise, pick up to 5 evenly spaced values
    const amounts = [];
    const step = Math.floor(maxSteps / 5);
    
    // Start from a reasonable multiple of 250
    let currentStep = Math.max(3, step); // Start from at least ₹750 or higher
    
    for (let i = 0; i < 4; i++) {
      amounts.push(currentStep * 250);
      currentStep += step;
    }
    
    // Add the last value as close as possible to maxAmount
    const lastValue = Math.floor(maxAmount / 250) * 250;
    if (lastValue > amounts[amounts.length - 1]) {
      amounts.push(lastValue);
    }
    
    return amounts.slice(0, 5); // Ensure we don't exceed 5 options
  };

  const calculatePricing = () => {
    const basePrice = parseFloat(formData.price) || 0;
    const quantity = formData.quantity;
    const voucherAmount = parseFloat(formData.voucherAmount) || 0;
    const selectedCategory = categories.find(cat => cat.value === formData.category);
    
    const gstRate = selectedCategory ? selectedCategory.gst : 18;
    
    const premiumPrice = (basePrice * quantity) + voucherAmount; // ADD voucher amount
    const serviceFee = premiumPrice * 0.20; // 20% service fee
    const gstAmount = premiumPrice * (gstRate / 100);
    const totalPrice = premiumPrice + serviceFee + gstAmount;
    
    return {
      premiumPrice,
      serviceFee,
      gstAmount,
      totalPrice,
      savings: (basePrice * quantity) - totalPrice // This shows how much they save vs buying directly
    };
  };

  // Helper to get the next order ID (6-digit, incrementing)
  const getNextOrderId = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("order_id");
      if (error) return "000001";
      let maxId = 0;
      if (data && data.length > 0) {
        const numericIds = data
          .map((o) => o.order_id)
          .filter((id) => typeof id === "string" && /^\d{6}$/.test(id));
        if (numericIds.length > 0) {
          maxId = Math.max(...numericIds.map((id) => parseInt(id, 10)));
        }
      }
      return (maxId + 1).toString().padStart(6, "0");
    } catch {
      return "000001";
    }
  };

  const handleContinueToShipping = async () => {
    const pricing = calculatePricing();
    const nextOrderId = await getNextOrderId();

    // Store all the data in localStorage for use in payment page
    const orderData = {
      product: formData,
      pricing: pricing,
      timestamp: new Date().toISOString(),
      orderId: nextOrderId // Include generated order ID
    };

    localStorage.setItem("currentOrder", JSON.stringify(orderData));
    navigate("/shipping");
  };

  const pricing = calculatePricing();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Original elements */}
        <div className="absolute top-20 left-10 w-32 h-32 gradient-primary rounded-full opacity-10 float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-15 float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 gradient-tertiary rounded-full opacity-8 float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-warm-orange rounded-full opacity-25 float" style={{animationDelay: '0.5s'}}></div>
        
        {/* New geometrical elements */}
        <div className="absolute top-32 left-1/3 w-16 h-16 bg-neon-pink rounded-lg rotate-12 opacity-20 float" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-60 right-1/3 w-28 h-28 bg-electric-blue rounded-full opacity-15 float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-lime-green rounded-lg rotate-45 opacity-18 float" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-3/4 left-16 w-36 h-36 gradient-primary rounded-full opacity-12 float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-16 left-2/3 w-20 h-20 bg-teal rounded-lg rotate-30 opacity-22 float" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-32 left-1/2 w-18 h-18 bg-warm-orange rounded-full opacity-16 float" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-14 h-14 gradient-secondary rounded-lg rotate-60 opacity-14 float" style={{animationDelay: '2.2s'}}></div>
        <div className="absolute bottom-60 left-20 w-22 h-22 bg-neon-pink rounded-full opacity-19 float" style={{animationDelay: '0.7s'}}></div>
      </div>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                ← Back to Home
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Smart</span>
            </h1>
            <p className="text-xl">
              <span className="bg-gradient-to-r from-electric-blue via-neon-pink to-warm-orange bg-clip-text text-transparent font-semibold relative">
                Just 3 steps and a couple of minutes away from finally making your wellness budget work for you
                <span className="absolute inset-0 bg-gradient-to-r from-electric-blue via-neon-pink to-warm-orange opacity-20 blur-sm rounded-lg"></span>
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Link */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🔗</span>
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="productLink" className="text-base font-medium">Product Link</Label>
                    <Input
                      id="productLink"
                      placeholder="Paste the product URL from any shopping website..."
                      value={formData.productLink}
                      onChange={(e) => setFormData({...formData, productLink: e.target.value})}
                      className="mt-2 h-12 text-base"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-base font-medium">Product Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="mt-2 h-12 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">Quantity</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-10 h-10 rounded-full hover:bg-neon-pink/10 hover:border-neon-pink"
                          onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}
                        >
                          −
                        </Button>
                        <span className="text-2xl font-bold min-w-[3rem] text-center">{formData.quantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-10 h-10 rounded-full hover:bg-electric-blue/10 hover:border-electric-blue"
                          onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Selection */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🏷️</span>
                    Choose Category of Product
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {categories.map((category) => (
                      <div
                        key={category.value}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.category === category.value
                            ? 'border-neon-pink bg-gradient-to-r from-neon-pink/10 to-electric-blue/10'
                            : 'border-gray-200 hover:border-electric-blue/50 hover:bg-gray-50'
                        }`}
                        onClick={() => setFormData({...formData, category: category.value})}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.label}</span>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white`}>
                              GST {category.gst}%
                            </span>
                            {formData.category === category.value && (
                              <span className="text-neon-pink text-xl">✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Voucher Selection */}
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🎫</span>
                    Choose Your Voucher
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Voucher Amount (₹)</Label>
                    <Select value={formData.voucherAmount} onValueChange={(value) => setFormData({...formData, voucherAmount: value})}>
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Select voucher amount" />
                      </SelectTrigger>
                      <SelectContent>
                        {getVoucherAmounts().map((amount) => (
                          <SelectItem key={amount} value={amount.toString()}>₹{amount}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Platform</Label>
                    <div className="grid sm:grid-cols-2 gap-3 mt-2">
                      {platforms.map((platform) => (
                        <div
                          key={platform.value}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.voucherPlatform === platform.value
                              ? 'border-electric-blue bg-electric-blue/10 transform scale-105'
                              : 'border-gray-200 hover:border-electric-blue/50 hover:bg-gray-50'
                          }`}
                          onClick={() => setFormData({...formData, voucherPlatform: platform.value})}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{platform.icon}</span>
                              <div className="font-medium">{platform.label}</div>
                            </div>
                            <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center text-white font-bold`}>
                              ✓
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 pulse-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    Price Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.price && (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Premium Price</span>
                          <span>₹{pricing.premiumPrice.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between text-orange-600">
                          <span>Service Fee (20%)</span>
                          <span>₹{pricing.serviceFee.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>GST ({categories.find(c => c.value === formData.category)?.gst || 18}%)</span>
                          <span>₹{pricing.gstAmount.toFixed(2)}</span>
                        </div>
                        
                        <div className="border-t pt-3">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total to Pay</span>
                            <span className="text-electric-blue">₹{pricing.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 leading-relaxed px-2 py-2 bg-gray-50 rounded-lg">
                          A small service fee helps us keep things running and make this rewarding for both of us — now and in the long run.
                          Thanks for your support! 🙏
                        </div>
                        
                        {pricing.savings > 0 && (
                          <div className="bg-gradient-to-r from-lime-green/20 to-teal/20 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-600">
                              You Save ₹{pricing.savings.toFixed(2)} 🎉
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={handleContinueToShipping}
                        className="w-full btn-glow gradient-primary text-white h-12 text-lg font-semibold"
                        disabled={!formData.productLink || !formData.price || !formData.category || !formData.voucherAmount || !formData.voucherPlatform}
                      >
                        Continue to Shipping →
                      </Button>
                    </>
                  )}
                  
                  {!formData.price && (
                    <div className="text-center text-gray-500 py-8">
                      <span className="text-4xl mb-2 block">📋</span>
                      Fill in the product details to see pricing
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
