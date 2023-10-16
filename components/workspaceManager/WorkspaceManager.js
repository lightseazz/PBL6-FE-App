import { View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { cssWorkspace } from "../../css/workSpaceManager/css_workSpace";


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First card',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second card',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f33',
        title: 'third card',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa9vf33',
        title: 'fourth card',
    },
    
  ];
export default function WorkspaceManager(){

    return (
        <View style= {cssWorkspace.View}>
            <View style= {cssWorkspace.createWorkspaceView}>
                <Button title="Create" mode="contained-tonal">Create</Button>
            </View >
            <FlatList 
             style = {cssWorkspace.cardContainer} 
             data = {DATA}
             renderItem={({item}) => <WorkspaceCard title={item.title}/>}
             keyExtractor={item => item.id}
            />
            </View>  
    )      
}

function WorkspaceCard({title}){

    return (
        <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
            <Card.Content>
            <Text variant="titleLarge">{title}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
            <Button>Join</Button>
            </Card.Actions>
      </Card>
    )
}