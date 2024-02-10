/* eslint-disable no-console */
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { BoardGame } from './model';
import { schema } from './schema';
import {setGenerator} from "@nozbe/watermelondb/utils/common/randomId";
import * as Crypto from "expo-crypto";

const adapter = new SQLiteAdapter({
  schema,
    dbName: 'boardgameapp',
  jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: (error: any) => {
    console.log('error setting up database', error);
  },
});

export const database = new Database({
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

setGenerator(() => Crypto.randomUUID());