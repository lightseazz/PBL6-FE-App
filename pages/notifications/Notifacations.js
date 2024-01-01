import { View, StyleSheet, ActivityIndicator, Alert, Text } from "react-native";
import Item from "./Item";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import getNotificationApi from "../../api/notification/getNotification.api";
import { useIsFocused } from "@react-navigation/native";
import { Button, Divider } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import deleteNotiApi from "../../api/notification/deleteNoti.api";
import StatusSnackBar from "../../components/StatusSnackBar";
import { successStatusCodes } from "../../utils/common";
const LIMIT = 8;

export default function Notifications({ navigation }) {
  const nextOffset = useRef(LIMIT);
  const isFocus = useIsFocused();
  const [selectedType, setSelectedType] = useState("all");
  const [notis, setNotis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [resetList, setResetList] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });
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
    try {
      const deleteNotis = notis.filter(noti => noti.selected == true).map(noti => noti.id);
      const response = await deleteNotiApi(deleteNotis);
      if (!successStatusCodes.includes(String(response.status))) {
        setSnackBar({ isVisible: true, message: "delete notifcation failed", type: "failed" });
        clearAll();
        return;
      }
      const resetNotis = notis.filter(noti => noti.selected != true);
      setNotis([...resetNotis]);
      setResetList(resetList => !resetList);
      setDeleteMode(false);
      setSnackBar({ isVisible: true, message: "delete notificaiton success", type: "success" });
    } catch {
      setSnackBar({ isVisible: true, message: "delete notifcation failed", type: "failed" });
    }
  }
  function cancelDeleteMode() {
    clearAll();
    setDeleteMode(false);
  }
  return (
    <>
      <View style={styles.container}>
        {deleteMode ? <></> :
          (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Type: </Text>
              <Picker
                style={{ backgroundColor: '#EEEEEE', margin: 10, width: 300 }}
                selectedValue={selectedType}
                onValueChange={onChangeType}>
                <Picker.Item label="all" value="all" />
                <Picker.Item label="general" value="general" />
                <Picker.Item label="message" value="message" />
                <Picker.Item label="workspace" value="workspace" />
                <Picker.Item label="channel" value="channel" />
              </Picker>
            </View>
          )}

        {deleteMode ? (
          <View style={{ flexDirection: 'row-reverse', marginBottom: 10 }}>
            <Button mode="contained" onPress={clearAll}
              style={{ backgroundColor: 'black', marginLeft: 10 }} >Clear all</Button>
            <Button mode="contained" onPress={selectAll} style={{ backgroundColor: 'black' }} >Select all</Button>
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
        {deleteMode ? <></> :
          (
            <Button
              mode="contained"
              style={{ width: 150, alignSelf: 'center', backgroundColor: 'black' }}
              onPress={loadMore}
            >Load More</Button>
          )}
        {deleteMode ? (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
              <Button mode="contained" textColor="white" onPress={deleteNotis} style={styles.deleteButton}>delete</Button>
              <Button mode="contained" onPress={cancelDeleteMode} style={styles.cancelButton} >cancel</Button>
            </View>
          </>
        ) : <></>}
      </View>
      <StatusSnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "white",
  },
  deleteButton: {
    width: 100,
    backgroundColor: 'red',
  },
  cancelButton: {
    backgroundColor: 'black',
    width: 100,
  }
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
