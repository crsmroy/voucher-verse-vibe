import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Payment = () => {
  const navigate = useNavigate();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalAmount, setFinalAmount] = useState(3500); // Default fallback
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: '', answer: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Try to get the order data from localStorage
    const orderData = localStorage.getItem('currentOrder');
    
    if (orderData) {
      try {
        const parsed = JSON.parse(orderData);
        if (parsed.pricing && parsed.pricing.totalPrice) {
          const amount = Math.round(parsed.pricing.totalPrice);
          setFinalAmount(amount);
        }
      } catch (error) {
      }
    }

    // Generate simple math captcha
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    if (operator === '+') {
      answer = num1 + num2;
    } else {
      answer = num1 - num2;
    }

    setCaptchaQuestion({
      question: `${num1} ${operator} ${num2} = ?`,
      answer: answer
    });
    setCaptchaInput('');
    setCaptchaChecked(false);
  };

  const verifyCaptcha = () => {
    if (parseInt(captchaInput) === captchaQuestion.answer) {
      setCaptchaChecked(true);
      toast({
        title: "Captcha Verified ✅",
        description: "You can now submit your order."
      });
    } else {
      toast({
        title: "Incorrect Captcha",
        description: "Please try again.",
        variant: "destructive"
      });
      generateCaptcha();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  // Enhanced Helper: Upload screenshot to Supabase Storage and return its public URL
  const uploadScreenshotAndGetUrl = async (orderId: string, file: File): Promise<string | null> => {
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `order_${orderId}_${Date.now()}_${safeFileName}`;
    try {
      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        });
      if (uploadError) {
        return null;
      }
      // Fetch public URL
      const { data: urlData } = supabase.storage.from('payment-proofs').getPublicUrl(path);
      return urlData?.publicUrl ?? null;
    } catch (err) {
      return null;
    }
  };

  // Helper: Insert order into Supabase database
  const insertOrder = async (orderPayload: any) => {
    const { error } = await supabase.from('orders').insert([orderPayload]);
    return error;
  };

  // Updated validation for screenshot OR transaction ID requirement
  const handleSubmit = async () => {
    // Check if either screenshot or transaction ID is provided
    if (!screenshot && !transactionId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please either upload a payment screenshot OR enter your transaction ID",
        variant: "destructive"
      });
      return;
    }

    if (!captchaChecked) {
      toast({
        title: "Captcha Required",
        description: "Please verify the captcha first",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Load order details from localStorage (built at previous checkout step)
      const orderDataStr = localStorage.getItem('currentOrder');
      if (!orderDataStr) throw new Error('Order data not found. Please restart your order.');
      const orderData = JSON.parse(orderDataStr);

      // 2. Generate/fallback to an orderId
      const orderId = orderData.orderId || Math.floor(Date.now() % 1e6).toString().padStart(6, "0");

      // 3. If screenshot is provided, upload and use its URL; otherwise, use null
      let imageUrl: string | null = null;
      if (screenshot) {
        imageUrl = await uploadScreenshotAndGetUrl(orderId, screenshot);
        if (!imageUrl) {
          toast({
            title: "Screenshot Upload Failed",
            description: "Could not upload screenshot, but order will still be submitted.",
            variant: "destructive"
          });
        }
      }

      // 4. Prepare and insert payload with proper product mapping
      const { product = {}, pricing = {}, shipping = {} } = orderData;
      
      // Debug log to check data structure
      console.log('Order Data from localStorage:', orderData);
      console.log('Product data:', product);
      console.log('Pricing data:', pricing);
      console.log('Shipping data:', shipping);
      
      const orderPayload = {
        order_id: orderId,
        product_link: product.productLink || '',
        product: product.productName || product.product || 'N/A',
        price: Number(product.price) || 0,
        quantity: Number(product.quantity) || 1,
        category: product.category || '',
        voucher_amount: Number(product.voucherAmount) || 0,
        platform: product.voucherPlatform || product.platform || '',
        premium_price: Number(pricing.premiumPrice) || 0,
        service_fee: Number(pricing.serviceFee) || 0,
        gst: pricing.gstAmount ? `${pricing.gstAmount}` : '',
        total_to_pay: Number(pricing.totalPrice) || 0,
        // User details from shipping
        full_name: shipping.fullName || '',
        phone_number: shipping.phoneNumber || '',
        alternate_phone_number: shipping.alternatePhoneNumber || '',
        whatsapp_number: shipping.whatsappNumber || '',
        email_address: shipping.emailAddress || '',
        full_address: shipping.address || '',
        city: shipping.city || '',
        state: shipping.state || '',
        pincode: shipping.pincode || '',
        landmark: shipping.landmark || '',
        payment_proof_link: imageUrl, // null if screenshot not uploaded
        transaction_id: transactionId,
        date_time: new Date().toISOString(),
        status: 'pending',
        payment_method: 'online'
      };

      // Debug log to check final payload
      console.log('Final Order Payload:', orderPayload);

      // 5. Insert row into orders table
      const error = await insertOrder(orderPayload);

      if (error) {
        console.error('Database insertion error:', error);
        throw error;
      }

      setIsSubmitting(false);
      
      // Show success notification instead of redirecting
      toast({
        title: "Order Received Successfully! 🎉",
        description: "Your order will be placed in a couple of minutes after payment verification. You will receive order details on your email and WhatsApp.",
      });

      localStorage.removeItem('currentOrder');
      setTransactionId('');
      setScreenshot(null);
      setCaptchaChecked(false);
      generateCaptcha();

    } catch (err: any) {
      setIsSubmitting(false);
      console.error('Order submission error:', err);
      
      // Show failure notification with WhatsApp contact info
      toast({
        title: "Submission Failed",
        description: "Please send your payment screenshot and product details to our WhatsApp: +91 98765 43210",
        variant: "destructive"
      });
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
                    <p className="font-bold text-2xl text-green-600">₹{finalAmount.toLocaleString()}</p>
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
                  Submit Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium flex items-center gap-2 mb-3">
                      📷 Payment Screenshot <span className="text-xs text-gray-500 font-normal">(optional if you provide transaction ID)</span>
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

                  <div className="text-center text-gray-500 font-medium">OR</div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId" className="text-base font-medium flex items-center gap-2">
                      🔢 Transaction ID <span className="text-xs text-gray-500 font-normal">(required if no screenshot)</span>
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

                {/* Simple Math Captcha */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold text-blue-900">🔐 Security Check</h4>
                  <div className="flex items-center gap-3">
                    <Label className="text-blue-800 font-medium">{captchaQuestion.question}</Label>
                    <Input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-20 h-10"
                      placeholder="?"
                    />
                    <Button
                      type="button"
                      onClick={verifyCaptcha}
                      size="sm"
                      variant="outline"
                      disabled={captchaChecked}
                    >
                      {captchaChecked ? "✅ Verified" : "Verify"}
                    </Button>
                  </div>
                  {!captchaChecked && (
                    <Button
                      type="button"
                      onClick={generateCaptcha}
                      size="sm"
                      variant="ghost"
                      className="text-blue-600 text-xs"
                    >
                      🔄 New Question
                    </Button>
                  )}
                </div>

                {/* Instructions */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">📋 Instructions:</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Make payment using the QR code above</li>
                    <li>• Upload payment screenshot OR enter transaction ID</li>
                    <li>• Complete the security verification</li>
                    <li>• Submit your order</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || (!screenshot && !transactionId.trim()) || !captchaChecked}
                  className="w-full btn-glow gradient-primary text-white h-12 text-lg font-semibold border-0"
                >
                  {isSubmitting ? "Submitting..." : "Submit Order 🎉"}
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
                  <div className="font-semibold flex items-center justify-center gap-1">
                    <span role="img" aria-label="Confirmation">⚡</span> Order Confirmation
                  </div>
                  <div>
                    Post Transaction Verification, you will receive order confirmation within couple of minutes from your respective marketplace.
                  </div>
                </div>
                <div>
                  <div className="font-semibold flex items-center justify-center gap-1">
                    <span role="img" aria-label="Delivery">🛒</span> Order Delivery
                  </div>
                  <div>
                    Order will be delivered directly by the marketplace like Flipkart/Amazon. All policies are applied as per respective marketplace policies.
                  </div>
                </div>
                <div>
                  <div className="font-semibold flex items-center justify-center gap-1">
                    <span role="img" aria-label="Voucher">📦</span> Get your voucher
                  </div>
                  <div>
                    Voucher will be provided post end of return policy(Negotiation available).
                  </div>
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
