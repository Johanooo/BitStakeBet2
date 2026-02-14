import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BookmakersPage, { 
  CryptoSportsbooks, 
  CryptoCasinos, 
  NoKycBetting,
  BitcoinSportsbook,
  EthereumSportsbook,
  UsdtSportsbook
} from "@/pages/bookmakers";
import BookmakerDetail from "@/pages/bookmaker-detail";
import BonusesPage from "@/pages/bonuses";
import GuidesPage from "@/pages/guides";
import GuideDetail from "@/pages/guide-detail";
import { 
  HowWeRate, 
  ResponsibleGambling, 
  AffiliateDisclosure, 
  About, 
  Contact,
  ComparePage,
  PrivacyPolicy,
  TermsOfService
} from "@/pages/static-pages";
import AdminDashboard from "@/pages/admin";
import AdminLogin from "@/pages/admin/login";
import AdminBookmakers from "@/pages/admin/bookmakers";
import AdminBonuses from "@/pages/admin/bonuses";
import AdminGuides from "@/pages/admin/guides";
import AdminFaqs from "@/pages/admin/faqs";
import AdminSettings from "@/pages/admin/settings";
import AdminResetPassword from "@/pages/admin/reset-password";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      <Route path="/crypto-sportsbooks" component={CryptoSportsbooks} />
      <Route path="/crypto-casinos" component={CryptoCasinos} />
      <Route path="/no-kyc-crypto-betting" component={NoKycBetting} />
      <Route path="/bitcoin-sportsbook" component={BitcoinSportsbook} />
      <Route path="/ethereum-sportsbook" component={EthereumSportsbook} />
      <Route path="/usdt-sportsbook" component={UsdtSportsbook} />
      
      <Route path="/bookmakers" component={BookmakersPage} />
      <Route path="/bookmakers/:slug" component={BookmakerDetail} />
      
      <Route path="/bonuses" component={BonusesPage} />
      
      <Route path="/guides" component={GuidesPage} />
      <Route path="/guides/:slug" component={GuideDetail} />
      
      <Route path="/compare" component={ComparePage} />
      
      <Route path="/how-we-rate" component={HowWeRate} />
      <Route path="/responsible-gambling" component={ResponsibleGambling} />
      <Route path="/affiliate-disclosure" component={AffiliateDisclosure} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Switch>
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/reset-password" component={AdminResetPassword} />
            <Route path="/admin/bookmakers" component={AdminBookmakers} />
            <Route path="/admin/bonuses" component={AdminBonuses} />
            <Route path="/admin/guides" component={AdminGuides} />
            <Route path="/admin/faqs" component={AdminFaqs} />
            <Route path="/admin/settings" component={AdminSettings} />
            <Route path="/admin" component={AdminDashboard} />
            <Route>
              {() => (
                <Layout>
                  <Router />
                </Layout>
              )}
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
