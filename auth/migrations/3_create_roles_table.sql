DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.tables
                       WHERE table_schema = 'auth'
                         AND table_name = 'roles') THEN
            CREATE TABLE "auth"."roles"
            (
                name       VARCHAR(255) NOT NULL PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        END IF;
    END
$$