import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { layout } from '../../css/general/layout';

export default function Verify({ navigation }){
    return(
        <View style={layout.container}> 
            <Text style= {{marginBottom: 30}}> We have sent OTP to gmail: sdf@gmail.com</Text>
            <TextInput mode="outlined" style={{width: '80%', marginBottom: 30}} label='OTP input'  /> 
            <Button mode="elevated">Verify</Button>
        </View>
    )
 
}

