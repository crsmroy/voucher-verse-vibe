import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
              <div className="w-12 h-0.5 bg-green-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                <span className="ml-2 text-sm font-medium text-green-600">Shipping</span>
              </div>
              <div className="w-12 h-0.5 bg-neon-pink"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
                <span className="ml-2 text-sm font-medium text-neon-pink">Payment</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Payment</span>
            </h1>
            <p className="text-xl text-gray-600">Almost there! Complete your payment to start processing your order.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-3xl">📱</span>
                  Scan & Pay
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
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
                    <p className="font-bold text-2xl text-green-600">₹3,500</p>
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
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-3xl">📸</span>
                  Upload Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                      className="h-12 text-base"
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
          <Card className="mt-8 bg-gradient-to-r from-lime-green/10 to-teal/10 border-lime-green/20">
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
