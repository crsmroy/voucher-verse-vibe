import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Navigation from '@/components/Navigation';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { ClipboardList, Hourglass, Check, DollarSign } from "lucide-react";

const initialAddForm = {
  orderId: '',
  productLink: '',
  product: '',
  price: '',
  quantity: 1,
  category: '',
  voucherAmount: '',
  platform: '',
  premiumPrice: '',
  serviceFee: '',
  gst: '',
  totalToPay: '',
  fullName: '',
  phoneNumber: '',
  alternatePhoneNumber: '',
  whatsappNumber: '',
  emailAddress: '',
  fullAddress: '',
  city: '',
  state: '',
  pincode: '',
  landmark: '',
  paymentProofLink: '',
  transactionId: '',
  dateTime: '',
  status: 'pending',
};

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    orderId: string;
    newStatus: string;
    actionText: string;
  }>({
    isOpen: false,
    orderId: '',
    newStatus: '',
    actionText: ''
  });

  const [addOrderDialogOpen, setAddOrderDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState(initialAddForm);

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

  const handleStatusChangeRequest = (orderId: string, newStatus: string) => {
    const actionText = newStatus === 'verified' ? 'Verify' : 
                      newStatus === 'rejected' ? 'Reject' : 'Complete';
    
    setConfirmationDialog({
      isOpen: true,
      orderId,
      newStatus,
      actionText
    });
  };

  const confirmStatusChange = () => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === confirmationDialog.orderId 
          ? { ...order, status: confirmationDialog.newStatus }
          : order
      )
    );
    
    setConfirmationDialog({
      isOpen: false,
      orderId: '',
      newStatus: '',
      actionText: ''
    });
  };

  const cancelStatusChange = () => {
    setConfirmationDialog({
      isOpen: false,
      orderId: '',
      newStatus: '',
      actionText: ''
    });
  };

  // Utility: Parse ₹ values (e.g. "₹24,900" => 24900)
  const parseRupee = (value: string) => {
    if (!value) return 0;
    return Number(value.replace(/[^\d.]/g, "").replace(/,/g, "")) || 0;
  };

  // Calculate totals/counts for cards
  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const verifiedCount = orders.filter((o) => o.status === "verified").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  // "Total to Pay" aggregate (Revenue)
  const revenue = orders.reduce((acc, order) => acc + parseRupee(order.totalToPay), 0);
  // "Service Fee" aggregate
  const serviceFeeTotal = orders.reduce((acc, order) => acc + parseRupee(order.serviceFee), 0);

  // --- Add Order form logic ---
  const openAddOrderDialog = () => {
    setAddForm({
      ...initialAddForm,
      dateTime: new Date().toISOString().slice(0, 16).replace('T', ' '), // prefill with current date/time
      status: 'pending',
    });
    setAddOrderDialogOpen(true);
  };
  const closeAddOrderDialog = () => setAddOrderDialogOpen(false);

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSelectChange = (name: string, value: string | number) => {
    setAddForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setOrders(prev => [
      {
        ...addForm,
        dateTime: addForm.dateTime || new Date().toISOString().slice(0, 16).replace('T', ' '),
        quantity: Number(addForm.quantity)
      },
      ...prev
    ]);
    setAddOrderDialogOpen(false);
    setAddForm(initialAddForm);
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
          <div className="grid md:grid-cols-6 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink to-warm-orange flex items-center justify-center text-white text-xl">
                  <ClipboardList size={28} />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-electric-blue to-teal flex items-center justify-center text-white text-xl">
                  <Hourglass size={28} />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">{verifiedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-green-300 flex items-center justify-center text-white text-xl">
                  <Check size={28} />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-lime-green to-electric-blue flex items-center justify-center text-white text-xl">
                  <Check size={28} />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-warm-orange to-neon-pink flex items-center justify-center text-white text-xl">
                  <DollarSign size={28} />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Service Fee</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{serviceFeeTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 flex items-center justify-center text-white text-xl">
                  <DollarSign size={28} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl font-bold">All Orders</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="text-base font-medium"
                    onClick={openAddOrderDialog}
                  >
                    + Add Order
                  </Button>
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
                        <TableCell>
                          {order.price.replace(/^₹\s?/, "")}
                        </TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.category}</TableCell>
                        <TableCell>
                          {order.voucherAmount.replace(/^₹\s?/, "")}
                        </TableCell>
                        <TableCell>{order.platform}</TableCell>
                        <TableCell>
                          {order.premiumPrice.replace(/^₹\s?/, "")}
                        </TableCell>
                        <TableCell>
                          {order.serviceFee.replace(/^₹\s?/, "")}
                        </TableCell>
                        <TableCell>
                          {order.gst.replace(/^₹\s?/, "")}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {order.totalToPay.replace(/^₹\s?/, "")}
                        </TableCell>
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
                          <Select onValueChange={(value) => handleStatusChangeRequest(order.orderId, value)}>
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

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmationDialog.isOpen} onOpenChange={(open) => !open && cancelStatusChange()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {confirmationDialog.actionText.toLowerCase()} order {confirmationDialog.orderId}?
              This action will change the order status to "{confirmationDialog.newStatus}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelStatusChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              {confirmationDialog.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Order Dialog */}
      <Dialog open={addOrderDialogOpen} onOpenChange={setAddOrderDialogOpen}>
        <DialogContent className="max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
            <DialogDescription>
              Fill out the details below to manually add an order.
            </DialogDescription>
          </DialogHeader>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2" onSubmit={handleAddOrderSubmit}>
            {/* Removed `label` prop from each Input below */}
            <Input name="orderId" required value={addForm.orderId} onChange={handleAddInputChange} placeholder="Order Id" />
            <Input name="productLink" value={addForm.productLink} onChange={handleAddInputChange} placeholder="Product Link" />
            <Input name="product" value={addForm.product} onChange={handleAddInputChange} placeholder="Product" />
            <Input name="price" value={addForm.price} onChange={handleAddInputChange} placeholder="Price" />
            <Input name="quantity" type="number" value={addForm.quantity} onChange={handleAddInputChange} placeholder="Quantity" />
            <Input name="category" value={addForm.category} onChange={handleAddInputChange} placeholder="Category" />
            <Input name="voucherAmount" value={addForm.voucherAmount} onChange={handleAddInputChange} placeholder="Voucher Amount" />
            <Input name="platform" value={addForm.platform} onChange={handleAddInputChange} placeholder="Platform" />
            <Input name="premiumPrice" value={addForm.premiumPrice} onChange={handleAddInputChange} placeholder="Premium Price" />
            <Input name="serviceFee" value={addForm.serviceFee} onChange={handleAddInputChange} placeholder="Service Fee" />
            <Input name="gst" value={addForm.gst} onChange={handleAddInputChange} placeholder="GST" />
            <Input name="totalToPay" value={addForm.totalToPay} onChange={handleAddInputChange} placeholder="Total To Pay" />
            <Input name="fullName" value={addForm.fullName} onChange={handleAddInputChange} placeholder="Full Name" />
            <Input name="phoneNumber" value={addForm.phoneNumber} onChange={handleAddInputChange} placeholder="Phone Number" />
            <Input name="alternatePhoneNumber" value={addForm.alternatePhoneNumber} onChange={handleAddInputChange} placeholder="Alternate Phone Number" />
            <Input name="whatsappNumber" value={addForm.whatsappNumber} onChange={handleAddInputChange} placeholder="Whatsapp Number" />
            <Input name="emailAddress" value={addForm.emailAddress} onChange={handleAddInputChange} placeholder="Email Address" />
            <Input name="fullAddress" value={addForm.fullAddress} onChange={handleAddInputChange} placeholder="Full Address" />
            <Input name="city" value={addForm.city} onChange={handleAddInputChange} placeholder="City" />
            <Input name="state" value={addForm.state} onChange={handleAddInputChange} placeholder="State" />
            <Input name="pincode" value={addForm.pincode} onChange={handleAddInputChange} placeholder="Pincode" />
            <Input name="landmark" value={addForm.landmark} onChange={handleAddInputChange} placeholder="Landmark" />
            <Input name="paymentProofLink" value={addForm.paymentProofLink} onChange={handleAddInputChange} placeholder="Payment Proof Link" />
            <Input name="transactionId" value={addForm.transactionId} onChange={handleAddInputChange} placeholder="Transaction Id" />
            <Input name="dateTime" value={addForm.dateTime} onChange={handleAddInputChange} placeholder="DateTime" />
            <Select value={addForm.status} onValueChange={(val) => handleAddSelectChange('status', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter className="col-span-2 flex-row-reverse mt-4">
              <Button type="submit">Add Order</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={closeAddOrderDialog}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
