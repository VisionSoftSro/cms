create table a_user (
    id bigint DEFAULT nextval(('a_user_id_seq'::text)::regclass) NOT NULL,
    enabled boolean not null default false,
    email text not null,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE SEQUENCE a_user_id_seq INCREMENT 1 START 1;

create table roles (
    a_user bigint not null,
    role text not null
);

alter table roles add CONSTRAINT fk_user_role FOREIGN KEY (a_user)
      REFERENCES a_user (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;

create table article (
    id bigint DEFAULT nextval(('article_id_seq'::text)::regclass) NOT NULL,
    name text,
    content text,
    CONSTRAINT article_pkey PRIMARY KEY (id)
);
CREATE SEQUENCE article_id_seq INCREMENT 1 START 1;

create table category (
    id bigint DEFAULT nextval(('category_id_seq'::text)::regclass) NOT NULL,
    name text,
    CONSTRAINT category_pkey PRIMARY KEY (id)
);
CREATE SEQUENCE category_id_seq INCREMENT 1 START 1;


create table article_category (
    category bigint,
    article bigint,
    CONSTRAINT article_category_pkey PRIMARY KEY (category, article)
);


alter table article_category add CONSTRAINT fk_ac_category FOREIGN KEY (category)
      REFERENCES category (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;

alter table article_category add CONSTRAINT fk_ac_article FOREIGN KEY (article)
      REFERENCES article (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;
