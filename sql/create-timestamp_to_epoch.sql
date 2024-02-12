DROP FUNCTION timestamp_to_epoch(timestamp with time zone);

create or replace function timestamp_to_epoch(ts timestamp with time zone) returns void as $$
begin
    begin return (
            extract(
                epoch
                from ts
            ) * 1000
        )::bigint;
    end;
end;
$$ language plpgsql;
