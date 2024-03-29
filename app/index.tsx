import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {getDb} from "../src/model/helpers";
import {GameList} from "../src/Components/GameList";
import {BoardGameForm} from "../src/Components/BoardGameForm";
import {sync} from "../src/model/sync";

const gamesQuery = getDb().get('board_games').query()

export default function Index() {
  return (
      <View style={styles.container}>
        <GameList games={gamesQuery} />
        <BoardGameForm />
          {/* For the demo we choose to Sync manually, for test purposes. */}
          <Button title={'SYNC'} onPress={sync}/>
        <StatusBar style='auto' />
      </View>
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
