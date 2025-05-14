--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ModerationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ModerationStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."ModerationStatus" OWNER TO postgres;

--
-- Name: QuestionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."QuestionType" AS ENUM (
    'SINGLE_CHOICE',
    'MULTIPLE_CHOICE',
    'TEXT_INPUT',
    'MATCHING',
    'FILL_IN_THE_BLANK',
    'SEQUENCE'
);


ALTER TYPE public."QuestionType" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: TestAttemptStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TestAttemptStatus" AS ENUM (
    'EXPIRED',
    'IN_PROGRESS',
    'COMPLETED'
);


ALTER TYPE public."TestAttemptStatus" OWNER TO postgres;

--
-- Name: TestVisibilityStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TestVisibilityStatus" AS ENUM (
    'HIDDEN',
    'PUBLISHED'
);


ALTER TYPE public."TestVisibilityStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: answer_snapshots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answer_snapshots (
    id text NOT NULL,
    "questionId" text NOT NULL,
    "originalTestId" text NOT NULL,
    text character varying(500) NOT NULL,
    "isCorrect" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.answer_snapshots OWNER TO postgres;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id text NOT NULL,
    "questionId" text NOT NULL,
    text character varying(500) NOT NULL,
    "isCorrect" boolean DEFAULT false NOT NULL,
    "isGenerated" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: question_snapshots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_snapshots (
    id text NOT NULL,
    "testSnapshotId" text NOT NULL,
    "originalTestId" text NOT NULL,
    text character varying(1000) NOT NULL,
    "order" integer NOT NULL,
    type public."QuestionType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.question_snapshots OWNER TO postgres;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id text NOT NULL,
    "testId" text NOT NULL,
    text character varying(1000) NOT NULL,
    "order" integer NOT NULL,
    type public."QuestionType" DEFAULT 'SINGLE_CHOICE'::public."QuestionType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: test_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_attempts (
    id text NOT NULL,
    "testId" text NOT NULL,
    "userId" text,
    "preTestUserData" jsonb,
    score double precision,
    "startedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "completedAt" timestamp(3) without time zone,
    status public."TestAttemptStatus" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "testSnapshotId" text,
    "expirationTime" timestamp(3) without time zone,
    "timeSpent" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.test_attempts OWNER TO postgres;

--
-- Name: test_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_settings (
    id text NOT NULL,
    "testId" text NOT NULL,
    "requireRegistration" boolean DEFAULT false NOT NULL,
    "inputFields" jsonb,
    "showDetailedResults" boolean DEFAULT false NOT NULL,
    "timeLimit" integer DEFAULT 0,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "shuffleAnswers" boolean DEFAULT true NOT NULL,
    "shuffleQuestions" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.test_settings OWNER TO postgres;

--
-- Name: test_settings_snapshots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_settings_snapshots (
    id text NOT NULL,
    "testSnapshotId" text NOT NULL,
    "requireRegistration" boolean DEFAULT false NOT NULL,
    "inputFields" jsonb,
    "showDetailedResults" boolean DEFAULT false NOT NULL,
    "shuffleQuestions" boolean DEFAULT false NOT NULL,
    "shuffleAnswers" boolean DEFAULT true NOT NULL,
    "timeLimit" integer DEFAULT 0,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.test_settings_snapshots OWNER TO postgres;

--
-- Name: test_snapshots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_snapshots (
    id text NOT NULL,
    "testId" text NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(500),
    "moderationStatus" public."ModerationStatus" NOT NULL,
    "visibilityStatus" public."TestVisibilityStatus" DEFAULT 'PUBLISHED'::public."TestVisibilityStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    version integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.test_snapshots OWNER TO postgres;

--
-- Name: tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tests (
    id text NOT NULL,
    "authorId" text NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(500),
    "moderationStatus" public."ModerationStatus" DEFAULT 'PENDING'::public."ModerationStatus" NOT NULL,
    "visibilityStatus" public."TestVisibilityStatus" DEFAULT 'PUBLISHED'::public."TestVisibilityStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    version integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.tests OWNER TO postgres;

--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id text NOT NULL,
    "userId" text NOT NULL,
    "refreshToken" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: user_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_answers (
    id text NOT NULL,
    "attemptId" text NOT NULL,
    "questionId" text NOT NULL,
    "answerId" text NOT NULL,
    "answeredAt" timestamp(3) without time zone,
    "timeSpent" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_answers OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(50),
    surname character varying(50),
    patronymic character varying(50),
    password character(60) NOT NULL,
    "isActivated" boolean DEFAULT false NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "activationLink" character varying(255),
    "resetCode" character varying(255),
    "isBlocked" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "activationLinkExp" timestamp(3) without time zone,
    "resetCodeExp" timestamp(3) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: answer_snapshots answer_snapshots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_snapshots
    ADD CONSTRAINT answer_snapshots_pkey PRIMARY KEY (id);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: question_snapshots question_snapshots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_snapshots
    ADD CONSTRAINT question_snapshots_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: test_attempts test_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_pkey PRIMARY KEY (id);


--
-- Name: test_settings test_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_settings
    ADD CONSTRAINT test_settings_pkey PRIMARY KEY (id);


--
-- Name: test_settings_snapshots test_settings_snapshots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_settings_snapshots
    ADD CONSTRAINT test_settings_snapshots_pkey PRIMARY KEY (id);


--
-- Name: test_snapshots test_snapshots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_snapshots
    ADD CONSTRAINT test_snapshots_pkey PRIMARY KEY (id);


--
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: user_answers user_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT user_answers_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: test_settings_snapshots_testSnapshotId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "test_settings_snapshots_testSnapshotId_key" ON public.test_settings_snapshots USING btree ("testSnapshotId");


--
-- Name: test_settings_testId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "test_settings_testId_key" ON public.test_settings USING btree ("testId");


--
-- Name: tokens_refreshToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "tokens_refreshToken_key" ON public.tokens USING btree ("refreshToken");


--
-- Name: tokens_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "tokens_userId_key" ON public.tokens USING btree ("userId");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: answer_snapshots answer_snapshots_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_snapshots
    ADD CONSTRAINT "answer_snapshots_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public.question_snapshots(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: answers answers_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public.questions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: question_snapshots question_snapshots_testSnapshotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_snapshots
    ADD CONSTRAINT "question_snapshots_testSnapshotId_fkey" FOREIGN KEY ("testSnapshotId") REFERENCES public.test_snapshots(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: questions questions_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "questions_testId_fkey" FOREIGN KEY ("testId") REFERENCES public.tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: test_attempts test_attempts_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT "test_attempts_testId_fkey" FOREIGN KEY ("testId") REFERENCES public.tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: test_attempts test_attempts_testSnapshotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT "test_attempts_testSnapshotId_fkey" FOREIGN KEY ("testSnapshotId") REFERENCES public.test_snapshots(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: test_attempts test_attempts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT "test_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: test_settings_snapshots test_settings_snapshots_testSnapshotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_settings_snapshots
    ADD CONSTRAINT "test_settings_snapshots_testSnapshotId_fkey" FOREIGN KEY ("testSnapshotId") REFERENCES public.test_snapshots(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: test_settings test_settings_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_settings
    ADD CONSTRAINT "test_settings_testId_fkey" FOREIGN KEY ("testId") REFERENCES public.tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: test_snapshots test_snapshots_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_snapshots
    ADD CONSTRAINT "test_snapshots_testId_fkey" FOREIGN KEY ("testId") REFERENCES public.tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tests tests_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT "tests_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tokens tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_answers user_answers_answerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT "user_answers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES public.answers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_answers user_answers_attemptId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT "user_answers_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES public.test_attempts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_answers user_answers_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT "user_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public.questions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

