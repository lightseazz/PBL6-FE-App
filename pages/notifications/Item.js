import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Avatar, Checkbox } from "react-native-paper";
import putReadNotiApi from "../../api/notification/putReadNoti.api";
import { useEffect, useState } from "react";
import { getShortDatetimeSendAt } from "../../utils/common";

const icon = "https://cdn-icons-png.flaticon.com/512/3119/3119338.png"

export default function Item({
  navigation,
  id,
  title,
  content,
  createdAt,
  isRead,
  type,
  data,
  notis,
  setNotis,
  isSelected,
  deleteMode,
  setDeleteMode,
  index,
}) {
  // const [checked, setChecked] = useState(notis[index].selected == true ? true : false);
  const checked = notis[index].selected == true ? true : false;
  function onPressNoti() {
    if (deleteMode == false) navigateToDetail();
  }
  async function navigateToDetail() {
    navigation.navigate("ItemDetail", {
      id,
      title,
      content,
      createdAt,
      isRead,
      type,
      data,
    })
    if (isRead == false) {
      const response = await putReadNotiApi(id);
      if (type == 2) {
        setNotis(notis => {
          const index = notis.findIndex(noti => noti.id == id);
          const newNotis = notis.splice(index, 1);
          return [...notis];
        });
        return;
      }
      setNotis(notis => {
        const justReadNoti = notis.find(noti => noti.id == id);
        justReadNoti.isRead = true;
        return [...notis];
      })
    }
  }
  function turnOnDeleteMode() {
    setDeleteMode(true);
  }
  function togleCheck() {
    notis[index].selected = getTogleCheck(checked);
    // setChecked(getTogleCheck(checked));
    setNotis([...notis]);
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressNoti}
      onLongPress={turnOnDeleteMode}
      delayLongPress={50}
    >
      <View style={styles.secondContainer}>
        <Avatar.Image
          style={{ borderRadius: 10, backgroundColor: 'white', alignSelf: 'center' }}
          size={30}
          source={{
            uri: icon,
          }}
        />
        <View style={{ width: 300 }}>
          <View style={styles.leftContainer}>
            <Text style={{ color: '#1a69a6', fontWeight: isRead ? "normal" : "bold", fontSize: 15 }}>{title}</Text>
            <View style={styles.timeContainer}>
              <Text style={{ fontWeight: isRead ? "normal" : "bold", fontStyle: 'italic', fontSize: 12 }}
              >{getShortDatetimeSendAt(createdAt)}</Text>
            </View>
            <Text style={{ fontWeight: isRead ? "normal" : "bold", marginTop: 10 }}>{content}</Text>
          </View>
        </View>
        {deleteMode ?
          <Checkbox
            status={checked == true ? 'checked' : 'unchecked'}
            onPress={togleCheck}
          />
          : <></>}
      </View>
    </TouchableOpacity >
  );
}

function getTogleCheck(check) {
  if (check) {
    return false;
  }
  return true;
}
const styles = StyleSheet.create({
  container: {
		padding: 10,
		marginBottom: 10,
		borderRadius: 10,
		backgroundColor: '#F6F6F6',
  },
  secondContainer: {
    flexDirection: "row",
    width: "100%",
  },
  timeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  leftContainer: {
    marginLeft: 10,
  },
});
