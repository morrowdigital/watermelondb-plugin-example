import {Button, StyleSheet } from 'react-native';
import {GameList} from "../../src/Components/GameList";
import {BoardGameForm} from "../../src/Components/BoardGameForm";
import {sync} from "../../src/model/sync";
import {getDb} from "../../src/model/helpers";

const gamesQuery = getDb().get('board_games').query()

export default function Index() {
  return (
        <>
          <GameList games={gamesQuery} />
          <BoardGameForm />
          {/* For the demo we choose to Sync manually, for test purposes. */}
          <Button title={'SYNC'} onPress={sync}/>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
