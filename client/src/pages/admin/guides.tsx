import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, BookOpen } from "lucide-react";
import type { Guide } from "@shared/schema";
import { useEffect } from "react";

export default function AdminGuides() {
  const { isLoading: authLoading, isAuthenticated, needsSetup } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryKey: ["/api/guides"],
    enabled: isAuthenticated,
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
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Badge variant="outline">Admin Panel</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            Guides
          </h1>
          <p className="text-muted-foreground">View and manage educational guides</p>
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
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guides?.map((guide) => (
                      <TableRow key={guide.id}>
                        <TableCell className="font-medium">{guide.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{guide.category}</Badge>
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
                        <TableCell>{guide.createdAt ? new Date(guide.createdAt).toLocaleDateString() : "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
