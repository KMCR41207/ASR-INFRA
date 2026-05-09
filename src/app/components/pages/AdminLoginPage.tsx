import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Lock, Shield } from "lucide-react";
import { toast } from "sonner";

// Admin credentials — only this account can access the admin panel
const ADMIN_EMAIL = "admin@asrinfra.com";
const ADMIN_PASSWORD = "admin123";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Auto-redirect if already logged in as admin
  useEffect(() => {
    if (localStorage.getItem("adminAuth")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard", { replace: true });
    } else {
      toast.error("Invalid credentials. Access denied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#dce8f2] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="w-10 h-10 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Access</h1>
            <p className="text-muted-foreground text-sm">Restricted to authorized personnel only</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                placeholder="admin@asrinfra.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                placeholder="Enter password"
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 gap-2">
              <Lock className="w-4 h-4" /> Login to Admin Panel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
