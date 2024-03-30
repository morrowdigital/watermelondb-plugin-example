create or replace function update_game(
        game_id uuid,
        game_title character varying,
        game_min_players integer,
        username character varying,
        game_updated_at timestamp with time zone
    ) returns uuid as $$
begin
    update board_games
    set title = game_title,
        min_players = game_min_players,
        username = username,
        -- we just replicate client-side tracking here
        updated_at = game_updated_at,
        -- we automatically handle server side tracking
        last_modified_at = now()
    where id = game_id;
    return game_id;
end;
$$ language plpgsql;
