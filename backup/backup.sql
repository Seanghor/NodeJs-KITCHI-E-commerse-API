--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.2

-- Started on 2023-10-31 05:44:31

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
-- TOC entry 861 (class 1247 OID 188338)
-- Name: RoleEnumType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RoleEnumType" AS ENUM (
    'superAdmin',
    'admin',
    'customer'
);


ALTER TYPE public."RoleEnumType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 235 (class 1259 OID 188444)
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    work text NOT NULL,
    street integer NOT NULL,
    zipcode integer NOT NULL,
    city text NOT NULL,
    province text NOT NULL
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 188443)
-- Name: Address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Address_id_seq" OWNER TO postgres;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 234
-- Name: Address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Address_id_seq" OWNED BY public."Address".id;


--
-- TOC entry 222 (class 1259 OID 188375)
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 188374)
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Admin_id_seq" OWNER TO postgres;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 221
-- Name: Admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;


--
-- TOC entry 233 (class 1259 OID 188433)
-- Name: Cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart_item" (
    id integer NOT NULL,
    "customerId" integer,
    "productId" integer NOT NULL,
    "productName" text,
    price numeric(65,30) NOT NULL,
    image text,
    quantity integer DEFAULT 1 NOT NULL,
    total_price numeric(65,30) NOT NULL,
    deal boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Cart_item" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 188432)
-- Name: Cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cart_item_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cart_item_id_seq" OWNER TO postgres;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 232
-- Name: Cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cart_item_id_seq" OWNED BY public."Cart_item".id;


--
-- TOC entry 218 (class 1259 OID 188356)
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    phone text,
    "userId" integer NOT NULL
);


ALTER TABLE public."Customer" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 188355)
-- Name: Customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Customer_id_seq" OWNER TO postgres;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 217
-- Name: Customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Customer_id_seq" OWNED BY public."Customer".id;


--
-- TOC entry 231 (class 1259 OID 188423)
-- Name: Discount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Discount" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    discount_percent integer NOT NULL,
    "createByAdminId" integer NOT NULL,
    "modifiedByAdminId" integer,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_at timestamp(3) without time zone
);


ALTER TABLE public."Discount" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 188422)
-- Name: Discount_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Discount_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Discount_id_seq" OWNER TO postgres;

--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 230
-- Name: Discount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Discount_id_seq" OWNED BY public."Discount".id;


--
-- TOC entry 225 (class 1259 OID 188393)
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    profile text,
    rating numeric(65,30) DEFAULT 2.0 NOT NULL,
    images text[],
    description text,
    category_id integer,
    discount_id integer,
    discount_active boolean DEFAULT false NOT NULL,
    price numeric(65,30) NOT NULL,
    discount_price numeric(65,30) NOT NULL,
    "inventoryId" integer NOT NULL,
    "createByAdminId" integer NOT NULL,
    "modifiedByAdminId" integer,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp(3) without time zone
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 188405)
-- Name: ProductCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductCategory" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createByAdminId" integer NOT NULL,
    "modifiedByAdminId" integer,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_at timestamp(3) without time zone
);


ALTER TABLE public."ProductCategory" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 188404)
-- Name: ProductCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProductCategory_id_seq" OWNER TO postgres;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 226
-- Name: ProductCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductCategory_id_seq" OWNED BY public."ProductCategory".id;


--
-- TOC entry 229 (class 1259 OID 188415)
-- Name: ProductInventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductInventory" (
    id integer NOT NULL,
    quantity integer,
    "createByAdminId" integer NOT NULL,
    "modifiedByAdminId" integer,
    create_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_at timestamp(3) without time zone
);


ALTER TABLE public."ProductInventory" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 188414)
-- Name: ProductInventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductInventory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProductInventory_id_seq" OWNER TO postgres;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 228
-- Name: ProductInventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductInventory_id_seq" OWNED BY public."ProductInventory".id;


--
-- TOC entry 224 (class 1259 OID 188392)
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Product_id_seq" OWNER TO postgres;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 224
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- TOC entry 223 (class 1259 OID 188383)
-- Name: RefreshToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RefreshToken" (
    id text NOT NULL,
    "hashedToken" text NOT NULL,
    "userId" integer NOT NULL,
    revoked boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."RefreshToken" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 188365)
