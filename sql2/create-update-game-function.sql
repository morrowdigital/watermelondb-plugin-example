create or replace function update_game(
        game_id uuid,
        game_title character varying,
        game_min_players integer,
        game_updated_at timestamp with time zone
    ) returns uuid as $$
begin
update board_games
set title = game_title,
    min_players = game_min_players,
    updated_at = game_updated_at,
    last_modified_at = now()
where id = game_id;
return game_id;
end;
$$ language plpgsql;
