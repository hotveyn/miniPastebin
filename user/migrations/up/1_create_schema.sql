DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1
                       FROM information_schema.schemata
                       WHERE schema_name = 'user') THEN
            CREATE SCHEMA "user";
        END IF;
    END
$$