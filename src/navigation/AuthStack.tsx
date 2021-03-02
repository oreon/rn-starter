import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList, AuthNavProps } from "../authscreens/AuthParamList";
import { AuthContext } from "../providers/AuthProvider";
import { Center } from "../components/Center";
import { Button, Text } from "react-native";
import Login from "../authscreens/Login";
import Register from "../authscreens/Register";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

// function Login({ navigation }: AuthNavProps<"Login">) {
//   const { login } = useContext(AuthContext);
//   return (
//     <Center>
//       <Text>Login</Text>
//       <Button
//         title="log me in"
//         onPress={() => {
//           login();
//         }}
//       />
//       <Button
//         title="go to register"
//         onPress={() => {
//           navigation.navigate("Register");
//         }}
//       />
//     </Center>
//   );
// }

// function Register({ navigation, route }: AuthNavProps<"Register">) {
//   return (
//     <Center>
      
//       <Button
//         title="go to login"
//         onPress={() => {
//           navigation.navigate("Login");
//           // navigation.goBack()
//         }}
//       />
//     </Center>
//   );
// }

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      // screenOptions={{
      //   header: () => null
      // }}
      initialRouteName="Login"
    >
      <Stack.Screen
        // options={{
        //   headerTitle: "Sign In"
        // }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: "Sign Up"
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};
