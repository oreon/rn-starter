import React ,{ useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button, Switch, HelperText, Title, Text } from "react-native-paper"
import { AuthContext } from "../providers/AuthProvider";
import { useForm, Controller } from "react-hook-form"

type FormData = {
  name: string
  username: string
  email: string
  password: string
  termsAccepted: boolean
}

const PASSWORD_MIN_LENGTH = 8

const REGEX = {
  personalName: /^[a-z0-9,.'-]+$/i,
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
}

const ERROR_MESSAGES = {
  REQUIRED: "This Field Is Required",
  NAME_INVALID: "Not a Valid Name",
  TERMS: "Terms Must Be Accepted To Continue",
  EMAIL_INVALID: "Not a Valid Email",
}

const Register: React.FC = ({navigation}) => {
  const { control, errors, formState, handleSubmit } = useForm<FormData>({
    mode: "onChange",
  })

  const { register } = useContext(AuthContext);

  const submit = async (data) => {
    console.log("registering ", data)
    let res = await register(data)
    if(res != null){
      console.error("couldnt register", res)
      setRegisterError(res)
    }
  }

  const [registerError, setRegisterError] = useState('')

  return (
    <View style={styles.container}>
    { registerError ?<Text style={{color:'darkred'}}> Email or username is already taken !</Text>:null}
      <Controller
        control={control}
        defaultValue="ksing"
        name="name"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          pattern: { message: "Not a Valid Name", value: REGEX.personalName },
        }}
        render={({ onChange, onBlur, value }) => (
          <>
            <TextInput
              label="Name"
              style={styles.input}
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              error={errors.name && true}
            />
            <HelperText type="error">{errors.name?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="username"
        defaultValue="singhk"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          pattern: { message: "Not a Valid usernName", value: REGEX.personalName },
        }}
        render={({ onBlur, onChange, value }) => (
          <>
            <TextInput
              label="User Name"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              error={errors.username && true}
            />
            <HelperText type="error">{errors.username?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="email"
        defaultValue="singhk@gmail.com"
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            value: REGEX.email,
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
              error={errors.email && true}
            />
            <HelperText type="error">{errors.email?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue="mohali"
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: "Password must have at least 8 characters",
          },
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
      <View style={styles.row}>
        <Text>Terms Accept</Text>
        <Controller
          control={control}
          defaultValue={true}
          name="termsAccepted"
          rules={{ required: { value: true, message: ERROR_MESSAGES.TERMS } }}
          render={({ value, onChange }) => (
            <>
              <Switch
                value={value}
                onValueChange={(value) => onChange(value)}
              />
            </>
          )}
        />
      </View>
      <HelperText type="error">{errors.termsAccepted?.message}</HelperText>
      <Button
        mode="contained"
        onPress={handleSubmit(submit)}
        disabled={!formState.isValid}
      >
        Submit
      </Button>
      <Title  style={{color:'darkblue', alignSelf:'center'}} onPress={() => navigation.navigate("Login")}  >Login</Title>  
    
    </View>
  )
}

export default Register

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