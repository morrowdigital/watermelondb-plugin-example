DROP FUNCTION epoch_to_timestamp(text);

create or replace function epoch_to_timestamp(epoch text) returns void as $$
begin
    return timestamp with time zone 'epoch' + ((epoch::bigint) / 1000) * interval '1 second';
end;
$$ language plpgsql;
