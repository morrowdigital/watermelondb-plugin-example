import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class BoardGame extends Model {
  static table = 'board_games';
  // @ts-ignore
  @text('title') title: string;
  // @ts-ignore
  @field('min_players') minPlayers;
}

