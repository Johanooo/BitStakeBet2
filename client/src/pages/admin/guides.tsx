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
import { ArrowLeft, BookOpen, Plus, Pencil, Trash2 } from "lucide-react";
import type { Guide } from "@shared/schema";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

function GuideForm({ 
  guide, 
  onSave, 
  onClose,
  isPending 
}: { 
  guide?: Guide | null;
  onSave: (data: any) => void;
  onClose: () => void;
  isPending: boolean;
}) {
  const [formData, setFormData] = useState({
    title: guide?.title || "",
    slug: guide?.slug || "",
    category: guide?.category || "",
    excerpt: guide?.excerpt || "",
    content: guide?.content || "",
    metaTitle: guide?.metaTitle || "",
    metaDescription: guide?.metaDescription || "",
    published: guide?.published ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            data-testid="input-title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            data-testid="input-slug"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="getting-started, crypto-basics"
            data-testid="input-category"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            data-testid="input-meta-title"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={2}
          data-testid="textarea-excerpt"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          rows={2}
          data-testid="textarea-meta-description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown) *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          className="font-mono"
          required
          data-testid="textarea-content"
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(v) => setFormData({ ...formData, published: v })}
          data-testid="switch-published"
        />
        <Label htmlFor="published">Published</Label>
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

export default function AdminGuides() {
  const { isLoading: authLoading, isAuthenticated, needsSetup } = useAdminAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryKey: ["/api/admin/guides"],
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/guides", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/guides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/guides"] });
      setIsCreateOpen(false);
      toast({ title: "Guide created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/guides/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/guides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/guides"] });
      setIsEditOpen(false);
      setEditingGuide(null);
      toast({ title: "Guide updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/guides/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/guides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/guides"] });
      toast({ title: "Guide deleted" });
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
              <BookOpen className="h-8 w-8" />
              Guides
            </h1>
            <p className="text-muted-foreground">View and manage educational guides</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-add-guide">
                <Plus className="h-4 w-4" />
                Add Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Guide</DialogTitle>
              </DialogHeader>
              <GuideForm 
                onSave={(data) => createMutation.mutate(data)}
                onClose={() => setIsCreateOpen(false)}
                isPending={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Guides ({guides?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guides?.map((guide) => (
                      <TableRow key={guide.id}>
                        <TableCell className="font-medium">{guide.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{guide.category || "-"}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            guide.published 
                              ? "bg-emerald-500/10 text-emerald-500" 
                              : "bg-yellow-500/10 text-yellow-500"
                          }>
                            {guide.published ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>{guide.updatedAt ? new Date(guide.updatedAt).toLocaleDateString() : "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingGuide(guide);
                                setIsEditOpen(true);
                              }}
                              data-testid={`button-edit-guide-${guide.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`button-delete-guide-${guide.id}`}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete "{guide.title}"?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this guide. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deleteMutation.mutate(guide.id)}
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
            <DialogTitle>Edit Guide</DialogTitle>
          </DialogHeader>
          <GuideForm 
            guide={editingGuide}
            onSave={(data) => editingGuide && updateMutation.mutate({ id: editingGuide.id, data })}
            onClose={() => {
              setIsEditOpen(false);
              setEditingGuide(null);
            }}
            isPending={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
