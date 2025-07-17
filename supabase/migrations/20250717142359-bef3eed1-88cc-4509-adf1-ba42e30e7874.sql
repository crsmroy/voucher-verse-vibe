-- Fix RLS policy to allow anonymous users to insert orders
DROP POLICY IF EXISTS "Allow anon insert" ON public.orders;

-- Create new policy that actually allows anonymous inserts
CREATE POLICY "Allow anonymous users to insert orders" 
ON public.orders 
FOR INSERT 
TO anon
WITH CHECK (true);