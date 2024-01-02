import React, { useEffect, useState } from "react";
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
import { Button, Divider, RadioButton, TextInput } from "react-native-paper";
import { buttonColor } from "../../styles/colorScheme";
import * as SecureStore from "expo-secure-store"
import getUserByIdApi from "../../api/userApi/getUserById.api";
import updateUserAvatarApi from "../../api/userApi/updateUserAvatar.api";
import StatusSnackBar from "../../components/StatusSnackBar";
import updateUserInformApi from "../../api/userApi/updateUserInform.api";
import { setGlobalUser } from "../../globalVar/global";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getShortDate } from "../../utils/common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function MyAccount() {
  const [image, setImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingInform, setIsLoadingInform] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(false);
  const [birthDay, setBirthDay] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

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
        setfirstName(response.firstName);
        setLastName(response.lastName);
        setGender(response.gender);
        setBirthDay(response.birthDay);
      }
      getUserInformation();
    } catch { }
  }, [])
  const onChangeBirthDay = (event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate;
      setBirthDay(currentDate);
      setShowDatePicker(false);
    }
    else {
      setShowDatePicker(false);

    }
  };
  async function onPressUpdateImage() {
    try {
      setIsLoadingImage(true);
      const response = await updateUserAvatarApi(userId, image);
      if (response.status != 200) {
        setSnackBar({ isVisible: true, message: "failed update image", type: "failed" })
        setIsLoadingImage(false);
        return;
      }
      setIsLoadingImage(false);
      setSnackBar({ isVisible: true, message: "Success update image", type: "success" })
      setGlobalUser();
    } catch {
      setIsLoadingImage(false);
    }
  }
  async function saveInformation() {
    try {
      setIsLoadingInform(true);
      const response = await updateUserInformApi(userId, firstName, lastName,
        gender, phone, email, new Date(birthDay).toISOString());
      if (response.status != 200) {
        setSnackBar({ isVisible: true, message: "failed update user information", type: "failed" })
        setIsLoadingInform(false);
        return;
      }
      setIsLoadingInform(false);
      setSnackBar({ isVisible: true, message: "Success update user information", type: "success" })
      setGlobalUser();
    } catch {
      setSnackBar({ isVisible: true, message: "failed update user information", type: "failed" })
      setIsLoadingInform(false);
    }
  }
  return (
    <>
      <ScrollView style={styles.container}>
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
              loading={isLoadingImage}
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
        <Text style={styles.headerText}>FirstName</Text>
        <TextInput style={{ backgroundColor: 'white' }} value={firstName} onChangeText={setfirstName} />
        <Text style={styles.headerText}>LastName</Text>
        <TextInput style={{ backgroundColor: 'white' }} value={lastName} onChangeText={setLastName} />
        <Text style={styles.headerText}>Phone</Text>
        <TextInput style={{ backgroundColor: 'white' }} value={phone} onChangeText={setPhone} />
        <Text style={styles.headerText}>Birth day</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput disabled style={{ backgroundColor: 'white', width: '40%' }} value={getShortDate(birthDay)} />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              backgroundColor: '#F6F6F6', borderWidth: 1,
              borderRadius: 20, padding: 5, marginLeft: 20
            }}>
            <Icon name="calendar" size={23}></Icon>
          </TouchableOpacity>
        </View>
        {showDatePicker ? (
          <DateTimePicker
            onTouchCancel={() => setShowDatePicker(false)}
            testID="dateTimePicker"
            value={birthDay ? new Date(birthDay) : new Date()}
            mode="date"
            is24Hour={true}
            onChange={onChangeBirthDay}
          />

        ) : <></>}
        <Text style={styles.headerText}>Gender</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Male</Text>
            <RadioButton
              color="black"
              label="male"
              status={gender === false ? 'checked' : 'unchecked'}
              onPress={() => setGender(false)}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }} >
            <Text>Female</Text>
            <RadioButton
              color="black"
              value="female"
              status={gender === true ? 'checked' : 'unchecked'}
              onPress={() => setGender(true)}
            />
          </View>
        </View>
        <Button
          loading={isLoadingInform}
          {...buttonColor}
          style={{ width: '30%', margin: 10 }}
          onPress={saveInformation}>Save</Button>
      </ScrollView>
      <StatusSnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </>
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
