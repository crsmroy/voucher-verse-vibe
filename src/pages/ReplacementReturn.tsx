
import { useState } from 'react';
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
          product_image: null,
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
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <Navigation />
      
      <div className="pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
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
    </div>
  );
};

export default ReplacementReturn;
