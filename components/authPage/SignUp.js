import { Text, View } from 'react-native';
import {Button, TextInput} from 'react-native-paper'
import { cssLogin} from '../../css/authPage/css_Login';

export default function SignUp( {navigation}){
    return(
        <View style={cssLogin.mainView}> 
            <TextInput  style={{width: '80%', marginBottom: 20}} placeholder='gmail'  /> 
            <TextInput  style={{width: '80%', marginBottom: 20}} placeholder='username'  /> 
            <TextInput  style={{width: '80%', marginBottom: 20}} placeholder='password'  /> 
            <TextInput  style={{width: '80%', marginBottom: 30}} placeholder='password again'  /> 
            <Button mode="elevated" onPress={() => navigation.navigate("Verify")}>Sign up</Button>
            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                <Text>Already have an account ? </Text>
                <Button onPress={(() => navigation.navigate('Login'))}>Login</Button>
            </View>
        </View>
    )
 
}


