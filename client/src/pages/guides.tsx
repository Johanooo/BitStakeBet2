import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, BookOpen, Filter } from "lucide-react";
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
import { GuideCard, GuideCardSkeleton } from "@/components/guide-card";
import type { Guide } from "@shared/schema";

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryKey: ["/api/guides"],
  });

  const categories = Array.from(new Set(guides?.map(g => g.category).filter(Boolean) || []));

  const filteredGuides = guides?.filter((guide) => {
    if (!guide.published) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!guide.title.toLowerCase().includes(query) && 
          !guide.excerpt?.toLowerCase().includes(query)) {
        return false;
      }
    }
    if (categoryFilter !== "all" && guide.category !== categoryFilter) return false;
    return true;
  }) || [];

  const sortedGuides = [...filteredGuides].sort((a, b) => {
    return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Crypto Betting Guides</h1>
        <p className="text-lg text-muted-foreground">
          Expert guides to help you make informed betting decisions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-guides"
          />
        </div>

        {categories.length > 0 && (
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat || "uncategorized"}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {sortedGuides.length} guide{sortedGuides.length !== 1 ? "s" : ""}
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <GuideCardSkeleton key={i} />
          ))}
        </div>
      ) : sortedGuides.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Guides Found</h3>
            <p className="text-muted-foreground">
              Check back soon for new guides!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
