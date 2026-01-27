import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Filter, Gift, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BonusCard, BonusCardSkeleton } from "@/components/bonus-card";
import type { Bonus, Bookmaker } from "@shared/schema";

type BonusWithBookmaker = Bonus & { bookmaker: Bookmaker };

export default function BonusesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("ACTIVE");

  const { data: bonuses, isLoading } = useQuery<BonusWithBookmaker[]>({
    queryKey: ["/api/bonuses"],
  });

  const filteredBonuses = bonuses?.filter((bonus) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!bonus.headline.toLowerCase().includes(query) && 
          !bonus.bookmaker?.name.toLowerCase().includes(query)) {
        return false;
      }
    }
    if (typeFilter !== "all" && bonus.type !== typeFilter) return false;
    if (statusFilter !== "all" && bonus.status !== statusFilter) return false;
    return true;
  }) || [];

  const sortedBonuses = [...filteredBonuses].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (b.maxValueUsd || 0) - (a.maxValueUsd || 0);
  });

  const bonusCounts = {
    all: bonuses?.length || 0,
    DEPOSIT_MATCH: bonuses?.filter(b => b.type === "DEPOSIT_MATCH").length || 0,
    FREE_BET: bonuses?.filter(b => b.type === "FREE_BET").length || 0,
    CASHBACK: bonuses?.filter(b => b.type === "CASHBACK").length || 0,
    RAKEBACK: bonuses?.filter(b => b.type === "RAKEBACK").length || 0,
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Crypto Betting Bonuses</h1>
        <p className="text-lg text-muted-foreground">
          Exclusive bonuses verified and updated regularly by our team
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bonuses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-bonuses"
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]" data-testid="select-status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Verified</SelectItem>
              <SelectItem value="UNVERIFIED">Unverified</SelectItem>
              <SelectItem value="EXPIRED">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={typeFilter} onValueChange={setTypeFilter} className="mb-6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="all" className="gap-2" data-testid="tab-all">
            All
            <Badge variant="secondary">{bonusCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="DEPOSIT_MATCH" className="gap-2" data-testid="tab-deposit-match">
            Deposit Match
            <Badge variant="secondary">{bonusCounts.DEPOSIT_MATCH}</Badge>
          </TabsTrigger>
          <TabsTrigger value="FREE_BET" className="gap-2" data-testid="tab-free-bet">
            Free Bets
            <Badge variant="secondary">{bonusCounts.FREE_BET}</Badge>
          </TabsTrigger>
          <TabsTrigger value="CASHBACK" className="gap-2" data-testid="tab-cashback">
            Cashback
            <Badge variant="secondary">{bonusCounts.CASHBACK}</Badge>
          </TabsTrigger>
          <TabsTrigger value="RAKEBACK" className="gap-2" data-testid="tab-rakeback">
            Rakeback
            <Badge variant="secondary">{bonusCounts.RAKEBACK}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {sortedBonuses.length} bonus{sortedBonuses.length !== 1 ? "es" : ""}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <BonusCardSkeleton key={i} />
          ))}
        </div>
      ) : sortedBonuses.length > 0 ? (
        <div className="space-y-4">
          {sortedBonuses.map((bonus) => (
            <BonusCard key={bonus.id} bonus={bonus} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Bonuses Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
