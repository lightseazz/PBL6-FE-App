import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { cssLogin} from '../../css/authPage/css_Login';

export default function  ChangePass({ navigation }){
    return(
        <View style={cssLogin.mainView}> 
            <TextInput mode="outlined"  placeholder='old Password' style={{width: '80%', marginBottom: 30}}  /> 
            <TextInput mode="outlined"  placeholder='new Password' style={{width: '80%', marginBottom: 30}} /> 
            <TextInput mode="outlined"   placeholder='new Password Again' style={{width: '80%', marginBottom: 30}} />
            <Button mode="elevated">Change Password</Button>
        </View>
    )
 
}


