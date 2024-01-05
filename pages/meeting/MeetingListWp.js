import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { general } from "../../styles/styles";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import getAllMeetingWpApi from "../../api/meetingApi/getAllMeetingWp.api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { MEETING_COLOR, MEETING_STATUS, getShortDatetime } from "../../utils/common";
import { buttonColor } from "../../styles/colorScheme";
import * as Linking from 'expo-linking';

export default function MeetingListWp({ navigation, route }) {
  const { workspaceId } = route.params;
  const [meetingList, setMeetingList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(
    function () {
      if (isFocused) {
        async function renderWorkspaceList() {
          const response = await getAllMeetingWpApi(workspaceId);
          setMeetingList(
            response.map((meeting) => ({ id: meeting.id, meeting: meeting }))
          );
        }
        try {
          renderWorkspaceList();
        } catch {

        }
      }
    },
    [isFocused]
  );
  return (
    <>
      <View style={general.containerWithOutStatusBar}>
        <FlatList
          data={meetingList}
          renderItem={({ item }) => (
            <MeetingCard
              id={item.id}
              meeting={item.meeting}
              workspaceId={workspaceId}
              navigation={navigation}
              setMeetingList={setMeetingList}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}


function MeetingCard({ id, navigation, meeting, workspaceId, setMeetingList }) {
  function joinMeeting() {
    try {
      let link = "https://web.firar.live/Workspace/" + workspaceId + "/Meeting/";
      link = link + meeting.id + "/room";
      Linking.openURL(link);
    } catch {

    }
  }

  function editMeeting() {
    navigation.navigate("UpdateMeeting", {
      workspaceId: workspaceId,
      meeting: meeting,
    });

  }

  return (
    <View
      style={{
        marginBottom: 30,
        borderWidth: 1.5,
        borderRadius: 10,
        padding: 20,
      }}
    >
      <View style={{
        marginLeft: 20, marginBottom: 10,
        padding: 10, backgroundColor: MEETING_COLOR[meeting.status], paddingTop: 5, paddingBottom: 5,
        alignSelf: 'flex-start', borderRadius: 20
      }}>
        <Text style={{ color: 'white' }}>{MEETING_STATUS[meeting.status]} </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Icon name="video-outline" size={30} />
        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>{meeting.name}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Channel     : </Text>
        <Text style={{ marginLeft: 10, fontSize: 15 }}>{meeting.channelName}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Time Start : </Text>
        <Text style={{ marginLeft: 10, fontSize: 15 }}>{getShortDatetime(meeting.timeStart)}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Time End   : </Text>
        <Text style={{ marginLeft: 10, fontSize: 15 }}>{getShortDatetime(meeting.timeEnd)}</Text>
      </View>
      <View style={{ flexDirection: 'row-reverse' }}>
        {meeting.status == 0 || meeting.status == 1 ? (
          <Button {...buttonColor} onPress={joinMeeting}>Join</Button>
        ) : <></>}
        <Button textColor="black" onPress={editMeeting}>Edit</Button>
      </View>
    </View>
  );
}
