import { Text, View,TextInput, Button, TouchableHighlight } from 'react-native';
import { cssLogin, touchProps } from '../../css/authPage/css_Login';

 function ChangePass({ navigation }){
    return(
        <View style={cssLogin.mainView}> 
            <Text> Slock </Text>
            <TextInput style={cssLogin.textInput} placeholder='old Password'  /> 
            <TextInput style={cssLogin.textInput} placeholder='new Password'  /> 
            <View style={cssLogin.button}  >
                <Button title='Change Password' />
            </View>
        </View>
    )
 
}

export {ChangePass}

