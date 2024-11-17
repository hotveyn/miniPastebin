DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.tables
                       WHERE table_schema = 'user'
                         AND table_name = 'users') THEN
            CREATE TABLE "user"."users"
            (
                id            UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
                username      VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                password_salt VARCHAR(255) NOT NULL,
                created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        END IF;
    END
$$