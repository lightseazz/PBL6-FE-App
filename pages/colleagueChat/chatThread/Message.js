import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar } from "react-native-paper";
import { SvgUri } from "react-native-svg";
import RenderHtml from "react-native-render-html";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from 'expo-linking';

export default function Message({
  state,
  reactionCount,
  parentState,
  isPined,
  isParent,
  setIsSelectParentMessage,
  setModalId,
  id,
  setModalVisible,
  content,
  senderId,
  selectedUserRef,
  senderAvatar,
  senderName,
  sendAt,
  files,
}) {
  const { width } = useWindowDimensions();
  let time = (new Date(sendAt)).toLocaleString();
  function RenderEmoji() {
    if (!reactionCount) return <></>;
    const emojis = Object.entries(reactionCount);
    return (
      <>
        {emojis.map((emoji, index) => {
          return (
            <View key={index} style={styles.emoji}>
              <Text>{emoji[0]} {emoji[1]}  </Text>
            </View>
          )
        })}
      </>
    )
  }

  function RenderFiles() {
    const openLink = (url) => {
      Linking.openURL(url);
    }
    const iconUri = {
      doc: "https://chat.zalo.me/assets/icon-word.d7db8ecee5824ba530a5b74c5dd69110.svg",
      pdf: "https://chat.zalo.me/assets/icon-pdf.53e522c77f7bb0de2eb682fe4a39acc3.svg",
      xls: "https://chat.zalo.me/assets/icon-excel.fe93010062660a8332b5f5c7bb2a43b1.svg",
      zip: "https://chat.zalo.me/assets/icon-zip.e1e9b9936e66e90d774fcb804f39167f.svg",
      default: "https://chat.zalo.me/assets/icon-file-empty.6796cfae2f36f6d44242f7af6104f2bb.svg",
    }
    if (!files || files.length <= 0) return;
    return (
      <>
        {
          files.map((file, index) => {
            const typeFile = file.name.split(".")[1]
              ? file.name.split(".").pop().slice(0, 3).toUpperCase()
              : "";
            console.log(typeFile);
            if (typeFile == "IMG" || typeFile == "PNG" || typeFile == "JPE" || typeFile == "JPG") {
              return (
                <TouchableOpacity key={index} onPress={() => openLink(file.url)}
                >
                  <Image source={{ uri: file.url }} style={{ width: 150, height: 150 }} />
                </TouchableOpacity>
              )
            }
            if (typeFile == "DOC") {
              return (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', backgroundColor: "#E3E5E7", padding: 10 }}
                  onPress={() => openLink(file.url)}
									>
                  <SvgUri uri={iconUri.doc} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )
            }
            if (typeFile == "XLS") {
              return (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', backgroundColor: "#E3E5E7", padding: 10 }}
                  onPress={() => openLink(file.url)}
									>
                  <SvgUri uri={iconUri.xls} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (typeFile == "PDF") {
              return (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', backgroundColor: "#E3E5E7", padding: 10 }}
                  onPress={() => openLink(file.url)}
									>
                  <SvgUri uri={iconUri.pdf} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (typeFile == "ZIP" || typeFile == "RAR") {
              return (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', backgroundColor: "#E3E5E7", padding: 10 }}
                  onPress={() => openLink(file.url)}
									>
                  <SvgUri uri={iconUri.zip} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (!file.url) {
              return (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', backgroundColor: "#E3E5E7", padding: 10 }}
                  onPress={() => openLink(file.url)}
									>
                  <SvgUri uri={iconUri.default} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )
            }
          })
        }
      </>
    )

  }
  return (
    <>
      {state == "deleted" ? (
        <View style={styles.containerDelete}>
          <Text style={styles.deleteMessage}>Message is Deleted</Text>
        </View>) : (
        <TouchableOpacity
          style={styles.messageContainer}
          delayLongPress={50}
          onLongPress={() => {
            if (isParent) setIsSelectParentMessage(true)
            else setIsSelectParentMessage(false)
            selectedUserRef.current = senderId;
            setModalId(id);
            setModalVisible({
              message: true,
              emoji: false,
            })
          }
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={40}
              source={{
                uri: senderAvatar,
              }}
            />
            <View>
              {state != "" && state != "deleted" ? <Text style={styles.isSending}>{state}</Text> : <></>}
              <Text style={styles.usernameText}>{senderName}</Text>
              <Text style={styles.timeText}>{time}</Text>
            </View>
            {isPined ? (<Icon name="pin" size={20} color={"red"} style={{ marginLeft: 10 }} />
            ) : <></>}
          </View>
          <RenderHtml contentWidth={width} source={{ html: content }} />
          <RenderFiles />
          <View style={styles.emojiContainer}>
            <View style={styles.emoji}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  if (isParent) setIsSelectParentMessage(true)
                  else setIsSelectParentMessage(false)
                  selectedUserRef.current = senderId;
                  setModalId(id);
                  setModalVisible({
                    message: false,
                    emoji: true,
                  })
                }
                }
              >
                <Icon name="emoticon-outline" size={21} />
                <Icon name="plus" size={17} />
              </TouchableOpacity>
            </View>
            <RenderEmoji />
          </View>
        </TouchableOpacity>
      )}
    </>

  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 13,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
  containerDelete: {
    padding: 13,
    height: 50,
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emoji: {
    alignSelf: "flex-start",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    padding: 3,
    backgroundColor: "#d3e6e8",
  },
  usernameText: { marginLeft: 20, fontWeight: "bold", fontSize: 15 },
  deleteMessage: { fontStyle: "italic" },
  isSending: { marginLeft: 20, fontSize: 15 },
  timeText: { marginLeft: 20, fontSize: 12 },
});
