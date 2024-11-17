DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.schemata
        WHERE schema_name = 'user'
    ) THEN
        DROP SCHEMA "user";
    END IF;
END $$