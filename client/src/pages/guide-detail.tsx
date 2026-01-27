import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FaqSection } from "@/components/faq-section";
import type { GuideWithFaqs } from "@shared/schema";

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: guide, isLoading } = useQuery<GuideWithFaqs>({
    queryKey: [`/api/guides/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Guide Not Found</h1>
        <p className="text-muted-foreground mb-6">The guide you're looking for doesn't exist.</p>
        <Link href="/guides">
          <Button>Browse All Guides</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/guides">
        <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
          Back to Guides
        </Button>
      </Link>

      <article>
        <header className="mb-8">
          {guide.category && (
            <Badge variant="outline" className="mb-4">
              {guide.category}
            </Badge>
          )}
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-guide-title">
            {guide.title}
          </h1>
          
          {guide.excerpt && (
            <p className="text-xl text-muted-foreground mb-6">
              {guide.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {guide.updatedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Last updated: {new Date(guide.updatedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </header>

        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8 prose prose-neutral dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: guide.content.replace(/\n/g, '<br/>') }} />
          </CardContent>
        </Card>

        {guide.faqs && guide.faqs.length > 0 && (
          <FaqSection faqs={guide.faqs} />
        )}

        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/10 text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to Start Betting?</h3>
          <p className="text-muted-foreground mb-4">
            Compare the best crypto betting sites and find the perfect match.
          </p>
          <Link href="/crypto-sportsbooks">
            <Button>View Top Sportsbooks</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
