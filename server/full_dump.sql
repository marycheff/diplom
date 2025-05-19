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
    text character varying(255) NOT NULL,
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
    text character varying(255) NOT NULL,
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
    text character varying(500) NOT NULL,
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
    text character varying(500) NOT NULL,
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
    "shuffleQuestions" boolean DEFAULT false NOT NULL,
    "allowRetake" boolean DEFAULT true NOT NULL
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
    "moderationStatus" public."ModerationStatus" DEFAULT 'APPROVED'::public."ModerationStatus" NOT NULL,
    "visibilityStatus" public."TestVisibilityStatus" DEFAULT 'PUBLISHED'::public."TestVisibilityStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "moderatedAt" timestamp(3) without time zone,
    "moderatedBy" text
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
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "textAnswer" character varying(255),
    "isCorrect" boolean
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
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e94ed8d0-5606-4811-a5c2-c7b4575b0319	61964e931bb3347c965fb79c8bafc6892783f670920fc2fd7b9fdb9302e4d047	2025-05-13 18:40:17.115892+04	20250512193232_test	\N	\N	2025-05-13 18:40:17.083928+04	1
763e169f-cce6-49d3-a65c-980982cf10d2	843bfe79b3e3537a9417ed0606f538177b2dfba2d865cbaf964695be54664122	2025-05-13 18:40:17.117133+04	20250513113923_time_spent_at_attempt	\N	\N	2025-05-13 18:40:17.11615+04	1
1d53230f-c930-492d-8ec3-680f28a4351e	6378c3b6f412e356ddba57440e0317170d7d267772a85375597f81004b0e38f2	2025-05-13 18:40:17.118316+04	20250513142741_delete_total_attempts_from_test_schema	\N	\N	2025-05-13 18:40:17.117387+04	1
b0243a6a-bf50-41a8-8fa0-6e1175d65080	4bc5c5b283a11b90db89fb7e09b669c99303cb35ce180d88700cbe6826dd9c1a	2025-05-14 16:42:50.627434+04	20250514124138_rename_status_to_moderation_status	\N	\N	2025-05-14 16:42:50.624946+04	1
689eaecf-ec62-42da-84f0-01cd349ce46c	f1f1b818b8cc888694caccbfa2e2a328feaaa1074e87a0d673669beeff50999b	2025-05-14 22:05:58.995309+04	20250514180558_add_moderated_at	\N	\N	2025-05-14 22:05:58.991294+04	1
ca6f910f-8fa0-491b-8348-f6b5013c05d3	2b758cfd9086dc41ac9c536526a3ce57714dcb7a06d0413315f4fdac92ee7f43	2025-05-14 22:18:25.920891+04	20250514181825_default_moderation_status_approved	\N	\N	2025-05-14 22:18:25.91546+04	1
8e50f67c-d23c-457e-9a81-4da4b8737256	9eadc6050ba1b4318007fb45dabac7d12d9ffe6f4e5763929d204b5fdb2034ac	2025-05-15 13:47:16.58859+04	20250515094716_add_text_answer_in_user_answer	\N	\N	2025-05-15 13:47:16.586009+04	1
135d37cf-2177-4ac7-a648-9fbefd83df23	2c446ce80da753652aa35e2a28a60584829dbbe8a9e0b7c5fa3a28843309d377	2025-05-15 15:01:33.989675+04	20250515110133_add_is_correct_in_user_answer	\N	\N	2025-05-15 15:01:33.987323+04	1
0d43cfee-b47e-444c-a8ba-e95cb7be5d2f	835cf5f9370c37751d9ae1a7f40f5cc2bf9988124f12db9d1e0aaccec64750d7	2025-05-16 23:41:56.026927+04	20250516194155_change_varchrs_max_values	\N	\N	2025-05-16 23:41:55.995258+04	1
f2048be2-bf0e-40fd-8842-495548796897	8e428fc12f6fcd8ed72c4a6791970887e8959351f936c58ab0214a73bdb1eb05	2025-05-18 10:33:24.493891+04	20250518063324_add_allow_retake_to_test_settings	\N	\N	2025-05-18 10:33:24.488014+04	1
\.


