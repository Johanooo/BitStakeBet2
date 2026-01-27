import { db } from "./db";
import { bookmakers, bonuses, guides, faqs, coins, regions } from "@shared/schema";

const cryptoCoins = [
  { name: "Bitcoin", symbol: "BTC" },
  { name: "Ethereum", symbol: "ETH" },
  { name: "Tether", symbol: "USDT" },
  { name: "Litecoin", symbol: "LTC" },
  { name: "Dogecoin", symbol: "DOGE" },
  { name: "Bitcoin Cash", symbol: "BCH" },
  { name: "Ripple", symbol: "XRP" },
  { name: "Cardano", symbol: "ADA" },
  { name: "Solana", symbol: "SOL" },
  { name: "USDC", symbol: "USDC" },
];

const seedBookmakers = [
  {
    name: "Stake",
    slug: "stake",
    domain: "stake.com",
    shortDescription: "World's largest crypto casino & sportsbook with instant payouts",
    description: "Stake is the world's leading crypto casino and sportsbook, trusted by millions of players worldwide. Founded in 2017, Stake offers thousands of casino games, extensive sports betting markets, and industry-leading odds. With instant crypto withdrawals, 24/7 support, and a Curacao license, Stake sets the standard for crypto gambling.",
    foundedYear: 2017,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://stake.com/?c=cryptobookies",
    trustScoreOverride: 95,
    payoutSpeed: "Instant",
    minDeposit: "$1",
    supportLiveChat: true,
    featured: true,
    pros: ["Instant crypto withdrawals", "No KYC for most players", "Excellent odds", "Huge game selection"],
    cons: ["Not available in US/UK", "Occasional promotional restrictions"],
  },
  {
    name: "Cloudbet",
    slug: "cloudbet",
    domain: "cloudbet.com",
    shortDescription: "Premium Bitcoin sportsbook since 2013",
    description: "Cloudbet is one of the original Bitcoin sportsbooks, operating since 2013. Known for high betting limits and excellent odds, Cloudbet offers a premium betting experience with competitive markets and fast payouts.",
    foundedYear: 2013,
    licenseName: "Montenegro License",
    licenseJurisdiction: "Montenegro",
    kycLevel: "LIGHT_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://cloudbet.com/?af=cryptobookies",
    trustScoreOverride: 92,
    payoutSpeed: "< 10 mins",
    minDeposit: "0.001 BTC",
    supportLiveChat: true,
    featured: true,
    pros: ["High betting limits", "Established since 2013", "Fast payouts"],
    cons: ["Light KYC required", "Limited promotions"],
  },
  {
    name: "BC.Game",
    slug: "bc-game",
    domain: "bc.game",
    shortDescription: "Community-driven crypto casino with provably fair games",
    description: "BC.Game is a community-focused crypto casino offering provably fair games, generous bonuses, and a unique social experience. With its innovative approach and wide cryptocurrency support, BC.Game has become a favorite among crypto gamblers.",
    foundedYear: 2017,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://bc.game/?ref=cryptobookies",
    trustScoreOverride: 88,
    payoutSpeed: "Instant",
    minDeposit: "$0",
    supportLiveChat: true,
    featured: true,
    pros: ["No minimum deposit", "Provably fair games", "Great community"],
    cons: ["Sports betting is newer", "Interface can be overwhelming"],
  },
  {
    name: "Roobet",
    slug: "roobet",
    domain: "roobet.com",
    shortDescription: "Popular crypto casino with exclusive games",
    description: "Roobet is a trendy crypto casino known for its exclusive crash games and streamer partnerships. With a sleek interface and instant payouts, Roobet offers a fun gambling experience.",
    foundedYear: 2019,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: false,
    casino: true,
    esports: false,
    affiliateUrl: "https://roobet.com/?ref=cryptobookies",
    trustScoreOverride: 85,
    payoutSpeed: "Instant",
    minDeposit: "$10",
    supportLiveChat: true,
    featured: false,
    pros: ["Exclusive games", "Streamer community", "Fast payouts"],
    cons: ["No sportsbook", "Geo-restricted in many regions"],
  },
  {
    name: "Rollbit",
    slug: "rollbit",
    domain: "rollbit.com",
    shortDescription: "Innovative crypto casino with NFT integration",
    description: "Rollbit combines crypto gambling with NFT features, offering a unique experience. Known for its RLB token and loot boxes, Rollbit attracts both gamblers and crypto enthusiasts.",
    foundedYear: 2020,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://rollbit.com/?ref=cryptobookies",
    trustScoreOverride: 82,
    payoutSpeed: "< 5 mins",
    minDeposit: "$1",
    supportLiveChat: true,
    featured: false,
    pros: ["NFT integration", "Own cryptocurrency", "Innovative features"],
    cons: ["Complex for beginners", "Token volatility"],
  },
  {
    name: "Sportsbet.io",
    slug: "sportsbet-io",
    domain: "sportsbet.io",
    shortDescription: "Official betting partner of major sports teams",
    description: "Sportsbet.io is a leading crypto sportsbook with official partnerships with Premier League clubs. Offering competitive odds, live betting, and fast payouts, it's a top choice for sports bettors.",
    foundedYear: 2016,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "LIGHT_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://sportsbet.io/?af=cryptobookies",
    trustScoreOverride: 90,
    payoutSpeed: "< 15 mins",
    minDeposit: "0.0001 BTC",
    supportLiveChat: true,
    featured: true,
    pros: ["Major sports partnerships", "Great live betting", "Multi-currency support"],
    cons: ["KYC may be required", "Some country restrictions"],
  },
  {
    name: "Duelbits",
    slug: "duelbits",
    domain: "duelbits.com",
    shortDescription: "Esports-focused crypto betting platform",
    description: "Duelbits specializes in esports betting while also offering casino games. Popular among gamers and streamers, it provides competitive odds on major esports tournaments.",
    foundedYear: 2020,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://duelbits.com/?ref=cryptobookies",
    trustScoreOverride: 80,
    payoutSpeed: "Instant",
    minDeposit: "$1",
    supportLiveChat: true,
    featured: false,
    pros: ["Great esports coverage", "No KYC", "Fast payouts"],
    cons: ["Newer platform", "Limited traditional sports"],
  },
  {
    name: "BetFury",
    slug: "betfury",
    domain: "betfury.io",
    shortDescription: "Staking-enabled crypto casino with dividends",
    description: "BetFury offers a unique staking model where players earn dividends from the platform's profits. With BFG token rewards and diverse games, it attracts long-term players.",
    foundedYear: 2019,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://betfury.io/?ref=cryptobookies",
    trustScoreOverride: 78,
    payoutSpeed: "< 10 mins",
    minDeposit: "$0",
    supportLiveChat: true,
    featured: false,
    pros: ["Dividend staking", "No minimum deposit", "BFG rewards"],
    cons: ["Token value fluctuates", "Interface complexity"],
  },
  {
    name: "1xBit",
    slug: "1xbit",
    domain: "1xbit.com",
    shortDescription: "Comprehensive crypto betting with 40+ coins",
    description: "1xBit offers one of the widest cryptocurrency selections, accepting over 40 different coins. With extensive sports markets and casino games, it caters to diverse preferences.",
    foundedYear: 2016,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://1xbit.com/?ref=cryptobookies",
    trustScoreOverride: 75,
    payoutSpeed: "< 15 mins",
    minDeposit: "0.0001 BTC",
    supportLiveChat: true,
    featured: false,
    pros: ["40+ cryptocurrencies", "Extensive sports markets", "No KYC"],
    cons: ["Complex interface", "Customer support varies"],
  },
  {
    name: "Thunderpick",
    slug: "thunderpick",
    domain: "thunderpick.io",
    shortDescription: "Premium esports betting with crypto",
    description: "Thunderpick is a dedicated esports betting platform supporting Bitcoin and other cryptos. With competitive odds on major tournaments, it's a go-to for esports enthusiasts.",
    foundedYear: 2017,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "LIGHT_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://thunderpick.io/?ref=cryptobookies",
    trustScoreOverride: 83,
    payoutSpeed: "< 30 mins",
    minDeposit: "$10",
    supportLiveChat: true,
    featured: false,
    pros: ["Esports focus", "Good odds", "Clean interface"],
    cons: ["Light KYC required", "Limited traditional sports"],
  },
  {
    name: "Gamdom",
    slug: "gamdom",
    domain: "gamdom.com",
    shortDescription: "Established crypto casino with VIP program",
    description: "Gamdom has been a reliable crypto casino since 2016, offering crash, roulette, and slot games. Its VIP program rewards loyal players with exclusive benefits.",
    foundedYear: 2016,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://gamdom.com/?ref=cryptobookies",
    trustScoreOverride: 81,
    payoutSpeed: "Instant",
    minDeposit: "$1",
    supportLiveChat: true,
    featured: false,
    pros: ["Strong VIP program", "Provably fair", "Established brand"],
    cons: ["Sportsbook is secondary", "Some withdrawal limits"],
  },
  {
    name: "LuckyBlock",
    slug: "luckyblock",
    domain: "luckyblock.com",
    shortDescription: "New crypto casino with generous welcome bonus",
    description: "LuckyBlock launched with impressive welcome bonuses and a modern platform. Offering sports betting and casino games, it targets crypto newcomers.",
    foundedYear: 2022,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "LIGHT_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://luckyblock.com/?ref=cryptobookies",
    trustScoreOverride: 72,
    payoutSpeed: "< 1 hour",
    minDeposit: "$20",
    supportLiveChat: true,
    featured: false,
    pros: ["Generous bonuses", "Modern interface", "Good promotions"],
    cons: ["New platform", "Light KYC", "Higher minimum deposit"],
  },
  {
    name: "Shuffle",
    slug: "shuffle",
    domain: "shuffle.com",
    shortDescription: "Clean crypto casino with focus on user experience",
    description: "Shuffle offers a sleek, modern crypto gambling experience with competitive odds and fast payouts. Known for its clean design and straightforward approach.",
    foundedYear: 2022,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://shuffle.com/?ref=cryptobookies",
    trustScoreOverride: 76,
    payoutSpeed: "Instant",
    minDeposit: "$5",
    supportLiveChat: true,
    featured: false,
    pros: ["Clean interface", "No KYC", "Fast payouts"],
    cons: ["Newer platform", "Limited promotions"],
  },
  {
    name: "Vave",
    slug: "vave",
    domain: "vave.com",
    shortDescription: "Full-featured crypto gambling platform",
    description: "Vave combines sports betting with a comprehensive casino offering, providing a complete crypto gambling experience with competitive odds.",
    foundedYear: 2022,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://vave.com/?ref=cryptobookies",
    trustScoreOverride: 74,
    payoutSpeed: "< 10 mins",
    minDeposit: "$10",
    supportLiveChat: true,
    featured: false,
    pros: ["Full-featured platform", "Good odds", "No KYC"],
    cons: ["Less established", "Support response times vary"],
  },
  {
    name: "Bitsler",
    slug: "bitsler",
    domain: "bitsler.com",
    shortDescription: "Provably fair dice and casino games",
    description: "Bitsler specializes in provably fair games, particularly dice. With a loyal community and transparent operations, it's trusted by experienced crypto gamblers.",
    foundedYear: 2015,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: false,
    casino: true,
    esports: false,
    affiliateUrl: "https://bitsler.com/?ref=cryptobookies",
    trustScoreOverride: 79,
    payoutSpeed: "Instant",
    minDeposit: "$0",
    supportLiveChat: true,
    featured: false,
    pros: ["Provably fair", "Established since 2015", "No minimum deposit"],
    cons: ["No sportsbook", "Limited game variety"],
  },
  {
    name: "Mystake",
    slug: "mystake",
    domain: "mystake.com",
    shortDescription: "Growing crypto casino with mini games",
    description: "Mystake offers a mix of traditional casino games and unique mini games. With crypto support and regular promotions, it appeals to diverse players.",
    foundedYear: 2020,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "LIGHT_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://mystake.com/?ref=cryptobookies",
    trustScoreOverride: 71,
    payoutSpeed: "< 1 hour",
    minDeposit: "$20",
    supportLiveChat: true,
    featured: false,
    pros: ["Unique mini games", "Good promotions", "Multiple currencies"],
    cons: ["Light KYC", "Slower withdrawals"],
  },
  {
    name: "Winz",
    slug: "winz",
    domain: "winz.io",
    shortDescription: "No-wagering bonus crypto casino",
    description: "Winz stands out with its no-wagering requirement bonuses, giving players real value. With a solid game selection and crypto support, it's player-friendly.",
    foundedYear: 2020,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "LIGHT_KYC" as const,
    sportsbook: false,
    casino: true,
    esports: false,
    affiliateUrl: "https://winz.io/?ref=cryptobookies",
    trustScoreOverride: 77,
    payoutSpeed: "< 30 mins",
    minDeposit: "$20",
    supportLiveChat: true,
    featured: false,
    pros: ["No wagering requirements", "Player-friendly bonuses", "Good game selection"],
    cons: ["No sportsbook", "Light KYC"],
  },
  {
    name: "Betcoin.ag",
    slug: "betcoin",
    domain: "betcoin.ag",
    shortDescription: "Veteran Bitcoin sportsbook since 2013",
    description: "Betcoin.ag is one of the oldest Bitcoin betting sites, offering sports betting, poker, and casino games. A trusted name in crypto gambling.",
    foundedYear: 2013,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://betcoin.ag/?ref=cryptobookies",
    trustScoreOverride: 80,
    payoutSpeed: "< 1 hour",
    minDeposit: "0.001 BTC",
    supportLiveChat: true,
    featured: false,
    pros: ["Established since 2013", "Bitcoin poker", "No KYC"],
    cons: ["Dated interface", "Limited coin support"],
  },
  {
    name: "Nitrogen Sports",
    slug: "nitrogen-sports",
    domain: "nitrogensports.eu",
    shortDescription: "Anonymous Bitcoin sportsbook",
    description: "Nitrogen Sports pioneered anonymous Bitcoin betting. While no longer as dominant, it remains a solid choice for privacy-focused bettors.",
    foundedYear: 2012,
    licenseName: "None",
    licenseJurisdiction: "Unknown",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: false,
    esports: false,
    affiliateUrl: "https://nitrogensports.eu/?ref=cryptobookies",
    trustScoreOverride: 73,
    payoutSpeed: "< 24 hours",
    minDeposit: "0.001 BTC",
    supportLiveChat: false,
    featured: false,
    pros: ["Anonymous betting", "Bitcoin-only", "Sharp odds"],
    cons: ["No license", "Slow payouts", "No casino"],
  },
  {
    name: "DuckDice",
    slug: "duckdice",
    domain: "duckdice.io",
    shortDescription: "Simple provably fair dice game",
    description: "DuckDice focuses on one thing: provably fair dice gambling. With a minimalist approach and transparent odds, it's for dice game enthusiasts.",
    foundedYear: 2016,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: false,
    casino: true,
    esports: false,
    affiliateUrl: "https://duckdice.io/?ref=cryptobookies",
    trustScoreOverride: 75,
    payoutSpeed: "Instant",
    minDeposit: "$0",
    supportLiveChat: true,
    featured: false,
    pros: ["Provably fair", "Simple interface", "No minimum"],
    cons: ["Only dice games", "Limited features"],
  },
  {
    name: "CoinsGame",
    slug: "coinsgame",
    domain: "coins.game",
    shortDescription: "Modern crypto casino and sportsbook",
    description: "CoinsGame offers a modern gambling experience with both casino and sports betting. With attractive bonuses and fast payouts, it's gaining popularity.",
    foundedYear: 2021,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://coins.game/?ref=cryptobookies",
    trustScoreOverride: 70,
    payoutSpeed: "< 15 mins",
    minDeposit: "$10",
    supportLiveChat: true,
    featured: false,
    pros: ["Modern platform", "Good bonuses", "Fast payouts"],
    cons: ["Newer brand", "Building reputation"],
  },
  {
    name: "Rakebit",
    slug: "rakebit",
    domain: "rakebit.com",
    shortDescription: "Rakeback-focused crypto casino",
    description: "Rakebit emphasizes rakeback rewards, giving players a portion back on every bet. For high-volume players, this adds significant value.",
    foundedYear: 2021,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "NO_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: false,
    affiliateUrl: "https://rakebit.com/?ref=cryptobookies",
    trustScoreOverride: 68,
    payoutSpeed: "< 30 mins",
    minDeposit: "$10",
    supportLiveChat: true,
    featured: false,
    pros: ["Strong rakeback", "No KYC", "Multiple games"],
    cons: ["Less established", "Limited reviews"],
  },
  {
    name: "Roletto",
    slug: "roletto",
    domain: "roletto.com",
    shortDescription: "Full-service crypto sportsbook",
    description: "Roletto provides comprehensive sports betting with crypto support. With competitive odds and a user-friendly interface, it serves casual and serious bettors.",
    foundedYear: 2020,
    licenseName: "Curacao eGaming",
    licenseJurisdiction: "Curacao",
    kycLevel: "LIGHT_KYC" as const,
    sportsbook: true,
    casino: true,
    esports: true,
    affiliateUrl: "https://roletto.com/?ref=cryptobookies",
    trustScoreOverride: 72,
    payoutSpeed: "< 1 hour",
    minDeposit: "$20",
    supportLiveChat: true,
    featured: false,
    pros: ["Good sports coverage", "User-friendly", "Multiple currencies"],
    cons: ["Light KYC", "Average bonuses"],
  },
];

