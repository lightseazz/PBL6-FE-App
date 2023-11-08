import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Divider, TextInput } from "react-native-paper";

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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Set Image</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
            <Button
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
        <Text style={styles.headerText}>Password</Text>
        <TextInput
          secureTextEntry
          label="Curent Password"
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <TextInput
          secureTextEntry
          label="New Password"
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <Button disabled mode="elevated" style={styles.saveImage}>
          Update Password
        </Button>
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
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="New Email"
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <Button disabled mode="elevated" style={styles.saveImage}>
          Change Email
        </Button>
        <Divider style={styles.divider} />
        <Text style={styles.headerText}>Username</Text>
        <Text>
          Your username is{" "}
          <Text style={{ fontWeight: "bold" }}>haidangltv</Text>
        </Text>
      </View>
    </ScrollView>
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
    alignSelf: "flex-start",
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