--
-- Data for Name: answer_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answer_snapshots (id, "questionId", "originalTestId", text, "isCorrect", "createdAt") FROM stdin;
c193c01d-f74d-483f-96b1-4fdc4da34105	b3d87169-7c1f-440e-8b25-793225575931	da1ea0b1-892b-4b75-aa50-3bfa68b63041	Пекин	t	2025-04-18 08:35:59.399
86bc0605-63f9-4ffc-b4ab-69999d55d0a9	b3d87169-7c1f-440e-8b25-793225575931	446c0cee-7459-4c97-96fa-65079e6a041a	Москва	f	2025-04-18 08:35:59.399
1f09e71b-59cf-4056-81bb-d47e0d1a4968	b3d87169-7c1f-440e-8b25-793225575931	d0385325-9536-43a3-b461-fac4a3a109e7	Токио	f	2025-04-18 08:35:59.399
a7bb3af0-407d-47b0-8e0c-f24ba95bdde4	4927387b-643e-4119-85f9-579283d28bb9	7626af39-b4ef-4b17-b0d4-2fce2cc17357	10	t	2025-04-18 08:35:59.399
2b617a30-4932-44cd-8042-4f0290d93acb	4927387b-643e-4119-85f9-579283d28bb9	96ea719b-2bfb-45c8-8d24-5056a0bd280b	12	f	2025-04-18 08:35:59.399
b51cf35c-7c78-464a-bc12-4f10be00edc9	4927387b-643e-4119-85f9-579283d28bb9	a9e0d2f8-7d17-4508-81d4-6d5645435a61	22	f	2025-04-18 08:35:59.399
44969455-c44d-4c76-af20-14f0fe1e5a62	4927387b-643e-4119-85f9-579283d28bb9	73a0905d-6153-4ed9-9292-e8acbe014a49	24	f	2025-04-18 08:35:59.399
445a15ef-8ede-4c05-b6ae-220d11bd5079	4927387b-643e-4119-85f9-579283d28bb9	a7c89613-a34f-4b58-a7ee-d746a94d6f57	не знаю	t	2025-04-18 08:35:59.399
0ac40627-b8a4-443e-92c1-4987177513ad	8d31db29-7007-498f-ab0e-a9dc8a3e1c41	da1ea0b1-892b-4b75-aa50-3bfa68b63041	Пекин	t	2025-04-18 08:36:56.929
3ed3efc3-49b7-4396-b7d5-ee722af5021b	8d31db29-7007-498f-ab0e-a9dc8a3e1c41	446c0cee-7459-4c97-96fa-65079e6a041a	Москва	f	2025-04-18 08:36:56.929
7df85801-57e6-42fd-9636-372222a956b7	8d31db29-7007-498f-ab0e-a9dc8a3e1c41	d0385325-9536-43a3-b461-fac4a3a109e7	Токио	f	2025-04-18 08:36:56.929
f39dfab5-26a0-4ce7-a4b3-01ab4c7b4b6c	1be8dbe3-1c79-4f7b-bec9-f1d6a2d46374	7626af39-b4ef-4b17-b0d4-2fce2cc17357	10	t	2025-04-18 08:36:56.93
99993144-020f-4fe8-9b96-bb7fffe91452	1be8dbe3-1c79-4f7b-bec9-f1d6a2d46374	96ea719b-2bfb-45c8-8d24-5056a0bd280b	12	f	2025-04-18 08:36:56.93
02fe908d-b15f-4179-82df-299582b7a524	1be8dbe3-1c79-4f7b-bec9-f1d6a2d46374	a9e0d2f8-7d17-4508-81d4-6d5645435a61	22	f	2025-04-18 08:36:56.93
c62825a8-4590-4cd5-9920-e788432b99e9	1be8dbe3-1c79-4f7b-bec9-f1d6a2d46374	73a0905d-6153-4ed9-9292-e8acbe014a49	24	f	2025-04-18 08:36:56.93
96db2e78-f50a-43f9-8010-ea86cdfe9f33	1be8dbe3-1c79-4f7b-bec9-f1d6a2d46374	a7c89613-a34f-4b58-a7ee-d746a94d6f57	не знаю	t	2025-04-18 08:36:56.93
8f5ee24f-5887-4d10-9f57-8c75900e26cd	d1ab89af-aaab-4ae2-9e26-a4c89619ae94	35a7a99f-9182-49b2-8242-008e23b69c45	Амазонка	t	2025-05-03 18:39:02.567
e50e9403-c92b-4ed7-a1e0-41354ee4a5ed	d1ab89af-aaab-4ae2-9e26-a4c89619ae94	44b2c51b-4a71-4dba-bbc6-f606947832fe	Нил	f	2025-05-03 18:39:02.567
cd5bfd10-f67d-4ecd-839a-bb1b936d4131	d1ab89af-aaab-4ae2-9e26-a4c89619ae94	61ea8f15-e5ec-41ef-9039-1681efd4cd19	Янцзы	f	2025-05-03 18:39:02.567
51c2abac-2dd2-4683-8b68-941471815f35	97cdfc16-c99d-4369-8970-1c9c551d06c9	774703ce-97c9-4292-8e69-8cc38bf64aff	Водород	t	2025-05-03 18:39:02.569
cada6d2f-f496-4a06-a5ee-fae2db24850b	97cdfc16-c99d-4369-8970-1c9c551d06c9	be355be7-3bca-4a69-aa48-4e071da13734	Гелий	f	2025-05-03 18:39:02.569
e3b275f2-5222-44f1-a5cc-ab6aee1b9ca1	97cdfc16-c99d-4369-8970-1c9c551d06c9	ce0c5bd5-8ef4-4260-b660-ff754896f479	Литий	f	2025-05-03 18:39:02.569
aedd5d8b-eaf5-491a-a185-05bfb32cc036	7d18a008-b894-4c11-87e7-f4bf0b830e4e	f02a786c-23cb-4818-beec-b86391dd8061	753 до н.э.	t	2025-05-03 18:39:02.57
97a5e151-69d3-44ea-ae19-4b97b6cf8125	7d18a008-b894-4c11-87e7-f4bf0b830e4e	680a73aa-9643-4bf3-b56d-3214662e5193	476 н.э.	f	2025-05-03 18:39:02.57
183960cd-9bdc-4093-8bf8-43fa7fb418ec	7d18a008-b894-4c11-87e7-f4bf0b830e4e	7d73ba99-0e7c-4dd9-b144-5188e78c5c4e	1000 н.э.	f	2025-05-03 18:39:02.57
f4f1ea68-8e51-43b3-8ccf-d093a25674e8	f1ff2cde-5ec8-42c3-b973-6adda0b2630f	1e3ac945-02ea-477e-a4ee-29df57248a7c	Тихий океан	t	2025-05-03 18:39:02.571
56c6d52e-c13a-4094-b37e-f86c6863c487	087dfaf9-9e2b-494f-b9ec-5bd73e5b733d	da1ea0b1-892b-4b75-aa50-3bfa68b63041	Пекин	t	2025-04-18 08:39:17.977
4e249713-c2e0-4aa0-9f2a-80f979d9eebc	087dfaf9-9e2b-494f-b9ec-5bd73e5b733d	446c0cee-7459-4c97-96fa-65079e6a041a	Москва	f	2025-04-18 08:39:17.977
f4fb7a13-71fc-4e9a-8ea1-c7d4e3b7ca85	087dfaf9-9e2b-494f-b9ec-5bd73e5b733d	d0385325-9536-43a3-b461-fac4a3a109e7	Токио	f	2025-04-18 08:39:17.977
9d6632ea-1027-4648-8365-e32a7d3c3dec	d48fc59e-ded3-4074-83f5-4432df7a4c09	7626af39-b4ef-4b17-b0d4-2fce2cc17357	10	t	2025-04-18 08:39:17.978
7c3eab5b-68f4-4fd2-8f7a-dfd6ae181dc8	d48fc59e-ded3-4074-83f5-4432df7a4c09	96ea719b-2bfb-45c8-8d24-5056a0bd280b	12	f	2025-04-18 08:39:17.978
d3790abe-4d49-4cda-b253-355da22a1f2a	d48fc59e-ded3-4074-83f5-4432df7a4c09	a9e0d2f8-7d17-4508-81d4-6d5645435a61	22	f	2025-04-18 08:39:17.978
530e0962-926d-43d8-87e9-904290b5b0b8	d48fc59e-ded3-4074-83f5-4432df7a4c09	73a0905d-6153-4ed9-9292-e8acbe014a49	24	f	2025-04-18 08:39:17.978
722b57b2-2d3c-4b58-b5dc-0eab04b207da	d48fc59e-ded3-4074-83f5-4432df7a4c09	a7c89613-a34f-4b58-a7ee-d746a94d6f57	не знаю	t	2025-04-18 08:39:17.978
5a9d414a-a056-4ee1-9e8d-b703c855c0b5	2343764c-08a2-4eab-9dde-26e9c8b88f13	c9c858e6-b349-40a7-87ad-23688c967ae8	Пекин	t	2025-04-21 12:04:39.771
c26bf123-7e5d-4c3f-b444-86667b7c39a0	2343764c-08a2-4eab-9dde-26e9c8b88f13	85217cad-64aa-41df-8fe5-a0de46694d8e	Москва	f	2025-04-21 12:04:39.771
2c317df2-acf6-4799-90f5-8fa676c716ea	2343764c-08a2-4eab-9dde-26e9c8b88f13	38a24928-f53e-4bb7-85a1-8a7f484314ee	Лондон	f	2025-04-21 12:04:39.771
8ebbe35a-13e9-4b51-9ea5-784ee5ec4dbd	4a346496-7fbe-4bbd-923d-fa29b632a244	52421d83-3cbe-4375-8c61-38ae5ca2b94b	Трамп	t	2025-04-21 12:04:39.774
40d54f64-4b54-4fdd-8020-3af3f6096482	4a346496-7fbe-4bbd-923d-fa29b632a244	8470ef2b-9ef3-4822-9b1c-2b860233930a	Путин	f	2025-04-21 12:04:39.774
a5c89613-07b3-47ae-b9a3-13a55296f51c	4a346496-7fbe-4bbd-923d-fa29b632a244	63e043df-275e-4ba1-b355-0c94d9035b38	Обама	t	2025-04-21 12:04:39.774
be091709-6037-459a-98b5-cf7081f23536	4d7e2fd5-88e5-479f-82a4-8c9bf8f31427	324c3461-ca25-4950-96ac-75dbbdf76fec	Испарение	t	2025-04-18 08:18:50.462
c0550992-e691-493a-af4e-190c77f0a341	4d7e2fd5-88e5-479f-82a4-8c9bf8f31427	c5972d97-d15a-4ee0-98e7-d3eb73f57cc9	Конденсация	f	2025-04-18 08:18:50.462
eaac11cc-d55e-4f94-aaf1-513e3e442fc5	ecd11c06-79a2-4378-acc5-991f26c772e1	1ad45e03-76b9-4caf-9844-345e97c55e6c	Альберт Эйнштейн	t	2025-04-18 08:18:50.463
e2925e77-809a-49b5-b749-ee59622a6953	a8896a95-6d69-4b54-a431-d047d7cc0df2	6a04b240-fea0-4a57-81ef-a7a0e6e60689	Эверест	t	2025-04-18 08:18:50.464
76f5ff66-e0d3-4192-9c97-98a15e0dd058	a8896a95-6d69-4b54-a431-d047d7cc0df2	b6897461-f227-46da-bb7a-44db0c8f8afc	Килиманджаро	f	2025-04-18 08:18:50.464
c2c6aa9c-fa18-4e4d-bea7-4efe779d32c2	a8896a95-6d69-4b54-a431-d047d7cc0df2	0633bd62-0917-4a84-b2d6-49dcbcc0a579	Монблан	f	2025-04-18 08:18:50.464
c3b5c9f7-06b3-4203-820e-d43538033b73	2ae08fea-eef1-45e1-8df1-7130f6782f27	5f5931d2-7ebd-4707-a4fc-96435369dd2f	Python	t	2025-04-18 08:18:50.464
471a055a-2ff4-4dea-8d3e-840a29065bc9	465499dd-024d-4094-b5c7-227304619867	4d890df2-ea36-45c4-8d5a-5e1adcabb1e0	Токио	t	2025-04-18 08:18:50.465
57085893-9dde-41d2-af06-9cea168ca15e	465499dd-024d-4094-b5c7-227304619867	6075380d-77dd-4940-8028-d31d8f22338a	Киото	f	2025-04-18 08:18:50.465
d9568263-2e7e-4bf2-b5a5-e58b3b5ed083	465499dd-024d-4094-b5c7-227304619867	275000c7-a7bc-428a-a286-1782c6289dbe	Осака	f	2025-04-18 08:18:50.465
d965d32c-c4fd-4104-9f63-91709badb59b	a496456b-4dff-4fd5-a1bf-496fefd14ebd	9187393d-d79f-427e-ac1f-7be5dd563cff	1939	t	2025-04-18 08:18:50.466
d5f4995b-faaa-46c3-b898-f8a2f6e9d46c	ae61a3c7-4aba-4ee0-bfbe-206be323c2cd	42c8f768-e2b4-4bd0-a10d-c12a42a890c8	Сахара	t	2025-04-18 08:18:50.467
37d23506-d38f-4b32-bae5-49f1872abbf9	ae61a3c7-4aba-4ee0-bfbe-206be323c2cd	6bd9e6d9-4976-46f3-85d5-dbd96996c24d	Гоби	f	2025-04-18 08:18:50.467
89ba7128-07f6-4e04-a3f0-9058e54f23c8	ae61a3c7-4aba-4ee0-bfbe-206be323c2cd	7cdc7e57-deac-41c5-9b0e-1c598db3f8c8	Антарктида	f	2025-04-18 08:18:50.467
e11e4710-0faf-4f0d-887b-2aa7348a984c	dd884df7-a6da-40f9-8b17-9e348633c5d9	10dc9564-0de8-40c3-946c-8382e2266078	Уильям Шекспир	t	2025-04-18 08:18:50.467
beda44ae-c7fa-437c-a1ef-72006a58e8c8	067482d8-ed7c-4b21-9b27-9c3c5f16965b	2a8c922d-808b-4016-bc91-cb3fe72e63fd	Железо	t	2025-04-18 08:18:50.468
6d1ab269-14fb-4c3e-810e-bd9efdd547b3	6ab05c3c-3fa6-45bd-a1c3-524f5674cb81	fce8534b-a2fd-4911-85d8-60ed65cf0029	Преобразование света в энергию	t	2025-04-18 08:18:50.469
6fa0d601-dfb9-4619-9282-45818303b486	6ab05c3c-3fa6-45bd-a1c3-524f5674cb81	a9841452-0ccf-414b-a64f-eded092af075	Дыхание	f	2025-04-18 08:18:50.469
7fa4de20-e456-4230-93ab-0e1413d43faa	6ab05c3c-3fa6-45bd-a1c3-524f5674cb81	a6e8bdab-92fe-443c-9099-b246bec45fcf	Испарение	f	2025-04-18 08:18:50.469
c0e61179-19f2-4266-a519-6d6bd7f3509e	024c9550-4229-4a85-99a0-d907c560ef9e	c99da49b-8a73-4bbb-8bfa-7f6351ae68eb	Париж	t	2025-04-18 08:18:50.47
0166de5c-29a8-49d3-b2fc-c45a6573cee4	cfc062fb-8a26-409a-ba71-63348ac4ffce	2b1f423b-56d5-469c-bcc4-8f049f84971a	1961	t	2025-04-18 08:18:50.47
df96de9f-1721-4c09-8465-9ffcdc6c5604	b1d9494e-e0c0-404d-ae2b-824c8476d6cd	14fe14ed-a3dd-4507-9164-939f2e206649	Меркурий	t	2025-04-18 08:18:50.471
ab00ffa0-f5a1-498f-a2ec-4806642a2222	a0899b95-6f49-46e3-ba47-9d66336f5649	d9b3d328-d1fa-4ae6-9c24-ec4e9ac51edb	Джордж Оруэлл	t	2025-04-18 08:18:50.471
1eb2210e-6564-4d33-adf0-8f23d8fe42b6	de11eca3-1c15-4513-90d6-ed43c5cd2746	35a7a99f-9182-49b2-8242-008e23b69c45	Амазонка	t	2025-04-13 07:49:37.004
7363bcd0-3c3a-411d-85bd-a1fa10a9ac25	de11eca3-1c15-4513-90d6-ed43c5cd2746	44b2c51b-4a71-4dba-bbc6-f606947832fe	Нил	f	2025-04-13 07:49:37.004
0bc55e38-9785-4115-9f8b-51ad132b855d	de11eca3-1c15-4513-90d6-ed43c5cd2746	61ea8f15-e5ec-41ef-9039-1681efd4cd19	Янцзы	f	2025-04-13 07:49:37.004
4e6a3b50-0f4a-42e3-88b2-6ede4e832a8b	eb7b2fc6-1186-4c58-baf8-d0f5738d3062	774703ce-97c9-4292-8e69-8cc38bf64aff	Водород	t	2025-04-13 07:49:37.006
2a1e01e4-e20e-422b-afe5-26802eabd635	eb7b2fc6-1186-4c58-baf8-d0f5738d3062	be355be7-3bca-4a69-aa48-4e071da13734	Гелий	f	2025-04-13 07:49:37.006
d6828e74-8411-48f6-8dfe-fa9cf21582bf	eb7b2fc6-1186-4c58-baf8-d0f5738d3062	ce0c5bd5-8ef4-4260-b660-ff754896f479	Литий	f	2025-04-13 07:49:37.006
b0619517-343c-434b-a9a9-ab4cd1ef0493	7f7b8995-c4fd-4aac-9e05-ad9aaf772393	f02a786c-23cb-4818-beec-b86391dd8061	753 до н.э.	t	2025-04-13 07:49:37.007
2cdea7bc-d6ca-4f1d-8765-7f879a0e3a30	7f7b8995-c4fd-4aac-9e05-ad9aaf772393	680a73aa-9643-4bf3-b56d-3214662e5193	476 н.э.	f	2025-04-13 07:49:37.007
b7f10e6d-1b37-4e08-afd2-4f1b83f6e082	7f7b8995-c4fd-4aac-9e05-ad9aaf772393	7d73ba99-0e7c-4dd9-b144-5188e78c5c4e	1000 н.э.	f	2025-04-13 07:49:37.007
c65f04e7-897e-43dc-87f1-fdfbf2c076ff	59d015bd-bec5-47f8-a2e8-a95131dba741	1e3ac945-02ea-477e-a4ee-29df57248a7c	Тихий океан	t	2025-04-13 07:49:37.008
69435a6c-0a3a-4c07-b5c1-2235e66988dc	59d015bd-bec5-47f8-a2e8-a95131dba741	aa395664-8220-4d27-a801-4feec484c819	Атлантический океан	f	2025-04-13 07:49:37.008
90028aa4-2e66-49a1-a70b-cd33a31454d8	59d015bd-bec5-47f8-a2e8-a95131dba741	35cf3b26-7937-4c51-bc46-3a5e087fe8c7	Индийский океан	f	2025-04-13 07:49:37.008
d53b03cd-3768-4133-be5a-fc3f1ee7eb03	b4eddc44-0f33-4b60-9acd-aabe28a5da69	acdc7067-a462-4c8a-821b-29e1f090e087	Лев Толстой	t	2025-04-13 07:49:37.008
54bd9458-9b70-4394-8188-e2fa2075701f	b4eddc44-0f33-4b60-9acd-aabe28a5da69	248ffe2f-0bca-4165-acf0-3b56ca9f6914	Федор Достоевский	f	2025-04-13 07:49:37.008
90b02746-8ace-4e84-8857-c56c9d8d9767	b4eddc44-0f33-4b60-9acd-aabe28a5da69	24254a46-f43e-4114-9a67-8f28eceb5cfe	Антон Чехов	f	2025-04-13 07:49:37.008
beca736c-30cb-4120-8813-18da8dee735e	5acead24-daf9-4a68-a591-f87b22a88964	29f88a93-1cea-4519-b52c-8931ff0bf033	Азот	t	2025-04-13 07:49:37.01
1678e317-f178-4592-99ae-2f3637e12ce0	5acead24-daf9-4a68-a591-f87b22a88964	a0948c66-e794-4e83-ae39-e69a9828ad37	Кислород	f	2025-04-13 07:49:37.01
8496bf44-56d1-4e0d-88a1-555837e5f5c5	5acead24-daf9-4a68-a591-f87b22a88964	f53a703a-7c42-4437-b7ec-0be02daced31	Углекислый газ	f	2025-04-13 07:49:37.01
fce2d182-0e0c-4eba-ab67-2d208516c6f9	98210cdf-9ed8-4bc9-b266-e60b68a5c901	205441eb-b833-4dd2-9010-c6707be8ceff	Третья	t	2025-04-13 07:49:37.01
ab22ec4c-8991-4c33-82d5-11c758f1a0f3	98210cdf-9ed8-4bc9-b266-e60b68a5c901	6ffc08d6-dbe3-481e-9d78-4ef11e147ca5	Вторая	f	2025-04-13 07:49:37.01
69105bc0-9b09-4bcc-a20d-b917d17e9ebb	98210cdf-9ed8-4bc9-b266-e60b68a5c901	7e8a0d33-bb79-4c9a-8186-138d79b96435	Четвертая	f	2025-04-13 07:49:37.01
f5e197c2-7292-4110-83c5-9d8053c1bdbe	96a4e4cf-50e4-4593-9a92-465c192f5b22	5a5193b2-081e-4961-b1a2-cfcedf618d33	Кислород	t	2025-04-13 07:49:37.011
b8480567-0acb-4bc3-9551-10a0a57a8bd8	96a4e4cf-50e4-4593-9a92-465c192f5b22	cddf9633-ddc5-4c9b-b743-049db5873b3e	Золото	f	2025-04-13 07:49:37.011
4673d6f6-fe76-4a60-9b5d-ebd220e72e05	96a4e4cf-50e4-4593-9a92-465c192f5b22	e15b725b-3dca-40f3-a0e8-5ff4dc729d84	Серебро	f	2025-04-13 07:49:37.011
262df0c4-6f5b-436f-bbe4-10edada52be3	2ff0579c-629b-4668-9499-b39b42791437	cdbbf38f-6787-4de5-9491-56b20b528031	Гелий	t	2025-04-18 08:18:50.472
b4fafe99-000a-4fa6-b9be-0830c32054c2	2ff0579c-629b-4668-9499-b39b42791437	069d6fd4-ce3f-462d-8c1c-06a15839d97d	Водород	f	2025-04-18 08:18:50.472
91c20f69-009a-4198-80af-f5844f952597	53a64d0b-d527-4fd7-9140-cefbbeb04e27	da1ea0b1-892b-4b75-aa50-3bfa68b63041	Пекин	t	2025-04-15 07:39:44.418
eb7b3649-3740-4917-bbc0-cb666438ac9d	53a64d0b-d527-4fd7-9140-cefbbeb04e27	446c0cee-7459-4c97-96fa-65079e6a041a	Москва	f	2025-04-15 07:39:44.418
b7451e6e-b63d-48f9-acbc-59639f5a9548	53a64d0b-d527-4fd7-9140-cefbbeb04e27	d0385325-9536-43a3-b461-fac4a3a109e7	Токио	f	2025-04-15 07:39:44.418
546ddbbf-fa2f-4953-81d6-66ec21252694	5c63423e-e0d0-4fff-993c-e9f1e0690e26	7626af39-b4ef-4b17-b0d4-2fce2cc17357	10	t	2025-04-15 07:39:44.422
7e4f9955-55e8-4209-818d-972d09071420	5c63423e-e0d0-4fff-993c-e9f1e0690e26	96ea719b-2bfb-45c8-8d24-5056a0bd280b	12	f	2025-04-15 07:39:44.422
306265ac-bd40-4635-81cf-891dbc3ba933	5c63423e-e0d0-4fff-993c-e9f1e0690e26	a9e0d2f8-7d17-4508-81d4-6d5645435a61	22	f	2025-04-15 07:39:44.422
4cc13c9f-4a5d-47ad-b187-6b6fed7f90bb	5c63423e-e0d0-4fff-993c-e9f1e0690e26	73a0905d-6153-4ed9-9292-e8acbe014a49	24	f	2025-04-15 07:39:44.422
a8372f05-7886-4d02-87e2-4fa9ca27e985	5c63423e-e0d0-4fff-993c-e9f1e0690e26	a7c89613-a34f-4b58-a7ee-d746a94d6f57	не знаю	t	2025-04-15 07:39:44.422
a7a952f4-ec83-49f4-92f9-184e00591f93	9f51bab0-1272-482a-a29d-7dc0e849bd67	eebc802f-ca0f-476b-90b9-0ca32d859255	ва	t	2025-04-15 08:49:03.496
5824ee18-58a2-483d-9e84-df2b1abd7cce	9f51bab0-1272-482a-a29d-7dc0e849bd67	9be7f666-57fd-4e5c-aa43-7187468db193	пва	f	2025-04-15 08:49:03.496
fccb3b74-eea5-4318-818f-903ee2a3629f	f1ff2cde-5ec8-42c3-b973-6adda0b2630f	aa395664-8220-4d27-a801-4feec484c819	Атлантический океан	f	2025-05-03 18:39:02.571
4aa56f52-60bd-4a2b-b6b6-473bf12b72fb	f1ff2cde-5ec8-42c3-b973-6adda0b2630f	35cf3b26-7937-4c51-bc46-3a5e087fe8c7	Индийский океан	f	2025-05-03 18:39:02.571
aaba1b08-46f6-418a-858a-508fc78529ca	2fdb21e9-4664-45e0-8917-2fa586c4d739	acdc7067-a462-4c8a-821b-29e1f090e087	Лев Толстой	t	2025-05-03 18:39:02.572
db6333e3-906a-4398-93e8-f24085f8bc1b	2fdb21e9-4664-45e0-8917-2fa586c4d739	248ffe2f-0bca-4165-acf0-3b56ca9f6914	Федор Достоевский	f	2025-05-03 18:39:02.572
6e12c549-17eb-472e-bbc6-a802e6fcc2e0	2fdb21e9-4664-45e0-8917-2fa586c4d739	24254a46-f43e-4114-9a67-8f28eceb5cfe	Антон Чехов	f	2025-05-03 18:39:02.572
825a1f68-7d43-4b5a-8bfb-e2bc098cbbfe	ccccce75-8d72-4b2a-bec2-d4529dcc1656	29f88a93-1cea-4519-b52c-8931ff0bf033	Азот	t	2025-05-03 18:39:02.573
b4e5f129-9e97-41b7-beff-f44ced933ef2	e0a3a611-547c-49c6-bb81-d3b42f88fcb0	c9c858e6-b349-40a7-87ad-23688c967ae8	Пекин	t	2025-05-01 12:21:01.188
66111da4-39ad-4c4f-9221-0c97310161f3	e0a3a611-547c-49c6-bb81-d3b42f88fcb0	85217cad-64aa-41df-8fe5-a0de46694d8e	Москва	f	2025-05-01 12:21:01.188
bec13a82-c672-4454-89d7-b7999d0b761e	e0a3a611-547c-49c6-bb81-d3b42f88fcb0	38a24928-f53e-4bb7-85a1-8a7f484314ee	Лондон	f	2025-05-01 12:21:01.188
df24910e-b7b9-4143-a724-49cbd8628260	b47b1a3f-870f-4bd0-bb59-3922a64fde3e	52421d83-3cbe-4375-8c61-38ae5ca2b94b	Трамп	t	2025-05-01 12:21:01.189
dc29f85a-2004-466d-ae63-d1a306c01ea6	b47b1a3f-870f-4bd0-bb59-3922a64fde3e	8470ef2b-9ef3-4822-9b1c-2b860233930a	Путин	f	2025-05-01 12:21:01.189
467b806e-82c8-406f-98d8-13d8fdea4da6	b47b1a3f-870f-4bd0-bb59-3922a64fde3e	63e043df-275e-4ba1-b355-0c94d9035b38	Обама	t	2025-05-01 12:21:01.189
2284c8ee-8a43-42ec-bd53-80324fb92caa	4b559288-4cf5-4324-bc22-fe05a4ba2d1a	c9c858e6-b349-40a7-87ad-23688c967ae8	Пекин	t	2025-05-01 12:35:09.504
6a38411e-bdfe-4e51-969c-82a3f859b408	4b559288-4cf5-4324-bc22-fe05a4ba2d1a	85217cad-64aa-41df-8fe5-a0de46694d8e	Москва	f	2025-05-01 12:35:09.504
d1e63c6d-19ff-4219-bbd9-c24d66986880	4b559288-4cf5-4324-bc22-fe05a4ba2d1a	38a24928-f53e-4bb7-85a1-8a7f484314ee	Лондон	f	2025-05-01 12:35:09.504
33c8ce87-6013-4989-92bd-93401f6d2956	68b418a5-0028-46e8-9e8a-0fa5a3251b9d	52421d83-3cbe-4375-8c61-38ae5ca2b94b	Трамп	t	2025-05-01 12:35:09.507
df755026-5d2d-4ccd-8264-b2c53616e248	68b418a5-0028-46e8-9e8a-0fa5a3251b9d	8470ef2b-9ef3-4822-9b1c-2b860233930a	Путин	f	2025-05-01 12:35:09.507
5e0b32c7-ce2f-4482-9d70-8e239d03abbd	68b418a5-0028-46e8-9e8a-0fa5a3251b9d	63e043df-275e-4ba1-b355-0c94d9035b38	Обама	t	2025-05-01 12:35:09.507
49ca0677-7a74-4176-95c2-6340015feb1a	ccccce75-8d72-4b2a-bec2-d4529dcc1656	a0948c66-e794-4e83-ae39-e69a9828ad37	Кислород	f	2025-05-03 18:39:02.573
adb5bc69-80c0-485d-9bda-6f8e596dba14	ccccce75-8d72-4b2a-bec2-d4529dcc1656	f53a703a-7c42-4437-b7ec-0be02daced31	Углекислый газ	f	2025-05-03 18:39:02.573
24e2fc2e-9a87-4a97-ae68-63b4e38c836e	a392e902-3ac3-400c-aa91-85e8d24eb63a	205441eb-b833-4dd2-9010-c6707be8ceff	Третья	t	2025-05-03 18:39:02.574
eaccee03-0f93-4e7b-8f86-e0dedb8c7f5d	a392e902-3ac3-400c-aa91-85e8d24eb63a	6ffc08d6-dbe3-481e-9d78-4ef11e147ca5	Вторая	f	2025-05-03 18:39:02.574
466f05ec-4bbe-4555-b509-6f23dcd5bfe0	a392e902-3ac3-400c-aa91-85e8d24eb63a	7e8a0d33-bb79-4c9a-8186-138d79b96435	Четвертая	f	2025-05-03 18:39:02.574
b7dc5d9b-c7ea-4f1b-9b9d-4a499aa15de5	3194a00d-0c19-4ea1-967d-ad61339593dc	5a5193b2-081e-4961-b1a2-cfcedf618d33	Кислород	t	2025-05-03 18:39:02.575
08e81a69-3d84-409f-a273-5add2e473eca	3194a00d-0c19-4ea1-967d-ad61339593dc	cddf9633-ddc5-4c9b-b743-049db5873b3e	Золото	f	2025-05-03 18:39:02.575
a79a904d-e201-42a6-9741-670b06f3d602	3194a00d-0c19-4ea1-967d-ad61339593dc	e15b725b-3dca-40f3-a0e8-5ff4dc729d84	Серебро	f	2025-05-03 18:39:02.575
33ba6f92-5ac2-4add-9a16-e7c27c340fb9	fa7df060-9b18-4457-8af8-8dc19a29590d	6ffc08d6-dbe3-481e-9d78-4ef11e147ca5	Вторая	f	2025-05-03 18:46:41.414
30587bf8-cf58-48b4-86ff-750f6188c6f4	fa7df060-9b18-4457-8af8-8dc19a29590d	7e8a0d33-bb79-4c9a-8186-138d79b96435	Четвертая	f	2025-05-03 18:46:41.414
178a3dd0-dad4-408b-aec1-8fca4d449b4b	4369d5da-b452-442e-bca9-cbdce60d96f2	5a5193b2-081e-4961-b1a2-cfcedf618d33	Кислород	t	2025-05-03 18:46:41.414
d13b660e-0980-46fc-a678-c221b3a1637a	4369d5da-b452-442e-bca9-cbdce60d96f2	cddf9633-ddc5-4c9b-b743-049db5873b3e	Золото	f	2025-05-03 18:46:41.414
ea1b1eb0-e87b-4144-8ff9-f2357bea20c2	4369d5da-b452-442e-bca9-cbdce60d96f2	e15b725b-3dca-40f3-a0e8-5ff4dc729d84	Серебро	f	2025-05-03 18:46:41.414
0416300c-09da-4418-a35b-89ceeaf99796	6dc6bcb3-67de-4fc9-b6eb-1d753d2eaf2b	e3518c84-9e66-4851-b6f0-75952dcf9183	Париж	t	2025-05-03 18:50:41.497
83d13898-e441-4617-9409-d03c127ec7b7	6dc6bcb3-67de-4fc9-b6eb-1d753d2eaf2b	e3cca55f-cb3c-45b3-a1db-a4323e6d3c42	Нью-Йоррк	f	2025-05-03 18:50:41.497
3ded0213-edd1-479a-be12-fe402fa2120c	6dc6bcb3-67de-4fc9-b6eb-1d753d2eaf2b	4ae37660-bc6f-4957-9c84-56433c8d6232	Марсель	f	2025-05-03 18:50:41.497
1125dbad-5a8f-456f-bc0a-3fec0ce5ce38	dccab75d-1384-49f1-b50b-9ebc0be34355	d244ecc7-8dda-4690-bf5e-d79b289fd552	6	t	2025-05-03 18:50:41.499
2542d022-01fb-458a-be6a-8e8716af0efb	dccab75d-1384-49f1-b50b-9ebc0be34355	5d360883-b7c5-47be-b8d3-b05cf8a5d17b	шесть	t	2025-05-03 18:50:41.499
676a5f3a-80b5-43ec-a2cb-0625f1705a4a	dccab75d-1384-49f1-b50b-9ebc0be34355	a84b63df-da61-4df5-9060-83c9d789b546	сикс	t	2025-05-03 18:50:41.499
0d76c9f2-7fd3-4129-b4dc-f1184d0f0506	454bfefc-2114-4341-a511-76ce332b939d	e3518c84-9e66-4851-b6f0-75952dcf9183	Париж	t	2025-05-03 20:12:53.596
62a1aba6-a556-453e-bef3-efcdf9f69b70	454bfefc-2114-4341-a511-76ce332b939d	e3cca55f-cb3c-45b3-a1db-a4323e6d3c42	Нью-Йоррк	f	2025-05-03 20:12:53.596
4420727b-02a2-44fc-a622-d07a044963ac	454bfefc-2114-4341-a511-76ce332b939d	4ae37660-bc6f-4957-9c84-56433c8d6232	Марсель	f	2025-05-03 20:12:53.596
92de112c-2204-4126-a8a1-c294637b5a6f	dd068a79-c7b4-4537-9379-df07179b91f9	35a7a99f-9182-49b2-8242-008e23b69c45	Амазонка	t	2025-05-03 18:41:28.776
41cb2a5c-8ed7-4630-b78e-e1c6404313d0	dd068a79-c7b4-4537-9379-df07179b91f9	44b2c51b-4a71-4dba-bbc6-f606947832fe	Нил	f	2025-05-03 18:41:28.776
03b274bd-14a7-4059-b31b-0586f370adfd	dd068a79-c7b4-4537-9379-df07179b91f9	61ea8f15-e5ec-41ef-9039-1681efd4cd19	Янцзы	f	2025-05-03 18:41:28.776
dbd1a6b3-002c-43a9-84af-33fed460da27	4a1e1d2b-8d09-422c-8843-c6653989729b	774703ce-97c9-4292-8e69-8cc38bf64aff	Водород	t	2025-05-03 18:41:28.779
53a0e48f-00dc-4ed6-8293-604e295a77ea	4a1e1d2b-8d09-422c-8843-c6653989729b	be355be7-3bca-4a69-aa48-4e071da13734	Гелий	f	2025-05-03 18:41:28.779
654ebda0-8e3f-4dd8-90a6-254d2f8c42cd	4a1e1d2b-8d09-422c-8843-c6653989729b	ce0c5bd5-8ef4-4260-b660-ff754896f479	Литий	f	2025-05-03 18:41:28.779
8a45d213-bb84-4cfb-817b-47a6365a6bfb	bcf9c043-d20c-43fe-9064-278f6758bbf0	f02a786c-23cb-4818-beec-b86391dd8061	753 до н.э.	t	2025-05-03 18:41:28.78
085a8e5d-6715-4ac7-9c86-3318f1e38627	bcf9c043-d20c-43fe-9064-278f6758bbf0	680a73aa-9643-4bf3-b56d-3214662e5193	476 н.э.	f	2025-05-03 18:41:28.78
68b45420-5316-48b1-8cb7-86cfc0cb1d02	bcf9c043-d20c-43fe-9064-278f6758bbf0	7d73ba99-0e7c-4dd9-b144-5188e78c5c4e	1000 н.э.	f	2025-05-03 18:41:28.78
11098983-564b-4b59-b476-3a9019e17c4c	5dcf4181-c4ba-4cb6-98a2-05d0b36ab8e0	1e3ac945-02ea-477e-a4ee-29df57248a7c	Тихий океан	t	2025-05-03 18:41:28.781
e06a8034-82b3-405e-8f1d-ce258d5317d0	5dcf4181-c4ba-4cb6-98a2-05d0b36ab8e0	aa395664-8220-4d27-a801-4feec484c819	Атлантический океан	f	2025-05-03 18:41:28.781
b6725465-454c-4b81-a2f8-12c67d7aca53	5dcf4181-c4ba-4cb6-98a2-05d0b36ab8e0	35cf3b26-7937-4c51-bc46-3a5e087fe8c7	Индийский океан	f	2025-05-03 18:41:28.781
ea48277f-6393-4cb9-831e-97f325610e62	2f67cf6e-7900-4fa5-babd-42c136864ef0	acdc7067-a462-4c8a-821b-29e1f090e087	Лев Толстой	t	2025-05-03 18:41:28.782
d383a48b-3141-4de4-8b1e-4a9cb7d598d3	2f67cf6e-7900-4fa5-babd-42c136864ef0	248ffe2f-0bca-4165-acf0-3b56ca9f6914	Федор Достоевский	f	2025-05-03 18:41:28.782
24aebd9f-1a00-430d-adce-b341ddd6d0ee	2f67cf6e-7900-4fa5-babd-42c136864ef0	24254a46-f43e-4114-9a67-8f28eceb5cfe	Антон Чехов	f	2025-05-03 18:41:28.782
2a7e1e86-7e21-468a-adbf-c0af0eef906a	43fe0655-21de-4c0e-a539-b6340f9f566e	29f88a93-1cea-4519-b52c-8931ff0bf033	Азот	t	2025-05-03 18:41:28.783
35b52545-cbc7-4521-9969-f1f03e05db84	43fe0655-21de-4c0e-a539-b6340f9f566e	a0948c66-e794-4e83-ae39-e69a9828ad37	Кислород	f	2025-05-03 18:41:28.783
dfc60bda-8805-4b25-a6e3-8c796282fed9	43fe0655-21de-4c0e-a539-b6340f9f566e	f53a703a-7c42-4437-b7ec-0be02daced31	Углекислый газ	f	2025-05-03 18:41:28.783
4f7655b5-850c-414a-957b-2a1ad7365401	c7c7c4f3-f5d8-4681-bdbd-415ec7e815a1	205441eb-b833-4dd2-9010-c6707be8ceff	Третья	t	2025-05-03 18:41:28.784
92c365ab-d989-4dd0-b9de-f69a93d5c6f6	c7c7c4f3-f5d8-4681-bdbd-415ec7e815a1	6ffc08d6-dbe3-481e-9d78-4ef11e147ca5	Вторая	f	2025-05-03 18:41:28.784
25309420-80f9-4e8e-9be0-769ad939a1e7	c7c7c4f3-f5d8-4681-bdbd-415ec7e815a1	7e8a0d33-bb79-4c9a-8186-138d79b96435	Четвертая	f	2025-05-03 18:41:28.784
bb5a42f6-d191-4def-bfae-3738da550a1b	a559d2c4-0dd0-4f7c-b4c1-4d6513d0e672	5a5193b2-081e-4961-b1a2-cfcedf618d33	Кислород	t	2025-05-03 18:41:28.785
2dfd5b42-e53d-418c-9640-c801e29d7459	a559d2c4-0dd0-4f7c-b4c1-4d6513d0e672	cddf9633-ddc5-4c9b-b743-049db5873b3e	Золото	f	2025-05-03 18:41:28.785
895183f9-518e-4bf6-98de-1c7550bb9883	a559d2c4-0dd0-4f7c-b4c1-4d6513d0e672	e15b725b-3dca-40f3-a0e8-5ff4dc729d84	Серебро	f	2025-05-03 18:41:28.785
b82f8d56-9a4d-4c2d-9e60-73fde2db946b	394c2cb0-8d6e-47bf-8445-058f8e66c794	fe3e7247-b584-4da7-92c7-63e76088cff5	fsd	t	2025-05-05 10:39:40.402
292cfad2-2b69-4d94-94b7-3045a088e943	5da387e7-542a-47a7-8bb2-a973988c0f4a	3af028e3-0d12-40b2-a51e-150662e5a14d	Ответ	t	2025-05-11 12:49:19.41
1296ea4b-e333-4adb-9b11-00d88788c567	5da387e7-542a-47a7-8bb2-a973988c0f4a	cda5035f-bdea-44a8-bff8-718164ca20e2	Привет	f	2025-05-11 12:49:19.41
d7b289dd-69e8-4e5f-8d14-ed74b4aeec01	5da387e7-542a-47a7-8bb2-a973988c0f4a	9da87ac4-d56a-469c-b759-07437c3fb9dd	Пока	f	2025-05-11 12:49:19.41
5b74c166-b764-4e69-bbdc-d40885c5caf7	b7276e9a-570c-4233-b6e0-a4d06d264abd	61efb116-f7b0-439f-b523-b49712fd22a5	ОТвет	t	2025-05-11 12:49:19.412
a5b45981-4762-4940-a424-6852870c14f8	b7276e9a-570c-4233-b6e0-a4d06d264abd	64af3639-4abe-4995-9463-cfdfcb12b038	12	t	2025-05-11 12:49:19.412
437bef47-c2ee-47d4-98fa-93a51e1868b3	23305a83-1c8a-49ba-9e26-2351c72077e1	35a7a99f-9182-49b2-8242-008e23b69c45	Амазонка	t	2025-05-03 18:46:00.235
b7f1ef3f-7ddd-4e68-a7ae-95af5b33cc72	23305a83-1c8a-49ba-9e26-2351c72077e1	44b2c51b-4a71-4dba-bbc6-f606947832fe	Нил	f	2025-05-03 18:46:00.235
2651543a-4eb8-4fe4-ac5f-b27383bc24da	23305a83-1c8a-49ba-9e26-2351c72077e1	61ea8f15-e5ec-41ef-9039-1681efd4cd19	Янцзы	f	2025-05-03 18:46:00.235
48a8cd36-a0ae-4c02-b5d7-545435543bc0	9cd8bcc8-b3a2-48eb-a361-a87af24a0d08	774703ce-97c9-4292-8e69-8cc38bf64aff	Водород	t	2025-05-03 18:46:00.238
1e643c0a-4757-4b93-8f9e-e6dcc01be212	9cd8bcc8-b3a2-48eb-a361-a87af24a0d08	be355be7-3bca-4a69-aa48-4e071da13734	Гелий	f	2025-05-03 18:46:00.238
5641de67-4f5d-49d2-8384-3d2b73c4af04	9cd8bcc8-b3a2-48eb-a361-a87af24a0d08	ce0c5bd5-8ef4-4260-b660-ff754896f479	Литий	f	2025-05-03 18:46:00.238
dda899a2-0dae-4276-90d2-4c552cb2238b	cc7c4c50-d6ac-44e9-81f7-6174a5022e81	f02a786c-23cb-4818-beec-b86391dd8061	753 до н.э.	t	2025-05-03 18:46:00.239
bd675c94-2377-4cb9-9763-13cc7d306878	cc7c4c50-d6ac-44e9-81f7-6174a5022e81	680a73aa-9643-4bf3-b56d-3214662e5193	476 н.э.	f	2025-05-03 18:46:00.239
c6341248-796e-49d1-ad6e-88c073edd2d7	cc7c4c50-d6ac-44e9-81f7-6174a5022e81	7d73ba99-0e7c-4dd9-b144-5188e78c5c4e	1000 н.э.	f	2025-05-03 18:46:00.239
fcfdca2f-d956-4b84-a5b7-e9ba2eb92dd2	f0ce714b-f01f-433a-8380-50305931a0c3	1e3ac945-02ea-477e-a4ee-29df57248a7c	Тихий океан	t	2025-05-03 18:46:00.241
b66995cb-b50c-4991-8778-dcf5d2b0c44b	f0ce714b-f01f-433a-8380-50305931a0c3	aa395664-8220-4d27-a801-4feec484c819	Атлантический океан	f	2025-05-03 18:46:00.241
5037e774-bd7c-4fba-aa2e-f26bba55f9a0	f0ce714b-f01f-433a-8380-50305931a0c3	35cf3b26-7937-4c51-bc46-3a5e087fe8c7	Индийский океан	f	2025-05-03 18:46:00.241
d1f5c3fa-4382-4bdd-8000-4c4fb103db94	9f2bcd63-d50e-49e0-b264-97f5842ec27a	acdc7067-a462-4c8a-821b-29e1f090e087	Лев Толстой	t	2025-05-03 18:46:00.242
31b1bd6f-f633-45be-bc2e-3d415f4bd1a1	9f2bcd63-d50e-49e0-b264-97f5842ec27a	248ffe2f-0bca-4165-acf0-3b56ca9f6914	Федор Достоевский	f	2025-05-03 18:46:00.242
6dcf586f-384f-4dc0-8fe5-979d3c53cf49	9f2bcd63-d50e-49e0-b264-97f5842ec27a	24254a46-f43e-4114-9a67-8f28eceb5cfe	Антон Чехов	f	2025-05-03 18:46:00.242
f2762499-d675-4041-9ede-b66479613d1b	a56d4235-6b2f-4d80-9f53-a1930c0d3299	29f88a93-1cea-4519-b52c-8931ff0bf033	Азот	t	2025-05-03 18:46:00.243
6cb87de3-ad68-4ee1-867b-c4c49c92a45a	a56d4235-6b2f-4d80-9f53-a1930c0d3299	a0948c66-e794-4e83-ae39-e69a9828ad37	Кислород	f	2025-05-03 18:46:00.243
0959d029-1c7f-40f4-a629-31d1981d164f	a56d4235-6b2f-4d80-9f53-a1930c0d3299	f53a703a-7c42-4437-b7ec-0be02daced31	Углекислый газ	f	2025-05-03 18:46:00.243
ecb8bfa2-5bdb-444c-a8bc-ab3e2ea5f435	f63508a9-13f4-49b0-81db-6ad28cded33e	205441eb-b833-4dd2-9010-c6707be8ceff	Третья	t	2025-05-03 18:46:00.244
16030193-c462-4177-afd3-21ce5c0809f3	f63508a9-13f4-49b0-81db-6ad28cded33e	6ffc08d6-dbe3-481e-9d78-4ef11e147ca5	Вторая	f	2025-05-03 18:46:00.244
7b9b97d9-07fa-47c7-9606-b69b075385b9	f63508a9-13f4-49b0-81db-6ad28cded33e	7e8a0d33-bb79-4c9a-8186-138d79b96435	Четвертая	f	2025-05-03 18:46:00.244
e74779d6-ed9c-4257-bde3-5ffe65381331	8a27efa5-b67c-4860-a255-4d16f6f5358a	5a5193b2-081e-4961-b1a2-cfcedf618d33	Кислород	t	2025-05-03 18:46:00.244
ae843b93-dc85-4a97-882e-c1ed7449c266	8a27efa5-b67c-4860-a255-4d16f6f5358a	cddf9633-ddc5-4c9b-b743-049db5873b3e	Золото	f	2025-05-03 18:46:00.244
268b25fc-d4ed-4087-96ce-e6a429ecb948	8a27efa5-b67c-4860-a255-4d16f6f5358a	e15b725b-3dca-40f3-a0e8-5ff4dc729d84	Серебро	f	2025-05-03 18:46:00.244
cf168787-5b35-4193-b386-ef7536a38814	1ee6d1f5-c90d-443a-bc8a-95839ef762c6	324c3461-ca25-4950-96ac-75dbbdf76fec	Испарение	t	2025-05-05 08:54:04.69
11249ed6-b577-41ea-94b5-b7d80df9b9f1	1ee6d1f5-c90d-443a-bc8a-95839ef762c6	c5972d97-d15a-4ee0-98e7-d3eb73f57cc9	Конденсация	f	2025-05-05 08:54:04.69
69e366d3-c02f-4ad5-b414-3e9a1e3743cd	73875202-4528-4cf5-bdac-801aa0ac8831	c9c858e6-b349-40a7-87ad-23688c967ae8	Пекин	t	2025-05-03 06:23:42.823
9b5f791a-3cf5-4fb7-9313-f89cf541aae4	73875202-4528-4cf5-bdac-801aa0ac8831	85217cad-64aa-41df-8fe5-a0de46694d8e	Москва	f	2025-05-03 06:23:42.823
0ae768cd-5bc7-415d-86ce-41fba8c159f9	73875202-4528-4cf5-bdac-801aa0ac8831	38a24928-f53e-4bb7-85a1-8a7f484314ee	Лондон	f	2025-05-03 06:23:42.823
35582f4a-b698-4da4-b5b4-80c1cc3332c0	87b375b8-21f2-4350-9d40-91cf143047f7	52421d83-3cbe-4375-8c61-38ae5ca2b94b	Трамп	t	2025-05-03 06:23:42.827
fd7fd14d-d5c4-4481-93af-9bc9e0a40b92	87b375b8-21f2-4350-9d40-91cf143047f7	8470ef2b-9ef3-4822-9b1c-2b860233930a	Путин	f	2025-05-03 06:23:42.827
b8c077a2-113c-4ed5-bbdf-9aa752b2fbf1	87b375b8-21f2-4350-9d40-91cf143047f7	63e043df-275e-4ba1-b355-0c94d9035b38	Обама	t	2025-05-03 06:23:42.827
394d23af-ee04-4ace-b150-3facc3fd7f34	20ac1e31-e578-4871-a629-9889ab16f33a	1ad45e03-76b9-4caf-9844-345e97c55e6c	Альберт Эйнштейн	t	2025-05-05 08:54:04.692
efa04e78-aae6-462f-8c92-493fd0bf484e	acae3303-6caf-47a9-ae2c-c1e2f633a225	6a04b240-fea0-4a57-81ef-a7a0e6e60689	Эверест	t	2025-05-05 08:54:04.694
a388f7f5-bf12-46b4-ab2a-5eff1d2c7c22	acae3303-6caf-47a9-ae2c-c1e2f633a225	b6897461-f227-46da-bb7a-44db0c8f8afc	Килиманджаро	f	2025-05-05 08:54:04.694
40c58e69-de2e-42e8-9894-ae9e3aa0c194	acae3303-6caf-47a9-ae2c-c1e2f633a225	0633bd62-0917-4a84-b2d6-49dcbcc0a579	Монблан	f	2025-05-05 08:54:04.694
ea32d1b5-c39c-40c2-8eac-525906a3b75e	85908342-13d2-48f7-a841-98bb1ec7bc60	e3518c84-9e66-4851-b6f0-75952dcf9183	Париж	t	2025-05-03 19:57:20.991
bbab187d-674f-4596-b407-4731a132c7c0	85908342-13d2-48f7-a841-98bb1ec7bc60	e3cca55f-cb3c-45b3-a1db-a4323e6d3c42	Нью-Йоррк	f	2025-05-03 19:57:20.991
e45cad7a-d013-4727-9092-e014281f2109	85908342-13d2-48f7-a841-98bb1ec7bc60	4ae37660-bc6f-4957-9c84-56433c8d6232	Марсель	f	2025-05-03 19:57:20.991
8e59b099-f2c6-44d4-b0ed-be068fd573e4	36cd5234-1f10-4db8-9f22-2b549d834a2e	d244ecc7-8dda-4690-bf5e-d79b289fd552	6	t	2025-05-03 19:57:20.994
64417d1f-6807-438c-9723-666daab25c1d	36cd5234-1f10-4db8-9f22-2b549d834a2e	5d360883-b7c5-47be-b8d3-b05cf8a5d17b	шесть	t	2025-05-03 19:57:20.994
788db138-a2fe-4477-88a5-3ef026ca2696	36cd5234-1f10-4db8-9f22-2b549d834a2e	a84b63df-da61-4df5-9060-83c9d789b546	сикс	t	2025-05-03 19:57:20.994
c9b9569e-d4ba-4116-98cb-f8a8a761a99d	b6673f46-3840-41f1-96d1-af58c53f181c	d244ecc7-8dda-4690-bf5e-d79b289fd552	6	t	2025-05-03 20:12:53.599
daeed6c4-71e6-4591-afb5-421dabcd1380	b6673f46-3840-41f1-96d1-af58c53f181c	5d360883-b7c5-47be-b8d3-b05cf8a5d17b	шесть	t	2025-05-03 20:12:53.599
2d9c8f9f-a940-461b-a5b9-159ea3ee94e6	b6673f46-3840-41f1-96d1-af58c53f181c	a84b63df-da61-4df5-9060-83c9d789b546	сикс	t	2025-05-03 20:12:53.599
6948332b-41c9-4bd6-9ee3-47cac9aa39b0	9ff93624-0896-4828-b4bf-f74f5b9bc56d	e3518c84-9e66-4851-b6f0-75952dcf9183	Париж	t	2025-05-03 20:16:48.131
0e8b406d-c085-4153-8c92-336ba5c075f9	9ff93624-0896-4828-b4bf-f74f5b9bc56d	e3cca55f-cb3c-45b3-a1db-a4323e6d3c42	Нью-Йоррк	f	2025-05-03 20:16:48.131
35ecce57-cfc4-4dc0-80de-da1e5f88a455	9ff93624-0896-4828-b4bf-f74f5b9bc56d	4ae37660-bc6f-4957-9c84-56433c8d6232	Марсель	f	2025-05-03 20:16:48.131
870624ed-e139-488c-a548-ca00bb20e1c6	0c3706eb-7e4c-43b9-8d17-f1b8fd333c0a	5f5931d2-7ebd-4707-a4fc-96435369dd2f	Python	t	2025-05-05 08:54:04.697
1d58e9a0-c053-4bf1-a9af-80cb12503ead	d6af3a6b-9ff2-4015-ac2d-3099839d130a	4d890df2-ea36-45c4-8d5a-5e1adcabb1e0	Токио	t	2025-05-05 08:54:04.698
5e8f2819-b48a-46ff-90a6-5fa834914933	d6af3a6b-9ff2-4015-ac2d-3099839d130a	6075380d-77dd-4940-8028-d31d8f22338a	Киото	f	2025-05-05 08:54:04.698
282b3fd5-8157-4b0a-8c5e-c04e026ec775	d6af3a6b-9ff2-4015-ac2d-3099839d130a	275000c7-a7bc-428a-a286-1782c6289dbe	Осака	f	2025-05-05 08:54:04.698
7d7f2a4c-1b03-4bc9-812a-a6fb001a4e13	b8e6e4a4-fdbb-4759-8bac-d0c7ddbbe270	9187393d-d79f-427e-ac1f-7be5dd563cff	1939	t	2025-05-05 08:54:04.7
8f6b7f11-363c-4ea3-bc40-5c21050d0cee	342986a3-f4ef-4a6e-8823-43aabdfaf48b	42c8f768-e2b4-4bd0-a10d-c12a42a890c8	Сахара	t	2025-05-05 08:54:04.702
635e2a09-ee67-4cc0-8eae-1736ce4a1481	342986a3-f4ef-4a6e-8823-43aabdfaf48b	6bd9e6d9-4976-46f3-85d5-dbd96996c24d	Гоби	f	2025-05-05 08:54:04.702
a3a006bc-c259-4fee-b1b5-f8468fde4676	342986a3-f4ef-4a6e-8823-43aabdfaf48b	7cdc7e57-deac-41c5-9b0e-1c598db3f8c8	Антарктида	f	2025-05-05 08:54:04.702
2e5d446b-ee72-4d99-a210-2f64f7279452	a225ea7d-2420-41e9-9822-fb9a4c963f2e	10dc9564-0de8-40c3-946c-8382e2266078	Уильям Шекспир	t	2025-05-05 08:54:04.703
f178b40d-1e7d-4cca-97e9-c4e6def329de	21afe350-789c-47e4-84e7-d69fef478f1c	2a8c922d-808b-4016-bc91-cb3fe72e63fd	Железо	t	2025-05-05 08:54:04.704
21290a52-e689-4e8d-a12a-703b8afc93ca	a9ae6fb5-aa11-4263-a0de-b69095b72895	fce8534b-a2fd-4911-85d8-60ed65cf0029	Преобразование света в энергию	t	2025-05-05 08:54:04.706
f3f5bc70-967b-470d-8a22-ce2a90dbc068	a9ae6fb5-aa11-4263-a0de-b69095b72895	a9841452-0ccf-414b-a64f-eded092af075	Дыхание	f	2025-05-05 08:54:04.706
8dccccce-4fe8-447c-a913-a5fe2134a9df	a9ae6fb5-aa11-4263-a0de-b69095b72895	a6e8bdab-92fe-443c-9099-b246bec45fcf	Испарение	f	2025-05-05 08:54:04.706
e847c762-0c81-4412-b0f6-c6c78558e2b3	8c2d0457-9335-4832-a01a-a9f2afb99067	c99da49b-8a73-4bbb-8bfa-7f6351ae68eb	Париж	t	2025-05-05 08:54:04.708
416b58cc-ebac-4eb2-bf11-6219cef0857b	f7626cd0-fadd-486a-9bf3-f4b2e47b76de	2b1f423b-56d5-469c-bcc4-8f049f84971a	1961	t	2025-05-05 08:54:04.709
5a6ce9f3-9579-4f9b-acde-17007d810195	c8433ac4-cad0-43c1-a22d-b30c9db396a7	14fe14ed-a3dd-4507-9164-939f2e206649	Меркурий	t	2025-05-05 08:54:04.71
cd14f3d7-76ef-4bac-8e7d-309928d08efb	8ad1713f-b8c3-4a2a-bcd8-7dad919f063f	d9b3d328-d1fa-4ae6-9c24-ec4e9ac51edb	Джордж Оруэлл	t	2025-05-05 08:54:04.712
5a69f2f3-66a0-43cb-8305-9ae4fbbb3d2b	d9953fe7-7902-41f3-b6cb-37854fc5924d	cdbbf38f-6787-4de5-9491-56b20b528031	Гелий	t	2025-05-05 08:54:04.714
d141debe-cc2c-4e15-843d-a8e0e8821956	d9953fe7-7902-41f3-b6cb-37854fc5924d	069d6fd4-ce3f-462d-8c1c-06a15839d97d	Водород	f	2025-05-05 08:54:04.714
898bb254-8175-43ba-b361-1ffc8393ccec	8ee1f721-6c70-439b-9350-64aef656197e	3af028e3-0d12-40b2-a51e-150662e5a14d	Ответ	t	2025-05-11 13:20:46.304
498e40fb-bb39-4f16-b1d6-7b26f3e26d87	8ee1f721-6c70-439b-9350-64aef656197e	cda5035f-bdea-44a8-bff8-718164ca20e2	Привет	f	2025-05-11 13:20:46.304
29ef5f20-d60c-4681-9b31-6d120c8a95fa	8ee1f721-6c70-439b-9350-64aef656197e	9da87ac4-d56a-469c-b759-07437c3fb9dd	Пока	f	2025-05-11 13:20:46.304
781efde2-fb24-4b92-a68b-09a25976172d	21cab401-ab6a-4337-8a0a-1e2b94e505d9	61efb116-f7b0-439f-b523-b49712fd22a5	ОТвет	t	2025-05-11 13:20:46.307
002d1ea3-7e4f-477a-b18f-8ef88d189380	789e3a94-59bb-40d0-b964-2504fc5cc406	35a7a99f-9182-49b2-8242-008e23b69c45	Амазонка	t	2025-05-03 18:46:41.405
7276b977-1b91-47cd-ae5f-b8dc4581de2f	789e3a94-59bb-40d0-b964-2504fc5cc406	44b2c51b-4a71-4dba-bbc6-f606947832fe	Нил	f	2025-05-03 18:46:41.405
66476814-6e42-43d6-80b9-7a0e13ce5806	789e3a94-59bb-40d0-b964-2504fc5cc406	61ea8f15-e5ec-41ef-9039-1681efd4cd19	Янцзы	f	2025-05-03 18:46:41.405
a331e0be-2308-4c35-bc50-7baad5206e5c	ed60f70d-404b-42a0-90f5-d86967cd2a3b	774703ce-97c9-4292-8e69-8cc38bf64aff	Водород	t	2025-05-03 18:46:41.408
1c9e3e5d-1f89-49c2-b078-da1b83d188eb	ed60f70d-404b-42a0-90f5-d86967cd2a3b	be355be7-3bca-4a69-aa48-4e071da13734	Гелий	f	2025-05-03 18:46:41.408
e332f685-8461-49cb-b54e-d034a0e8f714	ed60f70d-404b-42a0-90f5-d86967cd2a3b	ce0c5bd5-8ef4-4260-b660-ff754896f479	Литий	f	2025-05-03 18:46:41.408
b0722197-1ed7-4b86-938e-0b1e26dc5500	88b13903-c461-4b76-b143-11c47a40745f	f02a786c-23cb-4818-beec-b86391dd8061	753 до н.э.	t	2025-05-03 18:46:41.409
19f83b83-1b67-412e-a667-57a7559b6d2b	88b13903-c461-4b76-b143-11c47a40745f	680a73aa-9643-4bf3-b56d-3214662e5193	476 н.э.	f	2025-05-03 18:46:41.409
9291d4c3-d36f-4dea-a546-bb8d24932d60	88b13903-c461-4b76-b143-11c47a40745f	7d73ba99-0e7c-4dd9-b144-5188e78c5c4e	1000 н.э.	f	2025-05-03 18:46:41.409
40a8c0ee-9575-4c33-9d48-5ccc5e3cd5b0	9d5bcc0a-777c-404b-82f6-5bf329bb0886	1e3ac945-02ea-477e-a4ee-29df57248a7c	Тихий океан	t	2025-05-03 18:46:41.41
ff364896-6005-4533-ac85-b96a596410a5	9d5bcc0a-777c-404b-82f6-5bf329bb0886	aa395664-8220-4d27-a801-4feec484c819	Атлантический океан	f	2025-05-03 18:46:41.41
95b9fba7-73c7-4278-886d-7c702fd41de8	9d5bcc0a-777c-404b-82f6-5bf329bb0886	35cf3b26-7937-4c51-bc46-3a5e087fe8c7	Индийский океан	f	2025-05-03 18:46:41.41
88b366f5-5741-42ef-b572-6dce2e6f5ecc	4a15a8ef-2d35-4405-91ee-387012842056	acdc7067-a462-4c8a-821b-29e1f090e087	Лев Толстой	t	2025-05-03 18:46:41.411
66ae9e54-81d9-4909-8c28-1df024a2f206	4a15a8ef-2d35-4405-91ee-387012842056	248ffe2f-0bca-4165-acf0-3b56ca9f6914	Федор Достоевский	f	2025-05-03 18:46:41.411
88d4939f-fdab-4a91-ab1a-11f53279cd92	4a15a8ef-2d35-4405-91ee-387012842056	24254a46-f43e-4114-9a67-8f28eceb5cfe	Антон Чехов	f	2025-05-03 18:46:41.411
97159eeb-e1c3-4f18-8e13-9a9019e98cac	3ca376fe-75cf-4dbd-a8a5-72281205b2bf	29f88a93-1cea-4519-b52c-8931ff0bf033	Азот	t	2025-05-03 18:46:41.412
347a9ccf-b6b4-4815-af19-2c25f01f17d6	3ca376fe-75cf-4dbd-a8a5-72281205b2bf	a0948c66-e794-4e83-ae39-e69a9828ad37	Кислород	f	2025-05-03 18:46:41.412
350ef81b-39c1-4e8a-b0f5-faac37c99233	3ca376fe-75cf-4dbd-a8a5-72281205b2bf	f53a703a-7c42-4437-b7ec-0be02daced31	Углекислый газ	f	2025-05-03 18:46:41.412
8da7ffc7-b8ce-470b-8d1b-ff35508eb8b9	fa7df060-9b18-4457-8af8-8dc19a29590d	205441eb-b833-4dd2-9010-c6707be8ceff	Третья	t	2025-05-03 18:46:41.414
4d3854c9-68f8-4270-b6c5-b76c2b80f59e	21cab401-ab6a-4337-8a0a-1e2b94e505d9	64af3639-4abe-4995-9463-cfdfcb12b038	12	t	2025-05-11 13:20:46.307
60098904-c0b0-4a13-a28d-3d825744a9ac	b8fb73b9-7f55-4bcd-90d4-be6e38d9a684	d244ecc7-8dda-4690-bf5e-d79b289fd552	6	t	2025-05-03 20:16:48.133
74dd3b2b-d9cf-4f3f-ba75-d9a6fd1e18a5	b8fb73b9-7f55-4bcd-90d4-be6e38d9a684	5d360883-b7c5-47be-b8d3-b05cf8a5d17b	шесть	t	2025-05-03 20:16:48.133
51390501-9ba8-43b5-adca-d615f51c04cf	b8fb73b9-7f55-4bcd-90d4-be6e38d9a684	a84b63df-da61-4df5-9060-83c9d789b546	сикс	t	2025-05-03 20:16:48.133
6aa5cff7-9907-4b5b-a1b4-53bcd3544a60	dbe33ee0-a6fe-43c3-aef3-132f03cec601	c9c858e6-b349-40a7-87ad-23688c967ae8	Пекин	t	2025-05-06 13:14:57.468
ab3a2a02-58ff-4e0c-864f-f3892bd892b4	dbe33ee0-a6fe-43c3-aef3-132f03cec601	85217cad-64aa-41df-8fe5-a0de46694d8e	Москва	f	2025-05-06 13:14:57.468
6596bf0e-0694-4727-9ec0-0aa12af90f8a	dbe33ee0-a6fe-43c3-aef3-132f03cec601	38a24928-f53e-4bb7-85a1-8a7f484314ee	Лондон	f	2025-05-06 13:14:57.468
83466f05-25c6-4af7-8509-e3910afabf39	18343099-09eb-45c9-8077-6bba73b21aa6	52421d83-3cbe-4375-8c61-38ae5ca2b94b	Трамп	t	2025-05-06 13:14:57.471
77f843d0-9ae1-4c97-b205-9dbf907e25cb	18343099-09eb-45c9-8077-6bba73b21aa6	8470ef2b-9ef3-4822-9b1c-2b860233930a	Путин	f	2025-05-06 13:14:57.471
ade772d2-8d6c-4aa1-b0a5-b05c37342c3e	18343099-09eb-45c9-8077-6bba73b21aa6	63e043df-275e-4ba1-b355-0c94d9035b38	Обама	t	2025-05-06 13:14:57.471
135c33d9-cc6c-403c-9f27-77503efa0fda	76b31e69-3cbd-4d17-87de-362955838ad4	e3518c84-9e66-4851-b6f0-75952dcf9183	Париж	t	2025-05-10 07:20:18.122
eb56a954-19b3-42d5-b569-64e3f28efe9d	76b31e69-3cbd-4d17-87de-362955838ad4	e3cca55f-cb3c-45b3-a1db-a4323e6d3c42	Нью-Йоррк	f	2025-05-10 07:20:18.122
8a298266-7e12-41c8-87fb-faa986e90a53	76b31e69-3cbd-4d17-87de-362955838ad4	4ae37660-bc6f-4957-9c84-56433c8d6232	Марсель	f	2025-05-10 07:20:18.122
2fc1139d-4ff5-4dd4-8710-f5b4e8d7b8fa	3952dd9b-c90c-4373-b960-67c4494062f8	d244ecc7-8dda-4690-bf5e-d79b289fd552	6	t	2025-05-10 07:20:18.125
5e057db7-74ec-48d6-bd58-37f1d289a412	3952dd9b-c90c-4373-b960-67c4494062f8	5d360883-b7c5-47be-b8d3-b05cf8a5d17b	шесть	t	2025-05-10 07:20:18.125
364274bd-ed66-42b4-860a-1c55586961fe	3952dd9b-c90c-4373-b960-67c4494062f8	a84b63df-da61-4df5-9060-83c9d789b546	сикс	t	2025-05-10 07:20:18.125
fdac5e3e-ee0e-4937-bbb5-611633612b07	8cf0c119-9e96-49e9-8a68-edc0fc38d50e	c50ca848-924d-47b9-b233-e3203bc0acf0	Ответ	t	2025-05-11 12:45:23.577
3957d36c-0b91-4e1f-afa2-657b7e5d8031	8cf0c119-9e96-49e9-8a68-edc0fc38d50e	082ca8ee-1b18-4888-b23f-78d4faf4b186	Привет	f	2025-05-11 12:45:23.577
ece47d7d-1880-40eb-8821-f9627b55e2dd	8cf0c119-9e96-49e9-8a68-edc0fc38d50e	4c4b39e9-e727-47cd-835c-510c6147f0fa	Пока	f	2025-05-11 12:45:23.577
933d2c18-4ee7-4dbd-8e8d-f829eb7d6838	9cb4984c-6b2c-45d3-a5a2-c21063b659d5	e3518c84-9e66-4851-b6f0-75952dcf9183	Париж	t	2025-05-13 13:35:53.313
1d775136-2737-4015-90f7-8d94c74f5793	9cb4984c-6b2c-45d3-a5a2-c21063b659d5	e3cca55f-cb3c-45b3-a1db-a4323e6d3c42	Нью-Йоррк	f	2025-05-13 13:35:53.313
59a8d84a-35fa-4f74-8602-e0fc3d7ae746	9cb4984c-6b2c-45d3-a5a2-c21063b659d5	4ae37660-bc6f-4957-9c84-56433c8d6232	Марсель	f	2025-05-13 13:35:53.313
1fb11b1b-2c7f-49eb-9314-533a95c69a3e	4a4aac96-d208-4177-891e-ee4c7d6edb16	d244ecc7-8dda-4690-bf5e-d79b289fd552	6	t	2025-05-13 13:35:53.316
ed06291e-336b-4fb0-af47-ea65b1e876b5	4a4aac96-d208-4177-891e-ee4c7d6edb16	5d360883-b7c5-47be-b8d3-b05cf8a5d17b	шесть	t	2025-05-13 13:35:53.316
04897dd5-8bb7-4cdd-b31a-547ef0ada2ec	4a4aac96-d208-4177-891e-ee4c7d6edb16	a84b63df-da61-4df5-9060-83c9d789b546	сикс	t	2025-05-13 13:35:53.316
e1c1b3d4-9e83-4f56-9d3a-baf50b91e057	d5f284f5-1030-403b-873d-ca36d62d6980	eebc802f-ca0f-476b-90b9-0ca32d859255	ва	t	2025-05-13 13:55:42.688
29d39a9c-4de2-4232-899a-d3ba0881a944	d5f284f5-1030-403b-873d-ca36d62d6980	9be7f666-57fd-4e5c-aa43-7187468db193	пва	f	2025-05-13 13:55:42.688
18771590-bbf2-4b16-ac1e-936a7d7fc2b4	b7801eec-8737-4f5b-9d33-34ab054aa094	8dd699a8-8688-49e6-a67d-0e79facfef5c	Испарение	t	2025-05-15 08:35:35.291
369580f6-a028-4f8b-8da3-c4088fe78266	b7801eec-8737-4f5b-9d33-34ab054aa094	ca09d8d4-039a-4f9f-b49c-6679dbb78bf8	Конденсация	f	2025-05-15 08:35:35.291
e7f901a8-fdb5-4e57-acad-efb9817e3bc6	1527c7ac-b8b2-4b02-9efa-f7814650adda	3d005a15-2b9d-4687-8e19-ab534b664880	Альберт Эйнштейн	t	2025-05-15 08:35:35.293
6f031606-b7c0-4615-a9b0-6ecf878d87f1	ecec7c6a-f5d9-4bc8-a020-24ea3e73a98d	01470513-bb51-4823-a715-f7f162a52274	Эверест	t	2025-05-15 08:35:35.295
d658a747-782e-47fd-a7b4-761e5e09d504	ecec7c6a-f5d9-4bc8-a020-24ea3e73a98d	e6c333f4-bdc7-48ae-912f-8069717012c5	Килиманджаро	f	2025-05-15 08:35:35.295
3f85fe42-61cd-4754-9b6f-8af6b87fafc3	ecec7c6a-f5d9-4bc8-a020-24ea3e73a98d	28aa2a50-4f67-4d31-a87f-3fcfd4648b8d	Монблан	f	2025-05-15 08:35:35.295
2a781d3f-e01f-4e4f-a371-8a25e4cbe5c8	fcae8311-1457-4141-92be-5fbb027859e5	1a3bf7c7-44a3-404b-9933-ccbd2c793100	Python	t	2025-05-15 08:35:35.298
b4b1582a-e85c-4599-aea8-b47a2c5bb0d2	7b2ba73c-a2b4-49b2-bc2b-b06f5e9230b9	2544b954-d3ad-48d8-af3f-e7d56d885267	Токио	t	2025-05-15 08:35:35.3
183270d8-97c7-497c-b8a7-ef7a6ceded6e	7b2ba73c-a2b4-49b2-bc2b-b06f5e9230b9	34b087ea-c066-45b1-875c-1c3cb8ea0004	Киото	f	2025-05-15 08:35:35.3
5eb8fc81-b02a-4483-af02-02af96b547be	7b2ba73c-a2b4-49b2-bc2b-b06f5e9230b9	e16475cf-3218-4150-bbff-d507256a9f97	Осака	f	2025-05-15 08:35:35.3
38db8094-410b-4d2a-9798-8126983d0a52	0dc507d2-0452-4f76-ba13-c7c6f1243cc7	b77784cf-ceb4-46c5-a3b6-5ade0af204ac	1939	t	2025-05-15 08:35:35.301
0c3a5127-53a1-492f-b001-1d4c24445330	7a3dbba0-4cfd-433c-80ec-12337773e1c4	43273bc7-fb78-4f9d-ba8f-bcc17be0418f	Сахара	t	2025-05-15 08:35:35.303
a0800a9c-cd90-44a8-a98a-13351e1893ad	7a3dbba0-4cfd-433c-80ec-12337773e1c4	1edd761e-f237-4ace-a86a-cb67f7033c8e	Гоби	f	2025-05-15 08:35:35.303
856a883f-ac77-40e9-8b6b-af42a7a8162b	7a3dbba0-4cfd-433c-80ec-12337773e1c4	9de2aeeb-9900-4799-8e31-b2702685d453	Антарктида	f	2025-05-15 08:35:35.303
535c3787-d986-43f2-91e9-8e49b67bebed	f863b527-1041-43ee-9807-89d1604a991b	4e5968b6-8212-4b7f-b7af-9366cfdd3e45	Уильям Шекспир	t	2025-05-15 08:35:35.305
1783fea0-8396-4817-b369-c2308a497801	0a856483-c8cd-486e-b247-579a2acad231	06d59ba2-0b48-4083-8a51-41b93d5cc54b	Железо	t	2025-05-15 08:35:35.306
09a638fc-f3da-4c7a-8507-cb44e0495df4	a0cb54cd-0bff-41fc-89f9-5d9b71c35fde	fa64df2a-fad8-4864-acd0-54a213d05d5f	Преобразование света в энергию	t	2025-05-15 08:35:35.308
438f04be-0d39-45be-a206-a85cf43fab03	a0cb54cd-0bff-41fc-89f9-5d9b71c35fde	38631fe7-7cf0-4a97-9e40-9f01e6646b84	Дыхание	f	2025-05-15 08:35:35.308
199a2849-9d49-4ebd-9e68-95af7bd83705	a0cb54cd-0bff-41fc-89f9-5d9b71c35fde	9a119c59-db8b-455c-89b5-64df9507beee	Испарение	f	2025-05-15 08:35:35.308
6293a292-a8ce-4d7a-a040-4646ab42c800	175d82a1-4085-4988-870c-d8a3bd60fec3	9ddca572-c83f-46bb-b6fa-9ce6d4d68398	Париж	t	2025-05-15 08:35:35.31
a3320241-e219-4952-bdc4-c7ad55619ce8	cb5fcb27-80a4-4317-a361-f6608c3899f6	98b870f0-f721-4fd9-a6ef-570d89a9469b	1961	t	2025-05-15 08:35:35.312
c19f0ed2-6e55-4e5a-9688-bc8d23d72fd1	8a2470a1-c6e8-4021-a6b2-edc084626166	f3f4c787-cebb-40f4-91ae-893be4752dcc	Меркурий	t	2025-05-15 08:35:35.313
e30617c7-abff-4819-8172-48af02669533	1464298f-0199-4468-9e5d-ea19bf445120	2caa5201-a71e-4965-a3ce-b40b52638ace	Джордж Оруэлл	t	2025-05-15 08:35:35.316
b79e1892-6c6c-49bd-9056-9edda0fa4cb1	4ad81fa1-97cd-4e1c-839e-a34746cbb830	5a853192-a200-4190-b275-af0984acbee6	Гелий	t	2025-05-15 08:35:35.317
dbaf1738-6723-4fae-ad5c-1ece9715fce9	4ad81fa1-97cd-4e1c-839e-a34746cbb830	cea3d967-87c2-496f-b1b7-6ea866fa326b	Водород	f	2025-05-15 08:35:35.317
30fd2a59-f071-4d47-9b2f-d9bf5e88d06b	ad0f0bfd-5a5b-41e6-a114-5c8a521e24b8	606775b5-cce7-4417-91b0-dd1462935f8f	Ответ	t	2025-05-15 11:08:41.671
fd176223-0b9f-41d9-b9f1-3b68ec30aed2	6c8dc750-7f15-4759-bdf4-a9328651a93d	48cdc254-e377-490b-9a15-4aa792066391	1	t	2025-05-15 11:08:41.674
ea331efa-627e-43f6-8560-d04cb02a9a67	6c8dc750-7f15-4759-bdf4-a9328651a93d	fa1cfab2-0d7f-4313-a886-5b86be61798e	2	f	2025-05-15 11:08:41.674
6b3e1605-64b5-4516-82c6-ae196b1ac61e	6c8dc750-7f15-4759-bdf4-a9328651a93d	e46a55b6-ddcb-413b-8fda-4fa031b3e8d8	3	f	2025-05-15 11:08:41.674
95c20854-b178-409b-a14c-4b15bc18fd2d	61dfb987-6c32-411f-b6b4-f3c666663dea	3af028e3-0d12-40b2-a51e-150662e5a14d	Ответ	t	2025-05-16 10:21:44.977
43cf7e94-baa4-4c15-a082-7dde593a504c	61dfb987-6c32-411f-b6b4-f3c666663dea	cda5035f-bdea-44a8-bff8-718164ca20e2	Привет	f	2025-05-16 10:21:44.977
775b6aee-a0e1-4ba7-8fdd-b901be126630	61dfb987-6c32-411f-b6b4-f3c666663dea	9da87ac4-d56a-469c-b759-07437c3fb9dd	Пока	f	2025-05-16 10:21:44.977
a758b0ab-9d36-4965-8319-4369d4c1bf88	b6720af0-c6b0-4103-93a8-c20d66111cc0	61efb116-f7b0-439f-b523-b49712fd22a5	ОТвет	t	2025-05-16 10:21:44.98
509b7ba5-d5f9-488d-b905-0b245a95a4df	b6720af0-c6b0-4103-93a8-c20d66111cc0	64af3639-4abe-4995-9463-cfdfcb12b038	12	t	2025-05-16 10:21:44.98
a5ff85f5-15a6-43f8-b103-e8cb0996dd14	3a7e613a-6e48-4f69-be15-dd4718d5fdc0	dad75a46-653d-4499-8cab-bda58d824a86	ответ	t	2025-05-16 10:21:44.982
1994b11a-05c7-4e3e-ac64-673c11ab37f2	b979696c-e6ea-4dca-9c5d-d27ca12ad210	15b044d4-f5cc-48b7-a02a-af9f81edffd0	1939	t	2025-05-17 06:08:36.928
0727ac47-cc48-4c83-87c4-eb5c3c8c1f76	79f7d050-fb34-45cd-b2f2-2c495b7fe6eb	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	Это тогда, когда	t	2025-05-17 06:08:36.931
e92b6018-db59-48bd-b062-57010ed6e359	79f7d050-fb34-45cd-b2f2-2c495b7fe6eb	66a20af2-7215-4705-87e7-3deac6a27385	Это когда ты всегда улыбаешься, даже если у тебя плохое настроение	f	2025-05-17 06:08:36.931
54596497-3d51-4226-b8ed-f394b3a664fe	79f7d050-fb34-45cd-b2f2-2c495b7fe6eb	2b789d5f-d436-4b01-b454-6e2296fdb181	Это когда ты покупаешь подарки всем на день рождения	f	2025-05-17 06:08:36.931
4b6e8c9e-e2c6-452b-9df5-a72ac6c8c9fc	79f7d050-fb34-45cd-b2f2-2c495b7fe6eb	70e1ba39-ad67-4625-bc31-5e8fe1b138fc	Это когда ты делаешь все, что говорят старшие	f	2025-05-17 06:08:36.931
8f9e4eb0-d8e3-48c7-8c2b-7fefc8b5924d	7699c31c-451e-4725-bfe3-717df312ee6e	606775b5-cce7-4417-91b0-dd1462935f8f	Ответ	t	2025-05-18 07:58:25.012
d0bc4f95-c985-43de-9f98-7646b212ea59	dbb6fc08-ce9b-4c8c-a618-c16df88a71df	48cdc254-e377-490b-9a15-4aa792066391	1	t	2025-05-18 07:58:25.014
e0167901-bbdb-4b74-97e5-5c9763c38ac7	dbb6fc08-ce9b-4c8c-a618-c16df88a71df	fa1cfab2-0d7f-4313-a886-5b86be61798e	2	f	2025-05-18 07:58:25.014
29b95b6e-80fb-46c1-a11a-7f7142cdb501	dbb6fc08-ce9b-4c8c-a618-c16df88a71df	e46a55b6-ddcb-413b-8fda-4fa031b3e8d8	3	f	2025-05-18 07:58:25.014
836effbb-3562-4f00-bc85-96d1e87e8135	01cdc11e-0e02-4521-acd6-a897c902be74	606775b5-cce7-4417-91b0-dd1462935f8f	Ответ	t	2025-05-18 07:59:57.52
35cdd054-2c8b-455f-ba48-7f64a9268243	d9b06525-91a2-4584-af83-ca9eed738bd4	48cdc254-e377-490b-9a15-4aa792066391	1	t	2025-05-18 07:59:57.522
dc68f085-0d53-409c-b0ba-8c8b67a0726b	d9b06525-91a2-4584-af83-ca9eed738bd4	fa1cfab2-0d7f-4313-a886-5b86be61798e	2	f	2025-05-18 07:59:57.522
fd71531f-6ecb-4249-aa83-feb6789acc1e	d9b06525-91a2-4584-af83-ca9eed738bd4	e46a55b6-ddcb-413b-8fda-4fa031b3e8d8	3	f	2025-05-18 07:59:57.522
2518e174-87e9-4cdc-8b32-1523ac1e0a0c	2de64719-44b9-43bf-b654-64ab47a731ad	15b044d4-f5cc-48b7-a02a-af9f81edffd0	1939	t	2025-05-18 15:29:14.471
cedf8964-ab3b-45c1-904a-85be7d46ee1a	6ddb143d-6eec-4d76-9516-65e1eea12fba	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	Это тогда, когда	t	2025-05-18 15:29:14.474
0d0857a6-8acd-422a-9908-188df94d4d6e	6ddb143d-6eec-4d76-9516-65e1eea12fba	66a20af2-7215-4705-87e7-3deac6a27385	Это когда ты всегда улыбаешься, даже если у тебя плохое настроение	f	2025-05-18 15:29:14.474
9d2fbbc5-0100-4929-8176-b4abe4f665a6	6ddb143d-6eec-4d76-9516-65e1eea12fba	2b789d5f-d436-4b01-b454-6e2296fdb181	Это когда ты покупаешь подарки всем на день рождения	f	2025-05-18 15:29:14.474
61f8694f-5067-422b-82b3-850b9bfbdf39	6ddb143d-6eec-4d76-9516-65e1eea12fba	70e1ba39-ad67-4625-bc31-5e8fe1b138fc	Это когда ты делаешь все, что говорят старшие	f	2025-05-18 15:29:14.474
9a9af935-f30c-4b7a-aebc-01f74bcf495d	114bb203-44b0-4cfd-aff0-e7362c734835	15b044d4-f5cc-48b7-a02a-af9f81edffd0	1939	t	2025-05-19 05:38:41.527
754ded26-77b8-434a-9e85-753dbe9b524b	acde418f-cb5d-4b5f-802a-d14415f59a59	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	Это тогда, когда	t	2025-05-19 05:38:41.53
b10e4cbc-9a4a-4211-9b7d-536868290860	acde418f-cb5d-4b5f-802a-d14415f59a59	66a20af2-7215-4705-87e7-3deac6a27385	Это когда ты всегда улыбаешься, даже если у тебя плохое настроение	f	2025-05-19 05:38:41.53
c89e598e-1c7e-4442-b9ad-4e01a90e5eff	acde418f-cb5d-4b5f-802a-d14415f59a59	2b789d5f-d436-4b01-b454-6e2296fdb181	Это когда ты покупаешь подарки всем на день рождения	f	2025-05-19 05:38:41.53
8dcedbf6-1219-4f63-bde7-10641581e1c9	acde418f-cb5d-4b5f-802a-d14415f59a59	70e1ba39-ad67-4625-bc31-5e8fe1b138fc	Это когда ты делаешь все, что говорят старшие	f	2025-05-19 05:38:41.53
e17d6e12-68bd-4fd5-b9d8-ce2f86ccb8c3	bac7a861-c8b7-4a60-90a7-236336094be0	752d162e-c2e0-4c4e-8f2b-05328a6f11db	Хорошо	t	2025-05-19 05:38:41.532
c77bfef9-0415-4e35-abe7-faacc3340ca6	23645b24-2e6a-479a-8859-b32e2cc013da	15b044d4-f5cc-48b7-a02a-af9f81edffd0	1939	t	2025-05-19 06:26:50.346
a4d03152-287e-40e6-b037-7c235c8caaf2	8c7930a2-6160-4c9e-8e4b-d7ac69c5a8cd	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	Это тогда, когда	t	2025-05-19 06:26:50.348
7262a178-c670-4207-886c-d46481c63b6a	8c7930a2-6160-4c9e-8e4b-d7ac69c5a8cd	66a20af2-7215-4705-87e7-3deac6a27385	Это когда ты всегда улыбаешься, даже если у тебя плохое настроение	f	2025-05-19 06:26:50.348
1c372e2e-078c-421f-911d-75c038c0cdde	8c7930a2-6160-4c9e-8e4b-d7ac69c5a8cd	2b789d5f-d436-4b01-b454-6e2296fdb181	Это когда ты покупаешь подарки всем на день рождения	f	2025-05-19 06:26:50.348
15f2b8b4-aec4-494e-a58e-0dd7756d7fbe	8c7930a2-6160-4c9e-8e4b-d7ac69c5a8cd	70e1ba39-ad67-4625-bc31-5e8fe1b138fc	Это когда ты делаешь все, что говорят старшие	f	2025-05-19 06:26:50.348
a5d60b0c-3bf6-4b74-a97c-1693087e5c5e	2164ef62-dd31-4d38-9eb5-57e22f423710	752d162e-c2e0-4c4e-8f2b-05328a6f11db	Хорошо	t	2025-05-19 06:26:50.349
\.


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (id, "questionId", text, "isCorrect", "isGenerated", "createdAt", "updatedAt") FROM stdin;
35a7a99f-9182-49b2-8242-008e23b69c45	e8613a4d-2b6e-4564-aa73-e50c887365c5	Амазонка	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
44b2c51b-4a71-4dba-bbc6-f606947832fe	e8613a4d-2b6e-4564-aa73-e50c887365c5	Нил	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
61ea8f15-e5ec-41ef-9039-1681efd4cd19	e8613a4d-2b6e-4564-aa73-e50c887365c5	Янцзы	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
774703ce-97c9-4292-8e69-8cc38bf64aff	3545e654-ab95-4c30-bb59-f7b64c3090fb	Водород	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
be355be7-3bca-4a69-aa48-4e071da13734	3545e654-ab95-4c30-bb59-f7b64c3090fb	Гелий	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
ce0c5bd5-8ef4-4260-b660-ff754896f479	3545e654-ab95-4c30-bb59-f7b64c3090fb	Литий	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
f02a786c-23cb-4818-beec-b86391dd8061	39804564-e24c-47d3-8e95-3d1d87a4143a	753 до н.э.	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
680a73aa-9643-4bf3-b56d-3214662e5193	39804564-e24c-47d3-8e95-3d1d87a4143a	476 н.э.	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
7d73ba99-0e7c-4dd9-b144-5188e78c5c4e	39804564-e24c-47d3-8e95-3d1d87a4143a	1000 н.э.	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
1e3ac945-02ea-477e-a4ee-29df57248a7c	a430e065-c913-49b6-acaa-cb9938815467	Тихий океан	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
aa395664-8220-4d27-a801-4feec484c819	a430e065-c913-49b6-acaa-cb9938815467	Атлантический океан	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
35cf3b26-7937-4c51-bc46-3a5e087fe8c7	a430e065-c913-49b6-acaa-cb9938815467	Индийский океан	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
acdc7067-a462-4c8a-821b-29e1f090e087	545f7221-9c34-41d7-a762-b4dcb7c6e869	Лев Толстой	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
248ffe2f-0bca-4165-acf0-3b56ca9f6914	545f7221-9c34-41d7-a762-b4dcb7c6e869	Федор Достоевский	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
24254a46-f43e-4114-9a67-8f28eceb5cfe	545f7221-9c34-41d7-a762-b4dcb7c6e869	Антон Чехов	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
29f88a93-1cea-4519-b52c-8931ff0bf033	2deda14f-6c87-4059-a179-5744b2056541	Азот	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
a0948c66-e794-4e83-ae39-e69a9828ad37	2deda14f-6c87-4059-a179-5744b2056541	Кислород	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
f53a703a-7c42-4437-b7ec-0be02daced31	2deda14f-6c87-4059-a179-5744b2056541	Углекислый газ	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
205441eb-b833-4dd2-9010-c6707be8ceff	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Третья	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
6ffc08d6-dbe3-481e-9d78-4ef11e147ca5	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Вторая	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
7e8a0d33-bb79-4c9a-8186-138d79b96435	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Четвертая	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
5a5193b2-081e-4961-b1a2-cfcedf618d33	40f3a4de-8d75-4c4b-8419-d8cda0392214	Кислород	t	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
cddf9633-ddc5-4c9b-b743-049db5873b3e	40f3a4de-8d75-4c4b-8419-d8cda0392214	Золото	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
e15b725b-3dca-40f3-a0e8-5ff4dc729d84	40f3a4de-8d75-4c4b-8419-d8cda0392214	Серебро	f	f	2025-04-04 14:12:52.297	2025-04-04 14:12:52.297
324c3461-ca25-4950-96ac-75dbbdf76fec	9726d606-a347-4635-9876-5c7125385d6c	Испарение	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
c5972d97-d15a-4ee0-98e7-d3eb73f57cc9	9726d606-a347-4635-9876-5c7125385d6c	Конденсация	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
1ad45e03-76b9-4caf-9844-345e97c55e6c	07fb3c76-fe0e-44cf-a324-467589315dbb	Альберт Эйнштейн	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
6a04b240-fea0-4a57-81ef-a7a0e6e60689	9b045631-1094-4eb2-9b02-f46b69a0962a	Эверест	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
b6897461-f227-46da-bb7a-44db0c8f8afc	9b045631-1094-4eb2-9b02-f46b69a0962a	Килиманджаро	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
0633bd62-0917-4a84-b2d6-49dcbcc0a579	9b045631-1094-4eb2-9b02-f46b69a0962a	Монблан	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
5f5931d2-7ebd-4707-a4fc-96435369dd2f	52d85dc6-d634-42cf-a63b-cb1971a77da8	Python	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
4d890df2-ea36-45c4-8d5a-5e1adcabb1e0	31419218-3b28-43a2-9bd9-749cb960b4f6	Токио	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
6075380d-77dd-4940-8028-d31d8f22338a	31419218-3b28-43a2-9bd9-749cb960b4f6	Киото	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
275000c7-a7bc-428a-a286-1782c6289dbe	31419218-3b28-43a2-9bd9-749cb960b4f6	Осака	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
9187393d-d79f-427e-ac1f-7be5dd563cff	85153974-7836-4efb-854f-f8fbb86c7776	1939	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
42c8f768-e2b4-4bd0-a10d-c12a42a890c8	2c0013c8-b3e1-42b4-920d-ab6aeb2f8a91	Сахара	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
6bd9e6d9-4976-46f3-85d5-dbd96996c24d	2c0013c8-b3e1-42b4-920d-ab6aeb2f8a91	Гоби	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
7cdc7e57-deac-41c5-9b0e-1c598db3f8c8	2c0013c8-b3e1-42b4-920d-ab6aeb2f8a91	Антарктида	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
10dc9564-0de8-40c3-946c-8382e2266078	f151c5f3-eb8a-4705-972c-5f5ec6356ece	Уильям Шекспир	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
2a8c922d-808b-4016-bc91-cb3fe72e63fd	dc8ae466-59a4-4348-b6a0-74a8de7ff31d	Железо	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
fce8534b-a2fd-4911-85d8-60ed65cf0029	1cc16ab6-b9e3-418a-8cb5-674cb363cce7	Преобразование света в энергию	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
a9841452-0ccf-414b-a64f-eded092af075	1cc16ab6-b9e3-418a-8cb5-674cb363cce7	Дыхание	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
a6e8bdab-92fe-443c-9099-b246bec45fcf	1cc16ab6-b9e3-418a-8cb5-674cb363cce7	Испарение	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
c99da49b-8a73-4bbb-8bfa-7f6351ae68eb	af4dc5d4-c882-48d4-b125-2a53a775436a	Париж	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
2b1f423b-56d5-469c-bcc4-8f049f84971a	b0d1e852-c7f4-4532-80ce-34e96b0f6a00	1961	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
14fe14ed-a3dd-4507-9164-939f2e206649	ae0d999d-db1a-4b91-a70f-0f79e7ace4fe	Меркурий	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
d9b3d328-d1fa-4ae6-9c24-ec4e9ac51edb	88f1a1d7-acf8-478f-954f-d31f5a6ea9b4	Джордж Оруэлл	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
cdbbf38f-6787-4de5-9491-56b20b528031	db2c149b-d18f-4bcc-8ad1-4b9d47310248	Гелий	t	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
069d6fd4-ce3f-462d-8c1c-06a15839d97d	db2c149b-d18f-4bcc-8ad1-4b9d47310248	Водород	f	f	2025-04-04 14:16:48.494	2025-04-04 14:16:48.494
c9c858e6-b349-40a7-87ad-23688c967ae8	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Пекин	t	f	2025-04-21 07:30:16.481	2025-04-21 07:30:16.481
85217cad-64aa-41df-8fe5-a0de46694d8e	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Москва	f	f	2025-04-21 07:30:16.481	2025-04-21 07:30:16.481
38a24928-f53e-4bb7-85a1-8a7f484314ee	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Лондон	f	f	2025-04-21 07:30:16.481	2025-04-21 07:30:16.481
52421d83-3cbe-4375-8c61-38ae5ca2b94b	3d73bad3-223e-483f-b766-adde87a2769c	Трамп	t	f	2025-04-21 07:30:16.481	2025-04-21 07:30:16.481
8470ef2b-9ef3-4822-9b1c-2b860233930a	3d73bad3-223e-483f-b766-adde87a2769c	Путин	f	f	2025-04-21 07:30:16.481	2025-04-21 07:30:16.481
63e043df-275e-4ba1-b355-0c94d9035b38	3d73bad3-223e-483f-b766-adde87a2769c	Обама	t	f	2025-04-21 07:30:16.481	2025-04-21 07:30:16.481
e3518c84-9e66-4851-b6f0-75952dcf9183	ac3ef65a-e601-49ce-a800-91a62c321df7	Париж	t	f	2025-05-03 18:17:07.057	2025-05-03 18:17:07.057
e3cca55f-cb3c-45b3-a1db-a4323e6d3c42	ac3ef65a-e601-49ce-a800-91a62c321df7	Нью-Йоррк	f	f	2025-05-03 18:17:07.057	2025-05-03 18:17:07.057
4ae37660-bc6f-4957-9c84-56433c8d6232	ac3ef65a-e601-49ce-a800-91a62c321df7	Марсель	f	f	2025-05-03 18:17:07.057	2025-05-03 18:17:07.057
d244ecc7-8dda-4690-bf5e-d79b289fd552	1fdc999a-b2d5-4a93-88a5-b851df97d246	6	t	f	2025-05-03 18:17:07.057	2025-05-03 18:17:07.057
5d360883-b7c5-47be-b8d3-b05cf8a5d17b	1fdc999a-b2d5-4a93-88a5-b851df97d246	шесть	t	f	2025-05-03 18:17:07.057	2025-05-03 18:17:07.057
a84b63df-da61-4df5-9060-83c9d789b546	1fdc999a-b2d5-4a93-88a5-b851df97d246	сикс	t	f	2025-05-03 18:17:07.057	2025-05-03 18:17:07.057
628f2495-8f30-4403-bf72-fc353f900097	eb8767f5-6231-43e9-ab75-80926aaa22b6	11	t	f	2025-05-06 10:45:01.239	2025-05-06 10:45:42.057
d7ceae64-41b5-4d97-b83e-080086bce942	eb8767f5-6231-43e9-ab75-80926aaa22b6	12	t	f	2025-05-06 10:45:42.058	2025-05-06 10:45:42.058
e11228c1-b288-44a6-bdf3-df6213fa9843	eb8767f5-6231-43e9-ab75-80926aaa22b6	123	t	f	2025-05-06 10:45:42.058	2025-05-06 10:45:42.058
18daf1f9-2f04-47b0-b1cc-f86f21294596	3a0a76b2-3785-4ff1-90fc-0c019fa928d7	fsd	t	f	2025-05-06 07:20:59.86	2025-05-06 10:45:42.051
3af028e3-0d12-40b2-a51e-150662e5a14d	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	Ответ	t	f	2025-05-11 12:46:07.627	2025-05-16 10:21:31.327
eebc802f-ca0f-476b-90b9-0ca32d859255	bc2a800b-d1bb-4c6e-9e1f-77a688fbdf33	ва	t	f	2025-04-14 16:20:15.28	2025-05-13 14:21:51.807
9be7f666-57fd-4e5c-aa43-7187468db193	bc2a800b-d1bb-4c6e-9e1f-77a688fbdf33	пва	f	f	2025-04-14 16:20:15.28	2025-05-13 14:21:51.808
606775b5-cce7-4417-91b0-dd1462935f8f	4f7bffee-b165-4115-9f2f-8d6994a71c6e	Ответ	t	f	2025-05-15 09:21:36.29	2025-05-15 09:21:36.29
48cdc254-e377-490b-9a15-4aa792066391	15882fbc-b27a-405f-9986-d4f43e0b9c8c	1	t	f	2025-05-15 09:21:02.064	2025-05-15 09:21:36.303
fa1cfab2-0d7f-4313-a886-5b86be61798e	15882fbc-b27a-405f-9986-d4f43e0b9c8c	2	f	f	2025-05-15 09:21:02.064	2025-05-15 09:21:36.304
e46a55b6-ddcb-413b-8fda-4fa031b3e8d8	15882fbc-b27a-405f-9986-d4f43e0b9c8c	3	f	f	2025-05-15 09:21:02.064	2025-05-15 09:21:36.305
cda5035f-bdea-44a8-bff8-718164ca20e2	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	Привет	f	f	2025-05-11 12:46:07.627	2025-05-16 10:21:31.328
9da87ac4-d56a-469c-b759-07437c3fb9dd	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	Пока	f	f	2025-05-11 12:46:07.627	2025-05-16 10:21:31.329
61efb116-f7b0-439f-b523-b49712fd22a5	bcc849a8-fdf7-4daa-8326-0dc108480e8c	ОТвет	t	f	2025-05-11 12:46:07.631	2025-05-16 10:21:31.341
64af3639-4abe-4995-9463-cfdfcb12b038	bcc849a8-fdf7-4daa-8326-0dc108480e8c	12	t	f	2025-05-11 12:46:07.631	2025-05-16 10:21:31.342
dad75a46-653d-4499-8cab-bda58d824a86	4c67c2a8-0138-4d1b-9e5a-2cc652ac1114	ответ	t	f	2025-05-16 10:21:31.344	2025-05-16 10:21:31.344
8dd699a8-8688-49e6-a67d-0e79facfef5c	f2b979c4-c4de-41ea-b55a-f2203875be91	Испарение	t	f	2025-05-12 20:39:02.35	2025-05-14 09:49:42.007
ca09d8d4-039a-4f9f-b49c-6679dbb78bf8	f2b979c4-c4de-41ea-b55a-f2203875be91	Конденсация	f	f	2025-05-12 20:39:02.35	2025-05-14 09:49:42.008
3d005a15-2b9d-4687-8e19-ab534b664880	1fe7bb68-976a-401b-b2b3-390224a660ce	Альберт Эйнштейн	t	f	2025-05-12 20:39:02.355	2025-05-14 09:49:42.014
01470513-bb51-4823-a715-f7f162a52274	38593e7a-4aa1-49d9-8910-3f0ab09f88db	Эверест	t	f	2025-05-12 20:39:02.357	2025-05-14 09:49:42.028
e6c333f4-bdc7-48ae-912f-8069717012c5	38593e7a-4aa1-49d9-8910-3f0ab09f88db	Килиманджаро	f	f	2025-05-12 20:39:02.357	2025-05-14 09:49:42.029
28aa2a50-4f67-4d31-a87f-3fcfd4648b8d	38593e7a-4aa1-49d9-8910-3f0ab09f88db	Монблан	f	f	2025-05-12 20:39:02.357	2025-05-14 09:49:42.029
1a3bf7c7-44a3-404b-9933-ccbd2c793100	8a84d599-7560-49db-8ad5-d619106462ed	Python	t	f	2025-05-12 20:39:02.359	2025-05-14 09:49:42.036
2544b954-d3ad-48d8-af3f-e7d56d885267	ec19e170-6e8f-45bd-a314-39416f47faff	Токио	t	f	2025-05-12 20:39:02.361	2025-05-14 09:49:42.048
34b087ea-c066-45b1-875c-1c3cb8ea0004	ec19e170-6e8f-45bd-a314-39416f47faff	Киото	f	f	2025-05-12 20:39:02.361	2025-05-14 09:49:42.048
e16475cf-3218-4150-bbff-d507256a9f97	ec19e170-6e8f-45bd-a314-39416f47faff	Осака	f	f	2025-05-12 20:39:02.361	2025-05-14 09:49:42.049
b77784cf-ceb4-46c5-a3b6-5ade0af204ac	31f1da3a-1d02-4190-8e34-fff34990e890	1939	t	f	2025-05-12 20:39:02.363	2025-05-14 09:49:42.055
43273bc7-fb78-4f9d-ba8f-bcc17be0418f	6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	Сахара	t	f	2025-05-12 20:39:02.365	2025-05-14 09:49:42.067
1edd761e-f237-4ace-a86a-cb67f7033c8e	6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	Гоби	f	f	2025-05-12 20:39:02.365	2025-05-14 09:49:42.067
9de2aeeb-9900-4799-8e31-b2702685d453	6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	Антарктида	f	f	2025-05-12 20:39:02.365	2025-05-14 09:49:42.068
4e5968b6-8212-4b7f-b7af-9366cfdd3e45	4b3e76ea-de82-4c54-a417-5679c65412db	Уильям Шекспир	t	f	2025-05-12 20:39:02.367	2025-05-14 09:49:42.074
06d59ba2-0b48-4083-8a51-41b93d5cc54b	21bd4fc4-962a-4294-b162-1f96b7b2e25e	Железо	t	f	2025-05-12 20:39:02.369	2025-05-14 09:49:42.081
fa64df2a-fad8-4864-acd0-54a213d05d5f	82bc16dc-5ade-4929-9c15-2f26c292cf2e	Преобразование света в энергию	t	f	2025-05-12 20:39:02.371	2025-05-14 09:49:42.093
38631fe7-7cf0-4a97-9e40-9f01e6646b84	82bc16dc-5ade-4929-9c15-2f26c292cf2e	Дыхание	f	f	2025-05-12 20:39:02.371	2025-05-14 09:49:42.093
9a119c59-db8b-455c-89b5-64df9507beee	82bc16dc-5ade-4929-9c15-2f26c292cf2e	Испарение	f	f	2025-05-12 20:39:02.371	2025-05-14 09:49:42.094
9ddca572-c83f-46bb-b6fa-9ce6d4d68398	ad712050-a96f-420c-bc56-52d49d951695	Париж	t	f	2025-05-12 20:39:02.372	2025-05-14 09:49:42.101
98b870f0-f721-4fd9-a6ef-570d89a9469b	f4dc28b4-930e-44fc-ae7b-d40b6323f015	1961	t	f	2025-05-12 20:39:02.375	2025-05-14 09:49:42.107
f3f4c787-cebb-40f4-91ae-893be4752dcc	8d736281-7f95-4a35-a87c-d0491371ea20	Меркурий	t	f	2025-05-12 20:39:02.377	2025-05-14 09:49:42.114
2caa5201-a71e-4965-a3ce-b40b52638ace	9f8ff4d9-c1bf-44ab-8c7d-17bbe67411ab	Джордж Оруэлл	t	f	2025-05-12 20:39:02.379	2025-05-14 09:49:42.12
5a853192-a200-4190-b275-af0984acbee6	a18ceba7-1834-46d3-972c-4ff45b9e4323	Гелий	t	f	2025-05-12 20:39:02.381	2025-05-14 09:49:42.129
cea3d967-87c2-496f-b1b7-6ea866fa326b	a18ceba7-1834-46d3-972c-4ff45b9e4323	Водород	f	f	2025-05-12 20:39:02.381	2025-05-14 09:49:42.129
15b044d4-f5cc-48b7-a02a-af9f81edffd0	db87c945-c98c-48d7-b0f7-823491f62b96	1939	t	f	2025-05-16 20:22:42.214	2025-05-19 05:38:41.492
b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	20e37c55-ed75-48f8-9d7c-87d7567b2001	Это тогда, когда	t	f	2025-05-16 18:21:09.387	2025-05-19 05:38:41.506
66a20af2-7215-4705-87e7-3deac6a27385	20e37c55-ed75-48f8-9d7c-87d7567b2001	Это когда ты всегда улыбаешься, даже если у тебя плохое настроение	f	f	2025-05-16 18:21:09.387	2025-05-19 05:38:41.507
2b789d5f-d436-4b01-b454-6e2296fdb181	20e37c55-ed75-48f8-9d7c-87d7567b2001	Это когда ты покупаешь подарки всем на день рождения	f	f	2025-05-16 18:21:09.387	2025-05-19 05:38:41.508
70e1ba39-ad67-4625-bc31-5e8fe1b138fc	20e37c55-ed75-48f8-9d7c-87d7567b2001	Это когда ты делаешь все, что говорят старшие	f	f	2025-05-16 18:21:09.387	2025-05-19 05:38:41.508
752d162e-c2e0-4c4e-8f2b-05328a6f11db	5232f5ab-ddc2-42a8-8dee-22636818d67f	Хорошо	t	f	2025-05-19 05:38:41.511	2025-05-19 05:38:41.511
\.


