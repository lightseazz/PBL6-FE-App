import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { cssLogin } from '../../css/authPage/css_Login';

export default function Verify({ navigation }){
    return(
        <View style={cssLogin.mainView}> 
            <Text style= {{marginBottom: 30}}> We have sent OTP to gmail: sdf@gmail.com</Text>
            <TextInput mode="outlined" style={{width: '80%', marginBottom: 30}} placeholder='OTP input'  /> 
            <Button mode="elevated">Verify</Button>
        </View>
    )
 
}

