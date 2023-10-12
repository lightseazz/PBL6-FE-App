import { Text, View,TextInput, Button, TouchableHighlight } from 'react-native';
import { cssLogin, touchProps } from '../../css/authPage/css_Login';

 function Login({ navigation }){
    return(
        <View style={cssLogin.mainView}> 
            <Text> Slock </Text>
            <TextInput style={cssLogin.textInput} placeholder='username'  /> 
            <TextInput style={cssLogin.textInput} placeholder='password'  /> 
            <View style={cssLogin.button}  >
                <Button title='Login' />
            </View>
            <TouchableHighlight onPress={(() => navigation.navigate('ChangePass'))} {...touchProps}>
                <View style={cssLogin.text}>
                    <Text>Forgot password ?</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight  onPress={(() => navigation.navigate('SignUp'))} {...touchProps}>
                <View style={cssLogin.text}>
                    <Text>Sign Up </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
 
}

export {Login}