--
-- Data for Name: question_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_snapshots (id, "testSnapshotId", "originalTestId", text, "order", type, "createdAt") FROM stdin;
2343764c-08a2-4eab-9dde-26e9c8b88f13	b45eac52-b59d-4e7e-97bb-2172925e2a1b	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Столицца Китая	1	SINGLE_CHOICE	2025-04-21 12:04:39.768
4a346496-7fbe-4bbd-923d-fa29b632a244	b45eac52-b59d-4e7e-97bb-2172925e2a1b	3d73bad3-223e-483f-b766-adde87a2769c	Президент США	2	MULTIPLE_CHOICE	2025-04-21 12:04:39.773
de11eca3-1c15-4513-90d6-ed43c5cd2746	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	e8613a4d-2b6e-4564-aa73-e50c887365c5	Какая самая длинная река в мире?	1	SINGLE_CHOICE	2025-04-13 07:49:37.003
eb7b2fc6-1186-4c58-baf8-d0f5738d3062	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	3545e654-ab95-4c30-bb59-f7b64c3090fb	Какой элемент таблицы Менделеева имеет атомный номер 1?	2	SINGLE_CHOICE	2025-04-13 07:49:37.005
7f7b8995-c4fd-4aac-9e05-ad9aaf772393	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	39804564-e24c-47d3-8e95-3d1d87a4143a	Какой год считается годом основания Рима?	3	SINGLE_CHOICE	2025-04-13 07:49:37.006
59d015bd-bec5-47f8-a2e8-a95131dba741	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	a430e065-c913-49b6-acaa-cb9938815467	Какой самый большой океан на Земле?	4	SINGLE_CHOICE	2025-04-13 07:49:37.007
b4eddc44-0f33-4b60-9acd-aabe28a5da69	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	545f7221-9c34-41d7-a762-b4dcb7c6e869	Кто написал 'Войну и мир'?	5	SINGLE_CHOICE	2025-04-13 07:49:37.008
5acead24-daf9-4a68-a591-f87b22a88964	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	2deda14f-6c87-4059-a179-5744b2056541	Какой газ составляет большую часть атмосферы Земли?	6	SINGLE_CHOICE	2025-04-13 07:49:37.009
98210cdf-9ed8-4bc9-b266-e60b68a5c901	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Какой планетой является Земля?	7	SINGLE_CHOICE	2025-04-13 07:49:37.01
96a4e4cf-50e4-4593-9a92-465c192f5b22	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	40f3a4de-8d75-4c4b-8419-d8cda0392214	Какой элемент имеет химический символ 'O'?	8	SINGLE_CHOICE	2025-04-13 07:49:37.011
53a64d0b-d527-4fd7-9140-cefbbeb04e27	c41a12b2-00fe-45c8-8c0f-0299bf34bee2	99ada15b-7218-4620-a308-ae9e9cf5d631	Столица китая	1	SINGLE_CHOICE	2025-04-15 07:39:44.417
5c63423e-e0d0-4fff-993c-e9f1e0690e26	c41a12b2-00fe-45c8-8c0f-0299bf34bee2	6b0f0128-f28d-4647-94ba-3f9904e2e5a2	Сколько будет 5+5?	2	MULTIPLE_CHOICE	2025-04-15 07:39:44.421
9f51bab0-1272-482a-a29d-7dc0e849bd67	ffc79b8f-e338-4bb7-8fc6-58a2f441ff64	bc2a800b-d1bb-4c6e-9e1f-77a688fbdf33	павп пва	2	SINGLE_CHOICE	2025-04-15 08:49:03.495
b3d87169-7c1f-440e-8b25-793225575931	4d860683-4228-4b30-a777-daf183e3dcc7	99ada15b-7218-4620-a308-ae9e9cf5d631	Столица китая	1	SINGLE_CHOICE	2025-04-18 08:35:59.398
4927387b-643e-4119-85f9-579283d28bb9	4d860683-4228-4b30-a777-daf183e3dcc7	6b0f0128-f28d-4647-94ba-3f9904e2e5a2	Сколько будет 5+5?	2	MULTIPLE_CHOICE	2025-04-18 08:35:59.399
8d31db29-7007-498f-ab0e-a9dc8a3e1c41	8967b96a-4400-4603-9e60-e373f29376cc	99ada15b-7218-4620-a308-ae9e9cf5d631	Столица китая	1	SINGLE_CHOICE	2025-04-18 08:36:56.928
1be8dbe3-1c79-4f7b-bec9-f1d6a2d46374	8967b96a-4400-4603-9e60-e373f29376cc	6b0f0128-f28d-4647-94ba-3f9904e2e5a2	Сколько будет 5+5?	2	MULTIPLE_CHOICE	2025-04-18 08:36:56.929
087dfaf9-9e2b-494f-b9ec-5bd73e5b733d	176e701b-2750-49d9-941f-04f099c67cce	99ada15b-7218-4620-a308-ae9e9cf5d631	Столица китая	1	SINGLE_CHOICE	2025-04-18 08:39:17.977
d48fc59e-ded3-4074-83f5-4432df7a4c09	176e701b-2750-49d9-941f-04f099c67cce	6b0f0128-f28d-4647-94ba-3f9904e2e5a2	Сколько будет 5+5?	2	MULTIPLE_CHOICE	2025-04-18 08:39:17.977
4d7e2fd5-88e5-479f-82a4-8c9bf8f31427	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	9726d606-a347-4635-9876-5c7125385d6c	Как называется процесс превращения воды в пар?	1	SINGLE_CHOICE	2025-04-18 08:18:50.462
ecd11c06-79a2-4378-acc5-991f26c772e1	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	07fb3c76-fe0e-44cf-a324-467589315dbb	Кто является автором теории относительности?	2	SINGLE_CHOICE	2025-04-18 08:18:50.463
a8896a95-6d69-4b54-a431-d047d7cc0df2	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	9b045631-1094-4eb2-9b02-f46b69a0962a	Как называется самая высокая гора в мире?	3	SINGLE_CHOICE	2025-04-18 08:18:50.463
2ae08fea-eef1-45e1-8df1-7130f6782f27	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	52d85dc6-d634-42cf-a63b-cb1971a77da8	Какой язык программирования был создан Гвидо ван Россумом?	4	SINGLE_CHOICE	2025-04-18 08:18:50.464
465499dd-024d-4094-b5c7-227304619867	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	31419218-3b28-43a2-9bd9-749cb960b4f6	Как называется столица Японии?	5	SINGLE_CHOICE	2025-04-18 08:18:50.465
a496456b-4dff-4fd5-a1bf-496fefd14ebd	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	85153974-7836-4efb-854f-f8fbb86c7776	Какой год считается началом Второй мировой войны?	6	SINGLE_CHOICE	2025-04-18 08:18:50.466
ae61a3c7-4aba-4ee0-bfbe-206be323c2cd	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	2c0013c8-b3e1-42b4-920d-ab6aeb2f8a91	Как называется самая большая пустыня в мире?	7	SINGLE_CHOICE	2025-04-18 08:18:50.466
dd884df7-a6da-40f9-8b17-9e348633c5d9	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	f151c5f3-eb8a-4705-972c-5f5ec6356ece	Кто написал 'Гамлета'?	8	SINGLE_CHOICE	2025-04-18 08:18:50.467
067482d8-ed7c-4b21-9b27-9c3c5f16965b	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	dc8ae466-59a4-4348-b6a0-74a8de7ff31d	Какой химический элемент имеет символ 'Fe'?	9	SINGLE_CHOICE	2025-04-18 08:18:50.468
6ab05c3c-3fa6-45bd-a1c3-524f5674cb81	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	1cc16ab6-b9e3-418a-8cb5-674cb363cce7	Как называется процесс фотосинтеза у растений?	10	SINGLE_CHOICE	2025-04-18 08:18:50.468
024c9550-4229-4a85-99a0-d907c560ef9e	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	af4dc5d4-c882-48d4-b125-2a53a775436a	Какой город является столицей Франции?	11	SINGLE_CHOICE	2025-04-18 08:18:50.469
cfc062fb-8a26-409a-ba71-63348ac4ffce	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	b0d1e852-c7f4-4532-80ce-34e96b0f6a00	Какой год считается годом первого полета человека в космос?	12	SINGLE_CHOICE	2025-04-18 08:18:50.47
b1d9494e-e0c0-404d-ae2b-824c8476d6cd	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	ae0d999d-db1a-4b91-a70f-0f79e7ace4fe	Как называется самая маленькая планета Солнечной системы?	13	SINGLE_CHOICE	2025-04-18 08:18:50.47
a0899b95-6f49-46e3-ba47-9d66336f5649	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	88f1a1d7-acf8-478f-954f-d31f5a6ea9b4	Кто написал '1984'?	14	SINGLE_CHOICE	2025-04-18 08:18:50.471
2ff0579c-629b-4668-9499-b39b42791437	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	db2c149b-d18f-4bcc-8ad1-4b9d47310248	Какой газ используется в воздушных шарах для подъема?	15	SINGLE_CHOICE	2025-04-18 08:18:50.472
e0a3a611-547c-49c6-bb81-d3b42f88fcb0	8ae5ccb7-a03e-42f4-8d5c-b81b505cd6ec	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Столицца Китая	1	SINGLE_CHOICE	2025-05-01 12:21:01.187
b47b1a3f-870f-4bd0-bb59-3922a64fde3e	8ae5ccb7-a03e-42f4-8d5c-b81b505cd6ec	3d73bad3-223e-483f-b766-adde87a2769c	Президент США	2	MULTIPLE_CHOICE	2025-05-01 12:21:01.189
4b559288-4cf5-4324-bc22-fe05a4ba2d1a	495b6a15-eabc-4426-8098-afc5a8c1891f	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Столицца Китая	1	SINGLE_CHOICE	2025-05-01 12:35:09.502
68b418a5-0028-46e8-9e8a-0fa5a3251b9d	495b6a15-eabc-4426-8098-afc5a8c1891f	3d73bad3-223e-483f-b766-adde87a2769c	Президент США	2	MULTIPLE_CHOICE	2025-05-01 12:35:09.506
394c2cb0-8d6e-47bf-8445-058f8e66c794	8155b5b2-3f19-44ea-9705-9d8d8d95e03a	343cbe3c-6ec6-4e49-bea1-e83db6e370fd	dsfsd f	1	SINGLE_CHOICE	2025-05-05 10:39:40.401
dbe33ee0-a6fe-43c3-aef3-132f03cec601	ad286d5e-1e0e-404d-b560-df6d7175d590	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Столицца Китая	1	SINGLE_CHOICE	2025-05-06 13:14:57.466
18343099-09eb-45c9-8077-6bba73b21aa6	ad286d5e-1e0e-404d-b560-df6d7175d590	3d73bad3-223e-483f-b766-adde87a2769c	Президент США	2	MULTIPLE_CHOICE	2025-05-06 13:14:57.47
76b31e69-3cbd-4d17-87de-362955838ad4	c30cfb97-e123-40f5-a4c3-193284198dcd	ac3ef65a-e601-49ce-a800-91a62c321df7	Столица Франции	1	SINGLE_CHOICE	2025-05-10 07:20:18.12
3952dd9b-c90c-4373-b960-67c4494062f8	c30cfb97-e123-40f5-a4c3-193284198dcd	1fdc999a-b2d5-4a93-88a5-b851df97d246	2+2*2 это	2	MULTIPLE_CHOICE	2025-05-10 07:20:18.124
5da387e7-542a-47a7-8bb2-a973988c0f4a	8a558b48-4d21-4fb6-9d42-f7542ad6247c	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	Мой вопрос	1	SINGLE_CHOICE	2025-05-11 12:49:19.408
b7276e9a-570c-4233-b6e0-a4d06d264abd	8a558b48-4d21-4fb6-9d42-f7542ad6247c	bcc849a8-fdf7-4daa-8326-0dc108480e8c	Вопрос 2	2	MULTIPLE_CHOICE	2025-05-11 12:49:19.411
dd068a79-c7b4-4537-9379-df07179b91f9	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	e8613a4d-2b6e-4564-aa73-e50c887365c5	Какая самая длинная река в мире?	1	SINGLE_CHOICE	2025-05-03 18:41:28.774
4a1e1d2b-8d09-422c-8843-c6653989729b	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	3545e654-ab95-4c30-bb59-f7b64c3090fb	Какой элемент таблицы Менделеева имеет атомный номер 1?	2	SINGLE_CHOICE	2025-05-03 18:41:28.778
bcf9c043-d20c-43fe-9064-278f6758bbf0	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	39804564-e24c-47d3-8e95-3d1d87a4143a	Какой год считается годом основания Рима?	3	SINGLE_CHOICE	2025-05-03 18:41:28.78
5dcf4181-c4ba-4cb6-98a2-05d0b36ab8e0	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	a430e065-c913-49b6-acaa-cb9938815467	Какой самый большой океан на Земле?	4	SINGLE_CHOICE	2025-05-03 18:41:28.781
2f67cf6e-7900-4fa5-babd-42c136864ef0	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	545f7221-9c34-41d7-a762-b4dcb7c6e869	Кто написал 'Войну и мир'?	5	SINGLE_CHOICE	2025-05-03 18:41:28.782
43fe0655-21de-4c0e-a539-b6340f9f566e	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	2deda14f-6c87-4059-a179-5744b2056541	Какой газ составляет большую часть атмосферы Земли?	6	SINGLE_CHOICE	2025-05-03 18:41:28.782
c7c7c4f3-f5d8-4681-bdbd-415ec7e815a1	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Какой планетой является Земля?	7	SINGLE_CHOICE	2025-05-03 18:41:28.783
a559d2c4-0dd0-4f7c-b4c1-4d6513d0e672	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	40f3a4de-8d75-4c4b-8419-d8cda0392214	Какой элемент имеет химический символ 'O'?	8	SINGLE_CHOICE	2025-05-03 18:41:28.784
789e3a94-59bb-40d0-b964-2504fc5cc406	195e1075-b441-4f1e-82bd-2a7a631253f1	e8613a4d-2b6e-4564-aa73-e50c887365c5	Какая самая длинная река в мире?	1	SINGLE_CHOICE	2025-05-03 18:46:41.403
ed60f70d-404b-42a0-90f5-d86967cd2a3b	195e1075-b441-4f1e-82bd-2a7a631253f1	3545e654-ab95-4c30-bb59-f7b64c3090fb	Какой элемент таблицы Менделеева имеет атомный номер 1?	2	SINGLE_CHOICE	2025-05-03 18:46:41.407
88b13903-c461-4b76-b143-11c47a40745f	195e1075-b441-4f1e-82bd-2a7a631253f1	39804564-e24c-47d3-8e95-3d1d87a4143a	Какой год считается годом основания Рима?	3	SINGLE_CHOICE	2025-05-03 18:46:41.409
9d5bcc0a-777c-404b-82f6-5bf329bb0886	195e1075-b441-4f1e-82bd-2a7a631253f1	a430e065-c913-49b6-acaa-cb9938815467	Какой самый большой океан на Земле?	4	SINGLE_CHOICE	2025-05-03 18:46:41.41
4a15a8ef-2d35-4405-91ee-387012842056	195e1075-b441-4f1e-82bd-2a7a631253f1	545f7221-9c34-41d7-a762-b4dcb7c6e869	Кто написал 'Войну и мир'?	5	SINGLE_CHOICE	2025-05-03 18:46:41.411
3ca376fe-75cf-4dbd-a8a5-72281205b2bf	195e1075-b441-4f1e-82bd-2a7a631253f1	2deda14f-6c87-4059-a179-5744b2056541	Какой газ составляет большую часть атмосферы Земли?	6	SINGLE_CHOICE	2025-05-03 18:46:41.412
1ee6d1f5-c90d-443a-bc8a-95839ef762c6	446b811a-2b15-4edc-a0a6-608a4da8e6a5	9726d606-a347-4635-9876-5c7125385d6c	Как называется процесс превращения воды в пар?	1	SINGLE_CHOICE	2025-05-05 08:54:04.688
20ac1e31-e578-4871-a629-9889ab16f33a	446b811a-2b15-4edc-a0a6-608a4da8e6a5	07fb3c76-fe0e-44cf-a324-467589315dbb	Кто является автором теории относительности?	2	SINGLE_CHOICE	2025-05-05 08:54:04.691
acae3303-6caf-47a9-ae2c-c1e2f633a225	446b811a-2b15-4edc-a0a6-608a4da8e6a5	9b045631-1094-4eb2-9b02-f46b69a0962a	Как называется самая высокая гора в мире?	3	SINGLE_CHOICE	2025-05-05 08:54:04.693
0c3706eb-7e4c-43b9-8d17-f1b8fd333c0a	446b811a-2b15-4edc-a0a6-608a4da8e6a5	52d85dc6-d634-42cf-a63b-cb1971a77da8	Какой язык программирования был создан Гвидо ван Россумом?	4	SINGLE_CHOICE	2025-05-05 08:54:04.696
d6af3a6b-9ff2-4015-ac2d-3099839d130a	446b811a-2b15-4edc-a0a6-608a4da8e6a5	31419218-3b28-43a2-9bd9-749cb960b4f6	Как называется столица Японии?	5	SINGLE_CHOICE	2025-05-05 08:54:04.697
73875202-4528-4cf5-bdac-801aa0ac8831	426e6ecc-da85-4d07-9f99-f4195415b9bf	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	Столицца Китая	1	SINGLE_CHOICE	2025-05-03 06:23:42.821
87b375b8-21f2-4350-9d40-91cf143047f7	426e6ecc-da85-4d07-9f99-f4195415b9bf	3d73bad3-223e-483f-b766-adde87a2769c	Президент США	2	MULTIPLE_CHOICE	2025-05-03 06:23:42.827
d1ab89af-aaab-4ae2-9e26-a4c89619ae94	de3fff99-4779-41fb-8c62-21d3932a6a23	e8613a4d-2b6e-4564-aa73-e50c887365c5	Какая самая длинная река в мире?	1	SINGLE_CHOICE	2025-05-03 18:39:02.566
97cdfc16-c99d-4369-8970-1c9c551d06c9	de3fff99-4779-41fb-8c62-21d3932a6a23	3545e654-ab95-4c30-bb59-f7b64c3090fb	Какой элемент таблицы Менделеева имеет атомный номер 1?	2	SINGLE_CHOICE	2025-05-03 18:39:02.568
7d18a008-b894-4c11-87e7-f4bf0b830e4e	de3fff99-4779-41fb-8c62-21d3932a6a23	39804564-e24c-47d3-8e95-3d1d87a4143a	Какой год считается годом основания Рима?	3	SINGLE_CHOICE	2025-05-03 18:39:02.569
f1ff2cde-5ec8-42c3-b973-6adda0b2630f	de3fff99-4779-41fb-8c62-21d3932a6a23	a430e065-c913-49b6-acaa-cb9938815467	Какой самый большой океан на Земле?	4	SINGLE_CHOICE	2025-05-03 18:39:02.57
2fdb21e9-4664-45e0-8917-2fa586c4d739	de3fff99-4779-41fb-8c62-21d3932a6a23	545f7221-9c34-41d7-a762-b4dcb7c6e869	Кто написал 'Войну и мир'?	5	SINGLE_CHOICE	2025-05-03 18:39:02.572
ccccce75-8d72-4b2a-bec2-d4529dcc1656	de3fff99-4779-41fb-8c62-21d3932a6a23	2deda14f-6c87-4059-a179-5744b2056541	Какой газ составляет большую часть атмосферы Земли?	6	SINGLE_CHOICE	2025-05-03 18:39:02.573
a392e902-3ac3-400c-aa91-85e8d24eb63a	de3fff99-4779-41fb-8c62-21d3932a6a23	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Какой планетой является Земля?	7	SINGLE_CHOICE	2025-05-03 18:39:02.574
3194a00d-0c19-4ea1-967d-ad61339593dc	de3fff99-4779-41fb-8c62-21d3932a6a23	40f3a4de-8d75-4c4b-8419-d8cda0392214	Какой элемент имеет химический символ 'O'?	8	SINGLE_CHOICE	2025-05-03 18:39:02.574
23305a83-1c8a-49ba-9e26-2351c72077e1	89e92616-0452-47cc-9669-33b7bf930ae2	e8613a4d-2b6e-4564-aa73-e50c887365c5	Какая самая длинная река в мире?	1	SINGLE_CHOICE	2025-05-03 18:46:00.232
9cd8bcc8-b3a2-48eb-a361-a87af24a0d08	89e92616-0452-47cc-9669-33b7bf930ae2	3545e654-ab95-4c30-bb59-f7b64c3090fb	Какой элемент таблицы Менделеева имеет атомный номер 1?	2	SINGLE_CHOICE	2025-05-03 18:46:00.238
cc7c4c50-d6ac-44e9-81f7-6174a5022e81	89e92616-0452-47cc-9669-33b7bf930ae2	39804564-e24c-47d3-8e95-3d1d87a4143a	Какой год считается годом основания Рима?	3	SINGLE_CHOICE	2025-05-03 18:46:00.239
f0ce714b-f01f-433a-8380-50305931a0c3	89e92616-0452-47cc-9669-33b7bf930ae2	a430e065-c913-49b6-acaa-cb9938815467	Какой самый большой океан на Земле?	4	SINGLE_CHOICE	2025-05-03 18:46:00.24
9f2bcd63-d50e-49e0-b264-97f5842ec27a	89e92616-0452-47cc-9669-33b7bf930ae2	545f7221-9c34-41d7-a762-b4dcb7c6e869	Кто написал 'Войну и мир'?	5	SINGLE_CHOICE	2025-05-03 18:46:00.241
a56d4235-6b2f-4d80-9f53-a1930c0d3299	89e92616-0452-47cc-9669-33b7bf930ae2	2deda14f-6c87-4059-a179-5744b2056541	Какой газ составляет большую часть атмосферы Земли?	6	SINGLE_CHOICE	2025-05-03 18:46:00.242
f63508a9-13f4-49b0-81db-6ad28cded33e	89e92616-0452-47cc-9669-33b7bf930ae2	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Какой планетой является Земля?	7	SINGLE_CHOICE	2025-05-03 18:46:00.243
8a27efa5-b67c-4860-a255-4d16f6f5358a	89e92616-0452-47cc-9669-33b7bf930ae2	40f3a4de-8d75-4c4b-8419-d8cda0392214	Какой элемент имеет химический символ 'O'?	8	SINGLE_CHOICE	2025-05-03 18:46:00.244
fa7df060-9b18-4457-8af8-8dc19a29590d	195e1075-b441-4f1e-82bd-2a7a631253f1	3c375ef2-d4ec-4ea6-b792-4c87348c5904	Какой планетой является Земля?	7	SINGLE_CHOICE	2025-05-03 18:46:41.413
4369d5da-b452-442e-bca9-cbdce60d96f2	195e1075-b441-4f1e-82bd-2a7a631253f1	40f3a4de-8d75-4c4b-8419-d8cda0392214	Какой элемент имеет химический символ 'O'?	8	SINGLE_CHOICE	2025-05-03 18:46:41.414
6dc6bcb3-67de-4fc9-b6eb-1d753d2eaf2b	a2a149b0-4855-4d0d-87b9-b7b3703f578d	ac3ef65a-e601-49ce-a800-91a62c321df7	Столица Франции	1	SINGLE_CHOICE	2025-05-03 18:50:41.496
dccab75d-1384-49f1-b50b-9ebc0be34355	a2a149b0-4855-4d0d-87b9-b7b3703f578d	1fdc999a-b2d5-4a93-88a5-b851df97d246	2+2*2 это	2	MULTIPLE_CHOICE	2025-05-03 18:50:41.498
85908342-13d2-48f7-a841-98bb1ec7bc60	9f386d16-c379-4c53-a320-e995434f9b9d	ac3ef65a-e601-49ce-a800-91a62c321df7	Столица Франции	1	SINGLE_CHOICE	2025-05-03 19:57:20.989
36cd5234-1f10-4db8-9f22-2b549d834a2e	9f386d16-c379-4c53-a320-e995434f9b9d	1fdc999a-b2d5-4a93-88a5-b851df97d246	2+2*2 это	2	MULTIPLE_CHOICE	2025-05-03 19:57:20.993
454bfefc-2114-4341-a511-76ce332b939d	b2d1c150-4ed7-4afd-9be1-31b2c6fd2bc5	ac3ef65a-e601-49ce-a800-91a62c321df7	Столица Франции	1	SINGLE_CHOICE	2025-05-03 20:12:53.594
b6673f46-3840-41f1-96d1-af58c53f181c	b2d1c150-4ed7-4afd-9be1-31b2c6fd2bc5	1fdc999a-b2d5-4a93-88a5-b851df97d246	2+2*2 это	2	MULTIPLE_CHOICE	2025-05-03 20:12:53.598
9ff93624-0896-4828-b4bf-f74f5b9bc56d	82168795-80e2-4e7a-b082-bb5dda23e1d8	ac3ef65a-e601-49ce-a800-91a62c321df7	Столица Франции	1	SINGLE_CHOICE	2025-05-03 20:16:48.13
b8fb73b9-7f55-4bcd-90d4-be6e38d9a684	82168795-80e2-4e7a-b082-bb5dda23e1d8	1fdc999a-b2d5-4a93-88a5-b851df97d246	2+2*2 это	2	MULTIPLE_CHOICE	2025-05-03 20:16:48.133
b8e6e4a4-fdbb-4759-8bac-d0c7ddbbe270	446b811a-2b15-4edc-a0a6-608a4da8e6a5	85153974-7836-4efb-854f-f8fbb86c7776	Какой год считается началом Второй мировой войны?	6	SINGLE_CHOICE	2025-05-05 08:54:04.699
342986a3-f4ef-4a6e-8823-43aabdfaf48b	446b811a-2b15-4edc-a0a6-608a4da8e6a5	2c0013c8-b3e1-42b4-920d-ab6aeb2f8a91	Как называется самая большая пустыня в мире?	7	SINGLE_CHOICE	2025-05-05 08:54:04.701
a225ea7d-2420-41e9-9822-fb9a4c963f2e	446b811a-2b15-4edc-a0a6-608a4da8e6a5	f151c5f3-eb8a-4705-972c-5f5ec6356ece	Кто написал 'Гамлета'?	8	SINGLE_CHOICE	2025-05-05 08:54:04.702
21afe350-789c-47e4-84e7-d69fef478f1c	446b811a-2b15-4edc-a0a6-608a4da8e6a5	dc8ae466-59a4-4348-b6a0-74a8de7ff31d	Какой химический элемент имеет символ 'Fe'?	9	SINGLE_CHOICE	2025-05-05 08:54:04.704
a9ae6fb5-aa11-4263-a0de-b69095b72895	446b811a-2b15-4edc-a0a6-608a4da8e6a5	1cc16ab6-b9e3-418a-8cb5-674cb363cce7	Как называется процесс фотосинтеза у растений?	10	SINGLE_CHOICE	2025-05-05 08:54:04.705
8c2d0457-9335-4832-a01a-a9f2afb99067	446b811a-2b15-4edc-a0a6-608a4da8e6a5	af4dc5d4-c882-48d4-b125-2a53a775436a	Какой город является столицей Франции?	11	SINGLE_CHOICE	2025-05-05 08:54:04.707
f7626cd0-fadd-486a-9bf3-f4b2e47b76de	446b811a-2b15-4edc-a0a6-608a4da8e6a5	b0d1e852-c7f4-4532-80ce-34e96b0f6a00	Какой год считается годом первого полета человека в космос?	12	SINGLE_CHOICE	2025-05-05 08:54:04.708
c8433ac4-cad0-43c1-a22d-b30c9db396a7	446b811a-2b15-4edc-a0a6-608a4da8e6a5	ae0d999d-db1a-4b91-a70f-0f79e7ace4fe	Как называется самая маленькая планета Солнечной системы?	13	SINGLE_CHOICE	2025-05-05 08:54:04.71
8ad1713f-b8c3-4a2a-bcd8-7dad919f063f	446b811a-2b15-4edc-a0a6-608a4da8e6a5	88f1a1d7-acf8-478f-954f-d31f5a6ea9b4	Кто написал '1984'?	14	SINGLE_CHOICE	2025-05-05 08:54:04.711
d9953fe7-7902-41f3-b6cb-37854fc5924d	446b811a-2b15-4edc-a0a6-608a4da8e6a5	db2c149b-d18f-4bcc-8ad1-4b9d47310248	Какой газ используется в воздушных шарах для подъема?	15	SINGLE_CHOICE	2025-05-05 08:54:04.713
8cf0c119-9e96-49e9-8a68-edc0fc38d50e	349228fb-7e80-46e4-8b3c-bb24e76073f9	535d4072-e82b-4d8f-ab5a-7d7546bd8279	Мой вопрос	1	SINGLE_CHOICE	2025-05-11 12:45:23.576
8ee1f721-6c70-439b-9350-64aef656197e	6cab08d2-b884-46ac-8e67-d43b456f51ea	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	Мой вопрос	1	SINGLE_CHOICE	2025-05-11 13:20:46.302
21cab401-ab6a-4337-8a0a-1e2b94e505d9	6cab08d2-b884-46ac-8e67-d43b456f51ea	bcc849a8-fdf7-4daa-8326-0dc108480e8c	Вопрос 2	2	MULTIPLE_CHOICE	2025-05-11 13:20:46.306
9cb4984c-6b2c-45d3-a5a2-c21063b659d5	3ba86c5b-09f8-4477-a975-a456ce951892	ac3ef65a-e601-49ce-a800-91a62c321df7	Столица Франции	1	SINGLE_CHOICE	2025-05-13 13:35:53.31
4a4aac96-d208-4177-891e-ee4c7d6edb16	3ba86c5b-09f8-4477-a975-a456ce951892	1fdc999a-b2d5-4a93-88a5-b851df97d246	2+2*2 это	2	MULTIPLE_CHOICE	2025-05-13 13:35:53.315
d5f284f5-1030-403b-873d-ca36d62d6980	1f3bc303-edbf-4fc5-a30e-44c54940ccd3	bc2a800b-d1bb-4c6e-9e1f-77a688fbdf33	павп пва	2	SINGLE_CHOICE	2025-05-13 13:55:42.686
b7801eec-8737-4f5b-9d33-34ab054aa094	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	f2b979c4-c4de-41ea-b55a-f2203875be91	Как называется процесс превращения воды в пар?	1	SINGLE_CHOICE	2025-05-15 08:35:35.289
1527c7ac-b8b2-4b02-9efa-f7814650adda	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	1fe7bb68-976a-401b-b2b3-390224a660ce	Кто является автором теории относительности?	2	SINGLE_CHOICE	2025-05-15 08:35:35.292
ecec7c6a-f5d9-4bc8-a020-24ea3e73a98d	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	38593e7a-4aa1-49d9-8910-3f0ab09f88db	Как называется самая высокая гора в мире?	3	SINGLE_CHOICE	2025-05-15 08:35:35.294
fcae8311-1457-4141-92be-5fbb027859e5	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	8a84d599-7560-49db-8ad5-d619106462ed	Какой язык программирования был создан Гвидо ван Россумом?	4	SINGLE_CHOICE	2025-05-15 08:35:35.297
7b2ba73c-a2b4-49b2-bc2b-b06f5e9230b9	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	ec19e170-6e8f-45bd-a314-39416f47faff	Как называется столица Японии?	5	SINGLE_CHOICE	2025-05-15 08:35:35.299
0dc507d2-0452-4f76-ba13-c7c6f1243cc7	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	31f1da3a-1d02-4190-8e34-fff34990e890	Какой год считается началом Второй мировой войны?	6	SINGLE_CHOICE	2025-05-15 08:35:35.3
7a3dbba0-4cfd-433c-80ec-12337773e1c4	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	Как называется самая большая пустыня в мире?	7	SINGLE_CHOICE	2025-05-15 08:35:35.302
f863b527-1041-43ee-9807-89d1604a991b	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	4b3e76ea-de82-4c54-a417-5679c65412db	Кто написал 'Гамлета'?	8	SINGLE_CHOICE	2025-05-15 08:35:35.304
0a856483-c8cd-486e-b247-579a2acad231	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	21bd4fc4-962a-4294-b162-1f96b7b2e25e	Какой химический элемент имеет символ 'Fe'?	9	SINGLE_CHOICE	2025-05-15 08:35:35.306
a0cb54cd-0bff-41fc-89f9-5d9b71c35fde	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	82bc16dc-5ade-4929-9c15-2f26c292cf2e	Как называется процесс фотосинтеза у растений?	10	SINGLE_CHOICE	2025-05-15 08:35:35.307
175d82a1-4085-4988-870c-d8a3bd60fec3	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	ad712050-a96f-420c-bc56-52d49d951695	Какой город является столицей Франции?	11	SINGLE_CHOICE	2025-05-15 08:35:35.309
cb5fcb27-80a4-4317-a361-f6608c3899f6	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	f4dc28b4-930e-44fc-ae7b-d40b6323f015	Какой год считается годом первого полета человека в космос?	12	SINGLE_CHOICE	2025-05-15 08:35:35.311
8a2470a1-c6e8-4021-a6b2-edc084626166	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	8d736281-7f95-4a35-a87c-d0491371ea20	Как называется самая маленькая планета Солнечной системы?	13	SINGLE_CHOICE	2025-05-15 08:35:35.312
1464298f-0199-4468-9e5d-ea19bf445120	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	9f8ff4d9-c1bf-44ab-8c7d-17bbe67411ab	Кто написал '1984'?	14	SINGLE_CHOICE	2025-05-15 08:35:35.315
4ad81fa1-97cd-4e1c-839e-a34746cbb830	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	a18ceba7-1834-46d3-972c-4ff45b9e4323	Какой газ используется в воздушных шарах для подъема?	15	SINGLE_CHOICE	2025-05-15 08:35:35.316
ad0f0bfd-5a5b-41e6-a114-5c8a521e24b8	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	4f7bffee-b165-4115-9f2f-8d6994a71c6e	Тестовый вопрос	1	TEXT_INPUT	2025-05-15 11:08:41.67
6c8dc750-7f15-4759-bdf4-a9328651a93d	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	15882fbc-b27a-405f-9986-d4f43e0b9c8c	Вопрос с вариантами ответа	2	SINGLE_CHOICE	2025-05-15 11:08:41.673
61dfb987-6c32-411f-b6b4-f3c666663dea	12d1e63d-5136-4e4a-afe9-229dc6261bc2	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	Мой вопрос	1	SINGLE_CHOICE	2025-05-16 10:21:44.975
b6720af0-c6b0-4103-93a8-c20d66111cc0	12d1e63d-5136-4e4a-afe9-229dc6261bc2	bcc849a8-fdf7-4daa-8326-0dc108480e8c	Вопрос 2	2	MULTIPLE_CHOICE	2025-05-16 10:21:44.979
3a7e613a-6e48-4f69-be15-dd4718d5fdc0	12d1e63d-5136-4e4a-afe9-229dc6261bc2	4c67c2a8-0138-4d1b-9e5a-2cc652ac1114	Мой вопрос	3	TEXT_INPUT	2025-05-16 10:21:44.981
b979696c-e6ea-4dca-9c5d-d27ca12ad210	8a9d1abf-00c8-4d48-8902-ea01e3804e97	db87c945-c98c-48d7-b0f7-823491f62b96	Гитлеру было {blank} лет когда его убили	1	FILL_IN_THE_BLANK	2025-05-17 06:08:36.926
79f7d050-fb34-45cd-b2f2-2c495b7fe6eb	8a9d1abf-00c8-4d48-8902-ea01e3804e97	20e37c55-ed75-48f8-9d7c-87d7567b2001	Что такое доброта?	2	SINGLE_CHOICE	2025-05-17 06:08:36.93
7699c31c-451e-4725-bfe3-717df312ee6e	6a933c99-9e1a-485d-8626-bcc3f3765c01	4f7bffee-b165-4115-9f2f-8d6994a71c6e	Тестовый вопрос	1	TEXT_INPUT	2025-05-18 07:58:25.011
dbb6fc08-ce9b-4c8c-a618-c16df88a71df	6a933c99-9e1a-485d-8626-bcc3f3765c01	15882fbc-b27a-405f-9986-d4f43e0b9c8c	Вопрос с вариантами ответа	2	SINGLE_CHOICE	2025-05-18 07:58:25.013
01cdc11e-0e02-4521-acd6-a897c902be74	a5657e62-d47d-48ca-9c4b-153b00c2c10d	4f7bffee-b165-4115-9f2f-8d6994a71c6e	Тестовый вопрос	1	TEXT_INPUT	2025-05-18 07:59:57.519
d9b06525-91a2-4584-af83-ca9eed738bd4	a5657e62-d47d-48ca-9c4b-153b00c2c10d	15882fbc-b27a-405f-9986-d4f43e0b9c8c	Вопрос с вариантами ответа	2	SINGLE_CHOICE	2025-05-18 07:59:57.521
2de64719-44b9-43bf-b654-64ab47a731ad	75b0fbb1-68f5-4943-b5f9-c4299af39ad9	db87c945-c98c-48d7-b0f7-823491f62b96	Гитлеру было {blank} лет когда его убили	1	FILL_IN_THE_BLANK	2025-05-18 15:29:14.47
6ddb143d-6eec-4d76-9516-65e1eea12fba	75b0fbb1-68f5-4943-b5f9-c4299af39ad9	20e37c55-ed75-48f8-9d7c-87d7567b2001	Что такое доброта?	2	SINGLE_CHOICE	2025-05-18 15:29:14.473
114bb203-44b0-4cfd-aff0-e7362c734835	97d98525-78b4-47f8-8fd8-0dbe38497ab4	db87c945-c98c-48d7-b0f7-823491f62b96	Гитлеру было {blank} лет когда его убили	1	FILL_IN_THE_BLANK	2025-05-19 05:38:41.524
acde418f-cb5d-4b5f-802a-d14415f59a59	97d98525-78b4-47f8-8fd8-0dbe38497ab4	20e37c55-ed75-48f8-9d7c-87d7567b2001	Что такое доброта?	2	SINGLE_CHOICE	2025-05-19 05:38:41.53
bac7a861-c8b7-4a60-90a7-236336094be0	97d98525-78b4-47f8-8fd8-0dbe38497ab4	5232f5ab-ddc2-42a8-8dee-22636818d67f	Привет, как дела?	3	TEXT_INPUT	2025-05-19 05:38:41.532
23645b24-2e6a-479a-8859-b32e2cc013da	2d1cffa9-378c-4dc0-97d7-c6b8674a0d00	db87c945-c98c-48d7-b0f7-823491f62b96	Гитлеру было {blank} лет когда его убили	1	FILL_IN_THE_BLANK	2025-05-19 06:26:50.346
8c7930a2-6160-4c9e-8e4b-d7ac69c5a8cd	2d1cffa9-378c-4dc0-97d7-c6b8674a0d00	20e37c55-ed75-48f8-9d7c-87d7567b2001	Что такое доброта?	2	SINGLE_CHOICE	2025-05-19 06:26:50.347
2164ef62-dd31-4d38-9eb5-57e22f423710	2d1cffa9-378c-4dc0-97d7-c6b8674a0d00	5232f5ab-ddc2-42a8-8dee-22636818d67f	Привет, как дела?	3	TEXT_INPUT	2025-05-19 06:26:50.348
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, "testId", text, "order", type, "createdAt", "updatedAt") FROM stdin;
15882fbc-b27a-405f-9986-d4f43e0b9c8c	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	Вопрос с вариантами ответа	2	SINGLE_CHOICE	2025-05-15 09:21:02.064	2025-05-15 09:21:36.302
51fb9748-94f9-4ee6-a6c2-02eeecbc2267	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	Мой вопрос	1	SINGLE_CHOICE	2025-05-11 12:46:07.627	2025-05-16 10:21:31.325
bcc849a8-fdf7-4daa-8326-0dc108480e8c	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	Вопрос 2	2	MULTIPLE_CHOICE	2025-05-11 12:46:07.631	2025-05-16 10:21:31.338
e8613a4d-2b6e-4564-aa73-e50c887365c5	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Какая самая длинная река в мире?	1	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
3545e654-ab95-4c30-bb59-f7b64c3090fb	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Какой элемент таблицы Менделеева имеет атомный номер 1?	2	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
39804564-e24c-47d3-8e95-3d1d87a4143a	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Какой год считается годом основания Рима?	3	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
a430e065-c913-49b6-acaa-cb9938815467	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Какой самый большой океан на Земле?	4	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
545f7221-9c34-41d7-a762-b4dcb7c6e869	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Кто написал 'Войну и мир'?	5	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
2deda14f-6c87-4059-a179-5744b2056541	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Какой газ составляет большую часть атмосферы Земли?	6	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
3c375ef2-d4ec-4ea6-b792-4c87348c5904	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Какой планетой является Земля?	7	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
40f3a4de-8d75-4c4b-8419-d8cda0392214	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Какой элемент имеет химический символ 'O'?	8	SINGLE_CHOICE	2025-04-04 14:12:52.293	2025-04-04 14:12:52.293
9726d606-a347-4635-9876-5c7125385d6c	ba01cfbf-211e-4e81-b51e-9e600f13d809	Как называется процесс превращения воды в пар?	1	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
07fb3c76-fe0e-44cf-a324-467589315dbb	ba01cfbf-211e-4e81-b51e-9e600f13d809	Кто является автором теории относительности?	2	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
9b045631-1094-4eb2-9b02-f46b69a0962a	ba01cfbf-211e-4e81-b51e-9e600f13d809	Как называется самая высокая гора в мире?	3	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
52d85dc6-d634-42cf-a63b-cb1971a77da8	ba01cfbf-211e-4e81-b51e-9e600f13d809	Какой язык программирования был создан Гвидо ван Россумом?	4	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
31419218-3b28-43a2-9bd9-749cb960b4f6	ba01cfbf-211e-4e81-b51e-9e600f13d809	Как называется столица Японии?	5	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
85153974-7836-4efb-854f-f8fbb86c7776	ba01cfbf-211e-4e81-b51e-9e600f13d809	Какой год считается началом Второй мировой войны?	6	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
2c0013c8-b3e1-42b4-920d-ab6aeb2f8a91	ba01cfbf-211e-4e81-b51e-9e600f13d809	Как называется самая большая пустыня в мире?	7	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
f151c5f3-eb8a-4705-972c-5f5ec6356ece	ba01cfbf-211e-4e81-b51e-9e600f13d809	Кто написал 'Гамлета'?	8	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
dc8ae466-59a4-4348-b6a0-74a8de7ff31d	ba01cfbf-211e-4e81-b51e-9e600f13d809	Какой химический элемент имеет символ 'Fe'?	9	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
1cc16ab6-b9e3-418a-8cb5-674cb363cce7	ba01cfbf-211e-4e81-b51e-9e600f13d809	Как называется процесс фотосинтеза у растений?	10	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
af4dc5d4-c882-48d4-b125-2a53a775436a	ba01cfbf-211e-4e81-b51e-9e600f13d809	Какой город является столицей Франции?	11	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
b0d1e852-c7f4-4532-80ce-34e96b0f6a00	ba01cfbf-211e-4e81-b51e-9e600f13d809	Какой год считается годом первого полета человека в космос?	12	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
ae0d999d-db1a-4b91-a70f-0f79e7ace4fe	ba01cfbf-211e-4e81-b51e-9e600f13d809	Как называется самая маленькая планета Солнечной системы?	13	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
88f1a1d7-acf8-478f-954f-d31f5a6ea9b4	ba01cfbf-211e-4e81-b51e-9e600f13d809	Кто написал '1984'?	14	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
db2c149b-d18f-4bcc-8ad1-4b9d47310248	ba01cfbf-211e-4e81-b51e-9e600f13d809	Какой газ используется в воздушных шарах для подъема?	15	SINGLE_CHOICE	2025-04-04 14:16:48.489	2025-04-04 14:16:48.489
a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	7bde1148-01b8-46f2-92cf-d93af5734056	Столицца Китая	1	SINGLE_CHOICE	2025-04-21 07:30:16.479	2025-04-21 07:30:16.479
3d73bad3-223e-483f-b766-adde87a2769c	7bde1148-01b8-46f2-92cf-d93af5734056	Президент США	2	MULTIPLE_CHOICE	2025-04-21 07:30:16.479	2025-04-21 07:30:16.479
ac3ef65a-e601-49ce-a800-91a62c321df7	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	Столица Франции	1	SINGLE_CHOICE	2025-05-03 18:17:07.056	2025-05-03 18:17:07.056
1fdc999a-b2d5-4a93-88a5-b851df97d246	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	2+2*2 это	2	MULTIPLE_CHOICE	2025-05-03 18:17:07.056	2025-05-03 18:17:07.056
3a0a76b2-3785-4ff1-90fc-0c019fa928d7	3beac1f4-eb2a-4220-b055-71f749a38d6f	fsd fs	1	SINGLE_CHOICE	2025-05-06 07:20:59.86	2025-05-06 10:45:42.05
eb8767f5-6231-43e9-ab75-80926aaa22b6	3beac1f4-eb2a-4220-b055-71f749a38d6f	мой вопром	2	MULTIPLE_CHOICE	2025-05-06 10:45:01.239	2025-05-06 10:45:42.056
bc2a800b-d1bb-4c6e-9e1f-77a688fbdf33	9af97729-c709-4cd6-9a70-22199630e8d0	павп пва	1	SINGLE_CHOICE	2025-04-14 16:20:15.279	2025-05-13 14:21:51.804
4f7bffee-b165-4115-9f2f-8d6994a71c6e	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	Тестовый вопрос	1	TEXT_INPUT	2025-05-15 07:50:38.145	2025-05-15 09:21:36.288
4c67c2a8-0138-4d1b-9e5a-2cc652ac1114	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	Мой вопрос	3	TEXT_INPUT	2025-05-16 10:21:31.344	2025-05-16 10:21:31.344
ec19e170-6e8f-45bd-a314-39416f47faff	55635461-7446-48af-a297-aa2fc786bc4e	Как называется столица Японии?	5	SINGLE_CHOICE	2025-05-12 20:39:02.361	2025-05-14 09:49:42.046
31f1da3a-1d02-4190-8e34-fff34990e890	55635461-7446-48af-a297-aa2fc786bc4e	Какой год считается началом Второй мировой войны?	6	SINGLE_CHOICE	2025-05-12 20:39:02.363	2025-05-14 09:49:42.054
6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	55635461-7446-48af-a297-aa2fc786bc4e	Как называется самая большая пустыня в мире?	7	SINGLE_CHOICE	2025-05-12 20:39:02.365	2025-05-14 09:49:42.065
4b3e76ea-de82-4c54-a417-5679c65412db	55635461-7446-48af-a297-aa2fc786bc4e	Кто написал 'Гамлета'?	8	SINGLE_CHOICE	2025-05-12 20:39:02.367	2025-05-14 09:49:42.073
21bd4fc4-962a-4294-b162-1f96b7b2e25e	55635461-7446-48af-a297-aa2fc786bc4e	Какой химический элемент имеет символ 'Fe'?	9	SINGLE_CHOICE	2025-05-12 20:39:02.369	2025-05-14 09:49:42.079
82bc16dc-5ade-4929-9c15-2f26c292cf2e	55635461-7446-48af-a297-aa2fc786bc4e	Как называется процесс фотосинтеза у растений?	10	SINGLE_CHOICE	2025-05-12 20:39:02.371	2025-05-14 09:49:42.091
ad712050-a96f-420c-bc56-52d49d951695	55635461-7446-48af-a297-aa2fc786bc4e	Какой город является столицей Франции?	11	SINGLE_CHOICE	2025-05-12 20:39:02.372	2025-05-14 09:49:42.099
f4dc28b4-930e-44fc-ae7b-d40b6323f015	55635461-7446-48af-a297-aa2fc786bc4e	Какой год считается годом первого полета человека в космос?	12	SINGLE_CHOICE	2025-05-12 20:39:02.375	2025-05-14 09:49:42.106
8d736281-7f95-4a35-a87c-d0491371ea20	55635461-7446-48af-a297-aa2fc786bc4e	Как называется самая маленькая планета Солнечной системы?	13	SINGLE_CHOICE	2025-05-12 20:39:02.377	2025-05-14 09:49:42.113
9f8ff4d9-c1bf-44ab-8c7d-17bbe67411ab	55635461-7446-48af-a297-aa2fc786bc4e	Кто написал '1984'?	14	SINGLE_CHOICE	2025-05-12 20:39:02.379	2025-05-14 09:49:42.119
a18ceba7-1834-46d3-972c-4ff45b9e4323	55635461-7446-48af-a297-aa2fc786bc4e	Какой газ используется в воздушных шарах для подъема?	15	SINGLE_CHOICE	2025-05-12 20:39:02.381	2025-05-14 09:49:42.128
f2b979c4-c4de-41ea-b55a-f2203875be91	55635461-7446-48af-a297-aa2fc786bc4e	Как называется процесс превращения воды в пар?	1	SINGLE_CHOICE	2025-05-12 20:39:02.35	2025-05-14 09:49:42.005
1fe7bb68-976a-401b-b2b3-390224a660ce	55635461-7446-48af-a297-aa2fc786bc4e	Кто является автором теории относительности?	2	SINGLE_CHOICE	2025-05-12 20:39:02.355	2025-05-14 09:49:42.013
38593e7a-4aa1-49d9-8910-3f0ab09f88db	55635461-7446-48af-a297-aa2fc786bc4e	Как называется самая высокая гора в мире?	3	SINGLE_CHOICE	2025-05-12 20:39:02.357	2025-05-14 09:49:42.026
8a84d599-7560-49db-8ad5-d619106462ed	55635461-7446-48af-a297-aa2fc786bc4e	Какой язык программирования был создан Гвидо ван Россумом?	4	SINGLE_CHOICE	2025-05-12 20:39:02.359	2025-05-14 09:49:42.035
db87c945-c98c-48d7-b0f7-823491f62b96	8372415e-023a-4ce1-9586-b2b02265c3d6	Гитлеру было {blank} лет когда его убили	1	FILL_IN_THE_BLANK	2025-05-16 18:19:43.23	2025-05-19 05:38:41.487
20e37c55-ed75-48f8-9d7c-87d7567b2001	8372415e-023a-4ce1-9586-b2b02265c3d6	Что такое доброта?	2	SINGLE_CHOICE	2025-05-16 18:21:09.387	2025-05-19 05:38:41.505
5232f5ab-ddc2-42a8-8dee-22636818d67f	8372415e-023a-4ce1-9586-b2b02265c3d6	Привет, как дела?	3	TEXT_INPUT	2025-05-19 05:38:41.511	2025-05-19 05:38:41.511
\.


