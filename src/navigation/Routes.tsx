import React, { useState, useEffect, useContext } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

import { Center } from "../components/Center";
import { AuthContext } from "../providers/AuthProvider";
import { AppTabs } from "../AppTabs";
import { AuthStack } from "./AuthStack";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, tokenLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if the user is logged in or not
    AsyncStorage.getItem("token")
      .then(token => {
        if (token) {
          // decode it
          tokenLogin(token)
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user?.token ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
