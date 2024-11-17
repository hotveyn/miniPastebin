DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM pg_type t
                                JOIN pg_namespace n ON n.oid = t.typnamespace
                       WHERE t.typname = 'permission'
                         AND n.nspname = 'auth') THEN
            CREATE TYPE "auth".permission_enum AS ENUM ('READ', 'CREATE', 'UPDATE', 'DELETE');
        END IF;

        IF NOT EXISTS (SELECT 1
                       FROM information_schema.tables
                       WHERE table_schema = 'auth'
                         AND table_name = 'permissions') THEN
            CREATE TABLE "auth"."permissions"
            (
                role_name   VARCHAR(255)           NOT NULL,
                permission  "auth".permission_enum NOT NULL,
                domain_name VARCHAR(255)           NOT NULL,
                created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (role_name, permission, domain_name),
                FOREIGN KEY (role_name) REFERENCES "auth"."roles" (name) ON DELETE RESTRICT,
                FOREIGN KEY (domain_name) REFERENCES "auth"."domains" (name) ON DELETE RESTRICT
            );
        END IF;
    END
$$