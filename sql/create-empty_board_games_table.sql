DROP FUNCTION empty_board_games_table();

create or replace function empty_board_games_table() returns void as $$
begin
    DELETE FROM board_games;
end;
$$ language plpgsql;
