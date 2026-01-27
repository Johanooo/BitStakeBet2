import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Shield, Zap, Award, TrendingUp, Users, Clock, ChevronRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookmakerCard, BookmakerCardSkeleton } from "@/components/bookmaker-card";
import { BonusCard, BonusCardSkeleton } from "@/components/bonus-card";
import type { Bookmaker, Bonus } from "@shared/schema";
import { SiBitcoin, SiEthereum, SiTether, SiDogecoin, SiLitecoin } from "react-icons/si";

const features = [
  {
    icon: Shield,
    title: "Trust Verified",
    description: "Every bookmaker is thoroughly vetted with our proprietary trust scoring system.",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description: "Find sites with the fastest crypto withdrawal times in the industry.",
  },
  {
    icon: Award,
    title: "Best Bonuses",
    description: "Exclusive bonuses verified and updated regularly by our team.",
  },
  {
    icon: TrendingUp,
    title: "Expert Insights",
    description: "In-depth guides and analysis from crypto betting experts.",
  },
];

const cryptoIcons = [
  { icon: SiBitcoin, name: "Bitcoin", color: "text-orange-500" },
  { icon: SiEthereum, name: "Ethereum", color: "text-blue-400" },
  { icon: SiTether, name: "USDT", color: "text-green-500" },
  { icon: SiLitecoin, name: "Litecoin", color: "text-gray-400" },
  { icon: SiDogecoin, name: "Dogecoin", color: "text-yellow-500" },
];

export default function Home() {
  const { data: bookmakers, isLoading: loadingBookmakers } = useQuery<Bookmaker[]>({
    queryKey: ["/api/bookmakers?featured=true&limit=5"],
  });

  const { data: bonuses, isLoading: loadingBonuses } = useQuery<(Bonus & { bookmaker: Bookmaker })[]>({
    queryKey: ["/api/bonuses?featured=true&limit=3"],
  });

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
              <Zap className="h-3.5 w-3.5 mr-1.5 text-accent" />
              Trusted by 50,000+ crypto bettors
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Find the{" "}
              <span className="text-gradient">Best Crypto</span>{" "}
              Betting Sites
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Compare the most trusted crypto sportsbooks and casinos. Verified bonuses, 
              honest reviews, and instant payouts.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/crypto-sportsbooks">
                <Button size="lg" className="gap-2 px-8" data-testid="button-hero-sportsbooks">
                  <Shield className="h-5 w-5" />
                  View Sportsbooks
                </Button>
              </Link>
              <Link href="/bonuses">
                <Button variant="outline" size="lg" className="gap-2 px-8" data-testid="button-hero-bonuses">
                  <Gift className="h-5 w-5" />
                  Best Bonuses
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {cryptoIcons.map((crypto) => (
                <div key={crypto.name} className="flex items-center gap-2 text-muted-foreground">
                  <crypto.icon className={`h-6 w-6 ${crypto.color}`} />
                  <span className="text-sm font-medium hidden sm:inline">{crypto.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-y border-border/40 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center sm:text-left">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Top Rated Crypto Sportsbooks</h2>
              <p className="text-muted-foreground">Verified and ranked by our trust score algorithm</p>
            </div>
            <Link href="/crypto-sportsbooks" className="hidden sm:block">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-sportsbooks">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {loadingBookmakers ? (
              Array.from({ length: 5 }).map((_, i) => (
                <BookmakerCardSkeleton key={i} />
              ))
            ) : bookmakers?.length ? (
              bookmakers.map((bookmaker, index) => (
                <BookmakerCard 
                  key={bookmaker.id} 
                  bookmaker={bookmaker} 
                  rank={index + 1}
                />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No bookmakers found. Check back soon!
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/crypto-sportsbooks">
              <Button variant="outline" className="w-full gap-2">
                View All Sportsbooks
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Bonuses</h2>
              <p className="text-muted-foreground">Exclusive offers verified by our team</p>
            </div>
            <Link href="/bonuses" className="hidden sm:block">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-bonuses">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loadingBonuses ? (
              Array.from({ length: 3 }).map((_, i) => (
                <BonusCardSkeleton key={i} />
              ))
            ) : bonuses?.length ? (
              bonuses.map((bonus) => (
                <BonusCard key={bonus.id} bonus={bonus} />
              ))
            ) : (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No bonuses available at the moment.
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/bonuses">
              <Button variant="outline" className="w-full gap-2">
                View All Bonuses
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Trust CryptoBookies?</h2>
            <p className="text-muted-foreground">
              We&apos;re committed to providing honest, unbiased reviews and comparisons
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">50,000+</h3>
                <p className="text-sm text-muted-foreground">Monthly visitors trust our reviews</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">30+</h3>
                <p className="text-sm text-muted-foreground">Verified crypto betting sites</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7</h3>
                <p className="text-sm text-muted-foreground">Bonus verification & updates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Betting with Crypto?</h2>
            <p className="text-muted-foreground mb-8">
              Compare the best crypto betting sites and find the perfect match for your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/crypto-sportsbooks">
                <Button size="lg" className="gap-2 px-8" data-testid="button-cta-sportsbooks">
                  Browse Sportsbooks
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-we-rate">
                <Button variant="outline" size="lg" className="gap-2 px-8" data-testid="button-cta-how-we-rate">
                  How We Rate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
