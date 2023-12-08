import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Divider, TextInput } from "react-native-paper";
import { buttonColor } from "../../styles/colorScheme";
import * as SecureStore from "expo-secure-store"
import getUserByIdApi from "../../api/userApi/getUserById.api";
import updateUserAvatarApi from "../../api/userApi/updateUserAvatar.api";

export default function MyAccount() {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  useEffect(function () {
    try {
      async function getUserInformation() {
        const userId = await SecureStore.getItemAsync("userId");
        const response = await getUserByIdApi(userId);
				setUserId(userId);
        setImage(response.picture);
        setUsername(response.username);
        setEmail(response.email); 
        setPhone(response.phone);
      }
    } catch { }
    getUserInformation();
  }, [])
  async function onPressUpdateImage() {
    try {
      const response = await updateUserAvatarApi(userId, image);
			if(response.status != 200){
				Alert.alert("update image failed");
				return;
			}
				Alert.alert("update image success");
    } catch { }
  }
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
            onPress={onPressUpdateImage}
            style={styles.saveImage}
          >
            Update
          </Button>
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.headerText}>Email</Text>
      <Text>
        Your email address is
        <Text style={{ fontWeight: "bold" }}> {email}</Text>
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.headerText}>Username</Text>
      <Text>
        Your username is <Text style={{ fontWeight: "bold" }}>{username}</Text>
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
