
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';

const ProductForm = () => {
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
    { value: 'amazon', label: 'Amazon', color: 'bg-orange-500' },
    { value: 'flipkart', label: 'Flipkart', color: 'bg-blue-500' },
    { value: 'myntra', label: 'Myntra', color: 'bg-pink-500' },
    { value: 'nykaa', label: 'Nykaa', color: 'bg-purple-500' },
    { value: 'meesho', label: 'Meesho', color: 'bg-red-500' },
    { value: 'ajio', label: 'Ajio', color: 'bg-yellow-500' }
  ];

  const getVoucherAmounts = () => {
    const price = parseFloat(formData.price) || 0;
    const amounts = [];
    for (let i = 250; i <= price; i += 250) {
      amounts.push(i);
    }
    return amounts;
  };

  const calculatePricing = () => {
    const basePrice = parseFloat(formData.price) || 0;
    const quantity = formData.quantity;
    const voucherAmount = parseFloat(formData.voucherAmount) || 0;
    const selectedCategory = categories.find(cat => cat.value === formData.category);
    
    const gstRate = selectedCategory ? selectedCategory.gst : 18;
    
    const premiumPrice = (basePrice * quantity) + voucherAmount; // ADD voucher amount
    const commission = premiumPrice * 0.20; // 20% commission
    const gstAmount = premiumPrice * (gstRate / 100);
    const totalPrice = premiumPrice + commission + gstAmount;
    
    return {
      premiumPrice,
      commission,
      gstAmount,
      totalPrice,
      savings: (basePrice * quantity) - totalPrice // This shows how much they save vs buying directly
    };
  };

  const pricing = calculatePricing();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navigation />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 gradient-tertiary rounded-full opacity-10 float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 gradient-primary rounded-lg rotate-45 opacity-15 float"></div>
      </div>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
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
            <p className="text-xl text-gray-600">Tell us what you want to buy and we'll get it for you at the best price!</p>
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
                            <div>
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
                          <span>Commission (20%)</span>
                          <span>₹{pricing.commission.toFixed(2)}</span>
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
                        
                        {pricing.savings > 0 && (
                          <div className="bg-gradient-to-r from-lime-green/20 to-teal/20 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-600">
                              You Save ₹{pricing.savings.toFixed(2)} 🎉
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Link to="/shipping" className="block">
                        <Button 
                          className="w-full btn-glow gradient-primary text-white h-12 text-lg font-semibold"
                          disabled={!formData.productLink || !formData.price || !formData.category || !formData.voucherAmount || !formData.voucherPlatform}
                        >
                          Continue to Shipping →
                        </Button>
                      </Link>
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
