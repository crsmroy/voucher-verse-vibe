import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';

const ReplacementReturn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const [formData, setFormData] = useState({
    productLink: '',
    quantity: 1,
    orderDate: '',
    requestType: '',
    returnReason: '',
    fullName: '',
    phoneNumber: '',
    amountPaid: '',
    transactionId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('replacement_return_requests')
        .insert({
          product_link: formData.productLink,
          quantity: formData.quantity,
          order_date: formData.orderDate,
          request_type: formData.requestType,
          return_reason: formData.returnReason,
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          amount_paid: parseFloat(formData.amountPaid),
          transaction_id: formData.transactionId || null
        });

      if (error) throw error;

      toast({
        title: "Request Submitted Successfully!",
        description: "Your replacement/return request has been submitted. We'll contact you soon.",
      });

      // Reset form
      setFormData({
        productLink: '',
        quantity: 1,
        orderDate: '',
        requestType: '',
        returnReason: '',
        fullName: '',
        phoneNumber: '',
        amountPaid: '',
        transactionId: ''
      });

      // Navigate to home after successful submission
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <Navigation />
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
      
      <div className="pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg p-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-pink to-electric-blue bg-clip-text text-transparent mb-4">
              Replacement / Return Request
            </h1>
            <p className="text-lg text-gray-600">
              Submit your request for product replacement or return
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Policy Information */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-neon-pink">
                    📦 Replacement / Refund Policy Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🔄</span>
                    <div>
                      <p className="font-semibold">Marketplace Policy Applies:</p>
                      <p className="text-sm text-gray-600">Replacement or refund terms are the same as listed on the original marketplace (e.g., Amazon, Flipkart).</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <span className="text-lg">📍</span>
                    <div>
                      <p className="font-semibold">Same Address Pickup:</p>
                      <p className="text-sm text-gray-600">Return pickups will only be made from the delivery address used during order placement.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <span className="text-lg">🎁</span>
                    <div>
                      <p className="font-semibold">Vouchers Are Non-Refundable:</p>
                      <p className="text-sm text-gray-600">Brand vouchers issued are not eligible for return, refund, or exchange.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <span className="text-lg">💸</span>
                    <div>
                      <p className="font-semibold">Refund Timeline:</p>
                      <p className="text-sm text-gray-600">Any eligible refund will be processed within 2 to 14 business days after the product is received and verified.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <span className="text-lg">📲</span>
                    <div>
                      <p className="font-semibold">Refund Communication:</p>
                      <p className="text-sm text-gray-600">The eligible refund amount will be clearly communicated via WhatsApp, SMS, and Email.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Request Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                  <CardDescription>
                    Please fill in all the required information for your replacement or return request.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="productLink">Product Link *</Label>
                        <Input
                          id="productLink"
                          type="url"
                          value={formData.productLink}
                          onChange={(e) => handleInputChange('productLink', e.target.value)}
                          placeholder="https://example.com/product"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="orderDate">Order Date *</Label>
                        <Input
                          id="orderDate"
                          type="date"
                          value={formData.orderDate}
                          onChange={(e) => handleInputChange('orderDate', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requestType">Request Type *</Label>
                        <Select value={formData.requestType} onValueChange={(value) => handleInputChange('requestType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select request type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Replacement">Replacement</SelectItem>
                            <SelectItem value="Return">Return</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          placeholder="+91 XXXXXXXXXX"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amountPaid">Amount Paid *</Label>
                        <Input
                          id="amountPaid"
                          type="text"
                          value={formData.amountPaid}
                          onChange={(e) => handleInputChange('amountPaid', e.target.value)}
                          placeholder="0.00"
                          className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                        <Input
                          id="transactionId"
                          value={formData.transactionId}
                          onChange={(e) => handleInputChange('transactionId', e.target.value)}
                          placeholder="Transaction ID"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="returnReason">Return Reason *</Label>
                      <Textarea
                        id="returnReason"
                        value={formData.returnReason}
                        onChange={(e) => handleInputChange('returnReason', e.target.value)}
                        placeholder="Please describe the reason for return/replacement"
                        className="min-h-20"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-glow gradient-primary text-white border-0"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReplacementReturn;
