import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useContext, useState} from "react";
import {Auth} from "../src/Components/Auth";
import {router} from "expo-router";
export default function Login() {
    const authContext = useContext(Auth);
    const [username, setUsername] = useState('');

    const onLogin = () => {
        authContext?.login(username);
        console.log('will login with', username)
        router.navigate('/');
    }


  return (
      <View>
        <Text>Username</Text>
          <TextInput  onChangeText={setUsername} style={styles.textInput}/>
          <Button title='Login' onPress={onLogin}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    textInput: {
      padding: 4,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'lightgray',
        minWidth: 200,
    }
});
