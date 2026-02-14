import { useState } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, Lock, Mail, Shield, Eye, EyeOff, Check } from "lucide-react";
import { Link } from "wouter";

export default function AdminSettings() {
  const { user, isLoading: authLoading, isAuthenticated } = useAdminAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);

  const { data: profile, isLoading: loadingProfile } = useQuery<{ id: string; username: string; email: string; role: string }>({
    queryKey: ["/api/admin/auth/profile"],
    enabled: isAuthenticated,
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const res = await apiRequest("POST", "/api/admin/auth/change-password", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Password changed", description: "Your password has been updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.message || "Failed to change password", variant: "destructive" });
    },
  });

  const updateEmailMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await apiRequest("PUT", "/api/admin/auth/email", { email });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Email updated", description: "Your recovery email has been updated." });
      setEditingEmail(false);
      setNewEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/auth/profile"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.message || "Failed to update email", variant: "destructive" });
    },
  });

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/admin/login");
    return null;
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "New passwords don't match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) {
      toast({ title: "Error", description: "Please enter a valid email", variant: "destructive" });
      return;
    }
    updateEmailMutation.mutate(newEmail);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-dashboard">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Badge variant="outline">Settings</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your password and recovery email</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Recovery Email
              </CardTitle>
              <CardDescription>
                This email is used to send password reset links if you forget your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-sm text-muted-foreground">Current email</p>
                    <p className="font-medium" data-testid="text-current-email">
                      {profile?.email || "No email set"}
                    </p>
                  </div>
                  {!editingEmail && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setNewEmail(profile?.email || "");
                        setEditingEmail(true);
                      }}
                      data-testid="button-edit-email"
                    >
                      Change
                    </Button>
                  )}
                </div>
                
                {editingEmail && (
                  <form onSubmit={handleUpdateEmail} className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">New email address</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        data-testid="input-new-email"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        size="sm" 
                        disabled={updateEmailMutation.isPending}
                        data-testid="button-save-email"
                      >
                        {updateEmailMutation.isPending ? "Saving..." : "Save"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingEmail(false)}
                        data-testid="button-cancel-email"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your admin password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                      data-testid="input-current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      data-testid="button-toggle-current-password"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      required
                      minLength={8}
                      data-testid="input-new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      data-testid="button-toggle-new-password"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
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
                    data-testid="input-confirm-password"
                  />
                  {confirmPassword && newPassword && (
                    <p className={`text-xs ${newPassword === confirmPassword ? "text-emerald-500" : "text-red-500"}`}>
                      {newPassword === confirmPassword ? "Passwords match" : "Passwords don't match"}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={changePasswordMutation.isPending || !currentPassword || !newPassword || newPassword !== confirmPassword}
                  data-testid="button-change-password"
                >
                  {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
