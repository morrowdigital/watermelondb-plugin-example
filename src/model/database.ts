/* eslint-disable no-console */
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { BoardGame } from './model';
import { schema } from './schema';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: (error: any) => {
    console.log('error setting up database', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [BoardGame],
});

export function getDb() {
  return database;
}

export const createBoardGame = (title: string, minPlayers: number) =>
  getDb().write(() =>
    getDb()
      .get<BoardGame>('board_games')
      .create((boardGame) => {
        boardGame.title = title;
        boardGame.minPlayers = minPlayers;
      })
  );
