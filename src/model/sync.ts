import {synchronize} from "@nozbe/watermelondb/sync";
import {database} from "./database";

export async function sync() {
    await synchronize({
        database,
        pullChanges: async ({lastPulledAt}) => {
            console.log('pullChanges', lastPulledAt);
            return {changes: {}, timestamp: Date.now()};
        }
    });
}