const seedBonuses = [
  {
    headline: "200% Welcome Bonus up to $2000",
    description: "New players get a massive 200% match on their first deposit, plus 50 free spins",
    type: "DEPOSIT_MATCH" as const,
    maxValueUsd: 2000,
    wageringRequirementText: "40x bonus",
    minDepositText: "$20",
    expiryText: "30 days",
    status: "ACTIVE" as const,
    lastVerifiedAt: new Date(),
    featured: true,
    bookmakerSlug: "stake",
  },
  {
    headline: "100% First Deposit Bonus",
    description: "Double your first Bitcoin deposit with Cloudbet's generous welcome offer",
    type: "DEPOSIT_MATCH" as const,
    maxValueUsd: 5000,
    wageringRequirementText: "No wagering on sports",
    minDepositText: "0.001 BTC",
    status: "ACTIVE" as const,
    lastVerifiedAt: new Date(),
    featured: true,
    bookmakerSlug: "cloudbet",
  },
  {
    headline: "Up to 360% Welcome Package",
    description: "Get up to 360% bonus across your first 4 deposits at BC.Game",
    type: "DEPOSIT_MATCH" as const,
    maxValueUsd: 1000,
    wageringRequirementText: "35x bonus",
    minDepositText: "$10",
    status: "ACTIVE" as const,
    lastVerifiedAt: new Date(),
    featured: true,
    bookmakerSlug: "bc-game",
  },
  {
    headline: "$20 Free Bet",
    description: "Place your first sports bet and get a $20 free bet if it loses",
    type: "FREE_BET" as const,
    maxValueUsd: 20,
    wageringRequirementText: "1x",
    minDepositText: "$20",
    status: "ACTIVE" as const,
    lastVerifiedAt: new Date(),
    featured: false,
    bookmakerSlug: "sportsbet-io",
  },
  {
    headline: "10% Daily Cashback",
    description: "Get 10% of your losses back every day at Roobet",
    type: "CASHBACK" as const,
    maxValueUsd: 500,
    wageringRequirementText: "None",
    minDepositText: "$10",
    status: "ACTIVE" as const,
    lastVerifiedAt: new Date(),
    featured: false,
    bookmakerSlug: "roobet",
  },
  {
    headline: "15% Rakeback Forever",
    description: "Earn 15% rakeback on all bets permanently with VIP status",
    type: "RAKEBACK" as const,
    maxValueUsd: null,
    wageringRequirementText: "None",
    minDepositText: "$100 total wagered",
    status: "ACTIVE" as const,
    lastVerifiedAt: new Date(),
    featured: false,
    bookmakerSlug: "gamdom",
  },
];

