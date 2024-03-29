import {Button, StyleSheet, Text, View} from 'react-native';
import {useContext} from "react";
import {Auth} from "../src/Components/Auth";
import {router} from "expo-router";
export default function Login() {
    const authContext = useContext(Auth);

    const onLogin = () => {
        authContext?.setIsAuthenticated(true);
        router.navigate('/');
    }


  return (
      <View>
        <Text>Login Page</Text>
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
});
