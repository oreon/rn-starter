import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Center } from "../components/Center";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../providers/AuthProvider";
import { Headline, Title } from "react-native-paper";

interface homescreensProps {}
export const DetailsScreen: React.FC<homescreensProps> = ({ navigation }) => {
  const { profile, user } = useContext(AuthContext);
  //let [prof,setProf] = useState(null);

  useEffect(() => {
    
      profile();
      // setProf(data)
      // console.log("prof ",prof)
    
  }, []);

  return (
    <Center>
      <Headline>Profile os</Headline>
      <Title>username</Title>
      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </Center>
  );
};

export const HomeScreen: React.FC<homescreensProps> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button 
        title="Go to Profile"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Logout"
        onPress={() => logout()}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export const HomeStack: React.FC<homescreensProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
