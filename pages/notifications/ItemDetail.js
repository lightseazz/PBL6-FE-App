import { View, StyleSheet, Text, StatusBar, Alert } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import acceptWpApi from "../../api/workspaceApi/acceptWp.api";
import declineWpApi from "../../api/workspaceApi/declineWp.api";

const icon = "https://cdn-icons-png.flaticon.com/512/3119/3119338.png";



export default function ItemDetail({ navigation, route }) {
  const { id, title, content, createAt, isRead, type, data } = route.params;
	console.log(isRead);
  let dataJson = JSON.parse(data);
  let dataDetailJson = JSON.parse(dataJson.Detail);
  console.log(dataDetailJson)
  function AcceptWsp() {
    return (
      <Button mode="contained"
        style={{ backgroundColor: 'green', width: '30%', marginBottom: 10 }}
        onPress={acceptWsp}
      >Accept</Button>
    )
  }
  function DeclineWsp() {
    return (
      <Button mode="contained" style={{ backgroundColor: 'red', width: '30%' }}
        onPress={declineWsp}
      >Decline</Button>
    )
  }
  function AcceptChannel() {
    return (
      <Button mode="contained" style={{ backgroundColor: 'green', width: '30%', marginBottom: 10 }}
        onPress={acceptChannel}
      >Accept</Button>
    )
  }
  function DeclineChannel() {
    return (
      <Button mode="contained" style={{ backgroundColor: 'red', width: '30%' }}
        onPress={declineChannel}
      >Decline</Button>
    )
  }
  async function acceptWsp() {
    console.log(dataDetailJson.GroupId);
    const response = await acceptWpApi(dataDetailJson.GroupId);
		if(response.status == 400){
			Alert.alert("you are in workspace");
		}
		else{
			Alert.alert("you are successful");
		}
  }
  async function declineWsp() {
    const response = await declineWpApi(dataDetailJson.GroupId);
		if(response.status == 400){
			Alert.alert("you have declined")
		}

  }
  async function acceptChannel() {

  }
  async function declineChannel() {

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.secondContainer}>
        <Avatar.Image
          style={{ borderRadius: 10, backgroundColor: "white" }}
          size={40}
          source={{
            uri: icon,
          }}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{createAt}</Text>
        </View>
      </View>
      <Divider bold={true} style={styles.divider} />
      <Text style={styles.text}>{content}</Text>
      {type == 6 ? (
        <>
          <AcceptWsp />
          <DeclineWsp />
        </>
      ) : <></>}
      {type == 4 ? (
        <>
          <AcceptChannel />
          <DeclineChannel />
        </>
      ) : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: "5%",
  },
  secondContainer: {
    flexDirection: "row",
    width: "100%",
  },
  timeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  leftContainer: {
    marginLeft: 10,
  },
  typeText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  title: {
    marginBottom: 20,
    color: "#1a69a6",
    fontSize: 18,
  },
  timeText: { fontSize: 12, alignSelf: "flex-end" },
  divider: {
    marginTop: 20,
    borderWidth: 0.8,
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
  },
});
