import {SyncDatabaseChangeSet, synchronize} from "@nozbe/watermelondb/sync";
import {database} from "./database";
import {supabase} from "../supabase/supabase-client";
import {getDb} from "./helpers";

export async function sync() {
    await synchronize({
        database,
        // with pull changes we should provide the logic to call the remote server pull function
        // that will provide the changes that happened on the server since lastPulledAt
        // Results should be in format SyncDatabaseChangeSet
        pullChanges: async ({lastPulledAt}) => {
            const username = await getDb().localStorage.get<string>('username');
            console.log(`🍉 Pulling with lastPulledAt = ${lastPulledAt}`);
            const { data, error } = await supabase.rpc("pull", {
                p_username: username,
                last_pulled_at: lastPulledAt ?? 0,
            });

            if (error) {
                throw new Error("🍉".concat(error.message));
            }

            // uncomment this for debugging purposes
            // console.log(JSON.stringify(data, null, 2));

            const { changes, timestamp } = data as {
                changes: SyncDatabaseChangeSet;
                timestamp: number;
            };

            console.log(`🍉 Changes pulled successfully. Timestamp: ${timestamp}`);

            return {changes, timestamp};
        },
        // with push changes we should provide the logic to call the remote server push function
        // which receives and handles client-side changes from WatermelonDB.
        // the object sent is in format SyncDatabaseChangeSet
        pushChanges: async ({changes, lastPulledAt}) => {
            const username = await getDb().localStorage.get<string>('username');
            console.log(`🍉 Pushing with lastPulledAt = ${lastPulledAt}`);

            // const updatedChanges = addUserNameToCreated(changes, username ?? '');

            // uncomment this for debugging purposes
            // console.log('changes', JSON.stringify(changes, null, 2));

            const { error } = await supabase.rpc('push', { changes, username });

            if (error) {
                throw new Error("🍉".concat(error.message));
            }

            console.log(`🍉 Changes pushed successfully.`);
        },
        // With this setting we expect from server that new rows
        // will return in 'updated' key along with updates.
        // So WatermelonDB will treat them as accordingly.
        sendCreatedAsUpdated: true,
    });
}

const usernameAdder = (username: string) => (record: Record<string, unknown>) => ({
    ...record,
    username,
})

const addUserNameToCreated = (changes: SyncDatabaseChangeSet, username: string) => {
    const propAdder = usernameAdder(username);

    return {
        ...changes,
        "board_games": {
            ...changes.board_games,
            created: changes.board_games.created.map(propAdder)
        }
    }
}
