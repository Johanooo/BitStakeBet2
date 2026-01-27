import { Link } from "wouter";
import { Shield, AlertTriangle } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function Footer() {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const logoSrc = resolvedTheme === "dark" 
    ? "/logos/bitstakebet-logo-light.png" 
    : "/logos/bitstakebet-logo.png";

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={logoSrc} 
                alt="BitStakeBet" 
                className="h-16 w-auto object-contain max-w-[240px]"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              The most trusted crypto betting comparison site. We help you find safe, 
              reliable crypto sportsbooks and casinos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/crypto-sportsbooks" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-sportsbooks">
                  Crypto Sportsbooks
                </Link>
              </li>
              <li>
                <Link href="/crypto-casinos" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-casinos">
                  Crypto Casinos
                </Link>
              </li>
              <li>
                <Link href="/bonuses" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-bonuses">
                  Best Bonuses
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-guides">
                  Betting Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-we-rate" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-how-we-rate">
                  How We Rate
                </Link>
              </li>
              <li>
                <Link href="/responsible-gambling" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-responsible">
                  Responsible Gambling
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-affiliate">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Crypto Betting</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/bitcoin-sportsbook" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-bitcoin">
                  Bitcoin Sportsbooks
                </Link>
              </li>
              <li>
                <Link href="/ethereum-sportsbook" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-ethereum">
                  Ethereum Sportsbooks
                </Link>
              </li>
              <li>
                <Link href="/no-kyc-crypto-betting" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-no-kyc">
                  No-KYC Crypto Betting
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-compare">
                  Compare Bookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/40">
              <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">18+ Gambling Awareness</p>
                <p className="text-muted-foreground">
                  Gambling can be addictive. Please play responsibly. If you have a gambling problem, 
                  seek help at{" "}
                  <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    BeGambleAware.org
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>SSL Secured</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BitStakeBet. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
