import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, User, Mail, Shield, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const { login, setup, isLoggingIn, isSettingUp, needsSetup, isLoading, isAuthenticated } = useAdminAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSending, setForgotSending] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/admin");
    }
  }, [isLoading, isAuthenticated, setLocation]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (needsSetup) {
        await setup({ username, password, email: email || undefined });
        toast({
          title: "Admin account created",
          description: "You are now logged in.",
        });
      } else {
        await login({ username, password });
        toast({
          title: "Logged in",
          description: "Welcome back!",
        });
      }
      setLocation("/admin");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Login failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {needsSetup ? "Create Admin Account" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {needsSetup 
              ? "Set up your first admin account to manage the site"
              : "Enter your credentials to access the admin panel"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                  data-testid="input-username"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={needsSetup ? "Minimum 8 characters" : "Enter password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={needsSetup ? 8 : undefined}
                  data-testid="input-password"
                />
              </div>
            </div>
            
            {needsSetup && (
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    data-testid="input-email"
                  />
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoggingIn || isSettingUp}
              data-testid="button-login"
            >
              {isLoggingIn || isSettingUp ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  {needsSetup ? "Creating account..." : "Logging in..."}
                </span>
              ) : (
                needsSetup ? "Create Admin Account" : "Login"
              )}
            </Button>
            
            {!needsSetup && (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => setShowForgotPassword(true)}
                data-testid="button-forgot-password"
              >
                Forgot password?
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {showForgotPassword && (
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5" />
              Reset Password
            </CardTitle>
            <CardDescription>
              Enter your admin email address and we'll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {forgotSent ? (
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  If an account with that email exists, a reset link has been sent. Check your inbox.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => { setShowForgotPassword(false); setForgotSent(false); setForgotEmail(""); }}
                  data-testid="button-back-to-login"
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setForgotSending(true);
                try {
                  await apiRequest("POST", "/api/admin/auth/forgot-password", { email: forgotEmail });
                  setForgotSent(true);
                } catch (error) {
                  toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
                }
                setForgotSending(false);
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgotEmail">Email address</Label>
                  <Input
                    id="forgotEmail"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    data-testid="input-forgot-email"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={forgotSending}
                    className="flex-1"
                    data-testid="button-send-reset"
                  >
                    {forgotSending ? "Sending..." : "Send Reset Link"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForgotPassword(false)}
                    data-testid="button-cancel-forgot"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