const seedGuides = [
  {
    title: "Understanding Wagering Requirements in Crypto Betting",
    slug: "wagering-requirements-explained",
    excerpt: "Learn how wagering requirements work and how to find the best value bonuses.",
    category: "Bonuses",
    content: `Wagering requirements are one of the most important factors when evaluating crypto betting bonuses. This guide explains everything you need to know.

## What Are Wagering Requirements?

Wagering requirements (also called playthrough requirements) specify how many times you must bet your bonus amount before withdrawing any winnings. For example, a 40x wagering requirement on a $100 bonus means you need to place $4,000 in bets before cashing out.

## How to Calculate Real Bonus Value

The true value of a bonus depends heavily on wagering requirements:
- 20x or lower: Excellent value
- 20x-35x: Good value
- 35x-50x: Average value
- 50x+: Poor value

## Tips for Meeting Wagering Requirements

1. **Choose low-volatility games** - They provide more consistent returns
2. **Check game contributions** - Slots often contribute 100%, table games less
3. **Set a budget** - Don't chase wagering completion with funds you can't afford
4. **Read the fine print** - Some bonuses have maximum bet limits

## Crypto-Specific Considerations

With crypto bonuses, pay attention to:
- Conversion rates at time of wagering
- Whether winnings are paid in crypto or fiat
- Time limits for completing requirements`,
    published: true,
  },
  {
    title: "No-KYC Crypto Betting: Benefits and Risks",
    slug: "no-kyc-betting-guide",
    excerpt: "Is anonymous crypto betting right for you? Understand the trade-offs.",
    category: "Privacy",
    content: `No-KYC (Know Your Customer) betting sites allow you to gamble without verifying your identity. Here's what you need to know.

## What is KYC?

KYC is a verification process where betting sites confirm your identity using documents like:
- Government ID
- Proof of address
- Selfies

## Benefits of No-KYC Betting

1. **Privacy** - Your gambling activity stays private
2. **Speed** - Start betting immediately without waiting for verification
3. **Accessibility** - Available in more regions
4. **Simplicity** - No document uploads required

## Risks and Considerations

1. **Less protection** - Harder to recover funds if issues arise
2. **Withdrawal limits** - Some sites require KYC for large withdrawals
3. **Regulatory concerns** - May operate in gray areas
4. **Scam vulnerability** - Always research before depositing

## Best Practices

- Only use reputable no-KYC sites
- Start with small deposits
- Withdraw regularly
- Keep transaction records`,
    published: true,
  },
  {
    title: "How to Spot Scam Crypto Bookmakers",
    slug: "avoiding-crypto-betting-scams",
    excerpt: "Protect yourself from fraudulent betting sites with these warning signs.",
    category: "Safety",
    content: `The crypto betting space unfortunately attracts scammers. Learn how to identify and avoid them.

## Major Red Flags

1. **No License** - Legitimate sites display their gambling license
2. **Unrealistic Bonuses** - 500%+ bonuses are usually too good to be true
3. **No Contact Info** - Missing support email, live chat, or company details
4. **Fake Reviews** - All 5-star reviews with no criticism
5. **Delayed Withdrawals** - Excuses for not processing payouts

## How to Verify a Site

1. Check our trust ratings at CryptoBookies
2. Search for user experiences on forums
3. Verify the gambling license is valid
4. Test customer support before depositing
5. Start with a small deposit

## What to Do If Scammed

1. Document everything (screenshots, transaction IDs)
2. Report to the licensing authority
3. Share your experience to warn others
4. Consider blockchain analysis services for large amounts

## Our Vetting Process

We verify every bookmaker we list by:
- Confirming licenses
- Testing deposits and withdrawals
- Evaluating customer support
- Monitoring user feedback`,
    published: true,
  },
  {
    title: "Crypto Withdrawal Times: What to Expect",
    slug: "crypto-withdrawal-times",
    excerpt: "How fast should crypto payouts be? We break down what's normal and what's not.",
    category: "Payments",
    content: `One major advantage of crypto betting is fast withdrawals. Here's what you should expect.

## Typical Withdrawal Times by Crypto

- **Bitcoin (BTC)**: 10 minutes to 1 hour (network dependent)
- **Ethereum (ETH)**: 5-30 minutes
- **Litecoin (LTC)**: 2-10 minutes
- **USDT (TRC20)**: 1-5 minutes
- **Dogecoin**: 1-10 minutes

## Factors Affecting Speed

1. **Site Processing** - Some sites have manual review
2. **Network Congestion** - Bitcoin can be slow during high activity
3. **Withdrawal Amount** - Large amounts may require additional verification
4. **KYC Status** - Verified accounts often get faster processing
5. **Time of Day** - Manual reviews only during business hours

## Red Flags for Slow Withdrawals

- Processing takes more than 24 hours
- Repeated excuses without resolution
- "Verification" requests after approval
- Changing withdrawal limits retroactively

## Our Tested Results

All sites in our top 10 processed test withdrawals within 1 hour, with most completing in under 15 minutes.`,
    published: true,
  },
  {
    title: "Understanding Crypto Betting Licenses",
    slug: "crypto-gambling-licenses",
    excerpt: "Not all gambling licenses are equal. Learn which jurisdictions offer the best protection.",
    category: "Safety",
    content: `Gambling licenses provide regulatory oversight and player protection. Here's what to look for.

## Top Licensing Jurisdictions

### Tier 1 (Strongest)
- **Malta Gaming Authority (MGA)** - Strict requirements, excellent player protection
- **UK Gambling Commission** - World-class regulation (but crypto-unfriendly)
- **Gibraltar** - Strong oversight, established jurisdiction

### Tier 2 (Good)
- **Curacao eGaming** - Most common for crypto sites, moderate protection
- **Isle of Man** - Respected jurisdiction with good oversight

### Tier 3 (Basic)
- **Anjouan** - Basic licensing, limited recourse
- **Costa Rica** - Minimal regulation

## What a License Guarantees

1. Site has met financial requirements
2. Games are tested for fairness
3. Player funds are somewhat protected
4. There's a complaints procedure
5. Site follows anti-money laundering rules

## Verifying a License

1. Find the license number on the site
2. Visit the regulator's website
3. Search their public register
4. Confirm the license is active

## Why Curacao Dominates Crypto

Most crypto casinos use Curacao licenses because:
- More crypto-friendly regulations
- Faster licensing process
- Lower costs
- Less restrictive on markets`,
    published: true,
  },
];

