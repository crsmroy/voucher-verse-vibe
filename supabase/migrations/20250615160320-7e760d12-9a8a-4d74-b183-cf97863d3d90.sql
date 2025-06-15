
-- Create an "orders" table with specified fields as floats.
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL,
  product_link TEXT,
  product TEXT,
  price float,
  quantity INTEGER DEFAULT 1,
  category TEXT,
  voucher_amount float,
  platform TEXT,
  premium_price float,
  service_fee float,
  gst TEXT,
  total_to_pay float,
  full_name TEXT,
  phone_number TEXT,
  alternate_phone_number TEXT,
  whatsapp_number TEXT,
  email_address TEXT,
  full_address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  landmark TEXT,
  payment_proof_link TEXT,
  transaction_id TEXT,
  date_time TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- For now, allow all authenticated users full access to this table for demo purposes (can restrict later)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access for all authenticated users"
  ON public.orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon (unauthenticated) users to insert (for public submissions, e.g. from regular users filling the order form).
CREATE POLICY "Allow anon insert"
  ON public.orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