--
-- Data for Name: test_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_attempts (id, "testId", "userId", "preTestUserData", score, "startedAt", "completedAt", status, "updatedAt", "testSnapshotId", "expirationTime", "timeSpent") FROM stdin;
f9f08f9e-47dc-4830-8f45-b2c020e39aad	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	0	2025-05-15 12:11:59.081	2025-05-15 12:12:40.051	COMPLETED	2025-05-15 12:12:40.053	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
8f226c80-d93a-4381-9832-a66c1d8910fb	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	50	2025-05-15 12:53:30.752	2025-05-15 12:53:36.982	COMPLETED	2025-05-15 12:53:36.983	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
769399d4-e0fd-4edf-8bbb-d1ed6e199f84	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	100	2025-05-15 12:54:37.441	2025-05-15 12:55:09.671	COMPLETED	2025-05-15 12:55:09.672	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
46aa96b4-aa65-42cd-81f3-9f826930f43e	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	100	2025-05-15 12:56:56.642	2025-05-15 13:04:30.673	COMPLETED	2025-05-15 13:04:30.674	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
89a7ca3a-1bcf-4942-b0b8-f89a737bf1a4	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "female"}	66.67	2025-05-16 10:22:48.849	2025-05-16 10:24:19.903	COMPLETED	2025-05-16 10:24:19.904	12d1e63d-5136-4e4a-afe9-229dc6261bc2	2025-05-16 10:45:48.847	80
69ad83a0-153e-47a1-84ad-a1ac609b0cb5	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	\N	2025-05-16 19:51:01.723	\N	IN_PROGRESS	2025-05-16 19:51:01.723	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
cbb0645e-b867-43b2-a4c5-52d7226fa3b3	8372415e-023a-4ce1-9586-b2b02265c3d6	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	\N	2025-05-17 19:42:04.66	\N	IN_PROGRESS	2025-05-17 19:42:04.66	8a9d1abf-00c8-4d48-8902-ea01e3804e97	\N	0
fc92714d-8abe-4f8e-b896-4fb3e75c3c76	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	2c6d44d2-59f0-442a-9514-56ef7252b5b9	null	50	2025-05-18 07:58:38.266	2025-05-18 07:58:48.147	COMPLETED	2025-05-18 07:58:48.148	6a933c99-9e1a-485d-8626-bcc3f3765c01	\N	0
b9c3f002-bf41-4d2d-9f38-35801f37ffe4	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	2c6d44d2-59f0-442a-9514-56ef7252b5b9	null	50	2025-05-18 07:59:36.459	2025-05-18 08:00:17.293	COMPLETED	2025-05-18 08:00:17.295	6a933c99-9e1a-485d-8626-bcc3f3765c01	\N	0
3689aae0-36c9-4cce-b7e7-ec92b3f02dd6	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	0	2025-05-18 15:29:23.334	2025-05-18 15:29:55.541	COMPLETED	2025-05-18 15:29:55.541	75b0fbb1-68f5-4943-b5f9-c4299af39ad9	\N	0
ab7b6133-e93f-4a34-ada7-6ca3e52add04	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	100	2025-05-18 15:30:05.121	2025-05-18 15:30:12.578	COMPLETED	2025-05-18 15:30:12.579	75b0fbb1-68f5-4943-b5f9-c4299af39ad9	\N	0
3c6c3caa-44fd-4744-99ab-a8dec25bcf12	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	\N	2025-05-18 15:32:00.142	\N	IN_PROGRESS	2025-05-18 15:32:00.142	75b0fbb1-68f5-4943-b5f9-c4299af39ad9	\N	0
9c89ef4c-c953-4cde-9729-a7e46f053b82	8372415e-023a-4ce1-9586-b2b02265c3d6	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	33.33	2025-05-19 05:39:00.348	2025-05-19 05:43:20.047	COMPLETED	2025-05-19 05:43:20.049	97d98525-78b4-47f8-8fd8-0dbe38497ab4	\N	0
a84c02e0-5250-4b23-a982-1fa41c4ef379	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	0	2025-05-15 12:14:56.132	2025-05-15 12:15:14.363	COMPLETED	2025-05-15 12:15:14.364	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
7a0d5c84-683a-48d5-a47b-6e44bbc2d377	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	0	2025-05-15 13:23:30.942	2025-05-15 13:24:34.318	COMPLETED	2025-05-15 13:24:34.319	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
9d9afb7f-ce52-4889-8cc5-b7dc9af9e005	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	\N	2025-05-16 18:10:01.437	\N	IN_PROGRESS	2025-05-16 18:10:01.437	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
d630d3ba-cf4f-440f-a5c0-a96f1a571e01	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	\N	2025-05-16 18:10:57.347	\N	IN_PROGRESS	2025-05-16 18:10:57.347	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
e25d819e-f6b0-4c09-87fa-89e914464f6f	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	\N	2025-05-16 20:15:34.577	\N	IN_PROGRESS	2025-05-16 20:15:34.577	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
d2a29d41-a8f7-4bb0-9ff6-287b1b298b18	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	\N	2025-05-17 20:35:00.563	\N	IN_PROGRESS	2025-05-17 20:35:00.563	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
69759775-2139-4b11-a4ad-90c829e503ef	8372415e-023a-4ce1-9586-b2b02265c3d6	2c6d44d2-59f0-442a-9514-56ef7252b5b9	null	\N	2025-05-18 08:28:57.475	\N	IN_PROGRESS	2025-05-18 08:28:57.475	8a9d1abf-00c8-4d48-8902-ea01e3804e97	\N	0
f54ec622-e794-4fa8-ac4c-48c3c61c48d5	8372415e-023a-4ce1-9586-b2b02265c3d6	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	0	2025-05-19 06:26:52.631	2025-05-19 06:42:33.445	COMPLETED	2025-05-19 06:42:33.445	2d1cffa9-378c-4dc0-97d7-c6b8674a0d00	\N	0
4912732b-75cc-408f-95f1-8080ebce2d85	74a7675a-aee9-421a-a9a9-82cddc0e4621	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	\N	2025-04-18 07:58:55.548	\N	COMPLETED	2025-04-18 08:27:33.677	c41a12b2-00fe-45c8-8c0f-0299bf34bee2	\N	0
94a84df7-7d33-4721-a8f0-a9022cbd0064	9af97729-c709-4cd6-9a70-22199630e8d0	0c3593ee-aa77-442a-b540-b4e9c04841d6	{"myID": "123", "gender": "male"}	\N	2025-04-15 09:43:13.316	\N	COMPLETED	2025-04-18 08:28:07.666	ffc79b8f-e338-4bb7-8fc6-58a2f441ff64	\N	0
e7746e79-48eb-4fcd-b0a8-51e4337c1917	74a7675a-aee9-421a-a9a9-82cddc0e4621	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	\N	2025-04-18 08:36:37.102	\N	COMPLETED	2025-04-18 08:37:22.891	4d860683-4228-4b30-a777-daf183e3dcc7	\N	0
b6b17ebe-b02e-4da3-990f-9256d2488144	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	\N	2025-04-13 07:49:40.328	\N	COMPLETED	2025-04-18 08:28:07.666	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	\N	0
e9a6ab97-5ab4-445c-acb6-e11f42bcac39	74a7675a-aee9-421a-a9a9-82cddc0e4621	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	50	2025-04-15 08:16:23.245	2025-04-15 08:17:17.155	COMPLETED	2025-04-15 08:17:17.156	c41a12b2-00fe-45c8-8c0f-0299bf34bee2	\N	0
ce24ec11-b864-4a31-bb29-58f55d3d41fe	9af97729-c709-4cd6-9a70-22199630e8d0	\N	{"gender": "male"}	\N	2025-04-15 08:55:10.199	\N	COMPLETED	2025-04-18 08:28:07.666	ffc79b8f-e338-4bb7-8fc6-58a2f441ff64	\N	0
f52864e8-034f-4e90-b5c1-4a2c113ab911	74a7675a-aee9-421a-a9a9-82cddc0e4621	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	\N	2025-04-15 08:18:47.017	\N	COMPLETED	2025-04-18 08:28:07.666	c41a12b2-00fe-45c8-8c0f-0299bf34bee2	\N	0
fbc5eb64-0112-48e9-aa56-0cef58cc33c2	9af97729-c709-4cd6-9a70-22199630e8d0	0c3593ee-aa77-442a-b540-b4e9c04841d6	{"gender": "male"}	\N	2025-04-15 08:53:34.761	\N	COMPLETED	2025-04-18 08:28:07.666	ffc79b8f-e338-4bb7-8fc6-58a2f441ff64	\N	0
f81121ef-6ebf-4206-b183-a961a1435e0c	ba01cfbf-211e-4e81-b51e-9e600f13d809	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	\N	2025-04-20 08:22:42.185	\N	COMPLETED	2025-04-21 06:33:37.777	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	\N	0
f105ebdf-14b6-40f9-ab27-2fc2a27115ea	74a7675a-aee9-421a-a9a9-82cddc0e4621	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	100	2025-04-20 07:42:55.684	2025-04-21 07:20:51.469	COMPLETED	2025-04-21 07:20:51.47	176e701b-2750-49d9-941f-04f099c67cce	\N	0
a58594dc-5c7b-4bfe-a067-082c2321311b	7bde1148-01b8-46f2-92cf-d93af5734056	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	0	2025-04-21 12:43:58.139	2025-04-21 12:48:15.149	COMPLETED	2025-04-21 12:48:15.151	b45eac52-b59d-4e7e-97bb-2172925e2a1b	\N	0
1783167c-b2b7-448c-8b61-5cdea6725f41	7bde1148-01b8-46f2-92cf-d93af5734056	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	100	2025-04-21 11:30:23.006	2025-04-21 11:30:39.908	COMPLETED	2025-04-21 11:30:39.909	c2ad9eeb-b3bb-4579-85b3-0cf5f9dbb128	\N	0
1b36bf1d-7421-4837-a838-c3d9688b681f	7bde1148-01b8-46f2-92cf-d93af5734056	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	0	2025-04-21 11:34:18.341	2025-04-21 12:01:48.139	COMPLETED	2025-04-21 12:01:48.141	c2ad9eeb-b3bb-4579-85b3-0cf5f9dbb128	\N	0
72cd506c-b833-47c9-927b-fed025fdc1e1	7bde1148-01b8-46f2-92cf-d93af5734056	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	null	50	2025-04-22 08:06:40.015	2025-04-23 10:14:29.986	COMPLETED	2025-05-01 11:55:02.804	b45eac52-b59d-4e7e-97bb-2172925e2a1b	\N	0
9d56994c-22a4-48b9-a2c3-9b39edf277bc	7bde1148-01b8-46f2-92cf-d93af5734056	0c3593ee-aa77-442a-b540-b4e9c04841d6	{"country": "RU", "lastName": "Mar", "firstName": "Max"}	50	2025-05-01 12:30:07.859	2025-05-03 06:46:19.513	COMPLETED	2025-05-03 06:46:19.514	8ae5ccb7-a03e-42f4-8d5c-b81b505cd6ec	\N	0
cb143461-6784-45e1-ba90-b6103f6e2e9a	7bde1148-01b8-46f2-92cf-d93af5734056	\N	{"country": "Максимов", "lastName": "Марычев", "firstName": "Максим"}	50	2025-05-01 12:35:38.783	2025-05-03 07:04:49.082	COMPLETED	2025-05-03 07:04:49.083	495b6a15-eabc-4426-8098-afc5a8c1891f	\N	0
69259d38-78cd-49f4-97d7-91c985f3f265	7bde1148-01b8-46f2-92cf-d93af5734056	\N	{"age": 12, "city": "Ижевск", "email": "ivan@mail.ru", "grade": "5", "group": "первая", "phone": "+7 (950) 159-81-72", "gender": "female", "school": "12", "country": "Россия", "lastName": "Иванов", "birthDate": "2005-09-21T00:00:00.000Z", "firstName": "Иван", "patronymic": "Иванов"}	0	2025-05-03 07:35:01.101	2025-05-03 07:35:43.195	COMPLETED	2025-05-03 07:35:43.197	426e6ecc-da85-4d07-9f99-f4195415b9bf	\N	0
153e6140-ce71-490c-bd04-8ca7e81eec69	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"age": 15, "city": "Ижевск", "gender": "male", "country": "Россия", "lastName": "Петров", "birthDate": "2006-04-01", "firstName": "Петр", "patronymic": "Иванович"}	\N	2025-05-11 12:48:35.876	\N	IN_PROGRESS	2025-05-11 12:48:35.876	349228fb-7e80-46e4-8b3c-bb24e76073f9	2025-05-11 13:11:35.875	0
68382188-7b6c-44ad-943c-bd48cf78218f	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"age": 12, "city": "вавы", "gender": "male", "country": "аываыв", "lastName": "Петров", "birthDate": "2025-01-01", "firstName": "Петр", "patronymic": "Петроыич"}	\N	2025-05-11 12:49:40.325	\N	IN_PROGRESS	2025-05-11 12:49:40.325	8a558b48-4d21-4fb6-9d42-f7542ad6247c	2025-05-11 13:12:40.323	0
2f4ac86e-0ff7-4ef3-8c22-8c1646b2e1bb	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	0	2025-05-03 19:08:39.911	2025-05-03 19:23:37.287	COMPLETED	2025-05-03 19:23:37.288	a2a149b0-4855-4d0d-87b9-b7b3703f578d	2025-05-04 06:08:39.909	0
d2e74158-f019-4b02-8dd8-829d1212ef31	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	null	\N	2025-05-03 20:11:15.291	\N	EXPIRED	2025-05-03 20:11:16.492	9f386d16-c379-4c53-a320-e995434f9b9d	2025-05-03 20:11:25.276	0
b16be612-9cad-461e-9fb5-b4fa1a4250dd	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	null	\N	2025-05-03 20:12:18.131	\N	EXPIRED	2025-05-03 20:12:19.623	9f386d16-c379-4c53-a320-e995434f9b9d	2025-05-03 20:12:28.13	0
c9b12ab1-d656-4ff6-89cb-284446a59c7d	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	null	\N	2025-05-03 20:13:11.816	\N	EXPIRED	2025-05-03 20:13:13.752	b2d1c150-4ed7-4afd-9be1-31b2c6fd2bc5	2025-05-03 20:14:11.814	0
19d9fea3-b9b0-4518-bf33-fbf235088071	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	null	\N	2025-05-03 20:14:24.469	\N	EXPIRED	2025-05-03 20:15:24.933	b2d1c150-4ed7-4afd-9be1-31b2c6fd2bc5	2025-05-03 20:15:24.468	0
4ec96984-99f6-4ff5-afb2-8958c0d8e0f1	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	null	\N	2025-05-03 20:17:04.984	\N	EXPIRED	2025-05-03 20:17:16.248	82168795-80e2-4e7a-b082-bb5dda23e1d8	2025-05-03 20:17:14.983	0
94c0016c-1092-4c08-8336-ac6f4a28f7d6	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	null	\N	2025-05-04 13:57:32.017	\N	EXPIRED	2025-05-04 13:58:00.531	82168795-80e2-4e7a-b082-bb5dda23e1d8	2025-05-04 13:57:42.015	0
440f0c70-60a9-4717-aed3-a67b6274017a	7bde1148-01b8-46f2-92cf-d93af5734056	\N	{"phone": "+7 (333) 333-33-33", "birthDate": "2025-01-01"}	\N	2025-05-06 13:22:46.676	\N	IN_PROGRESS	2025-05-06 13:22:46.676	ad286d5e-1e0e-404d-b560-df6d7175d590	\N	0
4810c8a7-eae5-4b50-b7c9-a32919ad3138	3beac1f4-eb2a-4220-b055-71f749a38d6f	e0cbbcbd-d355-4a9f-a604-8f9988fdd85e	null	100	2025-05-09 08:23:16.429	2025-05-09 08:23:22.516	COMPLETED	2025-05-09 08:23:22.517	8155b5b2-3f19-44ea-9705-9d8d8d95e03a	\N	0
de3d40a0-e2b6-43fb-8f0d-bda51bdfb8b3	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	c0940790-ee85-45da-b2cd-cad0b87e79b5	{"lastName": "Иван", "firstName": "Иванов"}	100	2025-05-10 07:34:49.62	2025-05-10 07:38:56.262	COMPLETED	2025-05-10 07:38:56.263	c30cfb97-e123-40f5-a4c3-193284198dcd	2025-05-10 07:34:59.619	0
6d7899d7-e497-4b39-84f2-19545f46496c	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "female"}	50	2025-05-11 13:34:20.478	2025-05-11 13:41:47.828	COMPLETED	2025-05-11 13:41:47.829	6cab08d2-b884-46ac-8e67-d43b456f51ea	2025-05-11 13:57:20.477	0
8e808781-9e6a-4017-858f-426e1f00f6cd	55635461-7446-48af-a297-aa2fc786bc4e	2c6d44d2-59f0-442a-9514-56ef7252b5b9	null	66.67	2025-05-13 06:28:07.162	2025-05-13 06:29:26.393	COMPLETED	2025-05-13 06:29:26.395	9b765eb7-5c09-4d38-b3dd-05533e19c077	2025-05-13 06:29:47.16	0
8c7d6f14-5be7-4a69-8ff7-425a3297718b	55635461-7446-48af-a297-aa2fc786bc4e	2c6d44d2-59f0-442a-9514-56ef7252b5b9	null	0	2025-05-13 06:34:43.313	2025-05-13 06:35:59.383	COMPLETED	2025-05-13 06:35:59.384	9b765eb7-5c09-4d38-b3dd-05533e19c077	2025-05-13 06:36:23.312	0
a592ad1d-cc5b-425f-b188-db0d0408ba85	55635461-7446-48af-a297-aa2fc786bc4e	2c6d44d2-59f0-442a-9514-56ef7252b5b9	{"city": "gdf", "lastName": "fdgdf"}	0	2025-05-13 06:39:31.446	2025-05-13 06:41:37.126	COMPLETED	2025-05-13 06:41:37.127	9b765eb7-5c09-4d38-b3dd-05533e19c077	2025-05-13 06:41:11.444	0
46ff1ad5-3742-4415-aa95-b97dabf98938	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	50	2025-05-15 12:30:46.086	2025-05-15 12:30:53.855	COMPLETED	2025-05-15 12:30:53.856	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
c3651f5a-4729-4bfc-9ed7-cc435b437160	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "male"}	\N	2025-05-13 12:29:23.028	\N	IN_PROGRESS	2025-05-13 12:29:23.028	6cab08d2-b884-46ac-8e67-d43b456f51ea	2025-05-13 12:52:23.026	0
9ea2009d-eaa0-4a8e-8520-574961df8da8	9af97729-c709-4cd6-9a70-22199630e8d0	\N	{"gender": "male"}	100	2025-05-13 13:56:15.216	2025-05-13 13:57:14.23	COMPLETED	2025-05-13 13:58:00.102	1f3bc303-edbf-4fc5-a30e-44c54940ccd3	2025-05-13 15:36:15.214	98
2d87f1bc-faff-4cbd-a6d8-ae5256a9569d	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	{"lastName": "рпор", "firstName": "длд"}	0	2025-05-13 13:36:16.911	2025-05-13 13:37:17.285	COMPLETED	2025-05-13 13:37:17.287	3ba86c5b-09f8-4477-a975-a456ce951892	2025-05-13 13:37:16.91	59
ed78c2db-36e1-4247-b177-925a38a90c03	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "male"}	\N	2025-05-13 13:19:40.934	\N	IN_PROGRESS	2025-05-13 13:20:05.25	6cab08d2-b884-46ac-8e67-d43b456f51ea	2025-05-13 13:42:40.933	24
5b6fa021-c207-42ff-bfc6-da154ce93f6c	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "male"}	0	2025-05-13 12:30:41.687	2025-05-13 13:16:49.402	COMPLETED	2025-05-13 13:16:49.403	6cab08d2-b884-46ac-8e67-d43b456f51ea	2025-05-13 12:53:41.686	1380
e6240200-10eb-416e-9260-93ffb0701455	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "male"}	\N	2025-05-13 13:24:18.181	\N	IN_PROGRESS	2025-05-13 13:24:18.181	6cab08d2-b884-46ac-8e67-d43b456f51ea	2025-05-13 13:47:18.18	0
8e99e506-03d4-4366-97c7-04ed465c2a2f	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	\N	{"lastName": "аыв", "firstName": "аыв"}	0	2025-05-13 13:38:11.742	2025-05-13 13:39:19.827	COMPLETED	2025-05-13 13:39:19.828	3ba86c5b-09f8-4477-a975-a456ce951892	2025-05-13 13:39:11.74	60
35f4984f-9a92-4f83-9c17-93b14a368fb2	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "male"}	\N	2025-05-13 13:25:56.36	\N	IN_PROGRESS	2025-05-13 13:35:59.558	6cab08d2-b884-46ac-8e67-d43b456f51ea	2025-05-13 13:48:56.359	415
89aee7f8-835c-4d9f-bb53-099488fd6a43	3beac1f4-eb2a-4220-b055-71f749a38d6f	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	0	2025-05-10 07:26:33.631	2025-05-15 08:33:45.273	COMPLETED	2025-05-15 08:33:45.275	8155b5b2-3f19-44ea-9705-9d8d8d95e03a	\N	0
ec10abc5-0c11-4624-84f3-285b1be38dad	55635461-7446-48af-a297-aa2fc786bc4e	\N	{"city": "gdf", "lastName": "cxg dfg"}	0	2025-05-15 08:35:42.974	2025-05-15 08:38:55.763	COMPLETED	2025-05-15 08:38:55.764	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	2025-05-15 08:37:22.973	100
50e128f4-5007-43ea-a376-bb828dc5af1d	55635461-7446-48af-a297-aa2fc786bc4e	\N	{"city": "gdf", "lastName": "gdf"}	80	2025-05-15 08:39:11.767	2025-05-15 08:40:52.186	COMPLETED	2025-05-15 08:40:52.187	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	2025-05-15 08:40:51.766	99
6f467edc-525d-46c2-8573-8dd7addf70ff	55635461-7446-48af-a297-aa2fc786bc4e	\N	{"city": "gdf", "lastName": "dfgd"}	60	2025-05-15 08:41:25.542	2025-05-15 08:41:46.502	COMPLETED	2025-05-15 08:41:46.504	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	2025-05-15 08:43:05.541	19
cbe0a9ea-54fa-405f-a451-cf4bbda0aef5	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	100	2025-05-15 12:31:16.377	2025-05-15 12:31:22.354	COMPLETED	2025-05-15 12:31:22.355	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
5014d059-2990-4175-8614-40def7ed2170	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	100	2025-05-16 18:43:56.206	2025-05-16 18:44:47.9	COMPLETED	2025-05-16 18:44:47.901	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
7bb09914-003e-480b-8cbc-5135491d9d19	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	100	2025-05-16 18:45:02.558	2025-05-16 18:45:09.152	COMPLETED	2025-05-16 18:45:09.153	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
1857587d-91e3-4009-b16e-f561ace1ffb0	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	100	2025-05-16 18:45:45.103	2025-05-16 18:46:15.608	COMPLETED	2025-05-16 18:46:15.61	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
3264fe44-ddf5-4517-8069-f3298d009615	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	\N	{"gender": "male"}	\N	2025-05-16 20:50:04.856	\N	IN_PROGRESS	2025-05-16 20:56:43.157	12d1e63d-5136-4e4a-afe9-229dc6261bc2	2025-05-16 21:13:04.854	224
20004b32-a623-4058-8b7c-a71597d65f84	8372415e-023a-4ce1-9586-b2b02265c3d6	0c3593ee-aa77-442a-b540-b4e9c04841d6	null	\N	2025-05-19 06:42:38.034	\N	IN_PROGRESS	2025-05-19 06:42:38.034	2d1cffa9-378c-4dc0-97d7-c6b8674a0d00	\N	0
8b605f3b-86ba-4e95-b743-9f44dbf1646f	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	50	2025-05-15 12:51:00.182	2025-05-15 12:51:04.085	COMPLETED	2025-05-15 12:51:04.087	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
98d89f37-eac9-49d6-9e1c-1c750badd941	8372415e-023a-4ce1-9586-b2b02265c3d6	\N	null	0	2025-05-16 18:55:46.227	2025-05-16 18:55:53.218	COMPLETED	2025-05-16 18:55:53.219	4e6f0591-1f21-4440-b25a-18bdcf107b0f	\N	0
10a7ae23-7196-444a-a336-2248c8d81954	7bde1148-01b8-46f2-92cf-d93af5734056	\N	{"phone": "+7 (094) 823-09-42", "birthDate": "2025-01-01"}	\N	2025-05-19 07:00:51.287	\N	IN_PROGRESS	2025-05-19 07:00:51.287	ad286d5e-1e0e-404d-b560-df6d7175d590	\N	0
e7ca9aa2-a52c-48c4-9501-d4f0672c11d8	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	0	2025-05-15 11:56:09.523	2025-05-15 11:56:30.9	COMPLETED	2025-05-15 11:56:30.901	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
7a3683e0-5f55-4d4a-9230-96c5bc91d1a9	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	0	2025-05-15 12:08:59.844	2025-05-15 12:09:32.653	COMPLETED	2025-05-15 12:09:32.654	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
e4fb1905-1dfb-49c4-ac86-aecf645e5eb4	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	\N	null	0	2025-05-15 12:10:13.258	2025-05-15 12:10:16.95	COMPLETED	2025-05-15 12:10:16.951	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	\N	0
\.