-- Name: SuperAdmin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SuperAdmin" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."SuperAdmin" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 188364)
-- Name: SuperAdmin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SuperAdmin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SuperAdmin_id_seq" OWNER TO postgres;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 219
-- Name: SuperAdmin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SuperAdmin_id_seq" OWNED BY public."SuperAdmin".id;


--
-- TOC entry 216 (class 1259 OID 188346)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    "Role" public."RoleEnumType" DEFAULT 'customer'::public."RoleEnumType" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 188345)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 215
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 214 (class 1259 OID 188328)
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
-- TOC entry 3252 (class 2604 OID 188447)
-- Name: Address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address" ALTER COLUMN id SET DEFAULT nextval('public."Address_id_seq"'::regclass);


--
-- TOC entry 3236 (class 2604 OID 188378)
-- Name: Admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);


--
-- TOC entry 3249 (class 2604 OID 188436)
-- Name: Cart_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_item" ALTER COLUMN id SET DEFAULT nextval('public."Cart_item_id_seq"'::regclass);


--
-- TOC entry 3233 (class 2604 OID 188359)
-- Name: Customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer" ALTER COLUMN id SET DEFAULT nextval('public."Customer_id_seq"'::regclass);


--
-- TOC entry 3247 (class 2604 OID 188426)
-- Name: Discount id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount" ALTER COLUMN id SET DEFAULT nextval('public."Discount_id_seq"'::regclass);


--
-- TOC entry 3239 (class 2604 OID 188396)
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- TOC entry 3243 (class 2604 OID 188408)
-- Name: ProductCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductCategory" ALTER COLUMN id SET DEFAULT nextval('public."ProductCategory_id_seq"'::regclass);


--
-- TOC entry 3245 (class 2604 OID 188418)
-- Name: ProductInventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductInventory" ALTER COLUMN id SET DEFAULT nextval('public."ProductInventory_id_seq"'::regclass);


--
-- TOC entry 3234 (class 2604 OID 188368)
-- Name: SuperAdmin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuperAdmin" ALTER COLUMN id SET DEFAULT nextval('public."SuperAdmin_id_seq"'::regclass);


--
-- TOC entry 3231 (class 2604 OID 188349)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3472 (class 0 OID 188444)
-- Dependencies: 235
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Address" (id, "customerId", work, street, zipcode, city, province) FROM stdin;
\.


--
-- TOC entry 3459 (class 0 OID 188375)
-- Dependencies: 222
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (id, username, email, phone, "userId") FROM stdin;
1	admin 1	admin1@test.com	096782321	2
2	admin 2	admin2@test.com	096782322	3
\.


--
-- TOC entry 3470 (class 0 OID 188433)
-- Dependencies: 233
-- Data for Name: Cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart_item" (id, "customerId", "productId", "productName", price, image, quantity, total_price, deal) FROM stdin;
\.


--
-- TOC entry 3455 (class 0 OID 188356)
-- Dependencies: 218
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customer" (id, username, email, phone, "userId") FROM stdin;
1	username 1	user1@test.com	096782321	4
2	username 2	user2@test.com	096782322	5
3	username 3	user3@test.com	096782323	6
\.


--
-- TOC entry 3468 (class 0 OID 188423)
-- Dependencies: 231
-- Data for Name: Discount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Discount" (id, name, description, discount_percent, "createByAdminId", "modifiedByAdminId", create_at, modified_at) FROM stdin;
1	event 0	 	5	1	\N	2023-10-30 22:41:14.84	\N
2	event 1	 	10	1	\N	2023-10-30 22:41:14.843	\N
3	event 2	 	15	1	\N	2023-10-30 22:41:14.845	\N
4	event 3	 	20	1	\N	2023-10-30 22:41:14.847	\N
5	event 4	 	25	1	\N	2023-10-30 22:41:14.85	\N
\.


