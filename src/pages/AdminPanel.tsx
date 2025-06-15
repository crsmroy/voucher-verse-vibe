import React, { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Hourglass, Check, DollarSign } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from "date-fns";
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

const padOrderId = (id: string) => {
  // Only pad if all chars are digits, length < 6, and not already leading zeroes
  if (/^\d{1,6}$/.test(id)) {
    return id.padStart(6, "0");
  }
  // If already 6 digits, or not pure digits, don't pad
  return id;
};

const AdminPanel = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Date filters
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sorting state
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Orders
  const [orders, setOrders] = useState<any[]>([]);

  // Confirmation dialog for status changes
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    orderId: "",
    newStatus: "",
    actionText: ""
  });

  // Add order dialog
  const [addOrderDialogOpen, setAddOrderDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState(initialAddForm);

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

  // Handlers (stubs)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/auth", { replace: true });
  };

  // Status & order UI handlers (stubs)
  const openAddOrderDialog = () => setAddOrderDialogOpen(true);
  const closeAddOrderDialog = () => setAddOrderDialogOpen(false);

  // Update input change for orderId to auto-pad as needed
  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "orderId") {
      // Only allow up to 6 numbers, or let through valid full value
      let formatted = value.replace(/\D/g, "").slice(0, 6); // only digits, max 6
      if (value.length > 0 && value.length <= 6 && /^\d+$/.test(value)) {
        formatted = padOrderId(formatted);
      } else {
        formatted = value;
      }
      setAddForm({ ...addForm, [name]: formatted });
    } else {
      setAddForm({ ...addForm, [name]: value });
    }
  };

  // Pad the orderId on blur, for manual editing cases
  const handleOrderIdBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{1,6}$/.test(value)) {
      setAddForm({ ...addForm, orderId: padOrderId(value) });
    }
  };

  const handleAddSelectChange = (key: string, val: string) => {
    setAddForm({ ...addForm, [key]: val });
  };

  const handleStatusChangeRequest = (orderId: string, newStatus: string) => {
    setConfirmationDialog({
      isOpen: true,
      orderId,
      newStatus,
      actionText: (newStatus.charAt(0).toUpperCase() + newStatus.slice(1)),
    });
  };

  const confirmStatusChange = async () => {
    if (!confirmationDialog.orderId || !confirmationDialog.newStatus) {
      setConfirmationDialog({
        isOpen: false,
        orderId: "",
        newStatus: "",
        actionText: ""
      });
      return;
    }
    // Update order status in Supabase
    const { error } = await supabase
      .from("orders")
      .update({ status: confirmationDialog.newStatus })
      .eq("order_id", confirmationDialog.orderId);

    if (error) {
      // Optionally show error toast (using shadcn toasts)
      import("@/components/ui/use-toast").then(({ toast }) => {
        toast({
          title: "Failed to update status",
          description: error.message,
          variant: "destructive",
        });
      });
    } else {
      // Refetch orders after successful update
      const { data: freshOrders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      setOrders(freshOrders || []);

      // Show success toast
      import("@/components/ui/use-toast").then(({ toast }) => {
        toast({
          title: "Order status updated",
          description: `Status changed to '${confirmationDialog.newStatus}' for order ${confirmationDialog.orderId}.`,
        });
      });
    }

    setConfirmationDialog({
      isOpen: false,
      orderId: "",
      newStatus: "",
      actionText: ""
    });
  };

  const cancelStatusChange = () => {
    setConfirmationDialog({
      isOpen: false,
      orderId: "",
      newStatus: "",
      actionText: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "border-yellow-400 text-yellow-700 bg-yellow-100";
      case "verified": return "border-blue-400 text-blue-700 bg-blue-100";
      case "completed": return "border-green-500 text-green-700 bg-green-100";
      case "rejected": return "border-red-400 text-red-700 bg-red-100";
      case "cancelled": return "border-gray-400 text-gray-700 bg-gray-100";
      default: return "border-gray-300";
    }
  };

  // Fetch orders from Supabase
  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } else {
        setOrders(data || []);
      }
    }
    fetchOrders();
  }, []);

  // Insert a new order into Supabase
  const handleAddOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-pad order id just before submit (if user pasted plain number)
    let orderId = addForm.orderId;
    if (/^\d{1,6}$/.test(orderId)) {
      orderId = padOrderId(orderId);
    }

    // Prepare payload matching DB schema
    const payload = {
      order_id: orderId,
      product_link: addForm.productLink,
      product: addForm.product,
      price: parseFloat(addForm.price) || null,
      quantity: Number(addForm.quantity) || 1,
      category: addForm.category,
      voucher_amount: parseFloat(addForm.voucherAmount) || null,
      platform: addForm.platform,
      premium_price: parseFloat(addForm.premiumPrice) || null,
      service_fee: parseFloat(addForm.serviceFee) || null,
      gst: addForm.gst,
      total_to_pay: parseFloat(addForm.totalToPay) || null,
      full_name: addForm.fullName,
      phone_number: addForm.phoneNumber,
      alternate_phone_number: addForm.alternatePhoneNumber,
      whatsapp_number: addForm.whatsappNumber,
      email_address: addForm.emailAddress,
      full_address: addForm.fullAddress,
      city: addForm.city,
      state: addForm.state,
      pincode: addForm.pincode,
      landmark: addForm.landmark,
      payment_proof_link: addForm.paymentProofLink,
      transaction_id: addForm.transactionId,
      date_time: addForm.dateTime,
      status: addForm.status,
    };

    const { data, error } = await supabase.from('orders').insert([payload]);

    if (error) {
      alert("Failed to add order: " + error.message);
    } else {
      // Refetch orders after adding
      const { data: freshOrders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      setOrders(freshOrders || []);
      closeAddOrderDialog();
    }
  };

  // --- Handler for sortable columns only ---
  const handleSort = (field: string) => {
    // Only allow sorting for 'orderId' and 'dateTime'
    if (field !== "orderId" && field !== "dateTime") return;
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // --- Enhanced Filtering Logic for Orders ---
  // Apply status and search filters to the raw orders before mapping for display
  const filteredRawOrders = orders.filter((order: any) => {
    // Status filter (if not "all")
    if (statusFilter !== "all" && order.status !== statusFilter) return false;

    // Date filter logic (NEW): Only include if within fromDate/toDate (inclusive)
    if ((fromDate || toDate) && order.date_time) {
      // Try parsing order.date_time to Date
      const orderDate = new Date(order.date_time);
      if (isNaN(orderDate.getTime())) return false; // Can't parse date, exclude
      if (fromDate && orderDate < new Date(fromDate.setHours(0,0,0,0))) return false;
      if (toDate && orderDate > new Date(toDate.setHours(23,59,59,999))) return false;
    }

    // Search filter: ONLY check order_id
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      // ONLY search order_id field
      const orderId = (order.order_id ?? '').toString().toLowerCase();
      if (!orderId.includes(term)) {
        return false;
      }
    }
    return true;
  });

  // Map filteredRawOrders for table display (with frontend keys)
  const mappedOrders = filteredRawOrders.map((order: any) => ({
    orderId: order.order_id,
    productLink: order.product_link,
    product: order.product,
    price: order.price !== null && order.price !== undefined ? `₹${order.price}` : "",
    quantity: order.quantity,
    category: order.category,
    voucherAmount: order.voucher_amount !== null && order.voucher_amount !== undefined ? `₹${order.voucher_amount}` : "",
    platform: order.platform,
    premiumPrice: order.premium_price !== null && order.premium_price !== undefined ? `₹${order.premium_price}` : "",
    serviceFee: order.service_fee !== null && order.service_fee !== undefined ? `₹${order.service_fee}` : "",
    gst: order.gst,
    totalToPay: order.total_to_pay !== null && order.total_to_pay !== undefined ? `₹${order.total_to_pay}` : "",
    fullName: order.full_name,
    phoneNumber: order.phone_number,
    alternatePhoneNumber: order.alternate_phone_number,
    whatsappNumber: order.whatsapp_number,
    emailAddress: order.email_address,
    fullAddress: order.full_address,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    landmark: order.landmark,
    paymentProofLink: order.payment_proof_link,
    transactionId: order.transaction_id,
    dateTime: order.date_time,
    status: order.status,
    id: order.id,
  }));

  // --- Sorting for mapped orders (frontend keys) ---
  const sortedOrders = React.useMemo(() => {
    if (!sortField) return mappedOrders;
    return [...mappedOrders].sort((a, b) => {
      if (sortField === "orderId") {
        const valA = (a.orderId ?? '').toString();
        const valB = (b.orderId ?? '').toString();
        // Sort as string so '000123' < '000124'
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
      if (sortField === "dateTime") {
        const dateA = a.dateTime ? new Date(a.dateTime) : new Date(0);
        const dateB = b.dateTime ? new Date(b.dateTime) : new Date(0);
        if (dateA < dateB) return sortDirection === "asc" ? -1 : 1;
        if (dateA > dateB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
    });
  }, [mappedOrders, sortField, sortDirection]);

  // Calculated stats (NOT useState, just constants)
  const totalOrders = filteredRawOrders.length;
  const pendingCount = filteredRawOrders.filter((o) => o.status === "pending").length;
  const verifiedCount = filteredRawOrders.filter((o) => o.status === "verified").length;
  const completedCount = filteredRawOrders.filter((o) => o.status === "completed").length;
  const cancelledCount = filteredRawOrders.filter((o) => o.status === "cancelled").length;
  const revenue = filteredRawOrders.reduce((acc, o) => acc + (o.total_to_pay || 0), 0);
  const serviceFeeTotal = filteredRawOrders.reduce((acc, o) => acc + (o.service_fee || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Brand Header */}
      <header className="w-full flex items-center justify-between px-4 sm:px-8 pt-6 pb-0 mb-2">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div
            className="w-10 h-10 flex items-center justify-center rounded-[10px] font-bold text-white text-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            F
          </div>
          {/* Brand Name */}
          <span className="text-[2rem] font-bold flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              Freedom
            </span>
            <span className="ml-1 text-blue-400">Vouchers</span>
          </span>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </header>
      {/* Main Dashboard section with less top padding */}
      <div className="pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
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
                      {/* Only these columns are sortable */}
                      <TableHead
                        className="cursor-pointer select-none"
                        onClick={() => handleSort("orderId")}
                      >
                        <span className="inline-flex items-center">
                          Order Id
                          {sortField === "orderId" ? (
                            sortDirection === "asc" ? (
                              <span className="ml-1 text-blue-500">
                                {/* Up Arrow */}
                                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5l7 7-1.41 1.42L13 9.83V19h-2V9.83l-4.59 4.59L5 12z" /></svg>
                              </span>
                            ) : (
                              <span className="ml-1 text-blue-500">
                                {/* Down Arrow */}
                                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 19l-7-7 1.41-1.42L11 14.17V5h2v9.17l4.59-4.59L19 12z" /></svg>
                              </span>
                            )
                          ) : null}
                        </span>
                      </TableHead>
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
                      <TableHead
                        className="cursor-pointer select-none"
                        onClick={() => handleSort("dateTime")}
                      >
                        <span className="inline-flex items-center">
                          DateTime
                          {sortField === "dateTime" ? (
                            sortDirection === "asc" ? (
                              <span className="ml-1 text-blue-500">
                                {/* Up Arrow */}
                                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5l7 7-1.41 1.42L13 9.83V19h-2V9.83l-4.59 4.59L5 12z" /></svg>
                              </span>
                            ) : (
                              <span className="ml-1 text-blue-500">
                                {/* Down Arrow */}
                                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 19l-7-7 1.41-1.42L11 14.17V5h2v9.17l4.59-4.59L19 12z" /></svg>
                              </span>
                            )
                          ) : null}
                        </span>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedOrders.map((order) => (
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
              {sortedOrders.length === 0 && (
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
            <Input
              name="orderId"
              required
              value={addForm.orderId}
              onChange={handleAddInputChange}
              onBlur={handleOrderIdBlur}
              placeholder="Order Id (e.g. 000123)"
              maxLength={6}
              inputMode="numeric"
              pattern="\d{6}"
              title="Order Id must be a 6 digit number"
            />
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
