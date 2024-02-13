DROP FUNCTION push(bigint);

create or replace function push(changes jsonb) returns void as $$
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
-- update board_games
for update_game in
select jsonb_array_elements((changes->'board_games'->'updated')) loop
    update board_games
    set title = (update_game->>'title'),
        min_players = (update_game->>'min_players')::integer,
        updated_at = epoch_to_timestamp(update_game->>'updated_at')
    where id = (update_game->>'id')::uuid;
end loop;
-- delete games
with changes_data as (
    select jsonb_array_elements_text(changes->'profiles'->'deleted')::uuid as deleted
)
update board_games
set deleted_at = now(),
    updated_at = now()
from changes_data
where board_games.id = changes_data.deleted;
end;

$$ language plpgsql;

select * from pull();