import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { 
  ExternalLink, ArrowLeft, Shield, Clock, Users, Globe, 
  Check, X, AlertTriangle, Mail, MessageCircle, Copy, Award,
  Zap, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrustScoreBadge, TrustScoreCircle, getTrustScoreInfo } from "@/components/trust-score-badge";
import { BonusCard } from "@/components/bonus-card";
import { FaqSection } from "@/components/faq-section";
import { calculateTrustScore } from "@/components/bookmaker-card";
import { getBookmakerLogo } from "@/lib/bookmaker-logos";
import type { BookmakerWithRelations, Bonus, Faq } from "@shared/schema";
import { useState } from "react";
import { SiBitcoin, SiEthereum, SiTether, SiDogecoin, SiLitecoin } from "react-icons/si";

const cryptoIconMap: Record<string, any> = {
  BTC: SiBitcoin,
  ETH: SiEthereum,
  USDT: SiTether,
  DOGE: SiDogecoin,
  LTC: SiLitecoin,
};

function getKycBadge(level: string | null) {
  switch (level) {
    case "NO_KYC": return { label: "No KYC Required", color: "bg-emerald-500/10 text-emerald-500", desc: "Start betting instantly without identity verification" };
    case "LIGHT_KYC": return { label: "Light KYC", color: "bg-yellow-500/10 text-yellow-500", desc: "Basic verification required (email, phone)" };
    case "FULL_KYC": return { label: "Full KYC Required", color: "bg-orange-500/10 text-orange-500", desc: "Complete identity verification required" };
    default: return { label: "KYC Unknown", color: "bg-muted text-muted-foreground", desc: "Verification requirements not confirmed" };
  }
}

