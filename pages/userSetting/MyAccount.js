import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Divider, TextInput } from "react-native-paper";
import { buttonColor } from "../../styles/colorScheme";

export default function MyAccount() {
  const [image, setImage] = useState(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Change image profile</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={pickImage} style={styles.imageTouchable}>
          <Image
            source={
              image ? { uri: image } : require("../../assets/imageholder.png")
            }
            style={{ width: 150, height: 150 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <Button
            {...buttonColor}
            disabled={image ? false : true}
            mode="elevated"
            onPress={() => Alert.alert("test")}
            style={styles.saveImage}
          >
            Save
          </Button>
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.headerText}>Email</Text>
      <Text>
        Your email address is{" "}
        <Text style={{ fontWeight: "bold" }}>haidangltv@gmail.com</Text>
      </Text>
      <TextInput
        secureTextEntry
        label="Curent Password"
        mode="outlined"
        style={styles.textInput}
      />
      <TextInput label="New Email" mode="outlined" style={styles.textInput} />
      <Button
        disabled
        mode="elevated"
        style={styles.saveImage}
        {...buttonColor}
      >
        Change Email
      </Button>
      <Divider style={styles.divider} />
      <Text style={styles.headerText}>Username</Text>
      <Text>
        Your username is <Text style={{ fontWeight: "bold" }}>haidangltv</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: "white",
  },
  imageTouchable: {
    alignSelf: "flex-start",
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    borderStyle: "dashed",
  },
  saveImage: { width: "60%", borderRadius: 8 },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.8,
  },
  headerText: { marginBottom: 20, fontSize: 18, marginTop: 20 },
  textInput: {
    backgroundColor: "white",
    marginBottom: 20,
  },
});
