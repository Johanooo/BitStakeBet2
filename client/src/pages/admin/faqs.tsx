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
import { ArrowLeft, HelpCircle } from "lucide-react";
import type { Faq } from "@shared/schema";
import { useEffect } from "react";

export default function AdminFaqs() {
  const { isLoading: authLoading, isAuthenticated, needsSetup } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: faqs, isLoading } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
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
            <HelpCircle className="h-8 w-8" />
            FAQs
          </h1>
          <p className="text-muted-foreground">View and manage frequently asked questions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All FAQs ({faqs?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : faqs && faqs.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Answer</TableHead>
                      <TableHead>Order</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs?.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="font-medium max-w-xs">{faq.question}</TableCell>
                        <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
                        <TableCell>{faq.sortOrder}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground">No FAQs found. FAQs are linked to guides.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