--
-- TOC entry 3462 (class 0 OID 188393)
-- Dependencies: 225
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, profile, rating, images, description, category_id, discount_id, discount_active, price, discount_price, "inventoryId", "createByAdminId", "modifiedByAdminId", create_at, modified_at) FROM stdin;
1	productC-0	https://i.ibb.co/9w59YFc/1.png	3.900000000000000000000000000000	{iamgge1,image2,image3}		3	1	t	18.000000000000000000000000000000	80.000000000000000000000000000000	1	1	\N	2023-10-30 22:41:14.856	\N
2	productC-1	https://i.ibb.co/59NJmkQ/2.png	2.200000000000000000000000000000	{iamgge1,image2,image3}		3	3	f	42.000000000000000000000000000000	45.000000000000000000000000000000	2	1	\N	2023-10-30 22:41:14.863	\N
3	productC-2	https://i.ibb.co/3BTdRPZ/3.png	2.700000000000000000000000000000	{iamgge1,image2,image3}		3	1	f	26.000000000000000000000000000000	45.000000000000000000000000000000	3	1	\N	2023-10-30 22:41:14.866	\N
4	productC-3	https://i.ibb.co/LxgCxvY/4.png	4.400000000000000000000000000000	{iamgge1,image2,image3}		3	2	f	9.000000000000000000000000000000	60.000000000000000000000000000000	4	1	\N	2023-10-30 22:41:14.869	\N
5	productC-4	https://i.ibb.co/SRDfhGM/5.png	2.200000000000000000000000000000	{iamgge1,image2,image3}		3	2	f	46.000000000000000000000000000000	99.000000000000000000000000000000	5	1	\N	2023-10-30 22:41:14.872	\N
6	productC-5	https://i.ibb.co/Yj7KLBB/6.png	2.600000000000000000000000000000	{iamgge1,image2,image3}		3	4	f	41.000000000000000000000000000000	50.000000000000000000000000000000	6	1	\N	2023-10-30 22:41:14.875	\N
7	productB-0	https://i.ibb.co/rmxn0mf/1.png	4.100000000000000000000000000000	{iamgge1,image2,image3}		2	2	f	42.000000000000000000000000000000	45.000000000000000000000000000000	7	1	\N	2023-10-30 22:41:14.878	\N
8	productB-1	https://i.ibb.co/XFnZNhq/2.png	2.400000000000000000000000000000	{iamgge1,image2,image3}		2	3	t	26.000000000000000000000000000000	78.000000000000000000000000000000	8	1	\N	2023-10-30 22:41:14.882	\N
9	productB-2	https://i.ibb.co/JpMpCJs/3.png	2.500000000000000000000000000000	{iamgge1,image2,image3}		2	1	f	9.000000000000000000000000000000	35.000000000000000000000000000000	9	1	\N	2023-10-30 22:41:14.885	\N
10	productB-3	https://i.ibb.co/1qpFs8Q/4.png	2.200000000000000000000000000000	{iamgge1,image2,image3}		2	3	t	7.000000000000000000000000000000	60.000000000000000000000000000000	10	1	\N	2023-10-30 22:41:14.887	\N
11	productB-4	https://i.ibb.co/2gQNN3x/5.png	4.400000000000000000000000000000	{iamgge1,image2,image3}		2	1	f	2.000000000000000000000000000000	55.000000000000000000000000000000	11	1	\N	2023-10-30 22:41:14.89	\N
12	productB-5	https://i.ibb.co/zX3KqQf/6.png	2.700000000000000000000000000000	{iamgge1,image2,image3}		2	2	f	46.000000000000000000000000000000	40.000000000000000000000000000000	12	1	\N	2023-10-30 22:41:14.892	\N
13	productA-0	https://i.ibb.co/98SKwnL/1.png	4.900000000000000000000000000000	{iamgge1,image2,image3}		1	3	t	35.000000000000000000000000000000	50.000000000000000000000000000000	13	1	\N	2023-10-30 22:41:14.895	\N
14	productA-1	https://i.ibb.co/TK8MVSb/2.png	4.700000000000000000000000000000	{iamgge1,image2,image3}		1	3	t	26.000000000000000000000000000000	40.000000000000000000000000000000	14	1	\N	2023-10-30 22:41:14.897	\N
15	productA-2	https://i.ibb.co/2Ngcc9v/3.png	4.600000000000000000000000000000	{iamgge1,image2,image3}		1	4	t	37.000000000000000000000000000000	35.000000000000000000000000000000	15	1	\N	2023-10-30 22:41:14.899	\N
16	productA-3	https://i.ibb.co/CzQ5cJ4/4.png	2.800000000000000000000000000000	{iamgge1,image2,image3}		1	2	f	26.000000000000000000000000000000	30.000000000000000000000000000000	16	1	\N	2023-10-30 22:41:14.902	\N
17	productD-0	https://i.ibb.co/dfpY8bB/1.png	4.900000000000000000000000000000	{iamgge1,image2,image3}		4	2	f	26.000000000000000000000000000000	30.000000000000000000000000000000	17	1	\N	2023-10-30 22:41:14.904	\N
18	productD-1	https://i.ibb.co/fqDbpQ5/2.png	4.000000000000000000000000000000	{iamgge1,image2,image3}		4	2	t	9.000000000000000000000000000000	99.000000000000000000000000000000	18	1	\N	2023-10-30 22:41:14.906	\N
19	productD-2	https://i.ibb.co/pRhMK8Y/3.png	2.500000000000000000000000000000	{iamgge1,image2,image3}		4	1	t	15.000000000000000000000000000000	40.000000000000000000000000000000	19	1	\N	2023-10-30 22:41:14.909	\N
20	productD-3	https://i.ibb.co/Zc9NXbr/4.png	2.500000000000000000000000000000	{iamgge1,image2,image3}		4	3	t	45.000000000000000000000000000000	45.000000000000000000000000000000	20	1	\N	2023-10-30 22:41:14.911	\N
21	productD-4	https://i.ibb.co/Bczzm8f/5.png	3.100000000000000000000000000000	{iamgge1,image2,image3}		4	3	f	8.000000000000000000000000000000	50.000000000000000000000000000000	21	1	\N	2023-10-30 22:41:14.913	\N
22	productE-0	https://i.ibb.co/93NTGNm/1.png	4.200000000000000000000000000000	{iamgge1,image2,image3}		5	2	f	32.000000000000000000000000000000	45.000000000000000000000000000000	22	1	\N	2023-10-30 22:41:14.915	\N
23	productE-1	https://i.ibb.co/zbRsMqq/2.png	2.600000000000000000000000000000	{iamgge1,image2,image3}		5	1	t	7.000000000000000000000000000000	45.000000000000000000000000000000	23	1	\N	2023-10-30 22:41:14.918	\N
24	productE-2	https://i.ibb.co/MPW3rcx/3.png	4.700000000000000000000000000000	{iamgge1,image2,image3}		5	2	t	28.000000000000000000000000000000	99.000000000000000000000000000000	24	1	\N	2023-10-30 22:41:14.92	\N
25	productE-3	https://i.ibb.co/bFv1WVk/4.png	4.700000000000000000000000000000	{iamgge1,image2,image3}		5	4	f	46.000000000000000000000000000000	78.000000000000000000000000000000	25	1	\N	2023-10-30 22:41:14.922	\N
26	productF-0	https://i.ibb.co/RP7KRVM/1.png	4.000000000000000000000000000000	{iamgge1,image2,image3}		6	1	t	23.000000000000000000000000000000	78.000000000000000000000000000000	26	1	\N	2023-10-30 22:41:14.925	\N
27	productF-1	https://i.ibb.co/mTSj92Q/2.png	3.700000000000000000000000000000	{iamgge1,image2,image3}		6	4	f	21.000000000000000000000000000000	60.000000000000000000000000000000	27	1	\N	2023-10-30 22:41:14.927	\N
28	productF-2	https://i.ibb.co/wCRJhFQ/3.png	4.200000000000000000000000000000	{iamgge1,image2,image3}		6	4	t	33.000000000000000000000000000000	99.000000000000000000000000000000	28	1	\N	2023-10-30 22:41:14.93	\N
29	productF-3	https://i.ibb.co/bHRQhvx/4.png	4.200000000000000000000000000000	{iamgge1,image2,image3}		6	4	f	44.000000000000000000000000000000	80.000000000000000000000000000000	29	1	\N	2023-10-30 22:41:14.932	\N
\.


