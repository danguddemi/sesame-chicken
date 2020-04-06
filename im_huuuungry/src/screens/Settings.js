import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import { logoutUser } from '../api/auth-api';
import BackButton from "../components/BackButton";
import firebase from "firebase/app";
import "firebase/auth";
import {Title, Switch} from "react-native-paper";

const Settings = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        setUser(firebase.auth().currentUser);
    }, []);


    return (<Background>
        <BackButton goBack={() => navigation.navigate("Dashboard")} />
        <Header>Profile Settings</Header>
        <Title>{user ? user.displayName : "Loading"}</Title>
        <Switch value={darkTheme} onValueChange={() => setDarkTheme(!darkTheme)}/>


        <Button mode="outlined" onPress={() => logoutUser()}>
            Logout
        </Button>
    </Background>);
};

export default memo(Settings);
