import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { IconButton } from "react-native-paper";

const BackButton = ({ goBack }) => (
  <IconButton onPress={goBack} style={styles.container} icon={require("../assets/arrow_back.png")}/>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 10
  }
});

export default memo(BackButton);