export default function BookmakerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const { data: bookmaker, isLoading } = useQuery<BookmakerWithRelations>({
    queryKey: [`/api/bookmakers/${slug}`],
    enabled: !!slug,
  });

  const { data: bonuses } = useQuery<Bonus[]>({
    queryKey: [`/api/bookmakers/${slug}/bonuses`],
    enabled: !!slug,
  });

  const { data: faqs } = useQuery<Faq[]>({
    queryKey: [`/api/bookmakers/${slug}/faqs`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!bookmaker) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Bookmaker Not Found</h1>
        <p className="text-muted-foreground mb-6">The bookmaker you're looking for doesn't exist.</p>
        <Link href="/crypto-sportsbooks">
          <Button>Browse All Sportsbooks</Button>
        </Link>
      </div>
    );
  }

  const trustScore = calculateTrustScore(bookmaker);
  const trustInfo = getTrustScoreInfo(trustScore);
  const kycInfo = getKycBadge(bookmaker.kycLevel);
  const logoUrl = getBookmakerLogo(bookmaker.slug) || bookmaker.logoPath;

  const copyAffiliateLink = () => {
    if (bookmaker.affiliateUrl) {
      navigator.clipboard.writeText(bookmaker.affiliateUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/crypto-sportsbooks">
        <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
          Back to Sportsbooks
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/50">
                  {logoUrl ? (
                    <img 
                      src={logoUrl} 
                      alt={bookmaker.name} 
                      className="h-full w-full object-contain p-3"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-muted-foreground">
                      {bookmaker.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-bookmaker-title">
                      {bookmaker.name}
                    </h1>
                    {bookmaker.featured && (
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        <Zap className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {bookmaker.shortDescription || bookmaker.description?.slice(0, 200)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {bookmaker.sportsbook && <Badge variant="outline">Sportsbook</Badge>}
                    {bookmaker.casino && <Badge variant="outline">Casino</Badge>}
                    {bookmaker.esports && <Badge variant="outline">Esports</Badge>}
                    <Badge variant="outline" className={kycInfo.color}>
                      <Shield className="h-3 w-3 mr-1" />
                      {kycInfo.label}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <TrustScoreCircle score={trustScore} size={100} />
                  <span className={`text-sm font-medium ${trustInfo.color}`}>
                    {trustInfo.label}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {bookmaker.foundedYear && (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{bookmaker.foundedYear}</div>
                    <div className="text-sm text-muted-foreground">Founded</div>
                  </div>
                )}
                {bookmaker.payoutSpeed && (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{bookmaker.payoutSpeed}</div>
                    <div className="text-sm text-muted-foreground">Payout Speed</div>
                  </div>
                )}
                {bookmaker.minDeposit && (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{bookmaker.minDeposit}</div>
                    <div className="text-sm text-muted-foreground">Min Deposit</div>
                  </div>
                )}
                {bookmaker.licenseName && (
                  <div className="text-center">
                    <div className="text-2xl font-bold truncate">{bookmaker.licenseJurisdiction || "Licensed"}</div>
                    <div className="text-sm text-muted-foreground">License</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="bonuses" data-testid="tab-bonuses">Bonuses</TabsTrigger>
              <TabsTrigger value="pros-cons" data-testid="tab-pros-cons">Pros & Cons</TabsTrigger>
              <TabsTrigger value="faq" data-testid="tab-faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {bookmaker.name}</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
                  <p>{bookmaker.description || `${bookmaker.name} is a crypto betting platform offering ${bookmaker.sportsbook ? "sports betting" : ""} ${bookmaker.sportsbook && bookmaker.casino ? "and" : ""} ${bookmaker.casino ? "casino games" : ""}.`}</p>

                  <h3>KYC Requirements</h3>
                  <p>{kycInfo.desc}</p>

                  {bookmaker.licenseName && (
                    <>
                      <h3>Licensing</h3>
                      <p>
                        {bookmaker.name} is licensed by {bookmaker.licenseName}
                        {bookmaker.licenseJurisdiction && ` in ${bookmaker.licenseJurisdiction}`}.
                        {bookmaker.licenseUrl && (
                          <> <a href={bookmaker.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-primary">View license</a></>
                        )}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bonuses" className="mt-6 space-y-4">
              {bonuses && bonuses.length > 0 ? (
                bonuses.map((bonus) => (
                  <BonusCard key={bonus.id} bonus={{ ...bonus, bookmaker }} />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No bonuses available for {bookmaker.name} at the moment.
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pros-cons" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-500">
                      <Check className="h-5 w-5" />
                      Pros
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {bookmaker.pros?.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      )) || (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                            <span>Accepts cryptocurrency payments</span>
                          </li>
                          {bookmaker.kycLevel === "NO_KYC" && (
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                              <span>No identity verification required</span>
                            </li>
                          )}
                          {bookmaker.payoutSpeed && (
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                              <span>Fast {bookmaker.payoutSpeed} payouts</span>
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                      <X className="h-5 w-5" />
                      Cons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {bookmaker.cons?.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      )) || (
                        <>
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                            <span>May have regional restrictions</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              {faqs && faqs.length > 0 ? (
                <FaqSection faqs={faqs} title={`${bookmaker.name} FAQ`} />
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No FAQs available for {bookmaker.name} yet.
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="space-y-4">
                <a 
                  href={bookmaker.affiliateUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2" size="lg" data-testid="button-visit-site">
                    Visit {bookmaker.name}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>

                {bookmaker.refCode && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground mb-1">Referral Code</p>
                    <div className="flex items-center justify-between">
                      <code className="font-mono font-semibold text-primary">{bookmaker.refCode}</code>
                      <Button variant="ghost" size="sm" onClick={copyAffiliateLink}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t">
                  {bookmaker.domain && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Website:</span>
                      <span className="font-medium">{bookmaker.domain}</span>
                    </div>
                  )}
                  {bookmaker.supportEmail && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{bookmaker.supportEmail}</span>
                    </div>
                  )}
                  {bookmaker.supportLiveChat && (
                    <div className="flex items-center gap-3 text-sm">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Live Chat:</span>
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">Available</Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trust Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">License</span>
                <Badge variant={bookmaker.licenseName ? "outline" : "secondary"} className={bookmaker.licenseName ? "bg-emerald-500/10 text-emerald-500" : ""}>
                  {bookmaker.licenseName ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Established</span>
                <Badge variant="outline">
                  {bookmaker.foundedYear ? `${new Date().getFullYear() - bookmaker.foundedYear} years` : "Unknown"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">KYC Level</span>
                <Badge variant="outline" className={kycInfo.color}>
                  {bookmaker.kycLevel?.replace("_", " ") || "Unknown"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Live Support</span>
                <Badge variant={bookmaker.supportLiveChat ? "outline" : "secondary"} className={bookmaker.supportLiveChat ? "bg-emerald-500/10 text-emerald-500" : ""}>
                  {bookmaker.supportLiveChat ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
