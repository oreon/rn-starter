import React ,{ useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button, Switch, HelperText, Text, Title, Headline } from "react-native-paper"

import { useForm, Controller } from "react-hook-form"
import { ThemeProvider } from "@react-navigation/native"
import Toast from 'react-native-toast-message';
import MainApi from '../api/MainApi'
import axios from "axios"
import { AuthContext } from "../providers/AuthProvider";

type FormData = {
  username: string
  password: string 
}

const PASSWORD_MIN_LENGTH = 6

const REGEX = {
  personalName: /^[a-z ,.'-]+$/i,
  username: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
}

const ERROR_MESSAGES = {
  REQUIRED: "This Field Is Required",
  NAME_INVALID: "Not a Valid Name",
  TERMS: "Terms Must Be Accepted To Continue",
  EMAIL_INVALID: "Not a Valid Email",
}

const Login: React.FC = ({navigation}) => {
  const { control, errors, formState, handleSubmit } = useForm<FormData>({
    mode: "onChange",
  })

  const { login } = useContext(AuthContext);

  const submit = async (data) => {
    let res = await login(data) 
    if(!res){
      console.log("Incorrect credentials")
      setLoginError(true)
    }
  }

  const [loginError, setLoginError] = useState(false)

  return (
    <View style={styles.container}>
     { loginError ?<Headline style={{color:'darkred'}}> Email or password is not correct !</Headline>:null}
      <Controller
        control={control}
        name="username"
        defaultValue="singhjess@gmail.com"
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            value: REGEX.username,
            message: ERROR_MESSAGES.EMAIL_INVALID,
          },
        }}
        render={({ onBlur, onChange, value }) => (
          <>
            <TextInput
              value={value}
              label="Email"
              style={styles.input}
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(value) => onChange(value)}
              error={errors.username && true}
            />
            <HelperText type="error">{errors.username?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue="mohali76"
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
         
        }}
        render={({ onBlur, onChange, value }) => (
          <>
            <TextInput
              value={value}
              label="Password"
              style={styles.input}
              onBlur={onBlur}
              secureTextEntry
              textContentType="password"
              onChangeText={(value) => onChange(value)}
              error={errors.password && true}
            />
          </>
        )}
      />
      <HelperText type="error">{errors.password?.message}</HelperText>

      
      <Button
        mode="contained"
        onPress={handleSubmit(submit)}
        disabled={!formState.isValid}
      >
        Submit
      </Button>

      <Title  style={{color:'darkblue', alignSelf:'center'}} onPress={() => navigation.navigate("Register")}  >Register</Title>  
      
      <Title  style={{color:'darkblue', alignSelf:'center'}} onPress={() => navigation.navigate("Forgot")}  >Forgot Password ?</Title>  
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", marginHorizontal: 30 },
  input: { marginVertical: 5 },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
})