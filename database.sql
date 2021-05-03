CREATE SCHEMA app;

CREATE ROLE r_app_ro NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT USAGE ON SCHEMA app to r_app_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA app TO r_app_ro;
ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT SELECT ON TABLES TO r_app_ro;

CREATE ROLE g_app_ro NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT r_app_ro TO g_app_ro;

CREATE ROLE app_user WITH  LOGIN;
ALTER ROLE app_user WITH PASSWORD 'aStrongPassword';
ALTER ROLE app_user VALID UNTIL 'infinity';
GRANT g_app_ro TO app_user;


CREATE ROLE r_app_crud NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT USAGE ON SCHEMA app to r_app_crud;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app TO r_app_crud;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app TO r_app_crud;
ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO r_app_crud;

CREATE ROLE g_app_crud NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT r_app_crud TO g_app_crud;

CREATE ROLE app_user_crud WITH LOGIN;
ALTER ROLE app_user_crud WITH PASSWORD 'anotherStrongPassword';
ALTER ROLE app_user_crud VALID UNTIL 'infinity';
GRANT g_app_crud TO app_user_crud;

-- alter default search to the app schema
ALTER ROLE r_app_crud SET search_path TO app;



-- install UUID extension for postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- create triggers to update timestamps in the tables 
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON app.users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON app.tasks
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON app.subtasks
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();



-- create table todo in app schema
CREATE TABLE app.tasks (
    task_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    task_description VARCHAR (255) NOT NULL,
    task_is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE app.subtasks (
    subtask_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    subtask_description VARCHAR (1000) NOT NULL,
    subtask_is_completed BOOLEAN NOT NULL DEFAULT false,
    subtask_task_id UUID NOT NULL REFERENCES app.tasks(task_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE app.users (
    user_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_first_name VARCHAR (100) NOT NULL,
    user_last_name VARCHAR (100) NOT NULL,
    user_email VARCHAR (150) UNIQUE NOT NULL,
    user_password VARCHAR (100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- inserting some sample data 

INSERT INTO app.tasks (
  task_description
) VALUES (
  'task1'
); 
INSERT INTO app.subtasks (
  subtask_description, subtask_task_id
) VALUES (
  'a sample subtask 1',
  (SELECT task_id FROM app.tasks WHERE app.tasks.task_description = 'task1')
); 








