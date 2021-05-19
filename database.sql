
/* Create app schema (won't be using the default public schema) */
CREATE SCHEMA app;


/* READ ONLY ROLE AND PERMISSIONS */
/* Design partially based on these ideas https://aws.amazon.com/blogs/database/managing-postgresql-users-and-roles/  and this https://severalnines.com/database-blog/how-secure-your-postgresql-database-10-tips*/

/* Create a ROLE that is read-only */
CREATE ROLE r_app_ro NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT USAGE ON SCHEMA app to r_app_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA app TO r_app_ro;
ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT SELECT ON TABLES TO r_app_ro;   

/* Create a GROUP ROLE that is read-only */
/* We then grant the role permissions to the group */
CREATE ROLE g_app_ro NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT r_app_ro TO g_app_ro;

/* Create a USER ROLE that is read-only */
/* We then grant the role permissions to the actual user  */
CREATE ROLE app_user WITH  LOGIN;  -- Only the USER ROLE has LOGIN permission (as it is the one we actually use to connect)  
ALTER ROLE app_user WITH PASSWORD 'aStrongPassword';  -- REPLACE with A DIFFERENT PASSWORD!!!! 
ALTER ROLE app_user VALID UNTIL 'infinity';
GRANT g_app_ro TO app_user;


/* Create a ROLE that can perform CRUD operations across the APP schema */
CREATE ROLE r_app_crud NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT USAGE ON SCHEMA app to r_app_crud;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app TO r_app_crud;  -- Granting CRUD permissions 
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app TO r_app_crud;
ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO r_app_crud;

/* Create a GROUP ROLE */
CREATE ROLE g_app_crud NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
GRANT r_app_crud TO g_app_crud;

/* Create a USER ROLE that is CRUD */
/* IMPORTANT! */
/* This is the user that the express server will use to login to the DB and perform CRUD operations */
CREATE ROLE app_user_crud WITH LOGIN; -- Only the USER ROLE has LOGIN permission (as it is the one we actually use to connect)  
ALTER ROLE app_user_crud WITH PASSWORD 'anotherStrongPassword';   -- REPLACE with A DIFFERENT PASSWORD!!!! 
ALTER ROLE app_user_crud VALID UNTIL 'infinity';
GRANT g_app_crud TO app_user_crud;

-- alter default search to the app schema
ALTER ROLE r_app_crud SET search_path TO app;

-- install UUID extension for postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  /* Installing UUID Postgres extension */

-- create TABLES 

CREATE TABLE app.users (
    user_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    user_first_name VARCHAR (100) NOT NULL,
    user_last_name VARCHAR (100) NOT NULL,
    user_email VARCHAR (150) UNIQUE NOT NULL,
    user_password VARCHAR (100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- create table tasks in app schema with a foreign KEY referencing app.users(user_id)
CREATE TABLE app.tasks (
    task_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    task_owner UUID NOT NULL REFERENCES app.users(user_id),
    task_description VARCHAR (255) NOT NULL,
    task_is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- create table subtasks in app schema with a foreign KEY referencing app.tasks(task_id)
CREATE TABLE app.subtasks (
    subtask_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    subtask_description VARCHAR (1000) NOT NULL,
    subtask_is_completed BOOLEAN NOT NULL DEFAULT false,
    subtask_task_id UUID NOT NULL REFERENCES app.tasks(task_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

