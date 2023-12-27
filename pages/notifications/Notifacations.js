import { View, StyleSheet, ActivityIndicator } from "react-native";
import Item from "./Item";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import getNotificationApi from "../../api/notification/getNotification.api";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

export default function Notifications({ navigation }) {
  const countOffset = useRef(11);
  const [selectedType, setSelectedType] = useState();
  const isFocus = useIsFocused();
  const [notis, setNotis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listNotis = useRef();
  useEffect(function () {
    async function initNotifications() {
      const response = await getNotificationApi(0, 10);
			countOffset.current = 11;
      if (!response || response.length <= 0) return;
      setNotis([...response]);
    }
    initNotifications();
  }, [isFocus])
  async function loadMore() {
    setIsLoading(true);
    const response = await getNotificationApi(countOffset.current, 10);
    let moreNotis = notis.concat(response);
    setNotis([...moreNotis]);
    listNotis.current.scrollToEnd({animated: true});
    setIsLoading(false);
    countOffset.current += 10;
  }

  async function onChangeType(type) {
    setSelectedType(type);
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
      <FlashList
        ref={listNotis}
        estimatedItemSize={50}
        data={notis}
        renderItem={({ item }) => (
          <Item
            navigation={navigation}
            id={item.id}
            title={item.title}
            content={item.content}
            createAt={item.createAt}
            isRead={item.isRead}
            type={item.type}
            data={item.data}
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
