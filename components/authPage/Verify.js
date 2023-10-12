import { Text, View,TextInput, Button, TouchableHighlight } from 'react-native';
import { cssLogin, touchProps } from '../../css/authPage/css_Login';

 function Verify({ navigation }){
    return(
        <View style={cssLogin.mainView}> 
            <Text> We have sent OTP to gmail: sdf@gmail.com</Text>
            <TextInput style={cssLogin.textInput} placeholder='OTP input'  /> 
            <View style={cssLogin.button}  >
                <Button title='Verify' />
            </View>
        </View>
    )
 
}

export {Verify}

