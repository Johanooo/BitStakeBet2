import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Building2, ExternalLink, Plus, Pencil, Trash2, Upload, Image } from "lucide-react";
import type { Bookmaker } from "@shared/schema";
import { TrustScoreBadge } from "@/components/trust-score-badge";
import { calculateTrustScore } from "@/components/bookmaker-card";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

type KycLevel = "NO_KYC" | "LIGHT_KYC" | "FULL_KYC" | "UNKNOWN";

function BookmakerForm({ 
  bookmaker, 
  onSave, 
  onClose,
  isPending 
}: { 
  bookmaker?: Bookmaker | null;
  onSave: (data: any) => void;
  onClose: () => void;
  isPending: boolean;
}) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: bookmaker?.name || "",
    slug: bookmaker?.slug || "",
    domain: bookmaker?.domain || "",
    logoPath: bookmaker?.logoPath || "",
    description: bookmaker?.description || "",
    affiliateUrl: bookmaker?.affiliateUrl || "",
    kycLevel: (bookmaker?.kycLevel || "NO_KYC") as KycLevel,
    sportsbook: bookmaker?.sportsbook ?? true,
    casino: bookmaker?.casino ?? true,
    payoutSpeed: bookmaker?.payoutSpeed || "",
    minDeposit: bookmaker?.minDeposit || "",
    foundedYear: bookmaker?.foundedYear?.toString() || "",
    licenseName: bookmaker?.licenseName || "",
    featured: bookmaker?.featured ?? false,
    trustScoreOverride: bookmaker?.trustScoreOverride?.toString() || "",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("logo", file);

    try {
      const response = await fetch("/api/admin/upload/logo", {
        method: "POST",
        body: formDataUpload,
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      
      const result = await response.json();
      setFormData({ ...formData, logoPath: result.logoPath });
      toast({ title: "Logo uploaded successfully" });
    } catch (error) {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      foundedYear: formData.foundedYear ? parseInt(formData.foundedYear) : null,
      trustScoreOverride: formData.trustScoreOverride ? parseFloat(formData.trustScoreOverride) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            data-testid="input-bookmaker-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            data-testid="input-bookmaker-slug"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="domain">Domain *</Label>
          <Input
            id="domain"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            placeholder="example.com"
            required
            data-testid="input-bookmaker-domain"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Logo</Label>
          <div className="flex flex-wrap items-center gap-4">
            {formData.logoPath && (
              <div className="relative w-16 h-16 rounded border bg-muted flex items-center justify-center overflow-hidden">
                <img 
                  src={formData.logoPath} 
                  alt="Logo preview" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-[200px]">
              <div className="flex gap-2">
                <Input
                  id="logoPath"
                  value={formData.logoPath}
                  onChange={(e) => setFormData({ ...formData, logoPath: e.target.value })}
                  placeholder="/logos/example.png"
                  data-testid="input-bookmaker-logo"
                  className="flex-1"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  data-testid="input-logo-file"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  data-testid="button-upload-logo"
                >
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Click upload to add a new logo (PNG, GIF, SVG, WebP)
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="affiliateUrl">Affiliate URL</Label>
          <Input
            id="affiliateUrl"
            value={formData.affiliateUrl}
            onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
            data-testid="input-bookmaker-affiliate"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kycLevel">KYC Level</Label>
          <Select value={formData.kycLevel} onValueChange={(v: KycLevel) => setFormData({ ...formData, kycLevel: v })}>
            <SelectTrigger data-testid="select-kyc-level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NO_KYC">No KYC</SelectItem>
              <SelectItem value="LIGHT_KYC">Light KYC</SelectItem>
              <SelectItem value="FULL_KYC">Full KYC</SelectItem>
              <SelectItem value="UNKNOWN">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="payoutSpeed">Payout Speed</Label>
          <Input
            id="payoutSpeed"
            value={formData.payoutSpeed}
            onChange={(e) => setFormData({ ...formData, payoutSpeed: e.target.value })}
            placeholder="Instant / 24h"
            data-testid="input-payout-speed"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minDeposit">Min Deposit</Label>
          <Input
            id="minDeposit"
            value={formData.minDeposit}
            onChange={(e) => setFormData({ ...formData, minDeposit: e.target.value })}
            placeholder="$10"
            data-testid="input-min-deposit"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="foundedYear">Year Founded</Label>
          <Input
            id="foundedYear"
            type="number"
            value={formData.foundedYear}
            onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
            data-testid="input-founded-year"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trustScoreOverride">Trust Score Override (0-100)</Label>
          <Input
            id="trustScoreOverride"
            type="number"
            min="0"
            max="100"
            value={formData.trustScoreOverride}
            onChange={(e) => setFormData({ ...formData, trustScoreOverride: e.target.value })}
            data-testid="input-trust-score"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="licenseName">License Name</Label>
        <Input
          id="licenseName"
          value={formData.licenseName}
          onChange={(e) => setFormData({ ...formData, licenseName: e.target.value })}
          data-testid="input-license"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          data-testid="textarea-description"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Switch
            id="sportsbook"
            checked={formData.sportsbook}
            onCheckedChange={(v) => setFormData({ ...formData, sportsbook: v })}
            data-testid="switch-sportsbook"
          />
          <Label htmlFor="sportsbook">Sportsbook</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="casino"
            checked={formData.casino}
            onCheckedChange={(v) => setFormData({ ...formData, casino: v })}
            data-testid="switch-casino"
          />
          <Label htmlFor="casino">Casino</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(v) => setFormData({ ...formData, featured: v })}
            data-testid="switch-featured"
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} data-testid="button-save">
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function AdminBookmakers() {
  const { isLoading: authLoading, isAuthenticated, needsSetup } = useAdminAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingBookmaker, setEditingBookmaker] = useState<Bookmaker | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: bookmakers, isLoading } = useQuery<Bookmaker[]>({
    queryKey: ["/api/bookmakers"],
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/bookmakers", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookmakers"] });
      setIsCreateOpen(false);
      toast({ title: "Bookmaker created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/bookmakers/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookmakers"] });
      setIsEditOpen(false);
      setEditingBookmaker(null);
      toast({ title: "Bookmaker updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/bookmakers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookmakers"] });
      toast({ title: "Bookmaker deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Badge variant="outline">Admin Panel</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              Bookmakers
            </h1>
            <p className="text-muted-foreground">View and manage all crypto bookmakers</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-add-bookmaker">
                <Plus className="h-4 w-4" />
                Add Bookmaker
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Bookmaker</DialogTitle>
              </DialogHeader>
              <BookmakerForm 
                onSave={(data) => createMutation.mutate(data)}
                onClose={() => setIsCreateOpen(false)}
                isPending={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Bookmakers ({bookmakers?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>KYC</TableHead>
                      <TableHead>Sportsbook</TableHead>
                      <TableHead>Casino</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookmakers?.map((bm) => (
                      <TableRow key={bm.id}>
                        <TableCell className="font-medium">{bm.name}</TableCell>
                        <TableCell>
                          <TrustScoreBadge score={calculateTrustScore(bm)} size="sm" showLabel={false} />
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            bm.kycLevel === "NO_KYC" 
                              ? "bg-emerald-500/10 text-emerald-500" 
                              : bm.kycLevel === "LIGHT_KYC"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-red-500/10 text-red-500"
                          }>
                            {bm.kycLevel?.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>{bm.sportsbook ? "Yes" : "No"}</TableCell>
                        <TableCell>{bm.casino ? "Yes" : "No"}</TableCell>
                        <TableCell>{bm.featured ? <Badge>Featured</Badge> : "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <a href={`https://${bm.domain}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" data-testid={`button-visit-${bm.slug}`}>
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingBookmaker(bm);
                                setIsEditOpen(true);
                              }}
                              data-testid={`button-edit-${bm.slug}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`button-delete-${bm.slug}`}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete {bm.name}?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this bookmaker and all associated bonuses. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deleteMutation.mutate(bm.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    data-testid="button-confirm-delete"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Bookmaker</DialogTitle>
          </DialogHeader>
          <BookmakerForm 
            bookmaker={editingBookmaker}
            onSave={(data) => editingBookmaker && updateMutation.mutate({ id: editingBookmaker.id, data })}
            onClose={() => {
              setIsEditOpen(false);
              setEditingBookmaker(null);
            }}
            isPending={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
