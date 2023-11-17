import { general } from "../../styles/styles";
import { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import createWpApi from "../../api/workspaceApi/createWp.api";

import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function WorkspaceCreate({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [clicked, setClicked] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onChangeName = (text) => {
    setName(text);
  };

  const onChangeDescription = (text) => {
    setDescription(text);
  };

  async function onPressCreate() {
    setClicked(true);
    if (name == "") {
      setNameError("Workspace name is empty");
      setClicked(false);
      return;
    }
    const response = await createWpApi(name, description, image);
    if (response.status != 200) {
      Alert.alert("not success");
      setClicked(false);
    }
    navigation.navigate("WorkspaceList");
    setClicked(false);
  }

  return (
    <View style={general.centerView}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={pickImage} style={styles.imageTouchable}>
          <Image
            source={
              image
                ? { uri: image }
                : {
                    uri: "https://previews.123rf.com/images/boransari/boransari2008/boransari200800134/153827486-elegir-logotipo-icono-web-elegir-s%C3%ADmbolo-vectorial.jpg",
                  }
            }
            style={{ width: 150, height: 150 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}></View>
      </View>
      <TextInput
        label="workspace name"
        mode="outlined"
        style={{ marginBottom: 30, width: "80%" }}
        onChangeText={onChangeName}
      />
      <TextInput
        label="description"
        mode="outlined"
        style={{ marginBottom: 20, width: "80%" }}
        multiline={true}
        numberOfLines={8}
        onChangeText={onChangeDescription}
      />
      <Text style={{ color: "red", marginBottom: 20 }}>{nameError}</Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          marginRight: 40,
        }}
      >
        <Button
          mode="contained"
          style={{ width: "30" }}
          onPress={() => navigation.goBack()}
          disabled={clicked}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          style={{ marginLeft: 20, marginRight: 10, width: "30" }}
          onPress={onPressCreate}
          disabled={clicked}
        >
          Ok
        </Button>
        {clicked ? <ActivityIndicator /> : <></>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  imageTouchable: {
    marginLeft: 50,
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
  },
  saveImage: { width: "60%", borderRadius: 8 },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.8,
  },
  headerText: { marginBottom: 20, fontSize: 18 },
});
