import { Link } from "wouter";
import { Shield, Award, AlertTriangle, Users, Mail, Scale, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HowWeRate() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">How We Rate Crypto Betting Sites</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Our comprehensive rating system ensures you find the safest and most reliable crypto betting platforms.
      </p>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              Trust Score (0-100)
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <p>Our Trust Score is calculated using multiple factors:</p>
            <ul>
              <li><strong>License & Jurisdiction (25 points):</strong> We verify gambling licenses from reputable jurisdictions like Curacao, Malta, and Gibraltar.</li>
              <li><strong>Company Age (15 points):</strong> Established brands with years of operation receive higher scores.</li>
              <li><strong>KYC Transparency (10 points):</strong> Clear communication about verification requirements.</li>
              <li><strong>Payout Reliability (20 points):</strong> Track record of timely crypto withdrawals.</li>
              <li><strong>Support Quality (15 points):</strong> 24/7 live chat and responsive customer service.</li>
              <li><strong>Security Measures (15 points):</strong> SSL encryption, 2FA, and cold storage for funds.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Award className="h-6 w-6 text-accent" />
              Bonus Value Score
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <p>We evaluate bonuses based on actual player value:</p>
            <ul>
              <li><strong>Maximum Value:</strong> The headline bonus amount.</li>
              <li><strong>Wagering Requirements:</strong> Lower requirements = higher score.</li>
              <li><strong>Time Limits:</strong> Generous expiry periods are rewarded.</li>
              <li><strong>Clarity:</strong> Clear terms and conditions matter.</li>
              <li><strong>Verification:</strong> We manually verify all bonuses are active.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-blue-500" />
              Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <ul>
              <li>Independent reviews not influenced by affiliate relationships</li>
              <li>Regular re-evaluation of all listed sites</li>
              <li>User feedback incorporated into ratings</li>
              <li>Immediate updates when issues are discovered</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Link href="/crypto-sportsbooks">
          <Button size="lg" className="gap-2">
            View Top-Rated Sportsbooks
            <ChevronRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function ResponsibleGambling() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Responsible Gambling</h1>
      </div>

      <Card className="mb-8 bg-destructive/5 border-destructive/20">
        <CardContent className="p-6">
          <p className="font-semibold text-lg mb-2">18+ Only</p>
          <p className="text-muted-foreground">
            Gambling is only for adults. You must be 18 years or older to use crypto betting sites.
          </p>
        </CardContent>
      </Card>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <h2>Gambling Should Be Fun</h2>
        <p>
          Crypto betting should be an enjoyable form of entertainment. If gambling is causing you stress, 
          financial problems, or affecting your relationships, it's time to seek help.
        </p>

        <h2>Warning Signs of Problem Gambling</h2>
        <ul>
          <li>Spending more money than you can afford to lose</li>
          <li>Chasing losses with larger bets</li>
          <li>Borrowing money to gamble</li>
          <li>Neglecting work or family responsibilities</li>
          <li>Lying about gambling habits</li>
          <li>Feeling anxious or depressed about gambling</li>
        </ul>

        <h2>Tips for Safe Gambling</h2>
        <ul>
          <li>Set a budget and stick to it</li>
          <li>Never gamble with money you can't afford to lose</li>
          <li>Set time limits for gambling sessions</li>
          <li>Don't chase losses</li>
          <li>Take regular breaks</li>
          <li>Don't gamble when emotional or under the influence</li>
        </ul>

        <h2>Get Help</h2>
        <p>If you or someone you know has a gambling problem, please reach out to these resources:</p>
        <ul>
          <li><a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer">BeGambleAware.org</a> (UK)</li>
          <li><a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer">National Council on Problem Gambling</a> (US)</li>
          <li><a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer">Gambling Therapy</a> (International)</li>
          <li><a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer">Gamblers Anonymous</a></li>
        </ul>
      </div>
    </div>
  );
}

export function AffiliateDisclosure() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Affiliate Disclosure</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg">
          Transparency is important to us. This page explains how CryptoBookies is funded.
        </p>

        <h2>How We Make Money</h2>
        <p>
          CryptoBookies contains affiliate links. When you click on these links and sign up at a 
          crypto betting site, we may receive a commission at no additional cost to you.
        </p>

        <h2>Our Editorial Independence</h2>
        <p>
          Despite our affiliate relationships, our reviews and ratings remain unbiased. We:
        </p>
        <ul>
          <li>Never accept payment for positive reviews</li>
          <li>Include sites we don't have affiliate deals with if they're quality options</li>
          <li>Warn users about problematic sites regardless of potential earnings</li>
          <li>Base our Trust Scores on objective criteria, not revenue</li>
        </ul>

        <h2>Why This Model?</h2>
        <p>
          Affiliate commissions allow us to operate this site for free while providing 
          comprehensive, unbiased information about crypto betting platforms.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about our affiliate relationships, please{" "}
          <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">About CryptoBookies</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg">
          CryptoBookies is the most trusted resource for finding safe, reliable crypto betting sites.
        </p>

        <h2>Our Mission</h2>
        <p>
          We help crypto enthusiasts find legitimate betting platforms by providing unbiased reviews, 
          verified bonuses, and expert guides.
        </p>

        <h2>What We Do</h2>
        <ul>
          <li><strong>Research:</strong> We thoroughly investigate every crypto betting site</li>
          <li><strong>Rate:</strong> Our proprietary Trust Score helps you identify safe platforms</li>
          <li><strong>Verify:</strong> We manually verify all bonuses and keep them updated</li>
          <li><strong>Educate:</strong> Our guides help you make informed decisions</li>
        </ul>

        <h2>Our Team</h2>
        <p>
          Our team consists of crypto enthusiasts, former bookmakers, and experienced bettors 
          who understand both sides of the industry.
        </p>

        <h2>Contact</h2>
        <p>
          Have questions or feedback? We'd love to hear from you.{" "}
          <Link href="/contact" className="text-primary hover:underline">Get in touch</Link>.
        </p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Mail className="h-6 w-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Contact Us</h1>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
        <p className="text-lg">
          We'd love to hear from you. Whether you have a question, feedback, or business inquiry, 
          our team is here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Questions about our site, ratings, or recommendations.
            </p>
            <p className="font-medium">info@cryptobookies.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business & Partnerships</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Interested in listing your platform or partnership opportunities.
            </p>
            <p className="font-medium">partners@cryptobookies.com</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-muted/50">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> We typically respond within 24-48 hours. For urgent matters 
            related to problem gambling, please contact the resources on our{" "}
            <Link href="/responsible-gambling" className="text-primary hover:underline">
              Responsible Gambling
            </Link>{" "}
            page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-3">Compare Crypto Bookmakers</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Side-by-side comparison of top crypto betting sites
      </p>

      <Card>
        <CardContent className="py-16 text-center">
          <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Comparison Tool Coming Soon</h3>
          <p className="text-muted-foreground mb-6">
            We're building a powerful comparison tool to help you find the perfect bookmaker.
          </p>
          <Link href="/crypto-sportsbooks">
            <Button>Browse All Sportsbooks</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
