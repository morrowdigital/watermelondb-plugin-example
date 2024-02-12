DROP FUNCTION push(bigint);

create or replace function push(changes jsonb) void as $$

declare new_game jsonb;
declare update_game jsonb;
begin
-- create profiles
for new_game in
select jsonb_array_elements((changes->'board_games'->'created')) loop perform create_game(
        (new_game->>'id')::uuid,
        (new_game->>'title'),
        (new_game->>'min_players')::integer,
        epoch_to_timestamp(new_game->>'created_at'),
        epoch_to_timestamp(new_game->>'updated_at')
    );
end loop;
-- delete profiles
-- with changes_data as (
--     select jsonb_array_elements_text(changes->'profiles'->'deleted')::uuid as deleted
-- )
-- update profiles
-- update profiles
-- set deleted_at = now(),
--     last_modified_at = now()
-- from changes_data
-- where profiles.id = changes_data.deleted;
end;

$$ language plpgsql;

select * from pull();