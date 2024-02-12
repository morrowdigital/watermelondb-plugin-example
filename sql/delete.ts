import {supabase} from "../src/model/supabase-client";

    async function del (){
        console.log('will delete board games table');
        await supabase.rpc('empty_board_games_table');
        console.log('done')
    }

    del();