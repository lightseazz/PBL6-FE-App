import { layout} from '../../css/general/layout';

import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function WorkspaceCreate(){
    return (
        <View style={layout.container}>
            <TextInput 
                label='workspace name' 
                mode='outlined' 
                style={{marginBottom: 30, width:'80%'}}/> 
            <TextInput 
                label='description' 
                mode='outlined' 
                style={{marginBottom: 30, width: '80%'}} 
                multiline={true}
                numberOfLines={8}
            /> 
            <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginRight: 40,
            }}>
                <Button mode="contained" style={{ width: '30'}}>
                    Cancel
                </Button>
                <Button mode="contained"  style={{ marginLeft: 20, width: '30'}}>
                    Ok
                </Button>
            </View>
            
        </View>
    )
}