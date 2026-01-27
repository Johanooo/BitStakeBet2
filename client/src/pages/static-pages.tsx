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
          Transparency is important to us. This page explains how BitStakeBet is funded.
        </p>

        <h2>How We Make Money</h2>
        <p>
          BitStakeBet contains affiliate links. When you click on these links and sign up at a 
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
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">About BitStakeBet</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg">
          BitStakeBet is the most trusted resource for finding safe, reliable crypto betting sites.
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

export function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 2026</p>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <h2>1. Introduction</h2>
        <p>
          Welcome to BitStakeBet ("we," "our," or "us"). We are committed to protecting your privacy 
          and personal information. This Privacy Policy explains how we collect, use, disclose, and 
          safeguard your information when you visit our website bitstakebet.com.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Information You Provide</h3>
        <p>We may collect information you voluntarily provide, including:</p>
        <ul>
          <li>Contact information (email address) when you reach out to us</li>
          <li>Any feedback or correspondence you send us</li>
        </ul>
        
        <h3>Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>IP address (anonymized)</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referring website addresses</li>
        </ul>

        <h2>3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience on our website. 
          Cookies are small data files stored on your device. You can control cookies through your 
          browser settings.
        </p>
        <p>We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for website functionality</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
          <li><strong>Preference Cookies:</strong> Remember your settings (e.g., dark/light mode)</li>
        </ul>

        <h2>4. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our website</li>
          <li>Improve user experience</li>
          <li>Analyze website traffic and usage patterns</li>
          <li>Respond to your inquiries and requests</li>
          <li>Detect and prevent fraud or abuse</li>
        </ul>

        <h2>5. Third-Party Links</h2>
        <p>
          Our website contains links to third-party crypto betting sites. We are not responsible for 
          the privacy practices of these external sites. We encourage you to review their privacy 
          policies before providing any personal information.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your 
          information. However, no method of transmission over the Internet is 100% secure, and we 
          cannot guarantee absolute security.
        </p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to or restrict processing of your information</li>
          <li>Data portability</li>
        </ul>

        <h2>8. Children's Privacy</h2>
        <p>
          Our website is not intended for individuals under 18 years of age. We do not knowingly 
          collect personal information from children. If you believe we have collected information 
          from a minor, please contact us immediately.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by 
          posting the new policy on this page and updating the "Last updated" date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <Link href="/contact" className="text-primary hover:underline">our contact page</Link>.
        </p>
      </div>
    </div>
  );
}

export function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 2026</p>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using BitStakeBet (bitstakebet.com), you accept and agree to be bound by 
          these Terms of Service. If you do not agree to these terms, please do not use our website.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          BitStakeBet is an informational website that provides reviews, comparisons, and educational 
          content about cryptocurrency betting platforms. We are a comparison and affiliate website 
          and do not operate any gambling services ourselves.
        </p>

        <h2>3. Age Requirement</h2>
        <p>
          You must be at least 18 years old (or the legal gambling age in your jurisdiction, whichever 
          is higher) to use this website. By using our site, you confirm that you meet this age 
          requirement.
        </p>

        <h2>4. No Gambling Services</h2>
        <p>
          BitStakeBet does not provide gambling services. We are an independent review and comparison 
          website. Any gambling activities occur on third-party platforms that you access through our 
          links. We are not responsible for:
        </p>
        <ul>
          <li>The operation of any third-party betting sites</li>
          <li>Any losses incurred from gambling</li>
          <li>Disputes between you and betting operators</li>
          <li>The accuracy of information provided by third-party sites</li>
        </ul>

        <h2>5. Affiliate Disclosure</h2>
        <p>
          We may receive compensation when you click on links to betting sites and/or sign up for 
          their services. This affiliate relationship does not influence our reviews or ratings. 
          See our <Link href="/affiliate-disclosure" className="text-primary hover:underline">
          Affiliate Disclosure</Link> for more details.
        </p>

        <h2>6. Accuracy of Information</h2>
        <p>
          While we strive to provide accurate and up-to-date information, we make no warranties about 
          the completeness, reliability, or accuracy of information on our website. Bonus terms, 
          features, and availability may change without notice on third-party sites.
        </p>

        <h2>7. Responsible Gambling</h2>
        <p>
          Gambling can be addictive. We strongly encourage responsible gambling practices. If you 
          have a gambling problem, please seek help from professional resources. See our{" "}
          <Link href="/responsible-gambling" className="text-primary hover:underline">
          Responsible Gambling</Link> page for support resources.
        </p>

        <h2>8. Geographic Restrictions</h2>
        <p>
          Online gambling laws vary by jurisdiction. It is your responsibility to ensure that using 
          cryptocurrency betting sites is legal in your location. We do not encourage or condone 
          illegal gambling.
        </p>

        <h2>9. Intellectual Property</h2>
        <p>
          All content on BitStakeBet, including text, graphics, logos, and images, is our property 
          or the property of our content suppliers and is protected by intellectual property laws. 
          You may not reproduce, distribute, or create derivative works without our permission.
        </p>

        <h2>10. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use our website for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the website's operation</li>
          <li>Scrape or collect data from our website without permission</li>
          <li>Transmit viruses or malicious code</li>
        </ul>

        <h2>11. Disclaimer of Warranties</h2>
        <p>
          Our website is provided "as is" without warranties of any kind, either express or implied. 
          We do not warrant that the website will be uninterrupted, error-free, or free of viruses.
        </p>

        <h2>12. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, BitStakeBet shall not be liable for any indirect, 
          incidental, special, consequential, or punitive damages, including but not limited to loss 
          of profits, data, or other intangible losses resulting from your use of our website.
        </p>

        <h2>13. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless BitStakeBet and its affiliates from any claims, 
          damages, or expenses arising from your use of the website or violation of these terms.
        </p>

        <h2>14. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective 
          immediately upon posting. Your continued use of the website constitutes acceptance of the 
          modified terms.
        </p>

        <h2>15. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with applicable laws, 
          without regard to conflict of law principles.
        </p>

        <h2>16. Contact</h2>
        <p>
          For questions about these Terms of Service, please{" "}
          <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
