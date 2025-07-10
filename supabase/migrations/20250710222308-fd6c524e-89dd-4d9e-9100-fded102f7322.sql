
-- Add referral_code column to the orders table
ALTER TABLE public.orders 
ADD COLUMN referral_code text;
