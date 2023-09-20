import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { BoardGameForm } from "./src/Components/BoardGameForm";
import { GameList } from "./src/Components/GameList";
import { getDb } from "./src/model/database";

const gamesQuery = getDb().get('board_games').query()

export default function App() {
  return (
      <View style={styles.container}>
        <GameList games={gamesQuery} />
        <BoardGameForm />
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
