import { general } from "../../styles/styles";
import { useState } from "react";
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
import {
  buttonColor,
  cancelButtonColor,
  textInputColor,
} from "../../styles/colorScheme";
import StatusSnackBar from "../../components/StatusSnackBar";

export default function WorkspaceCreate({ navigation, route }) {
  const { setSnackBarWpList } = route.params;
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clicked, setClicked] = useState(false);

  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

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
    try {
      setClicked(true);
      if (name == "") {
        setSnackBar({ isVisible: true, message: "Workspace name is Empty", type: "failed" });
        setClicked(false);
        return;
      }
      const response = await createWpApi(name, description, image);
      if (response.status != 200) {
        setSnackBar({ isVisible: true, message: "Create workspace failed", type: "failed" });
        setClicked(false);
        return;
      }
      // success
      navigation.navigate("WorkspaceList");
      setSnackBarWpList({ isVisible: true, message: "Create new workspace success", type: "success" });
      setClicked(false);
    } catch (error) {
      console.log(error);
      setSnackBar({ isVisible: true, message: "Create workspace failed", type: "failed" });
      setClicked(false);
      return;
    }
  }

  return (
    <>
      <View style={general.centerView}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
        >
          <TouchableOpacity onPress={pickImage} style={styles.imageTouchable}>
            <Image
              source={
                image ? { uri: image } : require("../../assets/imageholder.png")
              }
              style={{ width: 150, height: 150 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}></View>
        </View>
        <TextInput
          {...textInputColor}
          label="workspace name"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangeName}
        />
        <TextInput
          {...textInputColor}
          label="description"
          mode="outlined"
          style={{ marginBottom: 20, width: "80%", backgroundColor: "white" }}
          multiline={true}
          numberOfLines={8}
          onChangeText={onChangeDescription}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginRight: 40,
          }}
        >
          <Button
            {...cancelButtonColor}
            mode="contained"
            style={{ width: "30" }}
            onPress={() => navigation.goBack()}
            disabled={clicked}
          >
            Cancel
          </Button>
          <Button
            {...buttonColor}
            mode="contained"
            style={{ marginLeft: 20, marginRight: 10, width: "30" }}
            onPress={onPressCreate}
            disabled={clicked}
            loading={clicked}
          >
            Ok
          </Button>
        </View>
      </View>
      <StatusSnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </>
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
    borderRadius: 5,
    borderStyle: "dashed",
  },
  saveImage: { width: "60%", borderRadius: 8 },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.8,
  },
  headerText: { marginBottom: 20, fontSize: 18 },
});