--
-- Data for Name: test_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_settings (id, "testId", "requireRegistration", "inputFields", "showDetailedResults", "timeLimit", "createdAt", "updatedAt", "shuffleAnswers", "shuffleQuestions", "allowRetake") FROM stdin;
5d88b26f-de88-4295-ba62-8a67b3db66e3	74a7675a-aee9-421a-a9a9-82cddc0e4621	t	[]	f	7200	2025-04-04 13:12:58.781	2025-04-15 07:39:44.408	t	f	t
159f79d9-a50d-494e-a016-bd0fe28cc334	ee50a560-0caa-45ce-a679-07aea6cb18fd	f	[]	f	\N	2025-04-19 06:06:15.346	2025-04-19 06:06:15.346	f	f	t
b41e6824-f298-4465-836d-ce1d36b542c1	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	f	["birthDate"]	t	55	2025-04-04 14:06:17.863	2025-05-03 18:46:41.396	t	t	t
4ecb84dd-758b-412c-b120-ba5a7bd0179f	ba01cfbf-211e-4e81-b51e-9e600f13d809	t	["lastName", "city"]	t	100	2025-04-04 14:07:02.771	2025-05-05 08:54:04.661	t	f	t
1975dd30-5bf9-4263-a52f-691f9f8e993a	3beac1f4-eb2a-4220-b055-71f749a38d6f	f	[]	f	\N	2025-05-05 09:06:15.939	2025-05-05 09:06:15.939	f	f	t
012f7f78-192f-42fd-8363-b8e16519da6e	7bde1148-01b8-46f2-92cf-d93af5734056	f	["birthDate", "phone"]	t	0	2025-04-21 07:29:06.667	2025-05-06 13:14:57.451	f	f	t
535c18f7-2204-46fb-aa9c-f7ada1e92842	ed982de2-7878-4aa5-9670-d66b34ce5380	f	[]	f	\N	2025-05-12 20:20:47.191	2025-05-12 20:20:47.236	f	f	t
1a83d66d-7c67-4f7b-8c17-4ccc21c2ef51	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	f	["lastName", "firstName"]	t	60	2025-05-03 18:15:47.329	2025-05-13 13:35:53.301	f	t	t
7a9a9d0f-155f-41c9-8430-2d739190c4e7	9af97729-c709-4cd6-9a70-22199630e8d0	f	["gender"]	f	6000	2025-04-14 16:20:02.732	2025-05-13 13:55:42.673	f	f	t
89036d93-c271-4cbc-a711-e485ac7cd0da	55635461-7446-48af-a297-aa2fc786bc4e	f	["lastName", "city"]	t	100	2025-05-12 20:39:01.805	2025-05-15 08:35:35.279	t	f	t
1bff498f-b1cc-435a-898c-7276985a5d8e	5f28636e-7ac7-4747-b00d-02cd9c4fb04b	f	\N	f	0	2025-05-15 13:13:40.301	2025-05-15 13:13:40.301	t	f	t
9e855358-8043-456b-baa0-5417347b7ce3	bd7d82bb-6ab5-4f65-bbd4-a39308084313	f	\N	f	0	2025-05-15 13:17:18.035	2025-05-15 13:17:18.035	t	f	t
f09e0d68-7463-4508-8ded-499bb206726b	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	f	["gender"]	f	1380	2025-05-11 12:09:18.249	2025-05-16 10:21:44.965	t	t	t
7e62d974-83c6-4281-8e6e-914fc3481fbb	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	t	[]	t	0	2025-05-11 13:46:32.351	2025-05-18 07:59:57.513	f	f	f
de8ae816-de58-4eed-9c30-a303c06b8d73	8372415e-023a-4ce1-9586-b2b02265c3d6	t	[]	f	0	2025-05-15 13:17:26.102	2025-05-19 06:26:50.334	t	f	t
\.


