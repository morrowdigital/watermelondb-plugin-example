create or replace function push(changes jsonb) returns void as $$
declare new_game jsonb;
declare updated_game jsonb;
begin -- insert new games
for new_game in
select jsonb_array_elements((changes->'board_games'->'created')) loop perform create_game(
        (new_game->>'id')::uuid,
        (new_game->>'title'),
        (new_game->>'min_players')::integer,
        epoch_to_timestamp(new_game->>'created_at'),
        epoch_to_timestamp(new_game->>'updated_at')
    );
end loop;
-- delete games
with changes_data as (
    select jsonb_array_elements_text(changes->'board_games'->'deleted')::uuid as deleted
)
update board_games
set deleted_at = now(),
    last_modified_at = now()
from changes_data
where board_games.id = changes_data.deleted;
-- update games
for updated_game in
select jsonb_array_elements((changes->'board_games'->'updated')) loop perform update_game(
        (updated_game->>'id')::uuid,
        (updated_game->>'title'),
        (updated_game->>'min_players')::integer,
        epoch_to_timestamp(updated_game->>'updated_at')
    );
end loop;
end;
$$ language plpgsql;