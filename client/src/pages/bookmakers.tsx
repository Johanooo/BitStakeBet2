import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Filter, SlidersHorizontal, Grid, List, Shield, Zap, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { BookmakerCard, BookmakerCardSkeleton } from "@/components/bookmaker-card";
import type { Bookmaker } from "@shared/schema";

interface BookmakersPageProps {
  title?: string;
  description?: string;
  filterType?: "sportsbook" | "casino" | "all";
  filterKyc?: "NO_KYC" | null;
  filterCoin?: string | null;
}

export default function BookmakersPage({
  title = "All Crypto Betting Sites",
  description = "Compare and find the best crypto betting sites",
  filterType = "all",
  filterKyc = null,
  filterCoin = null,
}: BookmakersPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [showSportsbook, setShowSportsbook] = useState(filterType === "sportsbook" || filterType === "all");
  const [showCasino, setShowCasino] = useState(filterType === "casino" || filterType === "all");
  const [showNoKyc, setShowNoKyc] = useState(filterKyc === "NO_KYC");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const { data: bookmakers, isLoading } = useQuery<Bookmaker[]>({
    queryKey: ["/api/bookmakers"],
  });

  const filteredBookmakers = bookmakers?.filter((bm) => {
    if (searchQuery && !bm.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType === "sportsbook" && !bm.sportsbook) return false;
    if (filterType === "casino" && !bm.casino) return false;
    if (showNoKyc && bm.kycLevel !== "NO_KYC") return false;
    if (!showSportsbook && !showCasino) return true;
    if (showSportsbook && bm.sportsbook) return true;
    if (showCasino && bm.casino) return true;
    return false;
  }) || [];

  const sortedBookmakers = [...filteredBookmakers].sort((a, b) => {
    switch (sortBy) {
      case "recommended":
        return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
      case "trust":
        return (b.trustScoreOverride || 50) - (a.trustScoreOverride || 50);
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case "oldest":
        return (a.foundedYear || 9999) - (b.foundedYear || 9999);
      default:
        return 0;
    }
  });

  const activeFilters = [];
  if (showNoKyc) activeFilters.push("No KYC");
  if (showSportsbook && !showCasino) activeFilters.push("Sportsbook");
  if (showCasino && !showSportsbook) activeFilters.push("Casino");

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-bookmakers"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="trust">Trust Score</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Established</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2" data-testid="button-filters">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Bookmakers</SheetTitle>
                <SheetDescription>
                  Narrow down your search with these filters
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Type</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={showSportsbook}
                        onCheckedChange={(checked) => setShowSportsbook(!!checked)}
                        data-testid="checkbox-sportsbook"
                      />
                      <span>Sportsbook</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={showCasino}
                        onCheckedChange={(checked) => setShowCasino(!!checked)}
                        data-testid="checkbox-casino"
                      />
                      <span>Casino</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">KYC Requirements</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={showNoKyc}
                        onCheckedChange={(checked) => setShowNoKyc(!!checked)}
                        data-testid="checkbox-no-kyc"
                      />
                      <span>No KYC Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden sm:flex border rounded-md">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              data-testid="button-view-list"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              data-testid="button-view-grid"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button
                onClick={() => {
                  if (filter === "No KYC") setShowNoKyc(false);
                  if (filter === "Sportsbook") setShowSportsbook(false);
                  if (filter === "Casino") setShowCasino(false);
                }}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowNoKyc(false);
              setShowSportsbook(true);
              setShowCasino(true);
            }}
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {sortedBookmakers.length} bookmaker{sortedBookmakers.length !== 1 ? "s" : ""}
      </div>

      {isLoading ? (
        <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
          {Array.from({ length: 6 }).map((_, i) => (
            <BookmakerCardSkeleton key={i} />
          ))}
        </div>
      ) : sortedBookmakers.length > 0 ? (
        <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
          {sortedBookmakers.map((bookmaker, index) => (
            <BookmakerCard
              key={bookmaker.id}
              bookmaker={bookmaker}
              rank={sortBy === "recommended" || sortBy === "trust" ? index + 1 : undefined}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Bookmakers Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function CryptoSportsbooks() {
  return (
    <BookmakersPage
      title="Best Crypto Sportsbooks"
      description="Top-rated cryptocurrency sportsbooks for sports betting"
      filterType="sportsbook"
    />
  );
}

export function CryptoCasinos() {
  return (
    <BookmakersPage
      title="Best Crypto Casinos"
      description="Top-rated cryptocurrency casinos for online gaming"
      filterType="casino"
    />
  );
}

export function NoKycBetting() {
  return (
    <BookmakersPage
      title="No-KYC Crypto Betting Sites"
      description="Anonymous betting sites that don't require identity verification"
      filterKyc="NO_KYC"
    />
  );
}

export function BitcoinSportsbook() {
  return (
    <BookmakersPage
      title="Bitcoin Sportsbooks"
      description="Best sportsbooks accepting Bitcoin deposits and withdrawals"
      filterCoin="BTC"
    />
  );
}

export function EthereumSportsbook() {
  return (
    <BookmakersPage
      title="Ethereum Sportsbooks"
      description="Best sportsbooks accepting Ethereum deposits and withdrawals"
      filterCoin="ETH"
    />
  );
}

export function UsdtSportsbook() {
  return (
    <BookmakersPage
      title="USDT Sportsbooks"
      description="Best sportsbooks accepting Tether (USDT) deposits and withdrawals"
      filterCoin="USDT"
    />
  );
}
