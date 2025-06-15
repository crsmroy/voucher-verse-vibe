
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const redirectUrl = `${window.location.origin}/admin`;

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<"login"|"signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        setMode("login");
        setError("Signup successful! Please check your email to confirm and then login.");
      }
    } catch (err: any) {
      setError(err?.message ?? "Authentication failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-[370px]">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Admin Login" : "Admin Signup"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
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
              {loading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              disabled={loading}
            >
              {mode === "login" ? "Need an account? Sign Up" : "Already have an account? Login"}
            </Button>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
