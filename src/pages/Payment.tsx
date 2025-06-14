import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('LocalStorage productData:', localStorage.getItem('productData'));
    console.log('LocalStorage shippingData:', localStorage.getItem('shippingData'));
    
    // Try to get product data from multiple sources
    let productData = null;
    
    // First try location state
    if (location.state?.productData) {
      productData = location.state.productData;
      console.log('Found product data in location state:', productData);
    }
    // Then try localStorage
    else {
      try {
        const storedProductData = localStorage.getItem('productData');
        if (storedProductData && storedProductData !== '{}') {
          productData = JSON.parse(storedProductData);
          console.log('Found product data in localStorage:', productData);
        }
      } catch (error) {
        console.error('Error parsing localStorage productData:', error);
      }
    }
    
    if (productData && productData.price) {
      // Remove any currency symbols and parse the price
      const priceString = productData.price.toString().replace(/[₹,$]/g, '');
      const basePrice = parseFloat(priceString) || 0;
      console.log('Base price:', basePrice);
      
      // Calculate final amount with service fee
      const serviceFee = basePrice * 0.05; // 5% service fee
      const total = basePrice + serviceFee;
      console.log('Final amount with service fee:', total);
      
      setFinalAmount(Math.round(total));
    } else {
      console.log('No product data found, using fallback amount');
      // Fallback amount if no product data is available
      setFinalAmount(3500);
    }
  }, [location.state]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!screenshot || !transactionId) {
      toast({
        title: "Missing Information",
        description: "Please upload screenshot and enter transaction ID",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Order Submitted! 🎉",
        description: "We'll verify your payment and start processing your order within 2 hours.",
      });
    }, 2000);
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
              <div className="w-16 h-1 bg-green-500 rounded-full"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">✓</div>
                <span className="ml-3 text-base font-semibold text-green-600">Shipping</span>
              </div>
              <div className="w-16 h-1 gradient-primary rounded-full"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">3</div>
                <span className="ml-3 text-base font-semibold text-transparent bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text">Payment</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12 slide-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Payment</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Almost there! Complete your payment to start processing your order.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 slide-in">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-900">
                  <span className="text-4xl">📱</span>
                  Scan & Pay
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6 p-8">
                <div className="relative">
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center pulse-glow">
                    <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                      <div className="text-6xl">📱</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                    QR
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">UPI Payment</h3>
                  <p className="text-gray-600">Scan this QR code with any UPI app</p>
                  <div className="bg-gradient-to-r from-lime-green/20 to-teal/20 p-4 rounded-lg">
                    <p className="font-bold text-2xl text-green-600">₹{finalAmount.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">Amount to Pay</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-4">
                  {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                    <div key={app} className="p-3 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                      {app}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Section */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 slide-in">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-900">
                  <span className="text-4xl">📸</span>
                  Upload Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2 mb-3">
                      📷 Payment Screenshot
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-neon-pink transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="screenshot"
                      />
                      <label htmlFor="screenshot" className="cursor-pointer">
                        {screenshot ? (
                          <div className="space-y-2">
                            <div className="text-green-500 text-4xl">✅</div>
                            <p className="text-green-600 font-medium">{screenshot.name}</p>
                            <p className="text-sm text-gray-500">Click to change</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="text-gray-400 text-4xl">📱</div>
                            <p className="text-gray-600">Click to upload screenshot</p>
                            <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId" className="text-base font-medium flex items-center gap-2">
                      🔢 Transaction ID
                    </Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter UPI transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="h-12 text-base border-2 focus:border-neon-pink transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Make payment using the QR code above</li>
                    <li>• Take a clear screenshot of payment confirmation</li>
                    <li>• Enter the transaction ID from your payment app</li>
                    <li>• Upload the screenshot and submit</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !screenshot || !transactionId}
                  className="w-full btn-glow gradient-primary text-white h-12 text-lg font-semibold border-0"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    'Complete Order 🚀'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Success Message */}
          <Card className="mt-8 shadow-2xl border-0 bg-gradient-to-r from-lime-green/10 to-teal/10 backdrop-blur-sm slide-in">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">What happens next?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <div className="font-semibold">⚡ Instant Verification</div>
                  <div>We verify your payment within 2 hours</div>
                </div>
                <div>
                  <div className="font-semibold">🛒 Order Processing</div>
                  <div>We purchase your item with premium vouchers</div>
                </div>
                <div>
                  <div className="font-semibold">📦 Fast Delivery</div>
                  <div>Product ships directly to your address</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
