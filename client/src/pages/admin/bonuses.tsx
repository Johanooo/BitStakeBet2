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
import { ArrowLeft, Gift } from "lucide-react";
import type { Bonus } from "@shared/schema";
import { useEffect } from "react";

export default function AdminBonuses() {
  const { isLoading: authLoading, isAuthenticated, needsSetup } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: bonuses, isLoading } = useQuery<Bonus[]>({
    queryKey: ["/api/bonuses"],
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
            <Gift className="h-8 w-8" />
            Bonuses
          </h1>
          <p className="text-muted-foreground">View and manage all bonus offers</p>
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
                      <TableHead>Headline</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Max Value</TableHead>
                      <TableHead>Wagering</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bonuses?.map((bonus) => (
                      <TableRow key={bonus.id}>
                        <TableCell className="font-medium max-w-xs truncate">{bonus.headline}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{bonus.type?.replace("_", " ")}</Badge>
                        </TableCell>
                        <TableCell>{bonus.maxValueUsd ? `$${bonus.maxValueUsd}` : "-"}</TableCell>
                        <TableCell>{bonus.wageringRequirementText || "-"}</TableCell>
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
