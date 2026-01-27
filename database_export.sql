--
-- PostgreSQL database dump
--

\restrict c0rtwB7u3i0AgCgYs49jEzLlB3SfjMkQNknSL8RTPRsOwexjD1sNvBjGfBXUPvo

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin_users VALUES ('a76df2a9-f260-4f40-8755-e38ba3333d16', 'johanooo', '$2b$10$5z8qi3t2N4fkizbngubLDumlEmevQQ0E1eFuG4lc/NJxMU4uSQc.C', 'johan.kilicoglu@gmail.com', 'admin', '2026-01-27 09:22:25.974156', '2026-01-27 11:28:36.323');


--
-- Data for Name: bookmakers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bookmakers VALUES ('e550fe24-ab8b-4ba5-a3d4-81bc6abdd3aa', 'Stake', 'stake', 'stake.com', 'Stake is the world''s leading crypto casino and sportsbook, trusted by millions of players worldwide. Founded in 2017, Stake offers thousands of casino games, extensive sports betting markets, and industry-leading odds. With instant crypto withdrawals, 24/7 support, and a Curacao license, Stake sets the standard for crypto gambling.', 'World''s largest crypto casino & sportsbook with instant payouts', 2017, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, true, 'https://stake.com/?c=cryptobookies', NULL, 95, 'Instant', '$1', NULL, NULL, true, '{"Instant crypto withdrawals","No KYC for most players","Excellent odds","Huge game selection"}', '{"Not available in US/UK","Occasional promotional restrictions"}', true, '2026-01-27 07:13:24.571574', '2026-01-27 07:13:24.571574');
INSERT INTO public.bookmakers VALUES ('50c86efc-e910-43e7-bded-7d055d2bf738', 'Cloudbet', 'cloudbet', 'cloudbet.com', 'Cloudbet is one of the original Bitcoin sportsbooks, operating since 2013. Known for high betting limits and excellent odds, Cloudbet offers a premium betting experience with competitive markets and fast payouts.', 'Premium Bitcoin sportsbook since 2013', 2013, NULL, 'Montenegro License', 'Montenegro', NULL, 'LIGHT_KYC', true, true, true, 'https://cloudbet.com/?af=cryptobookies', NULL, 92, '< 10 mins', '0.001 BTC', NULL, NULL, true, '{"High betting limits","Established since 2013","Fast payouts"}', '{"Light KYC required","Limited promotions"}', true, '2026-01-27 07:13:24.580284', '2026-01-27 07:13:24.580284');
INSERT INTO public.bookmakers VALUES ('119bf13d-8de1-4f5f-b816-19939b6b0608', 'Roobet', 'roobet', 'roobet.com', 'Roobet is a trendy crypto casino known for its exclusive crash games and streamer partnerships. With a sleek interface and instant payouts, Roobet offers a fun gambling experience.', 'Popular crypto casino with exclusive games', 2019, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', false, true, false, 'https://roobet.com/?ref=cryptobookies', NULL, 85, 'Instant', '$10', NULL, NULL, true, '{"Exclusive games","Streamer community","Fast payouts"}', '{"No sportsbook","Geo-restricted in many regions"}', false, '2026-01-27 07:13:24.589521', '2026-01-27 07:13:24.589521');
INSERT INTO public.bookmakers VALUES ('ad71fd3b-f5cc-4a8b-915d-f0dd55c610f1', 'Sportsbet.io', 'sportsbet-io', 'sportsbet.io', 'Sportsbet.io is a leading crypto sportsbook with official partnerships with Premier League clubs. Offering competitive odds, live betting, and fast payouts, it''s a top choice for sports bettors.', 'Official betting partner of major sports teams', 2016, NULL, 'Curacao eGaming', 'Curacao', NULL, 'LIGHT_KYC', true, true, true, 'https://sportsbet.io/?af=cryptobookies', NULL, 90, '< 15 mins', '0.0001 BTC', NULL, NULL, true, '{"Major sports partnerships","Great live betting","Multi-currency support"}', '{"KYC may be required","Some country restrictions"}', true, '2026-01-27 07:13:24.599712', '2026-01-27 07:13:24.599712');
INSERT INTO public.bookmakers VALUES ('60c2ea60-4995-4ec3-b8fb-92c3ac9ce451', 'Duelbits', 'duelbits', 'duelbits.com', 'Duelbits specializes in esports betting while also offering casino games. Popular among gamers and streamers, it provides competitive odds on major esports tournaments.', 'Esports-focused crypto betting platform', 2020, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, true, 'https://duelbits.com/?ref=cryptobookies', NULL, 80, 'Instant', '$1', NULL, NULL, true, '{"Great esports coverage","No KYC","Fast payouts"}', '{"Newer platform","Limited traditional sports"}', false, '2026-01-27 07:13:24.60373', '2026-01-27 07:13:24.60373');
INSERT INTO public.bookmakers VALUES ('46c0e95d-5dc3-461f-b6e5-4de826816740', 'BetFury', 'betfury', 'betfury.io', 'BetFury offers a unique staking model where players earn dividends from the platform''s profits. With BFG token rewards and diverse games, it attracts long-term players.', 'Staking-enabled crypto casino with dividends', 2019, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, false, 'https://betfury.io/?ref=cryptobookies', NULL, 78, '< 10 mins', '$0', NULL, NULL, true, '{"Dividend staking","No minimum deposit","BFG rewards"}', '{"Token value fluctuates","Interface complexity"}', false, '2026-01-27 07:13:24.607504', '2026-01-27 07:13:24.607504');
INSERT INTO public.bookmakers VALUES ('ab65a090-7a1f-44d0-b6f1-a7f0c64f00c8', '1xBit', '1xbit', '1xbit.com', '1xBit offers one of the widest cryptocurrency selections, accepting over 40 different coins. With extensive sports markets and casino games, it caters to diverse preferences.', 'Comprehensive crypto betting with 40+ coins', 2016, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, true, 'https://1xbit.com/?ref=cryptobookies', NULL, 75, '< 15 mins', '0.0001 BTC', NULL, NULL, true, '{"40+ cryptocurrencies","Extensive sports markets","No KYC"}', '{"Complex interface","Customer support varies"}', false, '2026-01-27 07:13:24.611381', '2026-01-27 07:13:24.611381');
INSERT INTO public.bookmakers VALUES ('9742657e-18fc-4bec-94db-2d76145b5da0', 'Gamdom', 'gamdom', 'gamdom.com', 'Gamdom has been a reliable crypto casino since 2016, offering crash, roulette, and slot games. Its VIP program rewards loyal players with exclusive benefits.', 'Established crypto casino with VIP program', 2016, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, true, 'https://gamdom.com/?ref=cryptobookies', NULL, 81, 'Instant', '$1', NULL, NULL, true, '{"Strong VIP program","Provably fair","Established brand"}', '{"Sportsbook is secondary","Some withdrawal limits"}', false, '2026-01-27 07:13:24.621941', '2026-01-27 07:13:24.621941');
INSERT INTO public.bookmakers VALUES ('198e0f88-1524-4cde-ac2d-7bae2bd78fc6', 'LuckyBlock', 'luckyblock', 'luckyblock.com', 'LuckyBlock launched with impressive welcome bonuses and a modern platform. Offering sports betting and casino games, it targets crypto newcomers.', 'New crypto casino with generous welcome bonus', 2022, NULL, 'Curacao eGaming', 'Curacao', NULL, 'LIGHT_KYC', true, true, false, 'https://luckyblock.com/?ref=cryptobookies', NULL, 72, '< 1 hour', '$20', NULL, NULL, true, '{"Generous bonuses","Modern interface","Good promotions"}', '{"New platform","Light KYC","Higher minimum deposit"}', false, '2026-01-27 07:13:24.627251', '2026-01-27 07:13:24.627251');
INSERT INTO public.bookmakers VALUES ('6d730675-897d-45c6-9815-e66f63aa8fc8', 'Shuffle', 'shuffle', 'shuffle.com', 'Shuffle offers a sleek, modern crypto gambling experience with competitive odds and fast payouts. Known for its clean design and straightforward approach.', 'Clean crypto casino with focus on user experience', 2022, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, false, 'https://shuffle.com/?ref=cryptobookies', NULL, 76, 'Instant', '$5', NULL, NULL, true, '{"Clean interface","No KYC","Fast payouts"}', '{"Newer platform","Limited promotions"}', false, '2026-01-27 07:13:24.632917', '2026-01-27 07:13:24.632917');
INSERT INTO public.bookmakers VALUES ('7a4397ee-8b59-410d-8bf0-fd1f6858b0d7', 'Vave', 'vave', 'vave.com', 'Vave combines sports betting with a comprehensive casino offering, providing a complete crypto gambling experience with competitive odds.', 'Full-featured crypto gambling platform', 2022, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, true, 'https://vave.com/?ref=cryptobookies', NULL, 74, '< 10 mins', '$10', NULL, NULL, true, '{"Full-featured platform","Good odds","No KYC"}', '{"Less established","Support response times vary"}', false, '2026-01-27 07:13:24.637286', '2026-01-27 07:13:24.637286');
INSERT INTO public.bookmakers VALUES ('5d602492-21d8-4129-8ccb-90b825bbc155', 'Bitsler', 'bitsler', 'bitsler.com', 'Bitsler specializes in provably fair games, particularly dice. With a loyal community and transparent operations, it''s trusted by experienced crypto gamblers.', 'Provably fair dice and casino games', 2015, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', false, true, false, 'https://bitsler.com/?ref=cryptobookies', NULL, 79, 'Instant', '$0', NULL, NULL, true, '{"Provably fair","Established since 2015","No minimum deposit"}', '{"No sportsbook","Limited game variety"}', false, '2026-01-27 07:13:24.643306', '2026-01-27 07:13:24.643306');
INSERT INTO public.bookmakers VALUES ('ba912065-7742-4790-a170-b4448ae854f8', 'Mystake', 'mystake', 'mystake.com', 'Mystake offers a mix of traditional casino games and unique mini games. With crypto support and regular promotions, it appeals to diverse players.', 'Growing crypto casino with mini games', 2020, NULL, 'Curacao eGaming', 'Curacao', NULL, 'LIGHT_KYC', true, true, false, 'https://mystake.com/?ref=cryptobookies', NULL, 71, '< 1 hour', '$20', NULL, NULL, true, '{"Unique mini games","Good promotions","Multiple currencies"}', '{"Light KYC","Slower withdrawals"}', false, '2026-01-27 07:13:24.648704', '2026-01-27 07:13:24.648704');
INSERT INTO public.bookmakers VALUES ('10d7ba96-dfb4-4f00-bfb6-04ae5923e483', 'Rakebit', 'rakebit', 'rakebit.com', 'Rakebit emphasizes rakeback rewards, giving players a portion back on every bet. For high-volume players, this adds significant value.', 'Rakeback-focused crypto casino', 2021, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, false, 'https://rakebit.com/?ref=cryptobookies', NULL, 68, '< 30 mins', '$10', NULL, NULL, true, '{"Strong rakeback","No KYC","Multiple games"}', '{"Less established","Limited reviews"}', false, '2026-01-27 07:13:24.674795', '2026-01-27 07:13:24.674795');
INSERT INTO public.bookmakers VALUES ('2a893aed-b320-4342-8c6d-5577c43141bd', 'Betpanda', 'betpanda', 'betpanda.io', 'Betpanda offers a seamless no-KYC gambling experience with zero fees and no limits. Features 6,000+ games and 10% weekly wager-free cashback.', 'No KYC crypto casino with 100% bonus up to 1 BTC', 2022, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, false, 'https://betpanda.io/?ref=cryptobookies', NULL, 90, 'Instant', '$0', NULL, NULL, true, '{"No KYC required","Zero fees","Weekly cashback"}', '{"Newer platform"}', true, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('d99e92f0-ea59-49e4-af2d-7ec1443bf178', 'Fortune Jack', 'fortunejack', 'fortunejack.com', 'FortuneJack is a well-established crypto casino offering massive bonuses with only 10x wagering, 5,000 free spins, and a $1M monthly promo pool.', 'Established crypto casino with 500% deposit bonus', 2014, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, false, 'https://fortunejack.com/?ref=cryptobookies', NULL, 88, 'Instant', '$20', NULL, NULL, true, '{"Huge welcome bonus","Low wagering","VIP friendly"}', '{"Interface can be busy"}', true, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('ff2298f3-bbfa-4a6e-b4ec-9b33b98ecb63', 'Bitcasino.io', 'bitcasino', 'bitcasino.io', 'Bitcasino.io offers a premium gambling experience with 100% bonus up to 1,500 USDT and exclusive VIP perks.', 'Premium crypto casino with unparalleled VIP benefits', 2014, NULL, 'Curacao eGaming', 'Curacao', NULL, 'LIGHT_KYC', false, true, false, 'https://bitcasino.io/?ref=cryptobookies', NULL, 87, '< 10 mins', '$10', NULL, NULL, true, '{"Premium VIP program","Fast payouts","Great game selection"}', '{"Casino only"}', true, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('27b8ae8b-f2c4-429c-bfd4-2ce9fb9ae791', 'Bety', 'bety', 'bety.com', 'Bety offers 10,000+ games with 280% welcome bonus, 150 free spins, no KYC and fast withdrawals.', 'Fast crypto casino with 280% bonus up to €12,000', 2023, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', false, true, false, 'https://bety.com/?ref=cryptobookies', NULL, 85, 'Instant', '$10', NULL, NULL, true, '{"Huge game library","No KYC","Fast withdrawals"}', '{"No sportsbook"}', false, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('24776c96-fbb9-4211-82f3-033e6f131c47', 'Sportbet.one', 'sportbet-one', 'sportbet.one', 'Sportbet.one is a decentralized betting platform offering 125% bonus up to $1,000 with 10x rollover and instant withdrawals.', 'Decentralized sportsbook with 125% bonus', 2019, NULL, 'Decentralized', 'N/A', NULL, 'NO_KYC', true, true, true, 'https://sportbet.one/?ref=cryptobookies', NULL, 84, 'Instant', '$1', NULL, NULL, true, '{Decentralized,"Low rollover","Instant payouts"}', '{"Smaller game selection"}', false, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('8d17fa85-17a3-48aa-93e3-debfd7fa15da', '7Bit Casino', '7bit', '7bitcasino.com', '7Bit Casino offers a 325% welcome pack up to 5 BTC with 250 free spins, weekly cashback up to 20%, and exclusive tournaments.', 'Award-winning crypto casino with 325% bonus', 2014, NULL, 'Curacao eGaming', 'Curacao', NULL, 'LIGHT_KYC', false, true, false, 'https://7bitcasino.com/?ref=cryptobookies', NULL, 86, '< 10 mins', '$20', NULL, NULL, true, '{"Established since 2014","Great bonuses","Weekly cashback"}', '{"No sportsbook"}', false, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('84b85012-5075-4453-9972-3d1cf6e90f2f', 'Bets.io', 'bets-io', 'bets.io', 'Bets.io offers 250% welcome bonus up to 1 BTC with 250 free spins, featuring 700+ games and no mandatory KYC.', 'Crypto casino with 250% welcome bonus', 2021, NULL, 'Mwali License', 'Mwali', NULL, 'LIGHT_KYC', true, true, false, 'https://bets.io/?ref=cryptobookies', NULL, 83, 'Fast', '$10', NULL, NULL, true, '{"Great welcome bonus","Growing platform","Sports and casino"}', '{"Newer platform"}', false, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('75c1ae47-3507-42e3-a203-4d81ed0c818e', 'Mega Dice', 'megadice', 'megadice.com', 'Mega Dice offers 200% bonus up to 1 BTC with 50 free spins and a sports free bet. Features 24+ language support.', 'Telegram-native crypto casino with 200% bonus', 2023, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, false, 'https://megadice.com/?ref=cryptobookies', NULL, 84, 'Instant', '$20', NULL, NULL, true, '{"Telegram integration","Great bonuses","Anonymous play"}', '{"Newer platform"}', true, '2026-01-27 08:34:40.382118', '2026-01-27 08:34:40.382118');
INSERT INTO public.bookmakers VALUES ('ec6f956b-d29c-488e-86a9-0caa0974791d', 'BC.Game', 'bc-game', 'bc.game', 'BC.Game is a community-focused crypto casino offering provably fair games, generous bonuses, and a unique social experience. With its innovative approach and wide cryptocurrency support, BC.Game has become a favorite among crypto gamblers.', 'Community-driven crypto casino with provably fair games', 2017, NULL, 'Curacao eGaming', 'Curacao', NULL, 'NO_KYC', true, true, false, 'https://bc.game/?ref=cryptobookies', NULL, 88, 'Instant', '$0', NULL, NULL, true, '{"No minimum deposit","Provably fair games","Great community"}', '{"Sports betting is newer","Interface can be overwhelming"}', true, '2026-01-27 11:52:03.172627', '2026-01-27 11:52:03.172627');


--
-- Data for Name: bonuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bonuses VALUES ('fd8c5d38-d82b-40f0-824b-311b7da195ec', 'e550fe24-ab8b-4ba5-a3d4-81bc6abdd3aa', 'DEPOSIT_MATCH', '200% Welcome Bonus up to $2000', 'New players get a massive 200% match on their first deposit, plus 50 free spins', 2000, '40x bonus', '$20', '30 days', NULL, NULL, 'ACTIVE', '2026-01-27 07:13:24.317', true, '2026-01-27 07:13:24.690033', '2026-01-27 07:13:24.690033');
INSERT INTO public.bonuses VALUES ('2a7339de-a33c-44db-9db7-5623f3bf61e0', '50c86efc-e910-43e7-bded-7d055d2bf738', 'DEPOSIT_MATCH', '100% First Deposit Bonus', 'Double your first Bitcoin deposit with Cloudbet''s generous welcome offer', 5000, 'No wagering on sports', '0.001 BTC', NULL, NULL, NULL, 'ACTIVE', '2026-01-27 07:13:24.317', true, '2026-01-27 07:13:24.694707', '2026-01-27 07:13:24.694707');
INSERT INTO public.bonuses VALUES ('da32b872-bd11-4acd-84ef-2d97123fb4ed', 'ad71fd3b-f5cc-4a8b-915d-f0dd55c610f1', 'FREE_BET', '$20 Free Bet', 'Place your first sports bet and get a $20 free bet if it loses', 20, '1x', '$20', NULL, NULL, NULL, 'ACTIVE', '2026-01-27 07:13:24.317', false, '2026-01-27 07:13:24.702623', '2026-01-27 07:13:24.702623');
INSERT INTO public.bonuses VALUES ('6dddf566-e20f-44d3-a292-78f6192e113c', '119bf13d-8de1-4f5f-b816-19939b6b0608', 'CASHBACK', '10% Daily Cashback', 'Get 10% of your losses back every day at Roobet', 500, 'None', '$10', NULL, NULL, NULL, 'ACTIVE', '2026-01-27 07:13:24.317', false, '2026-01-27 07:13:24.705904', '2026-01-27 07:13:24.705904');
INSERT INTO public.bonuses VALUES ('314a52a9-4462-49d3-8b90-3fbe0a5e5d29', '9742657e-18fc-4bec-94db-2d76145b5da0', 'RAKEBACK', '15% Rakeback Forever', 'Earn 15% rakeback on all bets permanently with VIP status', NULL, 'None', '$100 total wagered', NULL, NULL, NULL, 'ACTIVE', '2026-01-27 07:13:24.317', false, '2026-01-27 07:13:24.709169', '2026-01-27 07:13:24.709169');
INSERT INTO public.bonuses VALUES ('b730a66b-c96e-4aa8-a233-ab3358441951', 'ec6f956b-d29c-488e-86a9-0caa0974791d', 'DEPOSIT_MATCH', 'Up to 360% Welcome Package', 'Get up to 360% bonus across your first 4 deposits at BC.Game', 1000, '35x bonus', '$10', NULL, NULL, NULL, 'ACTIVE', '2026-01-27 11:52:23.580441', true, '2026-01-27 11:52:23.580441', '2026-01-27 11:52:23.580441');


--
-- Data for Name: coins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.coins VALUES ('510747aa-317a-43d5-b5de-3e1e990bf7b6', 'Bitcoin', 'BTC', NULL);
INSERT INTO public.coins VALUES ('9c9d054b-5d0f-4bc1-bc57-5af7b430f3f9', 'Ethereum', 'ETH', NULL);
INSERT INTO public.coins VALUES ('ffdd5e49-4001-4623-a514-a4e973cacc9b', 'Tether', 'USDT', NULL);
INSERT INTO public.coins VALUES ('4006a5ea-4767-46c7-a091-998dc78c76fb', 'Litecoin', 'LTC', NULL);
INSERT INTO public.coins VALUES ('a4914b94-fb32-4bef-bfa0-7c01311c2349', 'Dogecoin', 'DOGE', NULL);
INSERT INTO public.coins VALUES ('6f68790c-2aa8-45d8-9562-63394a69626a', 'Bitcoin Cash', 'BCH', NULL);
INSERT INTO public.coins VALUES ('c9ea7d61-b211-4f15-b2c9-ee2ffe828e28', 'Ripple', 'XRP', NULL);
INSERT INTO public.coins VALUES ('f0cc0c98-13b4-4b6d-85dd-0ae85e6f0ffb', 'Cardano', 'ADA', NULL);
INSERT INTO public.coins VALUES ('7eb59cf7-5e61-466c-986c-fbd885f1c419', 'Solana', 'SOL', NULL);
INSERT INTO public.coins VALUES ('9c927c69-94cb-44bd-9570-614875f3e774', 'USDC', 'USDC', NULL);


--
-- Data for Name: bookmaker_coins; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: bookmaker_restricted_regions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: guides; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.guides VALUES ('62e57a55-7bd5-4240-957c-1701c693181e', 'Understanding Wagering Requirements in Crypto Betting', 'wagering-requirements-explained', 'Learn how wagering requirements work and how to find the best value bonuses.', 'Wagering requirements are one of the most important factors when evaluating crypto betting bonuses. This guide explains everything you need to know.

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
3. **Set a budget** - Don''t chase wagering completion with funds you can''t afford
4. **Read the fine print** - Some bonuses have maximum bet limits

## Crypto-Specific Considerations

With crypto bonuses, pay attention to:
- Conversion rates at time of wagering
- Whether winnings are paid in crypto or fiat
- Time limits for completing requirements', 'Bonuses', NULL, NULL, true, '2026-01-27 07:13:24.712007', '2026-01-27 07:13:24.712007');
INSERT INTO public.guides VALUES ('294b0a85-c2cc-47e0-88a5-ffb6cb009b9f', 'No-KYC Crypto Betting: Benefits and Risks', 'no-kyc-betting-guide', 'Is anonymous crypto betting right for you? Understand the trade-offs.', 'No-KYC (Know Your Customer) betting sites allow you to gamble without verifying your identity. Here''s what you need to know.

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
- Keep transaction records', 'Privacy', NULL, NULL, true, '2026-01-27 07:13:24.715653', '2026-01-27 07:13:24.715653');
INSERT INTO public.guides VALUES ('d2f770fb-fd83-4ad2-8106-fb786b8324d7', 'How to Spot Scam Crypto Bookmakers', 'avoiding-crypto-betting-scams', 'Protect yourself from fraudulent betting sites with these warning signs.', 'The crypto betting space unfortunately attracts scammers. Learn how to identify and avoid them.

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
- Monitoring user feedback', 'Safety', NULL, NULL, true, '2026-01-27 07:13:24.718245', '2026-01-27 07:13:24.718245');
INSERT INTO public.guides VALUES ('bec2c6e0-d6b9-40d0-b8f4-9afa153ce229', 'Crypto Withdrawal Times: What to Expect', 'crypto-withdrawal-times', 'How fast should crypto payouts be? We break down what''s normal and what''s not.', 'One major advantage of crypto betting is fast withdrawals. Here''s what you should expect.

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

All sites in our top 10 processed test withdrawals within 1 hour, with most completing in under 15 minutes.', 'Payments', NULL, NULL, true, '2026-01-27 07:13:24.721017', '2026-01-27 07:13:24.721017');
INSERT INTO public.guides VALUES ('c8972ef4-ce60-4c7b-98ca-4ce6f6a80889', 'Understanding Crypto Betting Licenses', 'crypto-gambling-licenses', 'Not all gambling licenses are equal. Learn which jurisdictions offer the best protection.', 'Gambling licenses provide regulatory oversight and player protection. Here''s what to look for.

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
4. There''s a complaints procedure
5. Site follows anti-money laundering rules

## Verifying a License

1. Find the license number on the site
2. Visit the regulator''s website
3. Search their public register
4. Confirm the license is active

## Why Curacao Dominates Crypto

Most crypto casinos use Curacao licenses because:
- More crypto-friendly regulations
- Faster licensing process
- Lower costs
- Less restrictive on markets', 'Safety', NULL, NULL, true, '2026-01-27 07:13:24.723498', '2026-01-27 07:13:24.723498');


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.faqs VALUES ('70e08ee2-15a7-48fd-8927-f0afdb5131cd', 'Is crypto betting legal?', 'Crypto betting legality varies by country. In most jurisdictions, using crypto at licensed gambling sites is legal, but always check your local laws.', 'Legal', NULL, NULL, 0, '2026-01-27 07:13:24.726975');
INSERT INTO public.faqs VALUES ('3766638b-8b3f-4bb9-944c-2c9bdda7eb21', 'Are crypto betting sites safe?', 'Licensed crypto betting sites with established reputations are generally safe. Use our trust scores to find vetted, reliable platforms.', 'Safety', NULL, NULL, 0, '2026-01-27 07:13:24.729511');
INSERT INTO public.faqs VALUES ('1442dac7-fbf2-4a05-a54f-03d023131845', 'How fast are crypto withdrawals?', 'Most crypto withdrawals at reputable sites process instantly or within minutes. Bitcoin may take 10-60 minutes due to network confirmation times.', 'Payments', NULL, NULL, 0, '2026-01-27 07:13:24.731593');
INSERT INTO public.faqs VALUES ('f3e59f89-7369-4dfe-a35e-67696e185eb6', 'What is KYC verification?', 'KYC (Know Your Customer) is identity verification required by some betting sites. It typically involves submitting ID documents and proof of address.', 'Account', NULL, NULL, 0, '2026-01-27 07:13:24.733938');
INSERT INTO public.faqs VALUES ('975da9da-c781-441c-bb34-f999fcb91924', 'Which crypto is best for betting?', 'Bitcoin and USDT are most widely accepted. USDT offers stable value, while Bitcoin is available almost everywhere. Litecoin offers faster transactions.', 'Crypto', NULL, NULL, 0, '2026-01-27 07:13:24.736722');
INSERT INTO public.faqs VALUES ('b6853a46-9ef4-4d23-bf85-b1c5342d4792', 'Is crypto betting legal?', 'Crypto betting legality varies by country. In most jurisdictions, using crypto at licensed gambling sites is legal, but always check your local laws.', 'Legal', NULL, NULL, 0, '2026-01-27 07:14:07.677603');
INSERT INTO public.faqs VALUES ('cd0bec02-2f25-4f0d-a81d-70a6ac976b0c', 'Are crypto betting sites safe?', 'Licensed crypto betting sites with established reputations are generally safe. Use our trust scores to find vetted, reliable platforms.', 'Safety', NULL, NULL, 0, '2026-01-27 07:14:07.680562');
INSERT INTO public.faqs VALUES ('7c9092bf-a484-43c7-a2bd-5e970ce78a0f', 'How fast are crypto withdrawals?', 'Most crypto withdrawals at reputable sites process instantly or within minutes. Bitcoin may take 10-60 minutes due to network confirmation times.', 'Payments', NULL, NULL, 0, '2026-01-27 07:14:07.683648');
INSERT INTO public.faqs VALUES ('7b4cee98-fdae-44ae-b64e-92611615de9d', 'What is KYC verification?', 'KYC (Know Your Customer) is identity verification required by some betting sites. It typically involves submitting ID documents and proof of address.', 'Account', NULL, NULL, 0, '2026-01-27 07:14:07.68642');
INSERT INTO public.faqs VALUES ('1e36fab6-fdbf-4bef-ba91-a65df6dc7879', 'Which crypto is best for betting?', 'Bitcoin and USDT are most widely accepted. USDT offers stable value, while Bitcoin is available almost everywhere. Litecoin offers faster transactions.', 'Crypto', NULL, NULL, 0, '2026-01-27 07:14:07.689644');


--
-- Data for Name: seo_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sessions VALUES ('0-UMcRs1-2IUfOlipFUzCbHeYYmG_YVQ', '{"cookie": {"path": "/", "secure": true, "expires": "2026-02-03T09:07:01.528Z", "httpOnly": true, "originalMaxAge": 604800000}, "adminUserId": "6ffd2dd1-1224-4cf6-bd47-da7c53fec623", "adminUsername": "myadmin"}', '2026-02-03 09:07:02');
INSERT INTO public.sessions VALUES ('OC3s29yUUoBqRBMhPzq9f1hgupChPWRc', '{"cookie": {"path": "/", "secure": true, "expires": "2026-02-03T09:08:58.042Z", "httpOnly": true, "originalMaxAge": 604800000}, "adminUserId": "4bdc4b35-80e8-4c5d-9688-55726c3301ef", "adminUsername": "newadmin"}', '2026-02-03 09:13:59');
INSERT INTO public.sessions VALUES ('0LxcowiISyqIlgg52A9bEz4pbI8uNY3t', '{"cookie": {"path": "/", "secure": true, "expires": "2026-02-03T11:28:36.358Z", "httpOnly": true, "originalMaxAge": 604800000}, "adminUserId": "a76df2a9-f260-4f40-8755-e38ba3333d16", "adminUsername": "johanooo"}', '2026-02-03 12:33:21');
INSERT INTO public.sessions VALUES ('pxc5Y6zZ0WcXlro8bcmjfmxN3EiIeOp7', '{"cookie": {"path": "/", "secure": true, "expires": "2026-02-03T09:50:37.012Z", "httpOnly": true, "originalMaxAge": 604800000}, "adminUserId": "a76df2a9-f260-4f40-8755-e38ba3333d16", "adminUsername": "johanooo"}', '2026-02-03 09:52:46');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- PostgreSQL database dump complete
--

\unrestrict c0rtwB7u3i0AgCgYs49jEzLlB3SfjMkQNknSL8RTPRsOwexjD1sNvBjGfBXUPvo

