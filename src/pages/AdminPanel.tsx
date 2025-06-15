import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/auth", { replace: true });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }
  if (!user) {
    return null; // Redirection handled above
  }

  return (
    <div>
      <div className="p-4 flex justify-end">
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage orders and customer inquiries</p>
          </div>

          {/* Date Range Filters */}
          <div className="mb-4 flex flex-col sm:flex-row sm:justify-end">
            <div className="flex items-center gap-4">
              {/* From date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[160px] justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    {fromDate ? format(fromDate, "PPP") : <span>From date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fromDate || undefined}
                    onSelect={date => setFromDate(date ?? null)}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {/* To date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[160px] justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    {toDate ? format(toDate, "PPP") : <span>To date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={toDate || undefined}
                    onSelect={date => setToDate(date ?? null)}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {/* Reset button for date range */}
              {(fromDate || toDate) && (
                <Button variant="ghost" size="sm" onClick={() => { setFromDate(null); setToDate(null); }}>
                  Clear Dates
                </Button>
              )}
            </div>
          </div>

          {/* Stats Cards: Row 1 - Order Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-4">
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
                  <p className="text-sm text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-900">{cancelledCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-white text-xl">
                  {/* Use Hourglass (or another icon if you prefer) */}
                  <Hourglass size={28} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards: Row 2 - Earnings & Service Fee, right aligned */}
          <div className="w-full flex flex-col md:flex-row justify-end items-end gap-6 mb-8">
            <Card className="w-full max-w-xs hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink to-warm-orange flex items-center justify-center text-white text-xl">
                  <DollarSign size={28} />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full max-w-xs hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Service Fee</p>
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
                {/* --- LEFT: All Orders title and Add Order button --- */}
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl font-bold">All Orders</CardTitle>
                  <Button
                    variant="outline"
                    className="text-base font-medium"
                    onClick={openAddOrderDialog}
                  >
                    + Add Order
                  </Button>
                </div>
                {/* --- RIGHT: Search and filters --- */}
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
                      <SelectItem value="cancelled">Cancelled</SelectItem>
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
                              <SelectItem value="cancelled">Cancel</SelectItem>
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
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
