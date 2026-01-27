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
import { ArrowLeft, Building2, ExternalLink } from "lucide-react";
import type { Bookmaker } from "@shared/schema";
import { TrustScoreBadge } from "@/components/trust-score-badge";
import { calculateTrustScore } from "@/components/bookmaker-card";
import { useEffect } from "react";

export default function AdminBookmakers() {
  const { isLoading: authLoading, isAuthenticated, needsSetup } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: bookmakers, isLoading } = useQuery<Bookmaker[]>({
    queryKey: ["/api/bookmakers"],
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
            <Building2 className="h-8 w-8" />
            Bookmakers
          </h1>
          <p className="text-muted-foreground">View and manage all crypto bookmakers</p>
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
                      <TableHead>Payout Speed</TableHead>
                      <TableHead>Website</TableHead>
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
                        <TableCell>{bm.payoutSpeed || "-"}</TableCell>
                        <TableCell>
                          <a href={`https://${bm.domain}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
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
