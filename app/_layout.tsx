import {Slot} from 'expo-router';
import {AuthContextProvider} from "../src/Components/Auth";
import {StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function PublicLayout() {
    return (
        <AuthContextProvider>
            <View style={styles.container}>
                <Slot/>
            </View>
            <StatusBar style='auto' />
        </AuthContextProvider>
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