--
-- TOC entry 3464 (class 0 OID 188405)
-- Dependencies: 227
-- Data for Name: ProductCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductCategory" (id, name, description, "createByAdminId", "modifiedByAdminId", create_at, modified_at) FROM stdin;
1	Gas	Hello kon Papa	1	\N	2023-10-30 22:41:14.131	\N
2	Garlic -presser	Hello kon Papa	1	\N	2023-10-30 22:41:14.135	\N
3	Board	Hello kon Papa	1	\N	2023-10-30 22:41:14.138	\N
4	Plate	Hello kon Papa	1	\N	2023-10-30 22:41:14.141	\N
5	Rubishben	Hello kon Papa	1	\N	2023-10-30 22:41:14.144	\N
6	Spoon	Hello kon Papa	1	\N	2023-10-30 22:41:14.146	\N
\.


--
-- TOC entry 3466 (class 0 OID 188415)
-- Dependencies: 229
-- Data for Name: ProductInventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductInventory" (id, quantity, "createByAdminId", "modifiedByAdminId", create_at, modified_at) FROM stdin;
1	20	1	\N	2023-10-30 22:41:14.852	2023-10-30 22:41:14.852
2	20	1	\N	2023-10-30 22:41:14.861	2023-10-30 22:41:14.861
3	20	1	\N	2023-10-30 22:41:14.864	2023-10-30 22:41:14.864
4	20	1	\N	2023-10-30 22:41:14.868	2023-10-30 22:41:14.868
5	20	1	\N	2023-10-30 22:41:14.87	2023-10-30 22:41:14.87
6	20	1	\N	2023-10-30 22:41:14.874	2023-10-30 22:41:14.874
7	20	1	\N	2023-10-30 22:41:14.877	2023-10-30 22:41:14.877
8	20	1	\N	2023-10-30 22:41:14.88	2023-10-30 22:41:14.88
9	20	1	\N	2023-10-30 22:41:14.883	2023-10-30 22:41:14.883
10	20	1	\N	2023-10-30 22:41:14.886	2023-10-30 22:41:14.886
11	20	1	\N	2023-10-30 22:41:14.889	2023-10-30 22:41:14.889
12	20	1	\N	2023-10-30 22:41:14.891	2023-10-30 22:41:14.891
13	20	1	\N	2023-10-30 22:41:14.893	2023-10-30 22:41:14.893
14	20	1	\N	2023-10-30 22:41:14.896	2023-10-30 22:41:14.896
15	20	1	\N	2023-10-30 22:41:14.898	2023-10-30 22:41:14.898
16	20	1	\N	2023-10-30 22:41:14.901	2023-10-30 22:41:14.901
17	20	1	\N	2023-10-30 22:41:14.903	2023-10-30 22:41:14.903
18	20	1	\N	2023-10-30 22:41:14.905	2023-10-30 22:41:14.905
19	20	1	\N	2023-10-30 22:41:14.907	2023-10-30 22:41:14.907
20	20	1	\N	2023-10-30 22:41:14.91	2023-10-30 22:41:14.91
21	20	1	\N	2023-10-30 22:41:14.912	2023-10-30 22:41:14.912
22	20	1	\N	2023-10-30 22:41:14.914	2023-10-30 22:41:14.914
23	20	1	\N	2023-10-30 22:41:14.917	2023-10-30 22:41:14.917
24	20	1	\N	2023-10-30 22:41:14.919	2023-10-30 22:41:14.919
25	20	1	\N	2023-10-30 22:41:14.921	2023-10-30 22:41:14.921
26	20	1	\N	2023-10-30 22:41:14.923	2023-10-30 22:41:14.923
27	20	1	\N	2023-10-30 22:41:14.926	2023-10-30 22:41:14.926
28	20	1	\N	2023-10-30 22:41:14.929	2023-10-30 22:41:14.929
29	20	1	\N	2023-10-30 22:41:14.931	2023-10-30 22:41:14.931
\.


