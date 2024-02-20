import {withObservables} from '@nozbe/watermelondb/react';
import { View} from 'react-native';

import {BoardGame} from '../model/model';
import {GameListItem} from "./GameListItem";

function GameListComponent({ games }: { games: BoardGame[] }) {
  return (
    <View>
      {games.map((game) => (
          <GameListItem key={game.title} game={game}/>
      ))}
    </View>
  );
}

const enhance = withObservables(['games'], ({ games }) => ({
  games,
}));

export const GameList = enhance(GameListComponent);
