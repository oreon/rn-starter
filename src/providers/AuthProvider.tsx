import axios from "axios";
import React, { useState } from "react";

import MainApi from "../api/MainApi";

type User = null | { username: string 
  token:string};

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: User;
  //token: string
  login: (data) => Promise<boolean>;
  tokenLogin: (data:string) => void;
  logout: () => void;
  register: (data) => Promise<string>;
  profile: () => Promise<any>;
};

export const AuthContext = React.createContext<AuthContextType>(null);

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<User>(null);
  const api = new MainApi(null);
  const self = this;

  const doLogin = async (data ) =>{
   try {
      let token = await api.login(data);
      if (token) {
        console.log("got token ->", token);
        const user = { username: data.username , token:token.token};
        setUser(user);
        api.token = token.token
        await AsyncStorage.setItem("token", token.token);
        return true;
      }
    } catch (error) {
      return false;
    }
   
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        
        login: async (data) => {
          return await doLogin(data)
        },
        tokenLogin:  (token:string) => {
          const user = { username: null , token:token};
          api.token = token
          setUser(user);
        },
        logout: async () => {
          setUser(null);
         
          await AsyncStorage.removeItem("token");
        },
        register: async (data) => {
          try {
            let res = await api.register(data);
            let email = data["email"];  //username will be emial in the profile
            let password = data["password"];
            //self.login({'username':email, 'password':password}) //TODO: find a way to do this
            res = await doLogin({'username':email, 'password':password})
            if(res) //login succeeded
              return null;
          } catch (error) {
            console.log("there was an error registering");
            return error;
          }
        },

        profile: async () => {
          try {
            api.token = user.token
            let res = await api.myprofile();
            //setProfile(res)
            res.token = user.token
            setUser(res)
            return res;
          } catch (error) {
            console.log("there was an error getting profile");
            return error;
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const AppContext = React.createContext<{
//   user: User;
//   getArticles: () => void;
//   getRecipes: () => void;
//   getTodays: (data) => void;

// }>({
//   user: null,
//   getArticles: () => {},
//   getRecipes: () => {},
//   getTodays: (data) => {}
// });

// interface AuthProviderProps {}

// export const AppProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User>(null);
//   let api = new MainApi();
//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         getArticles: async () => {
//           let articles = await api.getArticles()
//           return articles;
//         },
//         getRecipes: async () => {
//           let recipes = await api.getRecipes()
//           return recipes;
//         },
//         getTodays: (data) => {
//           return ' a plan for tdays'
//         }

//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
