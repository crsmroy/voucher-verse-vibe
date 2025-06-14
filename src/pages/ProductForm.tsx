
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
    voucher: ''
  });

  const categories = [
    { value: 'electronics', label: 'Electronics', gst: 18, color: 'from-electric-blue to-teal' },
    { value: 'clothing', label: 'Clothing & Fashion', gst: 12, color: 'from-neon-pink to-warm-orange' },
    { value: 'books', label: 'Books & Media', gst: 5, color: 'from-lime-green to-electric-blue' },
    { value: 'home', label: 'Home & Garden', gst: 18, color: 'from-warm-orange to-neon-pink' },
    { value: 'sports', label: 'Sports & Fitness', gst: 18, color: 'from-teal to-lime-green' }
  ];

  const vouchers = [
    { value: 'amazon-10', label: 'Amazon 10% Off', discount: 10, color: 'bg-orange-500' },
    { value: 'flipkart-15', label: 'Flipkart 15% Off', discount: 15, color: 'bg-blue-500' },
    { value: 'myntra-20', label: 'Myntra 20% Off', discount: 20, color: 'bg-pink-500' },
    { value: 'nykaa-12', label: 'Nykaa 12% Off', discount: 12, color: 'bg-purple-500' }
  ];

  const calculatePricing = () => {
    const basePrice = parseFloat(formData.price) || 0;
    const selectedCategory = categories.find(cat => cat.value === formData.category);
    const selectedVoucher = vouchers.find(v => v.value === formData.voucher);
    
    const gstRate = selectedCategory ? selectedCategory.gst : 18;
    const discount = selectedVoucher ? selectedVoucher.discount : 0;
    
    const discountedPrice = basePrice * (1 - discount / 100);
    const gstAmount = discountedPrice * (gstRate / 100);
    const totalPrice = discountedPrice + gstAmount;
    
    return {
      originalPrice: basePrice,
      discountedPrice,
      gstAmount,
      totalPrice,
      savings: basePrice - totalPrice
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
                        className="mt-2 h-12 text-base"
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
                    Category & GST
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
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {vouchers.map((voucher) => (
                      <div
                        key={voucher.value}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.voucher === voucher.value
                            ? 'border-electric-blue bg-electric-blue/10 transform scale-105'
                            : 'border-gray-200 hover:border-electric-blue/50 hover:bg-gray-50'
                        }`}
                        onClick={() => setFormData({...formData, voucher: voucher.value})}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{voucher.label}</div>
                            <div className="text-sm text-gray-600">Save {voucher.discount}%</div>
                          </div>
                          <div className={`w-8 h-8 ${voucher.color} rounded-full flex items-center justify-center text-white font-bold`}>
                            {voucher.discount}
                          </div>
                        </div>
                      </div>
                    ))}
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
                          <span>Original Price</span>
                          <span className="line-through text-gray-500">₹{pricing.originalPrice.toFixed(2)}</span>
                        </div>
                        
                        {formData.voucher && (
                          <div className="flex justify-between text-green-600">
                            <span>After Voucher</span>
                            <span>₹{pricing.discountedPrice.toFixed(2)}</span>
                          </div>
                        )}
                        
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
                          disabled={!formData.productLink || !formData.price || !formData.category || !formData.voucher}
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
