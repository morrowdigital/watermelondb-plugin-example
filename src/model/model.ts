import { Model } from "@nozbe/watermelondb";
import {date, field, readonly, text} from "@nozbe/watermelondb/decorators";

export class BoardGame extends Model {
  static table = 'board_games';

  // @ts-ignore
  @readonly @date('created_at') createdAt!: Date;
  // @ts-ignore
  @readonly @date('updated_at') updatedAt!: Date;
  // @ts-ignore
  @text('title') title: string;
  // @ts-ignore
  @field('min_players') minPlayers;
}