--
-- Data for Name: test_settings_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_settings_snapshots (id, "testSnapshotId", "requireRegistration", "inputFields", "showDetailedResults", "shuffleQuestions", "shuffleAnswers", "timeLimit", "createdAt") FROM stdin;
74f3160d-3372-45ef-a15f-11644542c80e	8155b5b2-3f19-44ea-9705-9d8d8d95e03a	f	[]	f	f	f	\N	2025-05-05 10:39:40.403
a4391f4e-421f-4aeb-b1ab-ca5de0eac455	a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	t	["group"]	t	t	t	0	2025-04-13 07:49:37.012
396a6d1d-f503-438e-ad43-121390298692	c41a12b2-00fe-45c8-8c0f-0299bf34bee2	t	["lastName", "birthDate"]	f	f	t	7200	2025-04-15 07:39:44.422
1dd8c054-3610-40b0-ad14-911242285741	ffc79b8f-e338-4bb7-8fc6-58a2f441ff64	f	["patronymic"]	f	f	f	0	2025-04-15 08:49:03.496
778d304d-3545-47f4-9da0-71a8d30ab5d9	27e222b7-3ee4-4c3a-ae5d-241971a2fea8	f	[]	f	f	f	14400	2025-04-18 08:18:50.472
8e0efa0b-db7b-468d-a3cf-a0b199cf6681	4d860683-4228-4b30-a777-daf183e3dcc7	t	[]	f	f	t	7200	2025-04-18 08:35:59.4
4caf229e-6263-483d-a8e7-f4e6bd3cea9e	8967b96a-4400-4603-9e60-e373f29376cc	t	[]	f	f	t	7200	2025-04-18 08:36:56.93
744ef5cc-0a95-4a3f-811a-4f0d5fe1a25e	176e701b-2750-49d9-941f-04f099c67cce	t	[]	f	f	t	7200	2025-04-18 08:39:17.978
df1bca09-f955-4445-be37-59ee17a646be	c9c64a2a-2bd8-4468-ad67-2621896924c2	f	[]	f	f	f	\N	2025-04-19 06:06:15.348
57ad44db-eb63-4f24-9849-8f5aca02a1d0	c2ad9eeb-b3bb-4579-85b3-0cf5f9dbb128	f	[]	f	f	f	\N	2025-04-21 07:30:16.491
e89e10a3-5416-4541-a602-4cd1de3b9f3d	b45eac52-b59d-4e7e-97bb-2172925e2a1b	f	[]	f	f	f	\N	2025-04-21 12:04:39.775
55f91d21-337e-47d4-b798-e7f836ca68de	8ae5ccb7-a03e-42f4-8d5c-b81b505cd6ec	f	["firstName"]	f	f	f	0	2025-05-01 12:21:01.19
6c64d954-e997-484e-9115-94a4efcaaaef	495b6a15-eabc-4426-8098-afc5a8c1891f	f	["firstName", "lastName", "country"]	f	f	f	0	2025-05-01 12:35:09.507
3950d772-a6e9-4b42-96ad-075800aeff61	ad286d5e-1e0e-404d-b560-df6d7175d590	f	["birthDate", "phone"]	t	f	f	0	2025-05-06 13:14:57.471
da3b6e62-3a7b-4837-9fbe-0d7c29829a4a	c30cfb97-e123-40f5-a4c3-193284198dcd	f	["lastName", "firstName"]	t	t	f	10	2025-05-10 07:20:18.126
6ca81de3-7596-49d8-a33f-7fa90c7db92b	426e6ecc-da85-4d07-9f99-f4195415b9bf	f	["firstName", "lastName", "country"]	f	f	f	0	2025-05-03 06:23:42.828
7fad0e9b-e14e-4949-bf3c-81d02d517077	349228fb-7e80-46e4-8b3c-bb24e76073f9	f	["lastName", "firstName", "patronymic", "gender", "birthDate", "age", "city", "country"]	f	f	f	1380	2025-05-11 12:45:23.578
e3fc5eb9-03ba-44d9-9076-6d11306bd813	de3fff99-4779-41fb-8c62-21d3932a6a23	t	["birthDate"]	t	t	t	1	2025-05-03 18:39:02.575
5af31296-b5cf-4abc-b2d3-a99bbe48daef	fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	f	["birthDate"]	t	t	t	10	2025-05-03 18:41:28.785
bc6ad8c7-f822-4c35-9e47-7f77314944bb	89e92616-0452-47cc-9669-33b7bf930ae2	f	["birthDate"]	t	t	t	11	2025-05-03 18:46:00.245
4390751e-b3c0-4432-8c53-9a676c9ded74	195e1075-b441-4f1e-82bd-2a7a631253f1	f	["birthDate"]	t	t	t	55	2025-05-03 18:46:41.415
8de8fe1c-6ece-41fb-9bb7-6a02d113070f	8a558b48-4d21-4fb6-9d42-f7542ad6247c	f	["lastName", "firstName", "patronymic", "gender", "birthDate", "age", "city", "country"]	t	t	t	1380	2025-05-11 12:49:19.413
beca18c6-0c7f-4658-8688-fb34146be4dc	6cab08d2-b884-46ac-8e67-d43b456f51ea	f	["gender"]	t	t	t	1380	2025-05-11 13:20:46.308
45d9c228-79c3-4a06-bac6-8aac3e7a2ddd	a2a149b0-4855-4d0d-87b9-b7b3703f578d	f	[]	t	t	f	660	2025-05-03 18:50:41.499
0262122c-7c7e-48af-9889-d7c0eaf2723e	9f386d16-c379-4c53-a320-e995434f9b9d	f	[]	t	t	f	10	2025-05-03 19:57:20.995
a9d89a19-687c-434a-98da-80097b6eef21	b2d1c150-4ed7-4afd-9be1-31b2c6fd2bc5	f	[]	t	t	f	60	2025-05-03 20:12:53.599
2a8dd5b5-bfd8-4556-ac02-4d911b03f5c6	82168795-80e2-4e7a-b082-bb5dda23e1d8	f	[]	t	t	f	10	2025-05-03 20:16:48.134
2308ad2b-4044-4e4f-ac9e-3fd81f224fea	446b811a-2b15-4edc-a0a6-608a4da8e6a5	t	["lastName", "city"]	t	f	t	100	2025-05-05 08:54:04.715
36d12d84-8d33-47d5-ae10-f74755490a85	78abf73c-d082-4163-9bd8-7a6b3dc13890	f	[]	f	f	f	\N	2025-05-12 20:20:47.285
258d6b5b-5b61-405b-b129-fe2a51c3cdd8	9b765eb7-5c09-4d38-b3dd-05533e19c077	t	["lastName", "city"]	t	f	t	100	2025-05-12 20:39:01.878
4cbbc329-5eaa-486b-b166-cad8384fd95a	3ba86c5b-09f8-4477-a975-a456ce951892	f	["lastName", "firstName"]	t	t	f	60	2025-05-13 13:35:53.317
93de5812-2587-4b70-859f-03664dd8b3d3	1f3bc303-edbf-4fc5-a30e-44c54940ccd3	f	["gender"]	f	f	f	6000	2025-05-13 13:55:42.689
4162786d-b55b-4d41-9bb0-e446b3c051d1	e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	f	["lastName", "city"]	t	f	t	100	2025-05-15 08:35:35.318
c7c6119a-0779-49f2-8e1e-f6f702f29929	bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	f	[]	t	f	f	0	2025-05-15 11:08:41.675
aefc5125-ef57-439a-9d00-3ce144d1cd0d	e20e2e82-8425-47f6-bd70-9a4e19d4ba4e	f	[]	f	f	t	0	2025-05-15 13:13:40.303
6a068ca8-7c26-4d5b-89c2-0fae145b9b7a	24ef98d2-ffe3-4d16-9675-3007797310d1	f	[]	f	f	t	0	2025-05-15 13:17:18.037
4bf36509-0ddb-4755-9d0f-f596be6be948	4e6f0591-1f21-4440-b25a-18bdcf107b0f	f	[]	f	f	t	0	2025-05-15 13:17:26.104
547a2e40-ea21-4b23-b947-030a6c839c34	12d1e63d-5136-4e4a-afe9-229dc6261bc2	f	["gender"]	f	t	t	1380	2025-05-16 10:21:44.983
9a362106-709c-4a37-97b1-773a1f19ae9b	8a9d1abf-00c8-4d48-8902-ea01e3804e97	t	[]	f	f	t	0	2025-05-17 06:08:36.932
3e63aac5-f5a6-4c3e-b6b7-4a51f4bb3d94	6a933c99-9e1a-485d-8626-bcc3f3765c01	t	[]	t	f	f	0	2025-05-18 07:58:25.015
4a822156-6d34-417d-a89e-41af10a320e0	a5657e62-d47d-48ca-9c4b-153b00c2c10d	t	[]	t	f	f	0	2025-05-18 07:59:57.522
31a08e30-084d-4f56-98f0-fdfb5ba92197	75b0fbb1-68f5-4943-b5f9-c4299af39ad9	f	[]	f	f	t	0	2025-05-18 15:29:14.476
04cf4f5b-917b-4528-aa1e-7780e55deaec	97d98525-78b4-47f8-8fd8-0dbe38497ab4	f	[]	f	f	t	0	2025-05-19 05:38:41.533
11a39c6b-6170-492c-955c-6d862dbeeadd	2d1cffa9-378c-4dc0-97d7-c6b8674a0d00	t	[]	f	f	t	0	2025-05-19 06:26:50.35
\.


