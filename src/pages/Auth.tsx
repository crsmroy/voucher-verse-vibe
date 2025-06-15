
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/admin");
    } catch (err: any) {
      setError(err?.message ?? "Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-[370px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email"
              required
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
            <Input
              placeholder="Password"
              required
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Login"}
            </Button>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          </form>
          <div className="text-xs text-center text-gray-400 mt-3">
            Only authorized users may log in. Please contact the administrator to request access.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
