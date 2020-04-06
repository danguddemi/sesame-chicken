import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { IconButton } from "react-native-paper";
import {theme} from "../core/theme";

const FilledBackButton = ({ goBack }) => (
    <IconButton onPress={goBack} style={styles.container} icon={require("../assets/arrow_back.png")}/>
);

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 10 + getStatusBarHeight(),
        left: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.primary
    }
});

export default memo(FilledBackButton);