--
-- Data for Name: test_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_snapshots (id, "testId", title, description, "moderationStatus", "visibilityStatus", "createdAt", version) FROM stdin;
8155b5b2-3f19-44ea-9705-9d8d8d95e03a	3beac1f4-eb2a-4220-b055-71f749a38d6f	ВОПРОСЫ	яяя	PENDING	PUBLISHED	2025-05-05 10:39:40.4	5
a7cd9a67-ce2e-46f3-ac98-d586dc356dd4	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Привет	\N	PENDING	PUBLISHED	2025-04-13 07:49:37	1
c41a12b2-00fe-45c8-8c0f-0299bf34bee2	74a7675a-aee9-421a-a9a9-82cddc0e4621	Мой тестик123		PENDING	PUBLISHED	2025-04-15 07:39:44.411	10
ffc79b8f-e338-4bb7-8fc6-58a2f441ff64	9af97729-c709-4cd6-9a70-22199630e8d0	выаыв	аыв	PENDING	PUBLISHED	2025-04-15 08:49:03.495	3
27e222b7-3ee4-4c3a-ae5d-241971a2fea8	ba01cfbf-211e-4e81-b51e-9e600f13d809	Мой тест	666	PENDING	PUBLISHED	2025-04-18 08:18:50.461	5
4d860683-4228-4b30-a777-daf183e3dcc7	74a7675a-aee9-421a-a9a9-82cddc0e4621	КРУТОЙ ТЕСТ	описание теста	PENDING	PUBLISHED	2025-04-18 08:35:59.398	17
8967b96a-4400-4603-9e60-e373f29376cc	74a7675a-aee9-421a-a9a9-82cddc0e4621	КРУТОЙ ТЕСТ	описание теста !	PENDING	PUBLISHED	2025-04-18 08:36:56.928	18
176e701b-2750-49d9-941f-04f099c67cce	74a7675a-aee9-421a-a9a9-82cddc0e4621	КРУТОЙ ТЕСТ	описание теста	PENDING	PUBLISHED	2025-04-18 08:39:17.976	21
c9c64a2a-2bd8-4468-ad67-2621896924c2	ee50a560-0caa-45ce-a679-07aea6cb18fd	мой тест	привет	PENDING	PUBLISHED	2025-04-19 06:06:15.347	1
c2ad9eeb-b3bb-4579-85b3-0cf5f9dbb128	7bde1148-01b8-46f2-92cf-d93af5734056	Китай	China	PENDING	PUBLISHED	2025-04-21 07:30:16.491	1
b45eac52-b59d-4e7e-97bb-2172925e2a1b	7bde1148-01b8-46f2-92cf-d93af5734056	Китайойз	China	PENDING	PUBLISHED	2025-04-21 12:04:39.767	2
8ae5ccb7-a03e-42f4-8d5c-b81b505cd6ec	7bde1148-01b8-46f2-92cf-d93af5734056	Китайойз	China	PENDING	PUBLISHED	2025-05-01 12:21:01.187	4
495b6a15-eabc-4426-8098-afc5a8c1891f	7bde1148-01b8-46f2-92cf-d93af5734056	Good Test	China	PENDING	PUBLISHED	2025-05-01 12:35:09.501	5
ad286d5e-1e0e-404d-b560-df6d7175d590	7bde1148-01b8-46f2-92cf-d93af5734056	Good Test	China	PENDING	PUBLISHED	2025-05-06 13:14:57.464	9
c30cfb97-e123-40f5-a4c3-193284198dcd	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	ББББББББББББББББ	33	PENDING	PUBLISHED	2025-05-10 07:20:18.117	17
426e6ecc-da85-4d07-9f99-f4195415b9bf	7bde1148-01b8-46f2-92cf-d93af5734056	Good Test	China	PENDING	PUBLISHED	2025-05-03 06:23:42.817	6
349228fb-7e80-46e4-8b3c-bb24e76073f9	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	Я	мч	PENDING	PUBLISHED	2025-05-11 12:45:23.575	6
de3fff99-4779-41fb-8c62-21d3932a6a23	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Привет	\N	PENDING	PUBLISHED	2025-05-03 18:39:02.564	32
fbe7bf20-fa79-4cc4-ae1f-62b1cf03cd7e	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Привет	\N	PENDING	PUBLISHED	2025-05-03 18:41:28.772	33
89e92616-0452-47cc-9669-33b7bf930ae2	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Привет	\N	PENDING	PUBLISHED	2025-05-03 18:46:00.23	35
195e1075-b441-4f1e-82bd-2a7a631253f1	acadcf46-6b77-4178-9ad1-270e9b3e4dfa	Привет	\N	PENDING	PUBLISHED	2025-05-03 18:46:41.402	36
8a558b48-4d21-4fb6-9d42-f7542ad6247c	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	Я	мч	PENDING	PUBLISHED	2025-05-11 12:49:19.406	7
6cab08d2-b884-46ac-8e67-d43b456f51ea	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	Я	мч	PENDING	PUBLISHED	2025-05-11 13:20:46.3	8
a2a149b0-4855-4d0d-87b9-b7b3703f578d	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	ААААААААААААААААА	33	PENDING	PUBLISHED	2025-05-03 18:50:41.495	6
9f386d16-c379-4c53-a320-e995434f9b9d	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	ААААААААААААААААА	33	PENDING	PUBLISHED	2025-05-03 19:57:20.988	7
b2d1c150-4ed7-4afd-9be1-31b2c6fd2bc5	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	ААААААААААААААААА	33	PENDING	PUBLISHED	2025-05-03 20:12:53.593	8
82168795-80e2-4e7a-b082-bb5dda23e1d8	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	ААААААААААААААААА	33	PENDING	PUBLISHED	2025-05-03 20:16:48.129	9
446b811a-2b15-4edc-a0a6-608a4da8e6a5	ba01cfbf-211e-4e81-b51e-9e600f13d809	Мой тест	777	PENDING	PUBLISHED	2025-05-05 08:54:04.686	11
78abf73c-d082-4163-9bd8-7a6b3dc13890	ed982de2-7878-4aa5-9670-d66b34ce5380	Копия: hfg	hfg	APPROVED	PUBLISHED	2025-05-12 20:20:47.284	2
9b765eb7-5c09-4d38-b3dd-05533e19c077	55635461-7446-48af-a297-aa2fc786bc4e	Копия: Мой тест	777	APPROVED	PUBLISHED	2025-05-12 20:39:01.877	2
3ba86c5b-09f8-4477-a975-a456ce951892	1a0d9bb7-14e8-4ee2-b209-805ca45e1510	ББББББББББББББББ	33	PENDING	PUBLISHED	2025-05-13 13:35:53.309	19
1f3bc303-edbf-4fc5-a30e-44c54940ccd3	9af97729-c709-4cd6-9a70-22199630e8d0	название	описание	PENDING	PUBLISHED	2025-05-13 13:55:42.685	6
e106ad6a-fd6f-4afb-9fdb-2ecd07e7c2e7	55635461-7446-48af-a297-aa2fc786bc4e	Копия: Мой тест	777	APPROVED	PUBLISHED	2025-05-15 08:35:35.287	4
bcc20e1b-8cc0-4bc6-907c-b7d6abb23ae2	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	hfg	hfg	APPROVED	PUBLISHED	2025-05-15 11:08:41.668	6
e20e2e82-8425-47f6-bd70-9a4e19d4ba4e	5f28636e-7ac7-4747-b00d-02cd9c4fb04b	Мой тест 1	Описание теста	APPROVED	PUBLISHED	2025-05-15 13:13:40.302	1
24ef98d2-ffe3-4d16-9675-3007797310d1	bd7d82bb-6ab5-4f65-bbd4-a39308084313	sdg sf	sdf	APPROVED	PUBLISHED	2025-05-15 13:17:18.036	1
4e6f0591-1f21-4440-b25a-18bdcf107b0f	8372415e-023a-4ce1-9586-b2b02265c3d6	fsdf s	fsd	APPROVED	PUBLISHED	2025-05-15 13:17:26.103	1
12d1e63d-5136-4e4a-afe9-229dc6261bc2	5c9ae33c-53a8-4551-adb5-d8e2a70800d7	Я	мч	APPROVED	PUBLISHED	2025-05-16 10:21:44.973	9
8a9d1abf-00c8-4d48-8902-ea01e3804e97	8372415e-023a-4ce1-9586-b2b02265c3d6	fsdf s	fsd	APPROVED	PUBLISHED	2025-05-17 06:08:36.923	2
6a933c99-9e1a-485d-8626-bcc3f3765c01	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	hfg	hfg	APPROVED	PUBLISHED	2025-05-18 07:58:25.009	12
a5657e62-d47d-48ca-9c4b-153b00c2c10d	c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	hfg	hfg	APPROVED	PUBLISHED	2025-05-18 07:59:57.518	13
75b0fbb1-68f5-4943-b5f9-c4299af39ad9	8372415e-023a-4ce1-9586-b2b02265c3d6	fsdf s	fsd	APPROVED	PUBLISHED	2025-05-18 15:29:14.468	3
97d98525-78b4-47f8-8fd8-0dbe38497ab4	8372415e-023a-4ce1-9586-b2b02265c3d6	fsdf s	fsd	APPROVED	PUBLISHED	2025-05-19 05:38:41.523	4
2d1cffa9-378c-4dc0-97d7-c6b8674a0d00	8372415e-023a-4ce1-9586-b2b02265c3d6	fsdf s	fsd	APPROVED	PUBLISHED	2025-05-19 06:26:50.345	6
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tests (id, "authorId", title, description, "moderationStatus", "visibilityStatus", "createdAt", "updatedAt", version, "moderatedAt", "moderatedBy") FROM stdin;
ed982de2-7878-4aa5-9670-d66b34ce5380	0c3593ee-aa77-442a-b540-b4e9c04841d6	Копия: hfg	hfg	APPROVED	HIDDEN	2025-05-12 20:20:47.185	2025-05-12 20:21:07.701	3	\N	\N
8372415e-023a-4ce1-9586-b2b02265c3d6	0c3593ee-aa77-442a-b540-b4e9c04841d6	fsdf s	fsd	APPROVED	PUBLISHED	2025-05-15 13:17:26.1	2025-05-19 06:26:50.335	6	2025-05-15 19:35:40.827	0c3593ee-aa77-442a-b540-b4e9c04841d6
5f28636e-7ac7-4747-b00d-02cd9c4fb04b	2c6d44d2-59f0-442a-9514-56ef7252b5b9	Мой тест 1	Описание теста	APPROVED	PUBLISHED	2025-05-15 13:13:40.299	2025-05-15 13:13:40.304	1	\N	\N
bd7d82bb-6ab5-4f65-bbd4-a39308084313	2c6d44d2-59f0-442a-9514-56ef7252b5b9	sdg sf	sdf	APPROVED	PUBLISHED	2025-05-15 13:17:18.033	2025-05-15 13:17:18.037	1	\N	\N
7bde1148-01b8-46f2-92cf-d93af5734056	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	Good Test	China	APPROVED	PUBLISHED	2025-04-21 07:29:06.665	2025-05-19 07:00:30.917	9	\N	\N
acadcf46-6b77-4178-9ad1-270e9b3e4dfa	0c3593ee-aa77-442a-b540-b4e9c04841d6	Привет	\N	APPROVED	PUBLISHED	2025-04-04 14:06:17.859	2025-05-14 18:14:58.853	36	2025-05-14 18:14:58.851	0c3593ee-aa77-442a-b540-b4e9c04841d6
3beac1f4-eb2a-4220-b055-71f749a38d6f	0c3593ee-aa77-442a-b540-b4e9c04841d6	ВОПРОСЫ	яяя	APPROVED	PUBLISHED	2025-05-05 09:06:15.938	2025-05-15 06:18:02.83	6	\N	\N
1a0d9bb7-14e8-4ee2-b209-805ca45e1510	0c3593ee-aa77-442a-b540-b4e9c04841d6	ББББББББББББББББ	33	APPROVED	PUBLISHED	2025-05-03 18:15:47.328	2025-05-15 06:18:02.83	19	\N	\N
74a7675a-aee9-421a-a9a9-82cddc0e4621	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	КРУТОЙ ТЕСТ	описание теста	APPROVED	PUBLISHED	2025-04-04 13:12:58.778	2025-05-15 06:18:02.83	22	\N	\N
9af97729-c709-4cd6-9a70-22199630e8d0	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	название	описание	APPROVED	PUBLISHED	2025-04-14 16:20:02.73	2025-05-15 06:18:02.83	6	\N	\N
ba01cfbf-211e-4e81-b51e-9e600f13d809	2c6d44d2-59f0-442a-9514-56ef7252b5b9	Мой тест	777	APPROVED	PUBLISHED	2025-04-04 14:07:02.769	2025-05-15 06:18:02.83	11	\N	\N
c6fe1f6d-3c9f-404e-98b0-692dd9ee170d	0c3593ee-aa77-442a-b540-b4e9c04841d6	hfg	hfg	APPROVED	PUBLISHED	2025-05-11 13:46:32.347	2025-05-18 07:59:57.514	13	2025-05-18 07:58:18.291	0c3593ee-aa77-442a-b540-b4e9c04841d6
ee50a560-0caa-45ce-a679-07aea6cb18fd	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	мой тест	привет	APPROVED	PUBLISHED	2025-04-19 06:06:15.342	2025-05-15 06:18:02.83	1	\N	\N
55635461-7446-48af-a297-aa2fc786bc4e	0c3593ee-aa77-442a-b540-b4e9c04841d6	Копия: Мой тест	777	APPROVED	PUBLISHED	2025-05-12 20:39:01.803	2025-05-15 08:35:35.281	4	2025-05-14 19:39:08.402	0c3593ee-aa77-442a-b540-b4e9c04841d6
5c9ae33c-53a8-4551-adb5-d8e2a70800d7	0c3593ee-aa77-442a-b540-b4e9c04841d6	Я	мч	APPROVED	PUBLISHED	2025-05-11 12:09:18.247	2025-05-16 10:21:44.967	9	\N	\N
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, "userId", "refreshToken", "createdAt", "updatedAt") FROM stdin;
41a137a1-eb8d-4c05-9ca6-95b44d5183a1	93722c2d-9fec-4588-90e9-a04f9db48c42	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzNzIyYzJkLTlmZWMtNDU4OC05MGU5LWEwNGY5ZGI0OGM0MiIsImVtYWlsIjoiMUBtYWlsLnJ1IiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpc0Jsb2NrZWQiOnRydWUsInJvbGUiOiJVU0VSIiwibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwicGF0cm9ueW1pYyI6bnVsbCwiaWF0IjoxNzQ2NzczNTA4LCJleHAiOjE3NDkzNjU1MDh9.50TxrO_tKilkeWpEbr-zqf3CS9bWbHr0yK6JAJEz5x8	2025-05-08 17:54:54.387	2025-05-09 06:51:48.221
d5e76fe3-847b-408d-9364-2d8cfc527e52	5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZDFmMmVhLWExZDgtNDU0OS1iNjRmLTVlMjk4M2E2ODlhMyIsImVtYWlsIjoibWFyeWNoZWZmMTdAZ21haWwuY29tIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlzQmxvY2tlZCI6ZmFsc2UsInJvbGUiOiJBRE1JTiIsIm5hbWUiOiJNYXgiLCJzdXJuYW1lIjpudWxsLCJwYXRyb255bWljIjpudWxsLCJpYXQiOjE3NDc1MTQwODMsImV4cCI6MTc1MDEwNjA4M30.N8V-p9n89mZi7LotQGCT1DM-H6KPbPDkK76m3V5pTLo	2025-05-17 19:26:51.208	2025-05-17 20:34:43.471
e8dcb0a3-1542-47c2-94a8-303547239627	c0940790-ee85-45da-b2cd-cad0b87e79b5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwOTQwNzkwLWVlODUtNDVkYS1iMmNkLWNhZDBiODdlNzliNSIsImVtYWlsIjoibWF4ODk1MDE1OTgxNzJAZ21haWwuY29tIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpc0Jsb2NrZWQiOmZhbHNlLCJyb2xlIjoiVVNFUiIsIm5hbWUiOm51bGwsInN1cm5hbWUiOm51bGwsInBhdHJvbnltaWMiOm51bGwsImlhdCI6MTc0NzI1Mjc2NywiZXhwIjoxNzQ5ODQ0NzY3fQ.jkRxPnBRbp1_sglDEf0rN3fCsmg8YhuAkO76s2JG5LM	2025-05-08 12:19:56.188	2025-05-14 19:59:27.814
d284cb6d-769f-4486-8e3f-0f7e6c9d1d4d	2c6d44d2-59f0-442a-9514-56ef7252b5b9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjNmQ0NGQyLTU5ZjAtNDQyYS05NTE0LTU2ZWY3MjUyYjViOSIsImVtYWlsIjoibWFyeWNoZXY1QHlhLnJ1IiwiaXNBY3RpdmF0ZWQiOnRydWUsImlzQmxvY2tlZCI6ZmFsc2UsInJvbGUiOiJVU0VSIiwibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwicGF0cm9ueW1pYyI6bnVsbCwiaWF0IjoxNzQ3NjM3NDQyLCJleHAiOjE3NTAyMjk0NDJ9.ViR4hfJ9vIV7VLoO_TuYQ8BmMtDPUV0_9UFnbHz66c8	2025-05-13 06:23:08.634	2025-05-19 06:50:42.016
4a7c2dec-e6a9-4509-802d-c5a0a6cadd67	0c3593ee-aa77-442a-b540-b4e9c04841d6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjMzU5M2VlLWFhNzctNDQyYS1iNTQwLWI0ZTljMDQ4NDFkNiIsImVtYWlsIjoibWFyeWNoZWZmZkBnbWFpbC5jb20iLCJpc0FjdGl2YXRlZCI6dHJ1ZSwiaXNCbG9ja2VkIjpmYWxzZSwicm9sZSI6IkFETUlOIiwibmFtZSI6ItCvIiwic3VybmFtZSI6ImZzZGYgZnNkIiwicGF0cm9ueW1pYyI6bnVsbCwiaWF0IjoxNzQ3NjM3OTgzLCJleHAiOjE3NTAyMjk5ODN9.lEbEqsokvnVThEWBfrhV4948Z4daleMyTbZRA2utQho	2025-05-14 20:02:36.83	2025-05-19 06:59:43.293
0d97b375-1a38-4b0a-bc68-8a53deedbb93	e0cbbcbd-d355-4a9f-a604-8f9988fdd85e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwY2JiY2JkLWQzNTUtNGE5Zi1hNjA0LThmOTk4OGZkZDg1ZSIsImVtYWlsIjoibWFyeWNoZXYwMUBnbWFpbC5jb20iLCJpc0FjdGl2YXRlZCI6dHJ1ZSwiaXNCbG9ja2VkIjpmYWxzZSwicm9sZSI6IlVTRVIiLCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJwYXRyb255bWljIjpudWxsLCJpYXQiOjE3NDc2MzgxMDcsImV4cCI6MTc1MDIzMDEwN30.obnQxqcAvZFaqfsZEVipbyG0nDLvWD-Vs9fRc9zGnCc	2025-05-09 07:01:45.938	2025-05-19 07:01:47.264
\.


