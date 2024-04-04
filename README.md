# Using WatermelonDb-expo-plugin + Offline-First examples

This is an example Expo app that demonstrates the following cases:

1. How to use the [@morrowdigital/watermelondb-expo-plugin](https://github.com/morrowdigital/watermelondb-expo-plugin)
2. A basic setup of WatermelonDB
3. [Morrow Blog / Build and Offline-First App with Expo Supabase and WatermlonDB](https://www.themorrow.digital/blog/building-an-offline-first-app-with-expo-supabase-and-watermelondb)
4. [Offline First with Supabase and WatermelonDB - Part 2 - Handling authentication](https://www.themorrow.digital/blog/building-an-offline-first-app-with-expo-supabase-and-watermelondb-authentication)

## Using the [@morrowdigital/watermelondb-expo-plugin](https://github.com/morrowdigital/watermelondb-expo-plugin)

You can find more details in our blog-post:
[Using WatermelonDB with React Native Expo](https://www.themorrow.digital/blog/how-to-use-watermelondb-with-react-native-expo)

This post also include a basic demo setup of WatermelonDB.

### Running the example

1. Clone this repo
2. run `npm install` or `yarn install`
3. run `npx expo run:ios` or `npx expo run:android`

> Note: In order to run you need to build a dev-client. But since this example is now using expo SDK 50, it will automatically build one with the `npx expo run:<platform>` command. If you still encounter issues, then build a dev-client.

### Running the example

Follow the instruction in the blog post above, and create a Supabase project, along with the instructions on how to set up Supabase functions.

In the root directory create a `.env` file and add the Supabase project URL and the Supabase Anon Key. (see `.env.example`)

Run with dev client or `npx expo run:ios` / `npx expo run:android` commands.
