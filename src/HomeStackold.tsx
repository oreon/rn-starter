import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Center } from "./components/Center";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import { AuthContext } from "./providers/AuthProvider";
import faker from "faker";
import { HomeParamList, HomeStackNavProps } from "./HomeParamList";
import { addProductRoutes } from "./addProductRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function Feed({ navigation }: HomeStackNavProps<"Feed">) {
  AsyncStorage.getItem("token").then((x) => {
    console.log(x);
    console.log("token ->", x);
  });
  //console.log(token)

  return (
    <Center>
      <FlatList
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate("Product", {
                  name: item,
                });
              }}
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
      {addProductRoutes(Stack)}
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
        }}
        component={Feed}
      />
    </Stack.Navigator>
  );
};
