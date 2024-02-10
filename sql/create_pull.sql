create or replace function epoch_to_timestamp(epoch text) returns timestamp with time zone as $$ begin return timestamp with time zone 'epoch' + ((epoch::bigint) / 1000) * interval '1 second';
end;
$$ language plpgsql;

create or replace function timestamp_to_epoch(ts timestamp with time zone) returns bigint as $$ begin return (
        extract(
            epoch
            from ts
        ) * 1000
    )::bigint;
end;
$$ language plpgsql;

DROP FUNCTION pull(bigint);

create or replace function pull(last_pulled_at bigint default 0) returns jsonb as $$
declare _ts timestamp with time zone;
_result jsonb;
begin -- timestamp
_ts := to_timestamp(last_pulled_at / 1000);
--- profiles
select jsonb_build_object(
        'created',
        '[]'::jsonb,
        'updated',
        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'id',
                    t.id,
                    'title',
                    t.title,
                    'min_players',
                    t.min_players,
                    'created_at',
                    timestamp_to_epoch(t.created_at),
                    'updated_at',
                    timestamp_to_epoch(t.updated_at)
                )
            ) filter (
                where t.updated_at > _ts
            ),
            '[]'::jsonb
        ),
        'deleted',
        '[]'::jsonb
    ) into _result
from board_games t;
return jsonb_build_object(
    'changes',
    jsonb_build_object(
        'board_games',
        _result
    ),
    'timestamp',
    timestamp_to_epoch(now())
);
end;
$$ language plpgsql;

select * from pull();