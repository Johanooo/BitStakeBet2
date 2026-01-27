import { Link, useLocation } from "wouter";
import { Menu, X, Shield, Gift, BookOpen, Scale, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Sportsbooks", href: "/crypto-sportsbooks", icon: Shield },
  { name: "Casinos", href: "/crypto-casinos", icon: Gift },
  { name: "Bonuses", href: "/bonuses", icon: Gift },
  { name: "Guides", href: "/guides", icon: BookOpen },
  { name: "Compare", href: "/compare", icon: Scale },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-14 items-center justify-between gap-2">
          <Link href="/" className="flex items-center group" data-testid="link-home">
            <img 
              src="/logos/bitstakebet-logo.png" 
              alt="BitStakeBet" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location === item.href || location.startsWith(item.href + "/");
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="gap-2"
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 hidden md:flex" data-testid="button-crypto-dropdown">
                  <span className="text-lg">₿</span>
                  Crypto
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/bitcoin-sportsbook" className="w-full cursor-pointer" data-testid="link-bitcoin">
                    Bitcoin Betting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ethereum-sportsbook" className="w-full cursor-pointer" data-testid="link-ethereum">
                    Ethereum Betting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/usdt-sportsbook" className="w-full cursor-pointer" data-testid="link-usdt">
                    USDT Betting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/no-kyc-crypto-betting" className="w-full cursor-pointer" data-testid="link-no-kyc">
                    No-KYC Betting
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-border/40 pt-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
