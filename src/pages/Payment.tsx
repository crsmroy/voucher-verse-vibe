import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<any>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedOrderData = localStorage.getItem('currentOrder');
    if (!storedOrderData) {
      navigate('/');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedOrderData);
      console.log('Loaded order data:', parsedData);
      setOrderData(parsedData);
    } catch (error) {
      console.error('Error parsing order data:', error);
      navigate('/');
    }
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const uploadPaymentProof = async (file: File, orderId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${orderId}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('payment-proofs')
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('payment-proofs')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleCompletePayment = async () => {
    if (!paymentProof || !transactionId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload payment proof and enter transaction ID",
        variant: "destructive",
      });
      return;
    }

    if (!orderData) {
      toast({
        title: "Error",
        description: "Order data not found",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      console.log('Starting payment completion process...');
      console.log('Order data being processed:', orderData);

      // Upload payment proof
      const paymentProofUrl = await uploadPaymentProof(paymentProof, orderData.orderId);
      console.log('Payment proof uploaded:', paymentProofUrl);

      // Prepare order payload
      const { product, shipping, pricing } = orderData;
      console.log('Product data:', product);
      console.log('Shipping data:', shipping);
      console.log('Pricing data:', pricing);

      // Build the order payload with proper field mapping
      const orderPayload = {
        order_id: orderData.orderId,
        // Main product details
        product_link: product?.productLink || null,
        price: product?.price ? parseFloat(product.price) : null,
        quantity: product?.quantity || null,
        category: product?.category || null,
        
        // Voucher details (when voucher option is selected)
        voucher_amount: product?.selectedTab === 'voucher' ? (product?.voucherAmount ? parseFloat(product.voucherAmount) : null) : null,
        platform: product?.selectedTab === 'voucher' ? product?.voucherPlatform || null : null,
        
        // Second product details (when free product option is selected)
        second_product_link: product?.selectedTab === 'freeProduct' ? product?.freeProductLink || null : null,
        second_product_price: product?.selectedTab === 'freeProduct' ? (product?.freeProductPrice ? parseFloat(product.freeProductPrice) : null) : null,
        second_product_quantity: product?.selectedTab === 'freeProduct' ? product?.freeProductQuantity || null : null,
        second_product_category: product?.selectedTab === 'freeProduct' ? product?.freeProductCategory || null : null,
        second_product_gst_percentage: product?.selectedTab === 'freeProduct' && product?.freeProductCategory ? getGSTPercentage(product.freeProductCategory) : null,
        
        // Shipping details
        full_name: shipping?.fullName || null,
        phone_number: shipping?.phoneNumber || null,
        alternate_phone_number: shipping?.alternatePhoneNumber || null,
        whatsapp_number: shipping?.whatsappNumber || null,
        email_address: shipping?.emailAddress || null,
        full_address: shipping?.fullAddress || null,
        landmark: shipping?.landmark || null,
        city: shipping?.city || null,
        state: shipping?.state || null,
        pincode: shipping?.pincode || null,
        
        // Pricing details
        premium_price: pricing?.premiumPrice || null,
        service_fee: pricing?.serviceFee || null,
        gst: pricing?.gstAmount?.toString() || null,
        total_to_pay: pricing?.totalPrice || null,
        
        // Payment details
        payment_proof_link: paymentProofUrl,
        transaction_id: transactionId,
        status: 'pending',
        date_time: new Date().toISOString()
      };

      console.log('Final order payload being sent to database:', orderPayload);

      const { data, error } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select();

      if (error) {
        console.error('Database insertion error:', error);
        throw error;
      }

      console.log('Order successfully saved:', data);

      // Clear localStorage and navigate to success page
      localStorage.removeItem('currentOrder');
      navigate('/payment-success');

      toast({
        title: "Payment Submitted",
        description: "Your order has been submitted successfully!",
      });

    } catch (error) {
      console.error('Error completing payment:', error);
      toast({
        title: "Error",
        description: "Failed to complete payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Helper function to get GST percentage based on category
  const getGSTPercentage = (category: string): number => {
    const gstRates: { [key: string]: number } = {
      'electronics': 18,
      'clothing': 12,
      'books': 5,
      'home': 18,
      'sports': 18
    };
    return gstRates[category] || 18;
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
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
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-lg">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete <span className="bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent">Payment</span>
            </h1>
            <p className="text-xl text-gray-600">
              Upload your payment proof and complete your order
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {/* <div className="flex justify-between">
                    <span>Order ID</span>
                    <span className="font-mono">{orderData.orderId}</span>
                  </div> */}
                  
                  <div className="flex justify-between">
                    <span>Premium Price</span>
                    <span>₹{orderData.pricing?.premiumPrice?.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-orange-600">
                    <span>Service Fee</span>
                    <span>₹{orderData.pricing?.serviceFee?.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST</span>
                    <span>₹{orderData.pricing?.gstAmount?.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-electric-blue">₹{orderData.pricing?.totalPrice?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Payment Instructions</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>UPI ID:</strong> payment@example.com</p>
                    <p><strong>Bank Account:</strong> 1234567890</p>
                    <p><strong>IFSC:</strong> ABCD0123456</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="transactionId">Transaction ID *</Label>
                  <Input
                    id="transactionId"
                    placeholder="Enter your transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="paymentProof">Payment Proof *</Label>
                  <Input
                    id="paymentProof"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload screenshot or receipt of your payment
                  </p>
                </div>

                <Button 
                  onClick={handleCompletePayment}
                  disabled={uploading || !paymentProof || !transactionId.trim()}
                  className="w-full gradient-primary text-white"
                >
                  {uploading ? 'Processing...' : 'Complete Payment'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
