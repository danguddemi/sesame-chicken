import React, {memo, useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import {logoutUser} from '../api/auth-api';
import BackButton from "../components/BackButton";
import firebase from "firebase/app";
import "firebase/auth";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {Title} from "react-native-paper";
import {theme} from "../core/theme";
import RangeSlider from "rn-range-slider";

const Settings = ({navigation}) => {
    const user = firebase.auth().currentUser;
    const [priceRange, setPriceRange] = useState({low: 1, high: 3});
    const userData = firebase.firestore().collection('users').doc(user.uid);

    useEffect(() => {
        if (user !== null) {
            userData.get().then(
                doc => doc.exists ?
                    setPriceRange(doc.get('priceRange')) :
                    setPriceRange({low: 1, high: 3}))
                .catch(err => {
                    console.error(err);
                    setPriceRange({low: 1, high: 3})
                })
        }
    }, [user]);


    return (
        <Background>
            <BackButton goBack={() => navigation.navigate("Dashboard")}/>
            <Title style={styles.header}>Profile Settings</Title>
            <Title>Price Range</Title>
            <RangeSlider
                min={1} max={3} step={1}
                onValueChanged={(low, high) => setPriceRange({low: low, high: high})}
            />


            <Button mode="outlined" onPress={() => logoutUser()}>
                Logout
            </Button>
        </Background>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        color: theme.colors.primary,
        fontWeight: "bold",
        paddingVertical: 14,
        position: 'absolute',
        top: getStatusBarHeight()
    }
});

export default memo(Settings);
