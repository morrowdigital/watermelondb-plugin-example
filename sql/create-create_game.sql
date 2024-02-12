DROP FUNCTION create_game(uuid,text,integer,timestamp with time zone,timestamp with time zone);

create or replace function create_game(
pid uuid, ptitle text, pmin_players integer, pupdated_at timestamp with time zone, pcreated_at timestamp with time zone
) returns void as $$
begin
  insert into board_games(id, title, min_players, updated_at, created_at)
  values (pid, ptitle, pmin_players, pupdated_at, pcreated_at);
end;
$$ language plpgsql;

select * from create_game('00000000-0000-0000-0000-000000000000', 'test', 1, now(), now());
