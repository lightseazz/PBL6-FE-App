import { Modal, ScrollView } from "react-native";
import { Text, View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const emojis = [];
for (i = 128512; i <= 128567; i++) {
  emojis.push({
    key: i,
    code: i,
  });
}

const emojiRenders = emojis.map((emoji) => (
  <TouchableOpacity key={emoji.key} style={{ margin: 5 }}>
    <Text style={{ fontSize: 25 }}>{String.fromCodePoint(emoji.code)}</Text>
  </TouchableOpacity>
));

export default function EmojiModal({ modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible["emoji"]}
      onRequestClose={() =>
        setModalVisible({
          message: false,
          emoji: false,
        })
      }
    >
      <View style={styles.bottomedView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() =>
              setModalVisible({
                message: false,
                emoji: false,
              })
            }
          >
            <Icon size={30} name="minus-thick" style={styles.close} />
          </Pressable>
          <View style={styles.emojiContainer}>{emojiRenders}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomedView: {
    flexDirection: "column-reverse",
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 350,
  },
  emojiContainer: {
    marginLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: { marginRight: 20 },
  close: {
    alignSelf: "center",
  },
});
