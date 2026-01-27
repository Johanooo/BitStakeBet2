import { Link } from "wouter";
import { ExternalLink, Tag, Clock, AlertCircle, CheckCircle2, Copy, Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBookmakerLogo } from "@/lib/bookmaker-logos";
import type { Bonus, Bookmaker } from "@shared/schema";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BonusCardProps {
  bonus: Bonus & { bookmaker?: Bookmaker };
  className?: string;
}

function getBonusTypeLabel(type: string | null) {
  switch (type) {
    case "DEPOSIT_MATCH": return { label: "Deposit Match", color: "bg-primary/10 text-primary" };
    case "FREE_BET": return { label: "Free Bet", color: "bg-blue-500/10 text-blue-500" };
    case "CASHBACK": return { label: "Cashback", color: "bg-green-500/10 text-green-500" };
    case "RAKEBACK": return { label: "Rakeback", color: "bg-purple-500/10 text-purple-500" };
    default: return { label: "Bonus", color: "bg-muted text-muted-foreground" };
  }
}

function getStatusBadge(status: string | null) {
  switch (status) {
    case "ACTIVE": return { label: "Verified", color: "bg-emerald-500/10 text-emerald-500", Icon: CheckCircle2 };
    case "EXPIRED": return { label: "Expired", color: "bg-red-500/10 text-red-500", Icon: AlertCircle };
    default: return { label: "Unverified", color: "bg-yellow-500/10 text-yellow-500", Icon: AlertCircle };
  }
}

export function BonusCard({ bonus, className }: BonusCardProps) {
  const [copied, setCopied] = useState(false);
  const bonusType = getBonusTypeLabel(bonus.type);
  const status = getStatusBadge(bonus.status);

  const copyPromoCode = () => {
    if (bonus.promoCode) {
      navigator.clipboard.writeText(bonus.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className={cn("group overflow-visible hover-elevate transition-all duration-300", className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {bonus.bookmaker && (
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/50">
              {(getBookmakerLogo(bonus.bookmaker.slug) || bonus.bookmaker.logoPath) ? (
                <img 
                  src={getBookmakerLogo(bonus.bookmaker.slug) || bonus.bookmaker.logoPath || ""} 
                  alt={bonus.bookmaker.name} 
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <span className="text-xl font-bold text-muted-foreground">
                  {bonus.bookmaker.name.charAt(0)}
                </span>
              )}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {bonus.bookmaker && (
                <Link href={`/bookmakers/${bonus.bookmaker.slug}`}>
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {bonus.bookmaker.name}
                  </span>
                </Link>
              )}
              <Badge variant="outline" className={bonusType.color}>
                <Tag className="h-3 w-3 mr-1" />
                {bonusType.label}
              </Badge>
              <Badge variant="outline" className={status.color}>
                <status.Icon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold mb-2" data-testid={`text-bonus-headline-${bonus.id}`}>
              {bonus.headline}
            </h3>
            
            {bonus.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {bonus.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              {bonus.maxValueUsd && (
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">Value:</span>
                  <span className="font-semibold text-primary">Up to ${bonus.maxValueUsd.toLocaleString()}</span>
                </div>
              )}
              {bonus.wageringRequirementText && (
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">Wagering:</span>
                  <span className="font-medium">{bonus.wageringRequirementText}</span>
                </div>
              )}
              {bonus.minDepositText && (
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">Min Deposit:</span>
                  <span className="font-medium">{bonus.minDepositText}</span>
                </div>
              )}
            </div>
          </div>

          {bonus.maxValueUsd && (
            <div className="flex flex-col items-end justify-center flex-shrink-0">
              <p className="text-3xl font-bold text-primary">
                ${bonus.maxValueUsd.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Max Value</p>
            </div>
          )}
        </div>

        {bonus.promoCode && (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border/50">
              <span className="text-sm text-muted-foreground">Promo Code:</span>
              <code className="font-mono font-semibold text-primary">{bonus.promoCode}</code>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={copyPromoCode}
              data-testid={`button-copy-promo-${bonus.id}`}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}

        {bonus.lastVerifiedAt && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Last verified: {new Date(bonus.lastVerifiedAt).toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 gap-3">
        {bonus.bookmaker && (
          <Link href={`/bookmakers/${bonus.bookmaker.slug}`} className="flex-1">
            <Button variant="outline" className="w-full" data-testid={`button-view-bookmaker-${bonus.id}`}>
              View Bookmaker
            </Button>
          </Link>
        )}
        <a 
          href={bonus.bookmaker?.affiliateUrl || "#"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1"
        >
          <Button className="w-full gap-2" data-testid={`button-claim-bonus-${bonus.id}`}>
            Claim Bonus
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export function BonusCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded-xl bg-muted animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-6 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
          <div className="h-12 w-24 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 gap-3">
        <div className="h-10 flex-1 bg-muted rounded animate-pulse" />
        <div className="h-10 flex-1 bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}
