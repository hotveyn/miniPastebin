DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.tables
                       WHERE table_schema = 'auth'
                         AND table_name = 'abilities') THEN
            CREATE TABLE "auth"."abilities"
            (
                domain_name VARCHAR(255) NOT NULL,
                name        VARCHAR(255) NOT NULL,
                created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (domain_name, name),
                FOREIGN KEY (domain_name) REFERENCES "auth"."domains" (name) ON DELETE RESTRICT
            );
        END IF;
    END;
$$