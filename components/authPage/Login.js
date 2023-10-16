import { Text, View, Image } from 'react-native';
import { cssLogin} from '../../css/authPage/css_Login';
import { TextInput, Button } from 'react-native-paper';

export default function Login({ navigation }){
    return(
        <View style={cssLogin.mainView}> 
             <Image style={{width: '50%', aspectRatio: 1, marginBottom: 20, borderRadius: 10}}
                source={require('../../assets/slack.png')}
            />
            <View style = {{width: '80%'}}>
                <TextInput placeholder='username' mode='outlined' style={{marginBottom: 30}}/> 
                <TextInput  placeholder='password' mode='outlined' style={{marginBottom: 10}}/> 
                <Button onPress={(() => navigation.navigate('ChangePass'))} style={{alignSelf: 'flex-end'}}>Forgot your password</Button>
            </View>
            <Button mode="elevated" style={{marginTop: 10}}>Login</Button>
            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                <Text>Don't have account</Text>
                <Button onPress={(() => navigation.navigate('SignUp'))}>Sign Up</Button>
            </View>
            <Button mode="contained" icon="google" style={{marginTop: 30, width: '80%'}}>
            Sign In with Google
            </Button>
        </View>
    )
 
}


