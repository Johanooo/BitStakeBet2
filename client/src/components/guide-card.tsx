import { Link } from "wouter";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Guide } from "@shared/schema";
import { cn } from "@/lib/utils";

interface GuideCardProps {
  guide: Guide;
  className?: string;
}

export function GuideCard({ guide, className }: GuideCardProps) {
  return (
    <Card className={cn("group overflow-visible hover-elevate transition-all duration-300", className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            {guide.category && (
              <Badge variant="outline" className="mb-2">
                {guide.category}
              </Badge>
            )}
            
            <Link href={`/guides/${guide.slug}`}>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors cursor-pointer line-clamp-2" data-testid={`text-guide-title-${guide.slug}`}>
                {guide.title}
              </h3>
            </Link>
            
            {guide.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {guide.excerpt}
              </p>
            )}

            {guide.updatedAt && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Updated: {new Date(guide.updatedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
        <Link href={`/guides/${guide.slug}`} className="w-full">
          <Button variant="outline" className="w-full gap-2" data-testid={`button-read-guide-${guide.slug}`}>
            Read Guide
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export function GuideCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-lg bg-muted animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-20 bg-muted rounded animate-pulse" />
            <div className="h-6 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}
