import { useContext } from 'react';
import { Button, StyleSheet } from 'react-native';

import { Auth } from '../../src/Components/Auth';
import { BoardGameForm } from '../../src/Components/BoardGameForm';
import { GameList } from '../../src/Components/GameList';
import { getDb } from '../../src/model/helpers';
import { sync } from '../../src/model/sync';

const gamesQuery = getDb().get('board_games').query();

export default function Index() {
  const authContext = useContext(Auth);
  const logout = () => {
    authContext?.logout();
  };
  return (
    <>
      <GameList games={gamesQuery} />
      <BoardGameForm />
      {/* For the demo we choose to Sync manually, for test purposes. */}
      <Button title='SYNC' onPress={sync} />
      <Button title='Logout' onPress={logout} />
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
