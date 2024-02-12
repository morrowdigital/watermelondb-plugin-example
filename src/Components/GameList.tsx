import {withObservables} from '@nozbe/watermelondb/react';
import {Text, View, StyleSheet, Button} from 'react-native';

import { BoardGame } from '../model/model';

function GameListComponent({ games }: { games: BoardGame[] }) {
  const onDelete = () => {

  }
  return (
    <View>
      {games.map((game) => (
        <View key={game.title} style={styles.gameRow}>
          <View style={styles.button}>
            <Button title='DEL' onPress={onDelete} />
          </View>
          <Text>{game.title} - </Text>
          <Text>{game.minPlayers}+</Text>
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
  gameRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 8},
  button: {marginRight: 8}
});