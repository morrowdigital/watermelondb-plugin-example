import {withObservables} from '@nozbe/watermelondb/react';
import { Text, View, StyleSheet } from 'react-native';

import { BoardGame } from '../model/model';

function GameListComponent({ games }: { games: BoardGame[] }) {
  return (
    <View>
      {games.map((game) => (
        <View key={game.title} style={styles.gameRow}>
          <Text>{game.title} - </Text>
          <Text>Min Players: {game.minPlayers}</Text>
        </View>
      ))}
    </View>
  );
}

const enhance = withObservables(['games'], ({ games }) => ({
  games,
}));

export const GameList = enhance(GameListComponent);
const styles = StyleSheet.create({
  gameRow: {flexDirection: 'row'}
});