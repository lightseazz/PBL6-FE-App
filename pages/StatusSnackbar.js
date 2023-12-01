import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

export default function StatusSnackBar() {
  const [visible, setVisible] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar
        duration={10000000000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "hide",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        <Text style={styles.message}>Successful message created.</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "relative",
  },
  message: {
    color: "white",
  },
});
