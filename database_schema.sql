--
-- PostgreSQL database dump
--

\restrict y3HdtCyVeeoKv3KDOOufGlA4rQuT1ocbxQD8a9HyjfEfORwQZWqqfx5WfL6VYGz

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
-- Name: bonus_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.bonus_status AS ENUM (
    'ACTIVE',
    'EXPIRED',
    'UNVERIFIED'
);


ALTER TYPE public.bonus_status OWNER TO postgres;

--
-- Name: bonus_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.bonus_type AS ENUM (
    'DEPOSIT_MATCH',
    'FREE_BET',
    'CASHBACK',
    'RAKEBACK',
    'OTHER'
);


ALTER TYPE public.bonus_type OWNER TO postgres;

--
-- Name: kyc_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.kyc_level AS ENUM (
    'NO_KYC',
    'LIGHT_KYC',
    'FULL_KYC',
    'UNKNOWN'
);


ALTER TYPE public.kyc_level OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    password_hash text NOT NULL,
    email text,
    role text DEFAULT 'admin'::text,
    created_at timestamp without time zone DEFAULT now(),
    last_login_at timestamp without time zone
);


ALTER TABLE public.admin_users OWNER TO postgres;

--
-- Name: bonuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bonuses (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    bookmaker_id character varying NOT NULL,
    type public.bonus_type DEFAULT 'OTHER'::public.bonus_type,
    headline text NOT NULL,
    description text,
    max_value_usd integer,
    wagering_requirement_text text,
    min_deposit_text text,
    expiry_text text,
    promo_code text,
    source_url text,
    status public.bonus_status DEFAULT 'UNVERIFIED'::public.bonus_status,
    last_verified_at timestamp without time zone,
    featured boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.bonuses OWNER TO postgres;

--
-- Name: bookmaker_coins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookmaker_coins (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    bookmaker_id character varying NOT NULL,
    coin_id character varying NOT NULL
);


ALTER TABLE public.bookmaker_coins OWNER TO postgres;

--
-- Name: bookmaker_restricted_regions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookmaker_restricted_regions (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    bookmaker_id character varying NOT NULL,
    region_id character varying NOT NULL
);


ALTER TABLE public.bookmaker_restricted_regions OWNER TO postgres;

--
-- Name: bookmakers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookmakers (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    domain text,
    description text,
    short_description text,
    founded_year integer,
    logo_path text,
    license_name text,
    license_jurisdiction text,
    license_url text,
    kyc_level public.kyc_level DEFAULT 'UNKNOWN'::public.kyc_level,
    sportsbook boolean DEFAULT false,
    casino boolean DEFAULT false,
    esports boolean DEFAULT false,
    affiliate_url text,
    ref_code text,
    trust_score_override real,
    payout_speed text,
    min_deposit text,
    max_payout text,
    support_email text,
    support_live_chat boolean DEFAULT false,
    pros text[],
    cons text[],
    featured boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.bookmakers OWNER TO postgres;

--
-- Name: coins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coins (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    symbol text NOT NULL,
    icon_url text
);


ALTER TABLE public.coins OWNER TO postgres;

--
-- Name: faqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    category text,
    bookmaker_id character varying,
    guide_id character varying,
    sort_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.faqs OWNER TO postgres;

--
-- Name: guides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guides (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text,
    content text NOT NULL,
    category text,
    meta_title text,
    meta_description text,
    published boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.guides OWNER TO postgres;

--
-- Name: regions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.regions (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    code text NOT NULL
);


ALTER TABLE public.regions OWNER TO postgres;

--
-- Name: seo_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seo_metadata (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    page_path text NOT NULL,
    title text,
    description text,
    og_image text,
    no_index boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.seo_metadata OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    profile_image_url character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_unique UNIQUE (username);


--
-- Name: bonuses bonuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bonuses
    ADD CONSTRAINT bonuses_pkey PRIMARY KEY (id);


--
-- Name: bookmaker_coins bookmaker_coins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmaker_coins
    ADD CONSTRAINT bookmaker_coins_pkey PRIMARY KEY (id);


--
-- Name: bookmaker_restricted_regions bookmaker_restricted_regions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmaker_restricted_regions
    ADD CONSTRAINT bookmaker_restricted_regions_pkey PRIMARY KEY (id);


--
-- Name: bookmakers bookmakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmakers
    ADD CONSTRAINT bookmakers_pkey PRIMARY KEY (id);


--
-- Name: bookmakers bookmakers_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmakers
    ADD CONSTRAINT bookmakers_slug_unique UNIQUE (slug);


--
-- Name: coins coins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_pkey PRIMARY KEY (id);


--
-- Name: coins coins_symbol_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_symbol_unique UNIQUE (symbol);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: guides guides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_pkey PRIMARY KEY (id);


--
-- Name: guides guides_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guides
    ADD CONSTRAINT guides_slug_unique UNIQUE (slug);


--
-- Name: regions regions_code_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_code_unique UNIQUE (code);


--
-- Name: regions regions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey PRIMARY KEY (id);


--
-- Name: seo_metadata seo_metadata_page_path_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seo_metadata
    ADD CONSTRAINT seo_metadata_page_path_unique UNIQUE (page_path);


--
-- Name: seo_metadata seo_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seo_metadata
    ADD CONSTRAINT seo_metadata_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- Name: bonus_bookmaker_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bonus_bookmaker_idx ON public.bonuses USING btree (bookmaker_id);


--
-- Name: bonus_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bonus_status_idx ON public.bonuses USING btree (status);


--
-- Name: bookmaker_featured_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bookmaker_featured_idx ON public.bookmakers USING btree (featured);


--
-- Name: bookmaker_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bookmaker_slug_idx ON public.bookmakers USING btree (slug);


--
-- Name: guide_published_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX guide_published_idx ON public.guides USING btree (published);


--
-- Name: guide_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX guide_slug_idx ON public.guides USING btree (slug);


--
-- Name: bonuses bonuses_bookmaker_id_bookmakers_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bonuses
    ADD CONSTRAINT bonuses_bookmaker_id_bookmakers_id_fk FOREIGN KEY (bookmaker_id) REFERENCES public.bookmakers(id) ON DELETE CASCADE;


--
-- Name: bookmaker_coins bookmaker_coins_bookmaker_id_bookmakers_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmaker_coins
    ADD CONSTRAINT bookmaker_coins_bookmaker_id_bookmakers_id_fk FOREIGN KEY (bookmaker_id) REFERENCES public.bookmakers(id) ON DELETE CASCADE;


--
-- Name: bookmaker_coins bookmaker_coins_coin_id_coins_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmaker_coins
    ADD CONSTRAINT bookmaker_coins_coin_id_coins_id_fk FOREIGN KEY (coin_id) REFERENCES public.coins(id) ON DELETE CASCADE;


--
-- Name: bookmaker_restricted_regions bookmaker_restricted_regions_bookmaker_id_bookmakers_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmaker_restricted_regions
    ADD CONSTRAINT bookmaker_restricted_regions_bookmaker_id_bookmakers_id_fk FOREIGN KEY (bookmaker_id) REFERENCES public.bookmakers(id) ON DELETE CASCADE;


--
-- Name: bookmaker_restricted_regions bookmaker_restricted_regions_region_id_regions_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmaker_restricted_regions
    ADD CONSTRAINT bookmaker_restricted_regions_region_id_regions_id_fk FOREIGN KEY (region_id) REFERENCES public.regions(id) ON DELETE CASCADE;


--
-- Name: faqs faqs_bookmaker_id_bookmakers_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_bookmaker_id_bookmakers_id_fk FOREIGN KEY (bookmaker_id) REFERENCES public.bookmakers(id) ON DELETE CASCADE;


--
-- Name: faqs faqs_guide_id_guides_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_guide_id_guides_id_fk FOREIGN KEY (guide_id) REFERENCES public.guides(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict y3HdtCyVeeoKv3KDOOufGlA4rQuT1ocbxQD8a9HyjfEfORwQZWqqfx5WfL6VYGz

