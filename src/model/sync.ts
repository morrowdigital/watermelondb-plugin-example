import {SyncDatabaseChangeSet, synchronize} from "@nozbe/watermelondb/sync";
import {database} from "./database";
import {supabase} from "./supabase-client";

export async function sync() {
    await synchronize({
        database,
        pullChanges: async ({lastPulledAt}) => {
            const { data, error } = await supabase.rpc("pull", {
                last_pulled_at: lastPulledAt,
            });

            // const { data, error } = await supabase.rpc("hello_world");

            if (error) {
                throw new Error("🍉".concat(error.message));
            }

            console.log(data);

            const { changes, timestamp } = data as {
                changes: SyncDatabaseChangeSet;
                timestamp: number;
            };

            console.log(
                `🍉 Changes pulled at ${new Date(timestamp).toISOString()} UTC`,
            );

            return {changes, timestamp};
            // return {changes: {}, timestamp: Date.now()};
        },
        pushChanges: async ({changes, lastPulledAt}) => {
            console.log('pushChanges', lastPulledAt);
            console.log('changes', JSON.stringify(changes));
            const { error } = await supabase.rpc('push', { changes });

            if (error) {
                throw new Error("🍉".concat(error.message));
            }
        },
    });
}