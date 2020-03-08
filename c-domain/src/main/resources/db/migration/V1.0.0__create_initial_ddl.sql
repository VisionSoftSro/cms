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
