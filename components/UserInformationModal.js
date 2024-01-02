import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import getUserByIdApi from "../api/userApi/getUserById.api";
import { Avatar } from "react-native-paper";
import { getShortDatetimeSendAt } from "../utils/common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function UserInformationModal({ isUserModalVisible, setIsUserModalVisible,
  userId, isChannel, navigation }) {
  try {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState();
    const [email, setEmail] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState(false);
    useEffect(function () {
      async function getInitInforms() {
        if (!isUserModalVisible) return;
        const response = await getUserByIdApi(userId);
        setName((response.firstName || "") + " " + (response.lastName || ""));
        setPicture(response.picture);
        setEmail(response.email);
        setBirthDay(response.birthDay);
        setPhone(response.phone);
        setGender(response.gender);
      }
      getInitInforms();

    }, [isUserModalVisible, userId])

    function messageTo() {
			setIsUserModalVisible(false);
      navigation.navigate("ChatColleague", {
        colleagueId: userId
      })
    }
    return (
      <Modal
        onBackdropPress={() => setIsUserModalVisible(false)}
        backdropColor="black"
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        transparent={true}
        isVisible={isUserModalVisible}
        onRequestClose={() => () => setIsUserModalVisible(false)}
      >
        <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Avatar.Image
              size={60}
              source={{
                uri: picture,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
          </View>
          <View style={{ paddingTop: 10, borderTopWidth: 0.4, marginTop: 10 }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text>Emall: </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text>{email}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>Phone: </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text>{phone}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>Birth Day: </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text>{getShortDatetimeSendAt(birthDay)}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>Gender: </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text>{gender ? "male" : "female"}</Text>
              </View>
            </View>
          </View>
          {isChannel ? (
            <TouchableOpacity
							onPress={messageTo}
              style={{
                flexDirection: "row",
                alignSelf: 'center', alignItems: 'center',
                borderWidth: 0.4, padding: 10, borderRadius: 10,
              }}>
              <Icon name="chat-outline" size={30} />
              <Text style={{ marginLeft: 5 }}>Message</Text>
            </TouchableOpacity>

          ) : <></>}
        </View>
      </Modal >

    )
  } catch {
    return <></>

  }

}
