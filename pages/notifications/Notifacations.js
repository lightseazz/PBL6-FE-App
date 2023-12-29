import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import Item from "./Item";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import getNotificationApi from "../../api/notification/getNotification.api";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import deleteNotiApi from "../../api/notification/deleteNoti.api";
const LIMIT = 8;

export default function Notifications({ navigation }) {
  const nextOffset = useRef(LIMIT);
  const isFocus = useIsFocused();
  const [selectedType, setSelectedType] = useState("all");
  const [notis, setNotis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [resetList, setResetList] = useState(false);
  const listNotis = useRef();
  useEffect(function () {
    async function initNotifications() {
      onChangeType("all");
    }
    if (isFocus)
      initNotifications();
  }, [isFocus])
  async function loadMore() {
    setIsLoading(true);
    const response = await getNotisByType(nextOffset.current, LIMIT, selectedType);
    if (response.length == 0) {
			setIsLoading(false);
			return;
		};
    let moreNotis = notis.concat(response);
    setNotis([...moreNotis]);
    listNotis.current.scrollToEnd({ animated: true });
    setIsLoading(false);
    nextOffset.current += LIMIT;
  }
  async function onChangeType(type) {
    setSelectedType(type);
    const notis = await getNotisByType(0, LIMIT, type);
    nextOffset.current = LIMIT;
    setNotis([...notis]);
  }
  function clearAll() {
    notis.forEach(noti => noti.selected = false);
    setNotis([...notis]);
    setResetList((resetList) => !resetList);
  }
  function selectAll() {
    notis.forEach(noti => noti.selected = true);
    setNotis([...notis]);
    setResetList((resetList) => !resetList);
  }
  async function deleteNotis() {
    const deleteNotis = notis.filter(noti => noti.selected == true).map(noti => noti.id);
    const response = await deleteNotiApi(deleteNotis);
    if (response.status != 204) {
      Alert.alert("delete failed");
      clearAll();
      return;
    }
    const resetNotis = notis.filter(noti => noti.selected != true);
    setNotis([...resetNotis]);
    setResetList(resetList => !resetList);
    setDeleteMode(false);
  }
  function cancelDeleteMode() {
    clearAll();
    setDeleteMode(false);
  }
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedType}
        onValueChange={onChangeType}>
        <Picker.Item label="all" value="all" />
        <Picker.Item label="general" value="general" />
        <Picker.Item label="message" value="message" />
        <Picker.Item label="workspace" value="workspace" />
        <Picker.Item label="channel" value="channel" />
      </Picker>

      {deleteMode ? (
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
          <Button textColor="red" onPress={deleteNotis}>delete</Button>
          <Button textColor="blue" onPress={cancelDeleteMode} >cancel</Button>
          <Button textColor="black" onPress={clearAll} >Clear all</Button>
          <Button textColor="black" onPress={selectAll} >Select all</Button>
        </View>
      ) : <></>}

      <FlashList
        ref={listNotis}
        estimatedItemSize={50}
        data={notis}
        extraData={[deleteMode, resetList]}
        renderItem={({ item, index }) => (
          <Item
            navigation={navigation}
            notis={notis}
            setNotis={setNotis}
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
            id={item.id}
            title={item.title}
            content={item.content}
            createdAt={item.createdAt}
            isRead={item.isRead}
            type={item.type}
            data={item.data}
            index={index}
          />
        )}
      />
      {isLoading ? <ActivityIndicator size={25} color="black" /> : <></>}
      <Button
        mode="outlined"
        textColor="black"
        style={{ width: 150, alignSelf: 'center' }}
        onPress={loadMore}
      >Load More</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "white",
  },
});

async function getNotisByType(offset, limit, label) {
  if (label == "all") return await getNotificationApi(offset, limit);
  if (label == "general") return await getNotificationApi(offset, limit, 1);
  if (label == "message") return await getNotificationApi(offset, limit, 2);
  if (label == "workspace") {
    const invitation = await getNotificationApi(offset, limit, 6);
    const removed = await getNotificationApi(offset, limit, 7);
    return invitation.concat(removed);
  }
  if (label == "channel") {
    const invitation = await getNotificationApi(offset, limit, 4);
    const removed = await getNotificationApi(offset, limit, 5);
    return invitation.concat(removed);
  }
}
