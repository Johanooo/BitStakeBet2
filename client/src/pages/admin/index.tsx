import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, Building2, Gift, BookOpen, HelpCircle, 
  Settings, LogOut, ChevronRight, Users, TrendingUp, Shield,
  Plus, Pencil, Trash2, Check, X, Clock, ExternalLink
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Bookmaker, Bonus, Guide } from "@shared/schema";
import { TrustScoreBadge } from "@/components/trust-score-badge";
import { calculateTrustScore } from "@/components/bookmaker-card";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user, isLoading: authLoading, isAuthenticated, logout, needsSetup } = useAdminAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || needsSetup)) {
      setLocation("/admin/login");
    }
  }, [authLoading, isAuthenticated, needsSetup, setLocation]);

  const { data: bookmakers, isLoading: loadingBookmakers } = useQuery<Bookmaker[]>({
    queryKey: ["/api/bookmakers"],
    enabled: isAuthenticated,
  });

  const { data: bonuses, isLoading: loadingBonuses } = useQuery<Bonus[]>({
    queryKey: ["/api/bonuses"],
    enabled: isAuthenticated,
  });

  const { data: guides, isLoading: loadingGuides } = useQuery<Guide[]>({
    queryKey: ["/api/guides"],
    enabled: isAuthenticated,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { 
      label: "Total Bookmakers", 
      value: bookmakers?.length || 0, 
      icon: Building2,
      color: "text-blue-500 bg-blue-500/10"
    },
    { 
      label: "Active Bonuses", 
      value: bonuses?.filter(b => b.status === "ACTIVE").length || 0, 
      icon: Gift,
      color: "text-emerald-500 bg-emerald-500/10"
    },
    { 
      label: "Published Guides", 
      value: guides?.filter(g => g.published).length || 0, 
      icon: BookOpen,
      color: "text-purple-500 bg-purple-500/10"
    },
    { 
      label: "Avg Trust Score", 
      value: bookmakers?.length 
        ? Math.round(bookmakers.reduce((sum, b) => sum + calculateTrustScore(b), 0) / bookmakers.length)
        : 0, 
      icon: Shield,
      color: "text-primary bg-primary/10"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">CB</span>
                </div>
                <span className="font-bold hidden sm:block">CryptoBookies</span>
              </div>
            </Link>
            <Badge variant="outline">Admin Panel</Badge>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.username || "Admin"}
            </span>
            <Button variant="outline" size="sm" onClick={() => logout()} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage bookmakers, bonuses, and content</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Recent Bookmakers
              </CardTitle>
              <Link href="/admin/bookmakers">
                <Button variant="outline" size="sm" className="gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loadingBookmakers ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : bookmakers?.slice(0, 5).map((bm) => (
                <div key={bm.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold">
                      {bm.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{bm.name}</p>
                      <p className="text-xs text-muted-foreground">{bm.slug}</p>
                    </div>
                  </div>
                  <TrustScoreBadge score={calculateTrustScore(bm)} size="sm" showLabel={false} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Recent Bonuses
              </CardTitle>
              <Link href="/admin/bonuses">
                <Button variant="outline" size="sm" className="gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loadingBonuses ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : bonuses?.slice(0, 5).map((bonus) => (
                <div key={bonus.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium line-clamp-1">{bonus.headline}</p>
                    <p className="text-xs text-muted-foreground">{bonus.type}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      bonus.status === "ACTIVE" 
                        ? "bg-emerald-500/10 text-emerald-500" 
                        : bonus.status === "EXPIRED"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }
                  >
                    {bonus.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/bookmakers">
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Bookmakers</p>
                  <p className="text-sm text-muted-foreground">Manage all sites</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/bonuses">
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Bonuses</p>
                  <p className="text-sm text-muted-foreground">Manage offers</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/guides">
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Guides</p>
                  <p className="text-sm text-muted-foreground">Manage content</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/faqs">
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">FAQs</p>
                  <p className="text-sm text-muted-foreground">Manage questions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
