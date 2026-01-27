import { Link } from "wouter";
import { ExternalLink, Check, X, Zap, Clock, Shield, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustScoreBadge } from "@/components/trust-score-badge";
import { getBookmakerLogo } from "@/lib/bookmaker-logos";
import type { Bookmaker, Bonus } from "@shared/schema";
import { cn } from "@/lib/utils";

interface BookmakerCardProps {
  bookmaker: Bookmaker;
  bonus?: Bonus | null;
  rank?: number;
  className?: string;
}

function getKycLabel(level: string | null) {
  switch (level) {
    case "NO_KYC": return { label: "No KYC", color: "bg-emerald-500/10 text-emerald-500" };
    case "LIGHT_KYC": return { label: "Light KYC", color: "bg-yellow-500/10 text-yellow-500" };
    case "FULL_KYC": return { label: "Full KYC", color: "bg-orange-500/10 text-orange-500" };
    default: return { label: "Unknown", color: "bg-muted text-muted-foreground" };
  }
}

export function calculateTrustScore(bookmaker: Bookmaker): number {
  if (bookmaker.trustScoreOverride) return Math.round(bookmaker.trustScoreOverride);
  
  let score = 50;
  
  if (bookmaker.licenseName) score += 15;
  if (bookmaker.licenseJurisdiction) score += 10;
  if (bookmaker.foundedYear && bookmaker.foundedYear < 2020) score += 10;
  if (bookmaker.foundedYear && bookmaker.foundedYear < 2018) score += 5;
  if (bookmaker.kycLevel === "NO_KYC") score += 5;
  if (bookmaker.supportLiveChat) score += 5;
  if (bookmaker.payoutSpeed) score += 5;
  
  return Math.min(100, Math.max(0, score));
}

export function BookmakerCard({ bookmaker, bonus, rank, className }: BookmakerCardProps) {
  const trustScore = calculateTrustScore(bookmaker);
  const kyc = getKycLabel(bookmaker.kycLevel);
  const logoUrl = getBookmakerLogo(bookmaker.slug) || bookmaker.logoPath;

  return (
    <Card className={cn("group overflow-visible hover-elevate transition-all duration-300", className)}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
          {rank && (
            <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg z-10">
              #{rank}
            </div>
          )}
          
          <div className="flex items-start gap-4 flex-1">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/50">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={bookmaker.name} 
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">
                  {bookmaker.name.charAt(0)}
                </span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Link href={`/bookmakers/${bookmaker.slug}`}>
                  <h3 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer" data-testid={`text-bookmaker-name-${bookmaker.slug}`}>
                    {bookmaker.name}
                  </h3>
                </Link>
                {bookmaker.featured && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    <Zap className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {bookmaker.shortDescription || bookmaker.description?.slice(0, 120)}
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={kyc.color}>
                  <Shield className="h-3 w-3 mr-1" />
                  {kyc.label}
                </Badge>
                {bookmaker.sportsbook && (
                  <Badge variant="outline">Sportsbook</Badge>
                )}
                {bookmaker.casino && (
                  <Badge variant="outline">Casino</Badge>
                )}
                {bookmaker.esports && (
                  <Badge variant="outline">Esports</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <TrustScoreBadge score={trustScore} size="md" />
            
            <div className="text-right text-sm space-y-1">
              {bookmaker.payoutSpeed && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{bookmaker.payoutSpeed}</span>
                </div>
              )}
              {bookmaker.foundedYear && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>Est. {bookmaker.foundedYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {bonus && (
          <div className="px-4 sm:px-6 pb-4">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-primary">{bonus.headline}</p>
                  {bonus.promoCode && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Code: <span className="font-mono font-medium">{bonus.promoCode}</span>
                    </p>
                  )}
                </div>
                {bonus.maxValueUsd && (
                  <p className="text-lg font-bold text-primary whitespace-nowrap">
                    Up to ${bonus.maxValueUsd.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 gap-3 flex-wrap">
        <Link href={`/bookmakers/${bookmaker.slug}`} className="flex-1 min-w-[140px]">
          <Button variant="outline" className="w-full" data-testid={`button-review-${bookmaker.slug}`}>
            Read Review
          </Button>
        </Link>
        <Button 
          className="flex-1 min-w-[140px] gap-2" 
          data-testid={`button-visit-${bookmaker.slug}`}
          onClick={() => window.open(bookmaker.affiliateUrl || `https://${bookmaker.domain}`, '_blank')}
        >
          Visit Site
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export function BookmakerCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="h-20 w-20 rounded-xl bg-muted animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-10 w-20 bg-muted rounded-full animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 gap-3">
        <div className="h-10 flex-1 bg-muted rounded animate-pulse" />
        <div className="h-10 flex-1 bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}