--
-- TOC entry 3460 (class 0 OID 188383)
-- Dependencies: 223
-- Data for Name: RefreshToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RefreshToken" (id, "hashedToken", "userId", revoked, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3457 (class 0 OID 188365)
-- Dependencies: 220
-- Data for Name: SuperAdmin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SuperAdmin" (id, username, email, phone, description, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	super admin	superadmin@test.com	0967827020	first superAdmin	2023-10-30 22:41:13.436	2023-10-30 22:41:13.436	\N
\.


--
-- TOC entry 3453 (class 0 OID 188346)
-- Dependencies: 216
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, phone, password, "Role") FROM stdin;
1	super admin	superadmin@test.com	096782320	$2b$12$WPAbRpvpSUQclK/HrjAa9u74Smk4up9B3T96t9PFsmAuvAzo2cZrq	superAdmin
2	admin 1	admin1@test.com	096782321	$2b$12$pVLNIp5wFlU5pakTsepET.sUCyXjEOvp/DfnFXGpfY6YQTMwehnkG	admin
3	admin 2	admin2@test.com	096782322	$2b$12$BqoqCSqdiSKKbAsjvXpXNuiNeXvRGsddi01JQhegO2JRNl0mhS0zS	admin
4	username 1	user1@test.com	096782311	$2b$12$vlAUQ69Je1tVAKHROaStu.AkwYunq4HuJSi6ICXoHcjDWlFIcnWGm	customer
5	username 2	user2@test.com	096782312	$2b$12$7NDr2K3W0dZ6AAQay0o3EejDc0KRL/OyVJCtXQx97lmWgNptPx.Hq	customer
6	username 3	user3@test.com	096782313	$2b$12$e7thf7rDf.nYCg4nGXJFa.Hz4vdsmxDsfQLbVJrejUtMowFcLg8Ae	customer
\.


