create or replace function create_game(
  game_id uuid,
  game_title character varying,
  game_min_players integer,
  game_created_at timestamp with time zone,
  game_updated_at timestamp with time zone
) returns uuid as $$
declare
  new_id uuid;
begin
  insert into board_games (
    id,
    title,
    min_players,
    created_at,
    updated_at,
    server_created_at,
    last_modified_at
  )
  values
    (
      game_id,
      game_title,
      game_min_players,
      game_created_at,
      game_updated_at,
      now(),
      now() + interval '1 microsecond'
    ) returning id into new_id;
  return new_id;
end;
$$ language plpgsql;