--
-- Data for Name: user_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_answers (id, "attemptId", "questionId", "answerId", "answeredAt", "timeSpent", "createdAt", "textAnswer", "isCorrect") FROM stdin;
c4f3164f-b130-4882-a23c-94ca937105be	1b36bf1d-7421-4837-a838-c3d9688b681f	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	85217cad-64aa-41df-8fe5-a0de46694d8e	2025-04-21 12:01:45.67	0	2025-04-21 12:01:48.13	\N	\N
1c705001-8096-4cd8-8aba-8b875a9fb3a8	1b36bf1d-7421-4837-a838-c3d9688b681f	3d73bad3-223e-483f-b766-adde87a2769c	63e043df-275e-4ba1-b355-0c94d9035b38	2025-04-21 12:01:01.21	0	2025-04-21 12:01:48.131	\N	\N
2c953537-bd57-498f-95bf-ccdd75ab2597	1b36bf1d-7421-4837-a838-c3d9688b681f	3d73bad3-223e-483f-b766-adde87a2769c	8470ef2b-9ef3-4822-9b1c-2b860233930a	2025-04-21 12:01:01.21	0	2025-04-21 12:01:48.131	\N	\N
c93840e3-e4c7-4f31-82b1-3ef1f52df720	1b36bf1d-7421-4837-a838-c3d9688b681f	3d73bad3-223e-483f-b766-adde87a2769c	52421d83-3cbe-4375-8c61-38ae5ca2b94b	2025-04-21 12:01:01.21	0	2025-04-21 12:01:48.131	\N	\N
fdf290e9-81d1-4d2b-b7f7-0b4a2786938d	a58594dc-5c7b-4bfe-a067-082c2321311b	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	38a24928-f53e-4bb7-85a1-8a7f484314ee	2025-04-21 12:45:38.893	0	2025-04-21 12:48:15.13	\N	\N
3721ff3d-a704-4d42-a7dc-e64b1aa72768	a58594dc-5c7b-4bfe-a067-082c2321311b	3d73bad3-223e-483f-b766-adde87a2769c	8470ef2b-9ef3-4822-9b1c-2b860233930a	2025-04-21 12:48:12.497	0	2025-04-21 12:48:15.132	\N	\N
482592f6-2630-4c04-8949-703ef1dc7a8a	72cd506c-b833-47c9-927b-fed025fdc1e1	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	c9c858e6-b349-40a7-87ad-23688c967ae8	2025-04-22 08:42:08.885	0	2025-04-23 10:14:29.972	\N	\N
444c887e-b96e-4085-ac10-15c193b2bdf4	1783167c-b2b7-448c-8b61-5cdea6725f41	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	c9c858e6-b349-40a7-87ad-23688c967ae8	2025-04-21 11:30:24.686	0	2025-04-21 11:30:39.895	\N	\N
214bfb54-b911-4699-8b49-a78ebaceedee	1783167c-b2b7-448c-8b61-5cdea6725f41	3d73bad3-223e-483f-b766-adde87a2769c	63e043df-275e-4ba1-b355-0c94d9035b38	2025-04-21 11:30:34.661	0	2025-04-21 11:30:39.896	\N	\N
239b8993-7b0c-494d-b009-d68f7864011e	1783167c-b2b7-448c-8b61-5cdea6725f41	3d73bad3-223e-483f-b766-adde87a2769c	52421d83-3cbe-4375-8c61-38ae5ca2b94b	2025-04-21 11:30:34.661	0	2025-04-21 11:30:39.896	\N	\N
1f8bbf1d-111d-4e7a-9fd1-b67f5d6f945a	9d56994c-22a4-48b9-a2c3-9b39edf277bc	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	38a24928-f53e-4bb7-85a1-8a7f484314ee	2025-05-03 06:46:09.492	0	2025-05-03 06:46:19.5	\N	\N
7eb37da5-9bea-417a-8b98-96a24eb659d3	9d56994c-22a4-48b9-a2c3-9b39edf277bc	3d73bad3-223e-483f-b766-adde87a2769c	52421d83-3cbe-4375-8c61-38ae5ca2b94b	2025-05-03 06:46:18.569	0	2025-05-03 06:46:19.501	\N	\N
597f3a75-584e-4734-9a81-b280c7a17f2d	9d56994c-22a4-48b9-a2c3-9b39edf277bc	3d73bad3-223e-483f-b766-adde87a2769c	63e043df-275e-4ba1-b355-0c94d9035b38	2025-05-03 06:46:18.569	0	2025-05-03 06:46:19.501	\N	\N
c62b1445-5c5f-466b-b309-69e77de6d049	cb143461-6784-45e1-ba90-b6103f6e2e9a	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	c9c858e6-b349-40a7-87ad-23688c967ae8	2025-05-03 07:04:28.056	0	2025-05-03 07:04:49.069	\N	\N
086c3e68-ff38-4b48-a06a-a01dc4efb270	cb143461-6784-45e1-ba90-b6103f6e2e9a	3d73bad3-223e-483f-b766-adde87a2769c	8470ef2b-9ef3-4822-9b1c-2b860233930a	2025-05-03 07:04:29.248	0	2025-05-03 07:04:49.071	\N	\N
4c4962a1-19ee-497d-9f7c-f261c508b576	69259d38-78cd-49f4-97d7-91c985f3f265	a5cc75e0-ee8a-4b86-9452-0550dad9f6bf	85217cad-64aa-41df-8fe5-a0de46694d8e	2025-05-03 07:35:36.744	0	2025-05-03 07:35:43.187	\N	\N
fa7fe83c-6e0d-44cb-bf2b-1e7c062c165d	69259d38-78cd-49f4-97d7-91c985f3f265	3d73bad3-223e-483f-b766-adde87a2769c	63e043df-275e-4ba1-b355-0c94d9035b38	2025-05-03 07:35:40.359	0	2025-05-03 07:35:43.188	\N	\N
d706ea00-293b-4a80-9f3b-d4936080b9d8	69259d38-78cd-49f4-97d7-91c985f3f265	3d73bad3-223e-483f-b766-adde87a2769c	8470ef2b-9ef3-4822-9b1c-2b860233930a	2025-05-03 07:35:40.359	0	2025-05-03 07:35:43.188	\N	\N
b6d59734-dd90-413f-8fcc-718ca351bbf4	4810c8a7-eae5-4b50-b7c9-a32919ad3138	3a0a76b2-3785-4ff1-90fc-0c019fa928d7	18daf1f9-2f04-47b0-b1cc-f86f21294596	2025-05-09 08:23:17.809	0	2025-05-09 08:23:22.499	\N	\N
6715841f-6073-4b33-bb76-873e2aa79583	4810c8a7-eae5-4b50-b7c9-a32919ad3138	eb8767f5-6231-43e9-ab75-80926aaa22b6	628f2495-8f30-4403-bf72-fc353f900097	2025-05-09 08:23:21.106	0	2025-05-09 08:23:22.5	\N	\N
a886ff89-c016-4e51-a945-b9a06bf6ecef	4810c8a7-eae5-4b50-b7c9-a32919ad3138	eb8767f5-6231-43e9-ab75-80926aaa22b6	d7ceae64-41b5-4d97-b83e-080086bce942	2025-05-09 08:23:21.106	0	2025-05-09 08:23:22.5	\N	\N
406b1439-1c48-4035-a3b1-a8c3c1595b30	4810c8a7-eae5-4b50-b7c9-a32919ad3138	eb8767f5-6231-43e9-ab75-80926aaa22b6	e11228c1-b288-44a6-bdf3-df6213fa9843	2025-05-09 08:23:21.106	0	2025-05-09 08:23:22.5	\N	\N
95ca3834-b22d-4181-b9d7-5c55700771a0	de3d40a0-e2b6-43fb-8f0d-bda51bdfb8b3	ac3ef65a-e601-49ce-a800-91a62c321df7	e3518c84-9e66-4851-b6f0-75952dcf9183	2025-05-10 07:38:51.518	0	2025-05-10 07:38:56.246	\N	\N
1984607b-7b06-4571-9fda-b87801524d77	de3d40a0-e2b6-43fb-8f0d-bda51bdfb8b3	1fdc999a-b2d5-4a93-88a5-b851df97d246	d244ecc7-8dda-4690-bf5e-d79b289fd552	2025-05-10 07:38:55.646	0	2025-05-10 07:38:56.248	\N	\N
37eee38a-ac35-4db6-9194-fea3152a73fc	de3d40a0-e2b6-43fb-8f0d-bda51bdfb8b3	1fdc999a-b2d5-4a93-88a5-b851df97d246	5d360883-b7c5-47be-b8d3-b05cf8a5d17b	2025-05-10 07:38:55.646	0	2025-05-10 07:38:56.248	\N	\N
f8fa84d3-148d-496d-977e-48e50ee7f317	de3d40a0-e2b6-43fb-8f0d-bda51bdfb8b3	1fdc999a-b2d5-4a93-88a5-b851df97d246	a84b63df-da61-4df5-9060-83c9d789b546	2025-05-10 07:38:55.646	0	2025-05-10 07:38:56.248	\N	\N
2e736eb8-2153-457a-9400-4a7860971dc8	6d7899d7-e497-4b39-84f2-19545f46496c	bcc849a8-fdf7-4daa-8326-0dc108480e8c	64af3639-4abe-4995-9463-cfdfcb12b038	2025-05-11 13:41:39.84	0	2025-05-11 13:41:47.816	\N	\N
c66e1243-04e1-4520-a5af-559488287691	6d7899d7-e497-4b39-84f2-19545f46496c	bcc849a8-fdf7-4daa-8326-0dc108480e8c	61efb116-f7b0-439f-b523-b49712fd22a5	2025-05-11 13:41:39.84	0	2025-05-11 13:41:47.816	\N	\N
547d85ca-f21d-4f43-ad6e-2cc1d66e855b	6d7899d7-e497-4b39-84f2-19545f46496c	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	cda5035f-bdea-44a8-bff8-718164ca20e2	2025-05-11 13:41:46.587	0	2025-05-11 13:41:47.818	\N	\N
42f71520-db60-42c3-8b7d-0c21ad0aaf78	8e808781-9e6a-4017-858f-426e1f00f6cd	f2b979c4-c4de-41ea-b55a-f2203875be91	8dd699a8-8688-49e6-a67d-0e79facfef5c	2025-05-13 06:29:00.517	0	2025-05-13 06:29:26.36	\N	\N
a2ee0f4d-7b05-4937-b518-0c90ef5143ab	8e808781-9e6a-4017-858f-426e1f00f6cd	1fe7bb68-976a-401b-b2b3-390224a660ce	3d005a15-2b9d-4687-8e19-ab534b664880	2025-05-13 06:29:14.822	0	2025-05-13 06:29:26.362	\N	\N
71f3fe9f-9d14-44f8-85a7-3876ca726a55	8e808781-9e6a-4017-858f-426e1f00f6cd	38593e7a-4aa1-49d9-8910-3f0ab09f88db	28aa2a50-4f67-4d31-a87f-3fcfd4648b8d	2025-05-13 06:29:16.451	0	2025-05-13 06:29:26.363	\N	\N
8ff08920-8cc7-44eb-8803-89b2ac1ba046	8e808781-9e6a-4017-858f-426e1f00f6cd	8a84d599-7560-49db-8ad5-d619106462ed	1a3bf7c7-44a3-404b-9933-ccbd2c793100	2025-05-13 06:28:52.402	0	2025-05-13 06:29:26.365	\N	\N
b6f086a8-14e5-4b8f-993e-c03ff82afa0b	8e808781-9e6a-4017-858f-426e1f00f6cd	ec19e170-6e8f-45bd-a314-39416f47faff	e16475cf-3218-4150-bbff-d507256a9f97	2025-05-13 06:28:54.704	0	2025-05-13 06:29:26.366	\N	\N
b1722631-dc7c-4510-b669-6bcd9bba41c1	8e808781-9e6a-4017-858f-426e1f00f6cd	31f1da3a-1d02-4190-8e34-fff34990e890	b77784cf-ceb4-46c5-a3b6-5ade0af204ac	2025-05-13 06:28:56.029	0	2025-05-13 06:29:26.367	\N	\N
ed84729d-cf5a-401e-be16-caa2c215992b	8e808781-9e6a-4017-858f-426e1f00f6cd	6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	1edd761e-f237-4ace-a86a-cb67f7033c8e	2025-05-13 06:28:57.352	0	2025-05-13 06:29:26.369	\N	\N
6e6789af-5ae7-4be2-8b46-17fef982572e	8e808781-9e6a-4017-858f-426e1f00f6cd	4b3e76ea-de82-4c54-a417-5679c65412db	4e5968b6-8212-4b7f-b7af-9366cfdd3e45	2025-05-13 06:28:58.794	0	2025-05-13 06:29:26.37	\N	\N
c43fbefe-a30e-4696-8281-cdcd8925229d	8e808781-9e6a-4017-858f-426e1f00f6cd	21bd4fc4-962a-4294-b162-1f96b7b2e25e	06d59ba2-0b48-4083-8a51-41b93d5cc54b	2025-05-13 06:29:02.246	0	2025-05-13 06:29:26.371	\N	\N
b97627aa-ad2b-4f43-8041-9fba05b9e082	8e808781-9e6a-4017-858f-426e1f00f6cd	82bc16dc-5ade-4929-9c15-2f26c292cf2e	9a119c59-db8b-455c-89b5-64df9507beee	2025-05-13 06:29:04.206	0	2025-05-13 06:29:26.372	\N	\N
d46b4f4c-9e10-4a47-a4ad-ed5277dbdc8e	8e808781-9e6a-4017-858f-426e1f00f6cd	ad712050-a96f-420c-bc56-52d49d951695	9ddca572-c83f-46bb-b6fa-9ce6d4d68398	2025-05-13 06:29:05.588	0	2025-05-13 06:29:26.373	\N	\N
3f938eb3-fe54-4920-9048-71c471f90ad6	8e808781-9e6a-4017-858f-426e1f00f6cd	f4dc28b4-930e-44fc-ae7b-d40b6323f015	98b870f0-f721-4fd9-a6ef-570d89a9469b	2025-05-13 06:29:06.887	0	2025-05-13 06:29:26.374	\N	\N
f048e0a3-902a-4b2e-ae0b-28c71139094a	8e808781-9e6a-4017-858f-426e1f00f6cd	8d736281-7f95-4a35-a87c-d0491371ea20	f3f4c787-cebb-40f4-91ae-893be4752dcc	2025-05-13 06:29:08.32	0	2025-05-13 06:29:26.376	\N	\N
3089253d-bf7d-4c5f-b55c-7cfeceac50b5	8e808781-9e6a-4017-858f-426e1f00f6cd	9f8ff4d9-c1bf-44ab-8c7d-17bbe67411ab	2caa5201-a71e-4965-a3ce-b40b52638ace	2025-05-13 06:29:09.583	0	2025-05-13 06:29:26.377	\N	\N
473af758-c9b9-4120-9d39-0b5cd7b1ab6b	8e808781-9e6a-4017-858f-426e1f00f6cd	a18ceba7-1834-46d3-972c-4ff45b9e4323	cea3d967-87c2-496f-b1b7-6ea866fa326b	2025-05-13 06:29:10.854	0	2025-05-13 06:29:26.378	\N	\N
fe00b652-8b53-4b2d-bc55-bb5ad3144993	8c7d6f14-5be7-4a69-8ff7-425a3297718b	a18ceba7-1834-46d3-972c-4ff45b9e4323	cea3d967-87c2-496f-b1b7-6ea866fa326b	2025-05-13 06:34:59.856	0	2025-05-13 06:35:59.368	\N	\N
cf05bd0e-b90f-4c81-a807-540c1255f7fe	9ea2009d-eaa0-4a8e-8520-574961df8da8	bc2a800b-d1bb-4c6e-9e1f-77a688fbdf33	eebc802f-ca0f-476b-90b9-0ca32d859255	2025-05-13 13:57:12.851	0	2025-05-13 13:57:14.218	\N	\N
a0e9d378-60fb-42fe-8ffa-e8108705f0a1	50e128f4-5007-43ea-a376-bb828dc5af1d	f2b979c4-c4de-41ea-b55a-f2203875be91	ca09d8d4-039a-4f9f-b49c-6679dbb78bf8	2025-05-15 08:39:30.113	0	2025-05-15 08:40:52.15	\N	\N
e3abff25-737b-451d-aad5-ea198c25e2f4	50e128f4-5007-43ea-a376-bb828dc5af1d	1fe7bb68-976a-401b-b2b3-390224a660ce	3d005a15-2b9d-4687-8e19-ab534b664880	2025-05-15 08:39:31.971	0	2025-05-15 08:40:52.153	\N	\N
b637b8b7-f5c6-4494-aef4-2b623fec40cd	50e128f4-5007-43ea-a376-bb828dc5af1d	38593e7a-4aa1-49d9-8910-3f0ab09f88db	01470513-bb51-4823-a715-f7f162a52274	2025-05-15 08:39:33.091	0	2025-05-15 08:40:52.155	\N	\N
99c88372-4e47-4fdd-9cc2-07c21be02135	50e128f4-5007-43ea-a376-bb828dc5af1d	8a84d599-7560-49db-8ad5-d619106462ed	1a3bf7c7-44a3-404b-9933-ccbd2c793100	2025-05-15 08:39:34.248	0	2025-05-15 08:40:52.157	\N	\N
976008f3-d25e-4619-9288-dee62f80b21d	50e128f4-5007-43ea-a376-bb828dc5af1d	ec19e170-6e8f-45bd-a314-39416f47faff	2544b954-d3ad-48d8-af3f-e7d56d885267	2025-05-15 08:39:35.21	0	2025-05-15 08:40:52.158	\N	\N
0b630e6e-6e99-43b5-bb10-122a53736d34	50e128f4-5007-43ea-a376-bb828dc5af1d	31f1da3a-1d02-4190-8e34-fff34990e890	b77784cf-ceb4-46c5-a3b6-5ade0af204ac	2025-05-15 08:39:36.268	0	2025-05-15 08:40:52.16	\N	\N
607a1903-086c-425b-9b5a-584b968d11cd	50e128f4-5007-43ea-a376-bb828dc5af1d	6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	43273bc7-fb78-4f9d-ba8f-bcc17be0418f	2025-05-15 08:39:38.085	0	2025-05-15 08:40:52.161	\N	\N
99c113ba-ea93-4617-8212-a58f30d83df1	50e128f4-5007-43ea-a376-bb828dc5af1d	4b3e76ea-de82-4c54-a417-5679c65412db	4e5968b6-8212-4b7f-b7af-9366cfdd3e45	2025-05-15 08:39:39.207	0	2025-05-15 08:40:52.163	\N	\N
6a4533b7-1b3e-4685-8d18-c130f88f027e	50e128f4-5007-43ea-a376-bb828dc5af1d	21bd4fc4-962a-4294-b162-1f96b7b2e25e	06d59ba2-0b48-4083-8a51-41b93d5cc54b	2025-05-15 08:39:40.163	0	2025-05-15 08:40:52.164	\N	\N
d8206f76-0e3a-48f6-9505-1e7e47662f9d	50e128f4-5007-43ea-a376-bb828dc5af1d	82bc16dc-5ade-4929-9c15-2f26c292cf2e	9a119c59-db8b-455c-89b5-64df9507beee	2025-05-15 08:39:41.151	0	2025-05-15 08:40:52.166	\N	\N
1ad7ece4-8cd1-409b-a38e-cb515fc1779b	50e128f4-5007-43ea-a376-bb828dc5af1d	ad712050-a96f-420c-bc56-52d49d951695	9ddca572-c83f-46bb-b6fa-9ce6d4d68398	2025-05-15 08:39:42.436	0	2025-05-15 08:40:52.167	\N	\N
c09504e6-d2a7-4a07-98e9-8f1adcbd39c2	50e128f4-5007-43ea-a376-bb828dc5af1d	f4dc28b4-930e-44fc-ae7b-d40b6323f015	98b870f0-f721-4fd9-a6ef-570d89a9469b	2025-05-15 08:39:43.357	0	2025-05-15 08:40:52.169	\N	\N
898a9a46-fa9b-485d-b879-ce078e377dfb	50e128f4-5007-43ea-a376-bb828dc5af1d	8d736281-7f95-4a35-a87c-d0491371ea20	f3f4c787-cebb-40f4-91ae-893be4752dcc	2025-05-15 08:39:44.391	0	2025-05-15 08:40:52.17	\N	\N
335319a1-c00a-4764-9b81-1a459ba561e0	50e128f4-5007-43ea-a376-bb828dc5af1d	9f8ff4d9-c1bf-44ab-8c7d-17bbe67411ab	2caa5201-a71e-4965-a3ce-b40b52638ace	2025-05-15 08:39:45.297	0	2025-05-15 08:40:52.172	\N	\N
e28a9574-c4f5-4f55-839e-bae0ffd77f59	6f467edc-525d-46c2-8573-8dd7addf70ff	f2b979c4-c4de-41ea-b55a-f2203875be91	ca09d8d4-039a-4f9f-b49c-6679dbb78bf8	2025-05-15 08:41:27.773	0	2025-05-15 08:41:46.46	\N	\N
47b9b66a-3428-4faf-9898-0bffa7dcfe29	6f467edc-525d-46c2-8573-8dd7addf70ff	1fe7bb68-976a-401b-b2b3-390224a660ce	3d005a15-2b9d-4687-8e19-ab534b664880	2025-05-15 08:41:28.826	0	2025-05-15 08:41:46.463	\N	\N
b60bd9c6-dae3-4c62-8622-5f26510090d6	6f467edc-525d-46c2-8573-8dd7addf70ff	38593e7a-4aa1-49d9-8910-3f0ab09f88db	28aa2a50-4f67-4d31-a87f-3fcfd4648b8d	2025-05-15 08:41:30.156	0	2025-05-15 08:41:46.465	\N	\N
a425e243-6fb9-450e-b170-8c517dd628c5	6f467edc-525d-46c2-8573-8dd7addf70ff	8a84d599-7560-49db-8ad5-d619106462ed	1a3bf7c7-44a3-404b-9933-ccbd2c793100	2025-05-15 08:41:31.688	0	2025-05-15 08:41:46.467	\N	\N
5a815d1c-db08-439a-94c3-d1335958d504	6f467edc-525d-46c2-8573-8dd7addf70ff	ec19e170-6e8f-45bd-a314-39416f47faff	34b087ea-c066-45b1-875c-1c3cb8ea0004	2025-05-15 08:41:32.581	0	2025-05-15 08:41:46.468	\N	\N
b806e655-69d3-41cd-9db8-1189f30eddc9	6f467edc-525d-46c2-8573-8dd7addf70ff	31f1da3a-1d02-4190-8e34-fff34990e890	b77784cf-ceb4-46c5-a3b6-5ade0af204ac	2025-05-15 08:41:34.158	0	2025-05-15 08:41:46.47	\N	\N
b0094356-cdab-4aa2-9edc-1895abbb53af	6f467edc-525d-46c2-8573-8dd7addf70ff	6e65ee23-77ad-4274-8ce2-c8e28f5f80bf	9de2aeeb-9900-4799-8e31-b2702685d453	2025-05-15 08:41:34.916	0	2025-05-15 08:41:46.473	\N	\N
486600ad-8f6b-474c-8ec4-ad1bd576842f	6f467edc-525d-46c2-8573-8dd7addf70ff	4b3e76ea-de82-4c54-a417-5679c65412db	4e5968b6-8212-4b7f-b7af-9366cfdd3e45	2025-05-15 08:41:36.481	0	2025-05-15 08:41:46.475	\N	\N
7829562d-208c-4aa4-b834-fb49d522488e	6f467edc-525d-46c2-8573-8dd7addf70ff	21bd4fc4-962a-4294-b162-1f96b7b2e25e	06d59ba2-0b48-4083-8a51-41b93d5cc54b	2025-05-15 08:41:37.455	0	2025-05-15 08:41:46.477	\N	\N
0ab7297c-c644-43ea-8aea-e8c3b7247ddb	6f467edc-525d-46c2-8573-8dd7addf70ff	82bc16dc-5ade-4929-9c15-2f26c292cf2e	38631fe7-7cf0-4a97-9e40-9f01e6646b84	2025-05-15 08:41:38.278	0	2025-05-15 08:41:46.479	\N	\N
43263b64-7d2c-4151-b7b0-7f392a012bef	6f467edc-525d-46c2-8573-8dd7addf70ff	ad712050-a96f-420c-bc56-52d49d951695	9ddca572-c83f-46bb-b6fa-9ce6d4d68398	2025-05-15 08:41:39.817	0	2025-05-15 08:41:46.481	\N	\N
b0656f44-4f08-4fc6-932f-d12bb4a962bd	6f467edc-525d-46c2-8573-8dd7addf70ff	f4dc28b4-930e-44fc-ae7b-d40b6323f015	98b870f0-f721-4fd9-a6ef-570d89a9469b	2025-05-15 08:41:40.76	0	2025-05-15 08:41:46.483	\N	\N
35b3fa0c-4cf5-49c6-b8d9-5687bd66e52d	6f467edc-525d-46c2-8573-8dd7addf70ff	8d736281-7f95-4a35-a87c-d0491371ea20	f3f4c787-cebb-40f4-91ae-893be4752dcc	2025-05-15 08:41:41.707	0	2025-05-15 08:41:46.484	\N	\N
f1aff106-eb3a-46a5-89a9-071f0fc4842f	6f467edc-525d-46c2-8573-8dd7addf70ff	9f8ff4d9-c1bf-44ab-8c7d-17bbe67411ab	2caa5201-a71e-4965-a3ce-b40b52638ace	2025-05-15 08:41:42.775	0	2025-05-15 08:41:46.486	\N	\N
0d12eecf-f3aa-4310-9dad-a31a2b9b1b86	6f467edc-525d-46c2-8573-8dd7addf70ff	a18ceba7-1834-46d3-972c-4ff45b9e4323	cea3d967-87c2-496f-b1b7-6ea866fa326b	2025-05-15 08:41:44.083	0	2025-05-15 08:41:46.488	\N	\N
d87ecdd6-cb34-43e3-84c7-7d08376ce655	e7ca9aa2-a52c-48c4-9501-d4f0672c11d8	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 11:56:18.109	0	2025-05-15 11:56:30.88	\N	\N
eed69e6a-944f-4c5d-9b42-76c2d44107a8	e7ca9aa2-a52c-48c4-9501-d4f0672c11d8	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 11:56:15.929	0	2025-05-15 11:56:30.884	Ответ	t
be1456bd-f01b-4b56-bab6-341ce55bb556	7a3683e0-5f55-4d4a-9230-96c5bc91d1a9	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:09:04.728	0	2025-05-15 12:09:32.628	\N	\N
d6b4c24b-fe01-4a80-89f1-112ff8831680	7a3683e0-5f55-4d4a-9230-96c5bc91d1a9	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:09:02.055	0	2025-05-15 12:09:32.633	ываыв аыв	f
e51b643f-1406-4515-a4ce-e98bf210ac5c	e4fb1905-1dfb-49c4-ac86-aecf645e5eb4	15882fbc-b27a-405f-9986-d4f43e0b9c8c	fa1cfab2-0d7f-4313-a886-5b86be61798e	2025-05-15 12:10:15.429	0	2025-05-15 12:10:16.929	\N	\N
bf6e0ca2-0f55-462e-ad25-a810ac52d8eb	e4fb1905-1dfb-49c4-ac86-aecf645e5eb4	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:10:14.398	0	2025-05-15 12:10:16.933	FDG	f
7c18c7e0-69f4-425b-b4f9-9effd229bf57	f9f08f9e-47dc-4830-8f45-b2c020e39aad	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:12:05.202	0	2025-05-15 12:12:40.027	\N	\N
c664869b-06ad-400a-8ea5-b8147e1032f5	f9f08f9e-47dc-4830-8f45-b2c020e39aad	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:12:03.484	0	2025-05-15 12:12:40.031	Ответ	t
6ab8cc1f-fa0c-4637-bb48-b34f2b4026f9	a84c02e0-5250-4b23-a982-1fa41c4ef379	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:15:06.187	0	2025-05-15 12:15:14.34	\N	\N
787e0b9d-dea0-4272-98bf-05f99860b820	a84c02e0-5250-4b23-a982-1fa41c4ef379	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:15:04.284	0	2025-05-15 12:15:14.344	Ответ	t
132016c5-7de2-4800-90fc-159655a41ada	46ff1ad5-3742-4415-aa95-b97dabf98938	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:30:49.361	0	2025-05-15 12:30:53.836	\N	\N
9de01386-4723-4878-adba-6cdd810960f0	46ff1ad5-3742-4415-aa95-b97dabf98938	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:30:48.287	0	2025-05-15 12:30:53.839	fsd	f
ded3ae1a-2a80-4f79-9f55-6578c705f8bc	cbe0a9ea-54fa-405f-a451-cf4bbda0aef5	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:31:21.096	0	2025-05-15 12:31:22.336	\N	\N
a7395ec3-8906-4fdf-b188-6f2b080a2b75	cbe0a9ea-54fa-405f-a451-cf4bbda0aef5	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:31:19.542	0	2025-05-15 12:31:22.339	Ответ	t
717fe61a-6a12-4605-806b-25c97310e571	8b605f3b-86ba-4e95-b743-9f44dbf1646f	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:51:02.816	0	2025-05-15 12:51:04.068	\N	\N
a6501d69-ce54-4992-9b55-eae47c6b22d5	8b605f3b-86ba-4e95-b743-9f44dbf1646f	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:51:01.794	0	2025-05-15 12:51:04.072	sdfgdfgdf	f
ee3eb645-c5eb-4121-9d19-326fea70e3fa	8f226c80-d93a-4381-9832-a66c1d8910fb	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:53:35.841	0	2025-05-15 12:53:36.967	\N	\N
7708db37-88b2-4633-b2fe-c4039d4b8c71	8f226c80-d93a-4381-9832-a66c1d8910fb	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:53:34.242	0	2025-05-15 12:53:36.971	ответ	f
3d7e6fca-65bd-4a55-9d9b-0aa2ec9d41d1	769399d4-e0fd-4edf-8bbb-d1ed6e199f84	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 12:55:08.426	0	2025-05-15 12:55:09.661	\N	\N
db7a891e-e565-4af2-8dbf-0006f366cd19	769399d4-e0fd-4edf-8bbb-d1ed6e199f84	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 12:54:42.973	0	2025-05-15 12:55:09.663	Ответ	t
a5425808-5024-40b0-8495-228dad776b47	46aa96b4-aa65-42cd-81f3-9f826930f43e	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-15 13:04:27.988	0	2025-05-15 13:04:30.657	\N	\N
b395c2fb-59dc-45ec-b1d1-3f3ec35a8cbe	46aa96b4-aa65-42cd-81f3-9f826930f43e	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 13:04:23.938	0	2025-05-15 13:04:30.66	ответ	t
e92c7a9c-9385-4bd9-b186-d10b9a4499eb	7a0d5c84-683a-48d5-a47b-6e44bbc2d377	15882fbc-b27a-405f-9986-d4f43e0b9c8c	e46a55b6-ddcb-413b-8fda-4fa031b3e8d8	2025-05-15 13:24:29.351	0	2025-05-15 13:24:34.299	\N	\N
0f1844eb-1319-47e5-a0ef-97330118cb32	7a0d5c84-683a-48d5-a47b-6e44bbc2d377	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-15 13:24:32.061	0	2025-05-15 13:24:34.303	гне	f
dd14b8a6-d707-418f-85fc-83b199b627b9	89a7ca3a-1bcf-4942-b0b8-f89a737bf1a4	bcc849a8-fdf7-4daa-8326-0dc108480e8c	64af3639-4abe-4995-9463-cfdfcb12b038	2025-05-16 10:22:51.202	0	2025-05-16 10:24:19.88	\N	\N
3299ee38-1bca-43cf-a5f2-b6aface0a418	89a7ca3a-1bcf-4942-b0b8-f89a737bf1a4	bcc849a8-fdf7-4daa-8326-0dc108480e8c	61efb116-f7b0-439f-b523-b49712fd22a5	2025-05-16 10:22:51.202	0	2025-05-16 10:24:19.88	\N	\N
6e072fee-3946-4d04-a498-0f8a017936c9	89a7ca3a-1bcf-4942-b0b8-f89a737bf1a4	51fb9748-94f9-4ee6-a6c2-02eeecbc2267	cda5035f-bdea-44a8-bff8-718164ca20e2	2025-05-16 10:24:07.095	0	2025-05-16 10:24:19.883	\N	\N
93ab2992-3ce1-450a-a5e6-162b0e17ea08	89a7ca3a-1bcf-4942-b0b8-f89a737bf1a4	4c67c2a8-0138-4d1b-9e5a-2cc652ac1114	dad75a46-653d-4499-8cab-bda58d824a86	2025-05-16 10:23:59.927	0	2025-05-16 10:24:19.887	ответ	t
1ee291ab-e774-4235-9b74-ab88980e30c2	5014d059-2990-4175-8614-40def7ed2170	20e37c55-ed75-48f8-9d7c-87d7567b2001	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	2025-05-16 18:44:47.409	0	2025-05-16 18:44:47.883	\N	\N
2830cfd0-ab51-443e-94f1-3267a627c133	7bb09914-003e-480b-8cbc-5135491d9d19	20e37c55-ed75-48f8-9d7c-87d7567b2001	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	2025-05-16 18:45:06.056	0	2025-05-16 18:45:09.137	\N	\N
5f8e8899-1ee0-4f80-9d2f-5bc10558e4ee	1857587d-91e3-4009-b16e-f561ace1ffb0	20e37c55-ed75-48f8-9d7c-87d7567b2001	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	2025-05-16 18:45:52.09	0	2025-05-16 18:46:15.59	\N	\N
23347220-fbfa-4109-aba1-4478e4a86da7	98d89f37-eac9-49d6-9e1c-1c750badd941	20e37c55-ed75-48f8-9d7c-87d7567b2001	66a20af2-7215-4705-87e7-3deac6a27385	2025-05-16 18:55:51.055	0	2025-05-16 18:55:53.202	\N	\N
30c7a753-bd09-4596-9ec4-e6c52d40971b	fc92714d-8abe-4f8e-b896-4fb3e75c3c76	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-18 07:58:44.326	0	2025-05-18 07:58:48.129	\N	\N
c6c987fc-02bd-4a8e-952a-9f35c74a5f03	fc92714d-8abe-4f8e-b896-4fb3e75c3c76	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-18 07:58:42.012	0	2025-05-18 07:58:48.133	Мой ответ	f
b6a8d42e-5891-49cc-a39e-ac61c07bdf54	b9c3f002-bf41-4d2d-9f38-35801f37ffe4	15882fbc-b27a-405f-9986-d4f43e0b9c8c	48cdc254-e377-490b-9a15-4aa792066391	2025-05-18 08:00:16.768	0	2025-05-18 08:00:17.275	\N	\N
e0be0a16-5de2-4a67-a8d7-8eebbcb1ad69	b9c3f002-bf41-4d2d-9f38-35801f37ffe4	4f7bffee-b165-4115-9f2f-8d6994a71c6e	606775b5-cce7-4417-91b0-dd1462935f8f	2025-05-18 08:00:15.798	0	2025-05-18 08:00:17.278	вы	f
4e9cf874-f89a-4c6b-9f88-96b89e2a9bcb	3689aae0-36c9-4cce-b7e7-ec92b3f02dd6	20e37c55-ed75-48f8-9d7c-87d7567b2001	70e1ba39-ad67-4625-bc31-5e8fe1b138fc	2025-05-18 15:29:42.778	0	2025-05-18 15:29:55.527	\N	\N
e34d76dc-6d15-46d9-b8db-c63d041547a0	3689aae0-36c9-4cce-b7e7-ec92b3f02dd6	db87c945-c98c-48d7-b0f7-823491f62b96	15b044d4-f5cc-48b7-a02a-af9f81edffd0	2025-05-18 15:29:32.805	0	2025-05-18 15:29:55.53	12	f
2914ba08-a84a-43ca-afda-f5efe9738dc9	ab7b6133-e93f-4a34-ada7-6ca3e52add04	20e37c55-ed75-48f8-9d7c-87d7567b2001	b1e2e52e-3ec2-4ada-b3fc-c33606395bdc	2025-05-18 15:30:11.677	0	2025-05-18 15:30:12.567	\N	\N
28f444b7-4cc4-4fb0-a8d0-80105b916d63	ab7b6133-e93f-4a34-ada7-6ca3e52add04	db87c945-c98c-48d7-b0f7-823491f62b96	15b044d4-f5cc-48b7-a02a-af9f81edffd0	2025-05-18 15:30:10.665	0	2025-05-18 15:30:12.569	1939	t
6d19b68e-19a7-4d4a-8910-d29259adb64a	9c89ef4c-c953-4cde-9729-a7e46f053b82	20e37c55-ed75-48f8-9d7c-87d7567b2001	66a20af2-7215-4705-87e7-3deac6a27385	2025-05-19 05:43:14.963	0	2025-05-19 05:43:20.022	\N	\N
11dd2907-0b91-4006-a8d0-cbf30c0b9c74	9c89ef4c-c953-4cde-9729-a7e46f053b82	db87c945-c98c-48d7-b0f7-823491f62b96	15b044d4-f5cc-48b7-a02a-af9f81edffd0	2025-05-19 05:43:13.346	0	2025-05-19 05:43:20.026	1939	t
bb7362d8-8c79-4bc8-bf2d-ea0ab77f306a	9c89ef4c-c953-4cde-9729-a7e46f053b82	5232f5ab-ddc2-42a8-8dee-22636818d67f	752d162e-c2e0-4c4e-8f2b-05328a6f11db	2025-05-19 05:43:19.908	0	2025-05-19 05:43:20.029	норм	f
6f9405db-4377-4df7-a3fa-69747fcfc29e	f54ec622-e794-4fa8-ac4c-48c3c61c48d5	20e37c55-ed75-48f8-9d7c-87d7567b2001	2b789d5f-d436-4b01-b454-6e2296fdb181	2025-05-19 06:42:32.134	0	2025-05-19 06:42:33.421	\N	\N
7fadfe4f-0a1f-4549-b247-ef9025d5de9b	f54ec622-e794-4fa8-ac4c-48c3c61c48d5	db87c945-c98c-48d7-b0f7-823491f62b96	15b044d4-f5cc-48b7-a02a-af9f81edffd0	2025-05-19 06:42:31.103	0	2025-05-19 06:42:33.424	ased	f
81b4437b-8c2c-4838-a6c9-51c8ca23c2e4	f54ec622-e794-4fa8-ac4c-48c3c61c48d5	5232f5ab-ddc2-42a8-8dee-22636818d67f	752d162e-c2e0-4c4e-8f2b-05328a6f11db	2025-05-19 06:42:33.295	0	2025-05-19 06:42:33.428	fsd	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, name, surname, patronymic, password, "isActivated", role, "activationLink", "resetCode", "isBlocked", "createdAt", "updatedAt", "activationLinkExp", "resetCodeExp") FROM stdin;
e0cbbcbd-d355-4a9f-a604-8f9988fdd85e	marychev01@gmail.com	\N	\N	\N	$2b$10$9f.CzchBgAg9mpO5QyxCZOuUN4b8/n.kGAPp/2duC2vbL4YO2gim6	t	USER	\N	\N	f	2025-05-09 07:01:43.539	2025-05-09 07:10:28.542	\N	\N
c0940790-ee85-45da-b2cd-cad0b87e79b5	max89501598172@gmail.com	\N	\N	\N	$2b$10$G1K/tBg2ZaibysS0mlsg9.WPfp856plP0DvO4rv07SuMlDwq9Wwxe	f	USER	5bc96737-9a4c-4f7a-8070-020e66670e93	\N	f	2025-05-08 12:19:55.219	2025-05-08 12:19:55.219	2025-05-09 12:19:55.217	\N
5ad1f2ea-a1d8-4549-b64f-5e2983a689a3	marycheff17@gmail.com	Max	\N	\N	$2b$10$oi9.wnbiGqjNrkXpJ8ukqOKlymge2vJlaXGIbAQkbQfsSVNH8lGq2	t	ADMIN	\N	\N	f	2025-04-04 13:12:04.629	2025-05-08 18:41:14.624	\N	\N
93722c2d-9fec-4588-90e9-a04f9db48c42	1@mail.ru	\N	\N	\N	$2b$10$QcIOm/J9d.nkDadCgWKLquf8DqxUZ61M2KBWb7jOMfMI4b46gK7PO	t	USER	\N	\N	t	2025-05-08 12:19:39.45	2025-05-09 06:51:48.215	\N	\N
2c6d44d2-59f0-442a-9514-56ef7252b5b9	marychev5@ya.ru	\N	\N	\N	$2b$10$eRD041pqz1PF6qJjUq8T3uEzzrtyuoqFoD8CZAQ7oj3mojxiBs7j2	t	USER	433ecfbe-5da1-4ffc-9559-63fe748b883e	\N	f	2025-04-04 13:40:54.246	2025-05-15 13:13:29.515	2025-05-10 06:58:03.166	\N
5718f18d-9639-46d5-9ec1-3405bd269a12	ivan@mail.ru	\N	\N	\N	$2b$10$mhHUXsdgO1nVNZ45dyrSZuh4xhxOLrSyOpupxMAduYagNBv7YfWRe	f	USER	\N	\N	f	2025-05-08 12:19:26.589	2025-05-17 12:31:31.756	\N	\N
0c3593ee-aa77-442a-b540-b4e9c04841d6	marychefff@gmail.com	Я	fsdf fsd	\N	$2b$10$2478GxNFSH3N2hBtyu7AsO8mu8GbsZ5.nwNOCcJLKTnXQCAlvPPei	t	ADMIN	16e10393-afba-4f11-9e2d-6e10c537b2c9	\N	f	2025-04-04 14:05:25.76	2025-05-18 09:47:13.932	2025-05-10 07:00:56.416	\N
\.


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