const seedFaqs = [
  {
    question: "Is crypto betting legal?",
    answer: "Crypto betting legality varies by country. In most jurisdictions, using crypto at licensed gambling sites is legal, but always check your local laws.",
    category: "Legal",
  },
  {
    question: "Are crypto betting sites safe?",
    answer: "Licensed crypto betting sites with established reputations are generally safe. Use our trust scores to find vetted, reliable platforms.",
    category: "Safety",
  },
  {
    question: "How fast are crypto withdrawals?",
    answer: "Most crypto withdrawals at reputable sites process instantly or within minutes. Bitcoin may take 10-60 minutes due to network confirmation times.",
    category: "Payments",
  },
  {
    question: "What is KYC verification?",
    answer: "KYC (Know Your Customer) is identity verification required by some betting sites. It typically involves submitting ID documents and proof of address.",
    category: "Account",
  },
  {
    question: "Which crypto is best for betting?",
    answer: "Bitcoin and USDT are most widely accepted. USDT offers stable value, while Bitcoin is available almost everywhere. Litecoin offers faster transactions.",
    category: "Crypto",
  },
];

export async function seedDatabase() {
  console.log("Checking if database needs seeding...");

  try {
    // Check if already seeded by checking for existing bookmakers
    const existingBookmakers = await db.select().from(bookmakers).limit(1);
    if (existingBookmakers.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    console.log("Starting database seed...");

    // Seed coins
    console.log("Seeding coins...");
    for (const coin of cryptoCoins) {
      try {
        await db.insert(coins).values(coin).onConflictDoNothing();
      } catch (e) {
        // ignore duplicate
      }
    }

    // Seed bookmakers
    console.log("Seeding bookmakers...");
    const createdBookmakers: Record<string, string> = {};
    for (const bm of seedBookmakers) {
      try {
        const [result] = await db.insert(bookmakers).values(bm).onConflictDoNothing().returning();
        if (result) {
          createdBookmakers[bm.slug] = result.id;
        } else {
          // Get existing
          const [existing] = await db.select().from(bookmakers).where(eq(bookmakers.slug, bm.slug));
          if (existing) {
            createdBookmakers[bm.slug] = existing.id;
          }
        }
      } catch (e) {
        console.log(`Bookmaker ${bm.slug} may already exist`);
      }
    }

    // Seed bonuses
    console.log("Seeding bonuses...");
    for (const bonus of seedBonuses) {
      const bookmakerId = createdBookmakers[bonus.bookmakerSlug];
      if (bookmakerId) {
        const { bookmakerSlug, ...bonusData } = bonus;
        try {
          await db.insert(bonuses).values({ ...bonusData, bookmakerId }).onConflictDoNothing();
        } catch (e) {
          // ignore
        }
      }
    }

    // Seed guides
    console.log("Seeding guides...");
    const createdGuides: Record<string, string> = {};
    for (const guide of seedGuides) {
      try {
        const [result] = await db.insert(guides).values(guide).onConflictDoNothing().returning();
        if (result) {
          createdGuides[guide.slug] = result.id;
        }
      } catch (e) {
        // ignore
      }
    }

    // Seed FAQs
    console.log("Seeding FAQs...");
    for (const faq of seedFaqs) {
      try {
        await db.insert(faqs).values(faq).onConflictDoNothing();
      } catch (e) {
        // ignore
      }
    }

    console.log("Database seed completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Helper to import in functions
import { eq } from "drizzle-orm";
