-- Ensure the table 'users' exists in the 'user' schema
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'user' AND table_name = 'users'
    ) THEN
          DROP TABLE "user"."users";
    END IF;
END $$;