--
-- TOC entry 3451 (class 0 OID 188328)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
dcc46e19-bd9d-4f3b-aa76-72af3b0b42ef	57978284fd8bf6dc2b181d85ef6a9632cc040fafaee8e8d023ccc9cf74cd91f6	2023-10-31 05:41:09.674146+07	20230209191331_	\N	\N	2023-10-31 05:41:09.580062+07	1
\.


--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 234
-- Name: Address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Address_id_seq"', 1, false);


--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 221
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 2, true);


--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 232
-- Name: Cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cart_item_id_seq"', 1, false);


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 217
-- Name: Customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Customer_id_seq"', 3, true);


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 230
-- Name: Discount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Discount_id_seq"', 5, true);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 226
-- Name: ProductCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductCategory_id_seq"', 6, true);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 228
-- Name: ProductInventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductInventory_id_seq"', 29, true);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 224
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 29, true);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 219
-- Name: SuperAdmin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SuperAdmin_id_seq"', 1, true);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 215
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 6, true);


--
-- TOC entry 3293 (class 2606 OID 188451)
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 188382)
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- TOC entry 3291 (class 2606 OID 188442)
-- Name: Cart_item Cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_item"
    ADD CONSTRAINT "Cart_item_pkey" PRIMARY KEY (id);


--
-- TOC entry 3262 (class 2606 OID 188363)
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- TOC entry 3288 (class 2606 OID 188431)
-- Name: Discount Discount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount"
    ADD CONSTRAINT "Discount_pkey" PRIMARY KEY (id);


--
-- TOC entry 3283 (class 2606 OID 188413)
-- Name: ProductCategory ProductCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY (id);


--
-- TOC entry 3285 (class 2606 OID 188421)
-- Name: ProductInventory ProductInventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductInventory"
    ADD CONSTRAINT "ProductInventory_pkey" PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 188403)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 188391)
-- Name: RefreshToken RefreshToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY (id);


--
-- TOC entry 3267 (class 2606 OID 188373)
-- Name: SuperAdmin SuperAdmin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuperAdmin"
    ADD CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 188354)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 188336)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3269 (class 1259 OID 188460)
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- TOC entry 3270 (class 1259 OID 188461)
-- Name: Admin_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Admin_phone_key" ON public."Admin" USING btree (phone);


--
-- TOC entry 3273 (class 1259 OID 188462)
-- Name: Admin_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Admin_userId_key" ON public."Admin" USING btree ("userId");


--
-- TOC entry 3289 (class 1259 OID 188468)
-- Name: Cart_item_customerId_productId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_item_customerId_productId_key" ON public."Cart_item" USING btree ("customerId", "productId");


--
-- TOC entry 3259 (class 1259 OID 188454)
-- Name: Customer_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_email_key" ON public."Customer" USING btree (email);


