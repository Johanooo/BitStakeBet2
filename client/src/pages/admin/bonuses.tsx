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
import { ArrowLeft, Gift, Plus, Pencil, Trash2 } from "lucide-react";
import type { Bonus, Bookmaker } from "@shared/schema";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type BonusType = "DEPOSIT_MATCH" | "FREE_BET" | "CASHBACK" | "RAKEBACK" | "OTHER";
type BonusStatus = "ACTIVE" | "EXPIRED" | "UNVERIFIED";

function BonusForm({ 
  bonus, 
  bookmakers,
  onSave, 
  onClose,
  isPending 
}: { 
  bonus?: (Bonus & { bookmaker?: Bookmaker }) | null;
  bookmakers: Bookmaker[];
  onSave: (data: any) => void;
  onClose: () => void;
  isPending: boolean;
}) {
  const [formData, setFormData] = useState({
    bookmakerId: bonus?.bookmakerId || "",
    headline: bonus?.headline || "",
    type: (bonus?.type || "DEPOSIT_MATCH") as BonusType,
    maxValueUsd: bonus?.maxValueUsd?.toString() || "",
    wageringRequirementText: bonus?.wageringRequirementText || "",
    promoCode: bonus?.promoCode || "",
    sourceUrl: bonus?.sourceUrl || "",
    status: (bonus?.status || "ACTIVE") as BonusStatus,
    featured: bonus?.featured ?? false,
    description: bonus?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      maxValueUsd: formData.maxValueUsd ? parseInt(formData.maxValueUsd) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="bookmakerId">Bookmaker *</Label>
          <Select value={formData.bookmakerId} onValueChange={(v) => setFormData({ ...formData, bookmakerId: v })}>
            <SelectTrigger data-testid="select-bookmaker">
              <SelectValue placeholder="Select a bookmaker" />
            </SelectTrigger>
            <SelectContent>
              {bookmakers.map((bm) => (
                <SelectItem key={bm.id} value={bm.id}>{bm.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="headline">Headline *</Label>
          <Input
            id="headline"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            placeholder="100% up to $1000"
            required
            data-testid="input-headline"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={formData.type} onValueChange={(v: BonusType) => setFormData({ ...formData, type: v })}>
            <SelectTrigger data-testid="select-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DEPOSIT_MATCH">Deposit Match</SelectItem>
              <SelectItem value="FREE_BET">Free Bet</SelectItem>
              <SelectItem value="CASHBACK">Cashback</SelectItem>
              <SelectItem value="RAKEBACK">Rakeback</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(v: BonusStatus) => setFormData({ ...formData, status: v })}>
            <SelectTrigger data-testid="select-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="EXPIRED">Expired</SelectItem>
              <SelectItem value="UNVERIFIED">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxValueUsd">Max Value (USD)</Label>
          <Input
            id="maxValueUsd"
            type="number"
            value={formData.maxValueUsd}
            onChange={(e) => setFormData({ ...formData, maxValueUsd: e.target.value })}
            placeholder="1000"
            data-testid="input-max-value"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wageringText">Wagering Requirements</Label>
          <Input
            id="wageringText"
            value={formData.wageringRequirementText}
            onChange={(e) => setFormData({ ...formData, wageringRequirementText: e.target.value })}
            placeholder="35x bonus"
            data-testid="input-wagering-text"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="promoCode">Promo Code</Label>
          <Input
            id="promoCode"
            value={formData.promoCode}
            onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
            data-testid="input-promo-code"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sourceUrl">Source URL</Label>
          <Input
            id="sourceUrl"
            value={formData.sourceUrl}
            onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
            data-testid="input-source-url"
          />
        </div>
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

      <div className="flex items-center gap-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(v) => setFormData({ ...formData, featured: v })}
          data-testid="switch-featured"
        />
        <Label htmlFor="featured">Featured</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending || !formData.bookmakerId} data-testid="button-save">
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function AdminBonuses() {
  const { isLoading: authLoading, isAuthenticated, needsSetup } = useAdminAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingBonus, setEditingBonus] = useState<(Bonus & { bookmaker?: Bookmaker }) | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: bonuses, isLoading } = useQuery<(Bonus & { bookmaker: Bookmaker })[]>({
    queryKey: ["/api/bonuses"],
    enabled: isAuthenticated,
  });

  const { data: bookmakers = [] } = useQuery<Bookmaker[]>({
    queryKey: ["/api/bookmakers"],
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/bonuses", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bonuses"] });
      setIsCreateOpen(false);
      toast({ title: "Bonus created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/bonuses/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bonuses"] });
      setIsEditOpen(false);
      setEditingBonus(null);
      toast({ title: "Bonus updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/bonuses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bonuses"] });
      toast({ title: "Bonus deleted" });
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
              <Gift className="h-8 w-8" />
              Bonuses
            </h1>
            <p className="text-muted-foreground">View and manage all bonus offers</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-add-bonus">
                <Plus className="h-4 w-4" />
                Add Bonus
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Bonus</DialogTitle>
              </DialogHeader>
              <BonusForm 
                bookmakers={bookmakers}
                onSave={(data) => createMutation.mutate(data)}
                onClose={() => setIsCreateOpen(false)}
                isPending={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Bonuses ({bonuses?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bookmaker</TableHead>
                      <TableHead>Headline</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Max Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bonuses?.map((bonus) => (
                      <TableRow key={bonus.id}>
                        <TableCell className="font-medium">{bonus.bookmaker?.name || "-"}</TableCell>
                        <TableCell className="max-w-xs truncate">{bonus.headline}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{bonus.type?.replace("_", " ")}</Badge>
                        </TableCell>
                        <TableCell>{bonus.maxValueUsd ? `$${bonus.maxValueUsd}` : "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            bonus.status === "ACTIVE" 
                              ? "bg-emerald-500/10 text-emerald-500" 
                              : bonus.status === "EXPIRED"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }>
                            {bonus.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingBonus(bonus);
                                setIsEditOpen(true);
                              }}
                              data-testid={`button-edit-bonus-${bonus.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`button-delete-bonus-${bonus.id}`}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete this bonus?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this bonus. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deleteMutation.mutate(bonus.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
            <DialogTitle>Edit Bonus</DialogTitle>
          </DialogHeader>
          <BonusForm 
            bonus={editingBonus}
            bookmakers={bookmakers}
            onSave={(data) => editingBonus && updateMutation.mutate({ id: editingBonus.id, data })}
            onClose={() => {
              setIsEditOpen(false);
              setEditingBonus(null);
            }}
            isPending={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
