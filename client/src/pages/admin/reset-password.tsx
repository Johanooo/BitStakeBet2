import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Shield, Check } from "lucide-react";
import { Link } from "wouter";

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const token = params.get("token");
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    if (!token) {
      toast({ title: "Error", description: "Invalid reset link", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/admin/auth/reset-password", { token, newPassword });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        toast({ title: "Error", description: data.error || "Failed to reset password", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error?.message || "Failed to reset password", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Invalid or missing reset token.</p>
            <Link href="/admin/login">
              <Button data-testid="button-back-login">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold">Password Reset</h2>
            <p className="text-muted-foreground">Your password has been updated. You can now log in with your new password.</p>
            <Link href="/admin/login">
              <Button className="w-full" data-testid="button-go-login">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                minLength={8}
                data-testid="input-reset-new-password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                required
                minLength={8}
                data-testid="input-reset-confirm-password"
              />
              {confirmPassword && newPassword && (
                <p className={`text-xs ${newPassword === confirmPassword ? "text-emerald-500" : "text-red-500"}`}>
                  {newPassword === confirmPassword ? "Passwords match" : "Passwords don't match"}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || !newPassword || newPassword !== confirmPassword}
              data-testid="button-reset-password"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
