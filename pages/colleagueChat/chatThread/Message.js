import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-paper";
import { SvgUri } from "react-native-svg";
import RenderHtml from "react-native-render-html";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from 'expo-linking';
import * as linkify from 'linkifyjs';
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { getShortDatetimeSendAt } from "../../../utils/common";

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
    const fileStyles = StyleSheet.create({
      container: {
        flexDirection: 'row', borderWidth: 0.5,
        borderRadius: 10, padding: 10,
        marginBottom: 10,
        alignItems: 'center',
      }
    })

    if (!files || files.length <= 0) return;
    return (
      <>
        {
          files.map((file, index) => {
            const typeFile = file.name.split(".")[1]
              ? file.name.split(".").pop().slice(0, 3).toUpperCase()
              : "";
            if (typeFile == "IMG" || typeFile == "PNG" || typeFile == "JPE" || typeFile == "JPG") {
              return (
                <TouchableOpacity key={index} onPress={() => openLink(file.url)} style={{ marginBottom: 10 }}>
                  <Image source={{ uri: file.url }} style={{ width: 150, height: 150 }} />
                </TouchableOpacity>
              )
            }
            if (typeFile == "DOC") {
              return (
                <TouchableOpacity
                  key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.doc} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )
            }
            if (typeFile == "XLS") {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.xls} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (typeFile == "PDF") {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.pdf} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (typeFile == "ZIP" || typeFile == "RAR") {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.zip} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (file.url) {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
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
  // preview links
  let detechLinks = []
  try {
    detechLinks = linkify.find(content);
  } catch {
    detechLinks = [];
  }
  function RenderPreview() {
    if (!detechLinks || detechLinks.length <= 0) return <></>;
    return (
      <>
        {detechLinks.map((link, index) => {
          return (
            <LinkPreview
              key={index}
              containerStyle={{ backgroundColor: '#EAEAEA', borderRadius: 10, margin: 5 }}
              text={link.href}
              renderText={() => (<Text>{link.value}</Text>)}
            />
          )
        })}
      </>
    )
  }

  const RenderMessage = () => (
    <TouchableOpacity
      style={styles.messageContainer}
      delayLongPress={200}
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
          marginBottom: 10,
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
          <Text style={styles.timeText}>{getShortDatetimeSendAt(sendAt)}</Text>
        </View>
        {isPined ? (<Icon name="pin" size={18}
          color={"#A79E00"} style={{ marginLeft: 10, transform: [{ rotateZ: '30deg' }] }}
        />
        ) : <></>}
      </View>
      <RenderHtml contentWidth={width} source={{ html: content ? content : <p></p> }} />
      <RenderFiles />
      <RenderPreview />
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
            <Image source={require('../../../assets/addemoji.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
        <RenderEmoji />
      </View>
    </TouchableOpacity>
  )
  if (isParent)
    return (
      <>
        {state == "deleted" ? (
          <View style={styles.containerDelete}>
            <Text style={styles.deleteMessage}>Message is Deleted</Text>
          </View>) : (
          <ScrollView style={styles.container}>
            <RenderMessage />
          </ScrollView>
        )}
      </>
    );
  return (
    <>
      {state == "deleted" ? (
        <View style={styles.containerDelete}>
          <Text style={styles.deleteMessage}>Message is Deleted</Text>
        </View>) : (
        <RenderMessage />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
  messageContainer: {
    padding: 25,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: '100%',
  },
  containerDelete: {
    padding: 13,
    height: 50,
  },
  emojiContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emoji: {
    alignSelf: "flex-start",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 3,
    backgroundColor: "#E3E5E7",
  },
  usernameText: { marginLeft: 20, fontWeight: "bold", fontSize: 15 },
  deleteMessage: { fontStyle: "italic" },
  isSending: { marginLeft: 20, fontSize: 15 },
  timeText: { marginLeft: 20, fontSize: 12 },
});
