
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navigation from '@/components/Navigation';

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [orders, setOrders] = useState([
    {
      orderId: 'ORD001',
      productLink: 'https://example.com/iphone15pro',
      product: 'iPhone 15 Pro',
      price: '₹80,000',
      quantity: 1,
      category: 'Electronics',
      voucherAmount: '₹5,000',
      platform: 'Amazon',
      premiumPrice: '₹85,000',
      serviceFee: '₹500',
      gst: '₹4,500',
      totalToPay: '₹85,000',
      fullName: 'John Doe',
      phoneNumber: '+91-9876543210',
      alternatePhoneNumber: '+91-9876543211',
      whatsappNumber: '+91-9876543210',
      emailAddress: 'john@email.com',
      fullAddress: '123 Main St, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      landmark: 'Near City Mall',
      paymentProofLink: 'https://example.com/payment-proof-1',
      transactionId: 'TXN123456789',
      dateTime: '2024-01-15 10:30:00',
      status: 'pending'
    },
    {
      orderId: 'ORD002',
      productLink: 'https://example.com/macbook-air',
      product: 'MacBook Air M2',
      price: '₹90,000',
      quantity: 1,
      category: 'Electronics',
      voucherAmount: '₹5,000',
      platform: 'Flipkart',
      premiumPrice: '₹95,000',
      serviceFee: '₹500',
      gst: '₹4,500',
      totalToPay: '₹95,000',
      fullName: 'Jane Smith',
      phoneNumber: '+91-9876543220',
      alternatePhoneNumber: '+91-9876543221',
      whatsappNumber: '+91-9876543220',
      emailAddress: 'jane@email.com',
      fullAddress: '456 Park Avenue, Floor 2',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      landmark: 'Opposite Metro Station',
      paymentProofLink: 'https://example.com/payment-proof-2',
      transactionId: 'TXN987654321',
      dateTime: '2024-01-14 14:20:00',
      status: 'verified'
    },
    {
      orderId: 'ORD003',
      productLink: 'https://example.com/airpods-pro',
      product: 'AirPods Pro',
      price: '₹22,000',
      quantity: 1,
      category: 'Electronics',
      voucherAmount: '₹2,900',
      platform: 'Apple Store',
      premiumPrice: '₹24,900',
      serviceFee: '₹300',
      gst: '₹1,200',
      totalToPay: '₹24,900',
      fullName: 'Mike Johnson',
      phoneNumber: '+91-9876543230',
      alternatePhoneNumber: '+91-9876543231',
      whatsappNumber: '+91-9876543230',
      emailAddress: 'mike@email.com',
      fullAddress: '789 Oak Street, Villa 12',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      landmark: 'Near Tech Park',
      paymentProofLink: 'https://example.com/payment-proof-3',
      transactionId: 'TXN456789123',
      dateTime: '2024-01-13 09:15:00',
      status: 'completed'
    }
  ]);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'verified': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage orders and customer inquiries</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Orders', value: orders.length.toString(), color: 'from-neon-pink to-warm-orange', icon: '📋' },
              { title: 'Pending', value: orders.filter(o => o.status === 'pending').length.toString(), color: 'from-electric-blue to-teal', icon: '⏳' },
              { title: 'Completed', value: orders.filter(o => o.status === 'completed').length.toString(), color: 'from-lime-green to-electric-blue', icon: '✅' },
              { title: 'Revenue', value: '₹2.4L', color: 'from-warm-orange to-neon-pink', icon: '💰' }
            ].map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl font-bold">All Orders</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search orders..." 
                    className="w-64" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Id</TableHead>
                      <TableHead>Product Link</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Voucher Amount</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Premium Price</TableHead>
                      <TableHead>Service Fee</TableHead>
                      <TableHead>GST</TableHead>
                      <TableHead>Total To Pay</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Alternate Phone Number</TableHead>
                      <TableHead>Whatsapp Number</TableHead>
                      <TableHead>Email Address</TableHead>
                      <TableHead>Full Address</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Pincode</TableHead>
                      <TableHead>Landmark</TableHead>
                      <TableHead>Payment Proof Link</TableHead>
                      <TableHead>Transaction Id</TableHead>
                      <TableHead>DateTime</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>
                          <a href={order.productLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            View Link
                          </a>
                        </TableCell>
                        <TableCell className="max-w-32 truncate">{order.product}</TableCell>
                        <TableCell>{order.price}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.category}</TableCell>
                        <TableCell>{order.voucherAmount}</TableCell>
                        <TableCell>{order.platform}</TableCell>
                        <TableCell>{order.premiumPrice}</TableCell>
                        <TableCell>{order.serviceFee}</TableCell>
                        <TableCell>{order.gst}</TableCell>
                        <TableCell className="font-semibold">{order.totalToPay}</TableCell>
                        <TableCell>{order.fullName}</TableCell>
                        <TableCell>{order.phoneNumber}</TableCell>
                        <TableCell>{order.alternatePhoneNumber}</TableCell>
                        <TableCell>{order.whatsappNumber}</TableCell>
                        <TableCell className="max-w-40 truncate">{order.emailAddress}</TableCell>
                        <TableCell className="max-w-48 truncate">{order.fullAddress}</TableCell>
                        <TableCell>{order.city}</TableCell>
                        <TableCell>{order.state}</TableCell>
                        <TableCell>{order.pincode}</TableCell>
                        <TableCell className="max-w-32 truncate">{order.landmark}</TableCell>
                        <TableCell>
                          <a href={order.paymentProofLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            View Proof
                          </a>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{order.transactionId}</TableCell>
                        <TableCell className="text-sm">{order.dateTime}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Select onValueChange={(value) => handleStatusChange(order.orderId, value)}>
                            <SelectTrigger className="w-24 h-8">
                              <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="verified">Verify</SelectItem>
                              <SelectItem value="rejected">Reject</SelectItem>
                              <SelectItem value="completed">Complete</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No orders found matching your search criteria.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
