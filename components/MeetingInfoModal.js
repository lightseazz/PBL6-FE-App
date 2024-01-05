import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { getShortDatetime } from "../utils/common";

export default function MeetingInfoModal({ data, navigation, setIsMeetingInfoVisible, isMeetingInfoVisible }) {
  try {
    const [name, setName] = useState("");
    const [sessionId, setSessionId] = useState();
    const [password, setPassword] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [description, setDescription] = useState("");
    useEffect(function () {
      async function getInitInforms() {
        try {
          if (!isMeetingInfoVisible) return;
          setName(data.name);
          setSessionId(data.sessionId);
          setPassword(data.password);
          setTimeStart(data.timeStart);
          setTimeEnd(data.timeEnd);
          setDescription(data.description);
        } catch {

        }
      }
      getInitInforms();
    }, [isMeetingInfoVisible])

    return (
      <Modal
        onBackdropPress={() => setIsMeetingInfoVisible(false)}
        backdropColor="black"
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        transparent={true}
        isVisible={isMeetingInfoVisible}
        onRequestClose={() => () => setIsMeetingInfoVisible(false)}
      >
        <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ backgroundColor: 'green', borderWidth: 0.4, borderRadius: 10, padding: 5 }}>
              <Icon name="video-outline" size={40} color="white" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
          </View>
          <View style={{ paddingTop: 10, borderTopWidth: 0.4, marginTop: 10 }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text>SessionId: </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text>{sessionId}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>Password: </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text>{password}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>TimeStart: </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text>{getShortDatetime(timeStart)}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>TimeEnd: </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text>{getShortDatetime(timeEnd)}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>Description: </Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text>{description}</Text>
            </View>
          </View>
        </View>
      </Modal >

    )
  } catch (error) {
    console.log(error);
    return <></>

  }

}
