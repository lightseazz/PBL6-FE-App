import { Text, View,TextInput, Button, TouchableHighlight } from 'react-native';
import { cssLogin, touchProps } from '../../css/authPage/css_Login';

 function SignUp( {navigation}){
    return(
        <View style={cssLogin.mainView}> 
            <Text> Slock </Text>
            <TextInput style={cssLogin.textInput} placeholder='gmail'  /> 
            <TextInput style={cssLogin.textInput} placeholder='username'  /> 
            <TextInput style={cssLogin.textInput} placeholder='password'  /> 
            <TextInput style={cssLogin.textInput} placeholder='password again'  /> 
            <View style={cssLogin.button}  >
                <Button title='Sign Up' onPress={() => navigation.navigate("Verify")} />
            </View>
            <TouchableHighlight onPress={() => navigation.navigate("Login")} {...touchProps}>
                <View style={cssLogin.text}>
                    <Text>Login</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
 
}

export {SignUp}

