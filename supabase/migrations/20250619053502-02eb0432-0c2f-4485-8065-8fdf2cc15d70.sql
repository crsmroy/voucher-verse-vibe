
-- Create replacement_return_requests table to store customer requests
CREATE TABLE public.replacement_return_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_link TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  order_date DATE NOT NULL,
  request_type TEXT NOT NULL CHECK (request_type IN ('Replacement', 'Return')),
  return_reason TEXT NOT NULL,
  product_image TEXT,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.replacement_return_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert replacement/return requests (public form)
CREATE POLICY "Anyone can submit replacement/return requests" 
  ON public.replacement_return_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow admins to view all requests
CREATE POLICY "Admins can view all replacement/return requests" 
  ON public.replacement_return_requests 
  FOR SELECT 
  USING (true);