--
-- TOC entry 3260 (class 1259 OID 188455)
-- Name: Customer_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_phone_key" ON public."Customer" USING btree (phone);


--
-- TOC entry 3263 (class 1259 OID 188456)
-- Name: Customer_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_userId_key" ON public."Customer" USING btree ("userId");


--
-- TOC entry 3286 (class 1259 OID 188467)
-- Name: Discount_discount_percent_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Discount_discount_percent_key" ON public."Discount" USING btree (discount_percent);


--
-- TOC entry 3281 (class 1259 OID 188466)
-- Name: ProductCategory_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductCategory_name_key" ON public."ProductCategory" USING btree (name);


--
-- TOC entry 3277 (class 1259 OID 188465)
-- Name: Product_inventoryId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_inventoryId_key" ON public."Product" USING btree ("inventoryId");


--
-- TOC entry 3278 (class 1259 OID 188464)
-- Name: Product_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_name_key" ON public."Product" USING btree (name);


--
-- TOC entry 3274 (class 1259 OID 188463)
-- Name: RefreshToken_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RefreshToken_id_key" ON public."RefreshToken" USING btree (id);


--
-- TOC entry 3264 (class 1259 OID 188458)
-- Name: SuperAdmin_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SuperAdmin_email_key" ON public."SuperAdmin" USING btree (email);


--
-- TOC entry 3265 (class 1259 OID 188459)
-- Name: SuperAdmin_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SuperAdmin_phone_key" ON public."SuperAdmin" USING btree (phone);


--
-- TOC entry 3268 (class 1259 OID 188457)
-- Name: SuperAdmin_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SuperAdmin_username_key" ON public."SuperAdmin" USING btree (username);


--
-- TOC entry 3255 (class 1259 OID 188452)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3256 (class 1259 OID 188453)
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- TOC entry 3295 (class 2606 OID 188474)
-- Name: Admin Admin_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3308 (class 2606 OID 188539)
-- Name: Cart_item Cart_item_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart_item"
    ADD CONSTRAINT "Cart_item_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3294 (class 2606 OID 188469)
-- Name: Customer Customer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3306 (class 2606 OID 188529)
-- Name: Discount Discount_createByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount"
    ADD CONSTRAINT "Discount_createByAdminId_fkey" FOREIGN KEY ("createByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3307 (class 2606 OID 188534)
-- Name: Discount Discount_modifiedByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount"
    ADD CONSTRAINT "Discount_modifiedByAdminId_fkey" FOREIGN KEY ("modifiedByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3302 (class 2606 OID 188509)
-- Name: ProductCategory ProductCategory_createByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_createByAdminId_fkey" FOREIGN KEY ("createByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3303 (class 2606 OID 188514)
-- Name: ProductCategory ProductCategory_modifiedByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_modifiedByAdminId_fkey" FOREIGN KEY ("modifiedByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3304 (class 2606 OID 188519)
-- Name: ProductInventory ProductInventory_createByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductInventory"
    ADD CONSTRAINT "ProductInventory_createByAdminId_fkey" FOREIGN KEY ("createByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3305 (class 2606 OID 188524)
-- Name: ProductInventory ProductInventory_modifiedByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductInventory"
    ADD CONSTRAINT "ProductInventory_modifiedByAdminId_fkey" FOREIGN KEY ("modifiedByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3297 (class 2606 OID 188484)
-- Name: Product Product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."ProductCategory"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3298 (class 2606 OID 188499)
-- Name: Product Product_createByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_createByAdminId_fkey" FOREIGN KEY ("createByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3299 (class 2606 OID 188494)
-- Name: Product Product_discount_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_discount_id_fkey" FOREIGN KEY (discount_id) REFERENCES public."Discount"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3300 (class 2606 OID 188489)
-- Name: Product Product_inventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."ProductInventory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3301 (class 2606 OID 188504)
-- Name: Product Product_modifiedByAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_modifiedByAdminId_fkey" FOREIGN KEY ("modifiedByAdminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3296 (class 2606 OID 188479)
-- Name: RefreshToken RefreshToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshToken"
    ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2023-10-31 05:44:31

--
-- PostgreSQL database dump complete
--

