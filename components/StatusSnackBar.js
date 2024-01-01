import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Portal, Snackbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const colorTheme = {
  backGround: {
		"blank": "transparent",
    "success": "green",
    "failed": "red",
  },
  textColor: {
		"blank": "transparent",
    "success": "white",
    "failed": "white",
  }
}


export default function StatusSnackBar({ snackBar, setSnackBar }) {
  try {
    function RenderIcon() {
      if (snackBar.type == "success")
        return <Icon name="check-circle-outline" size={25} color={colorTheme.textColor[snackBar.type]}></Icon>
      if (snackBar.type == "failed")
        return <Icon name="message-alert-outline" size={25} color={colorTheme.textColor[snackBar.type]}></Icon>
      return <></>
    }
    function closeSnackBar() {
      setSnackBar({isVisible:false, message: "", type: "blank"});
    }
    return (
      <Portal>
        <Snackbar
          style={{ backgroundColor: colorTheme.backGround[snackBar.type] }}
          duration={1500}
          visible={snackBar.isVisible}
          onDismiss={closeSnackBar}
        >
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 8, flexDirection: 'row', alignItems: 'center' }}>
              <RenderIcon />
              <Text style={{ color: colorTheme.textColor[snackBar.type], marginLeft: 10 }}>{snackBar.message}</Text>
            </View>
            <View>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-end', flex: 1, flexDirection: 'row-reverse' }}
              onPress={closeSnackBar}>
              <Icon name="close" size={20} color={colorTheme.textColor[snackBar.type]}></Icon>
            </TouchableOpacity>
          </View>
        </Snackbar>
      </Portal>
    )
  } catch {
    return <></>;

  }
}
