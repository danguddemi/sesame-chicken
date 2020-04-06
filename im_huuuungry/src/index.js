import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    AuthLoadingScreen,
    Dashboard,
    SettingScreen,
    RestaurantScreen
} from "./screens";

const Router = createStackNavigator(
    {
        HomeScreen,
        LoginScreen,
        RegisterScreen,
        ForgotPasswordScreen,
        Dashboard,
        AuthLoadingScreen,
        SettingScreen,
        RestaurantScreen
    },
    {
        initialRouteName: "AuthLoadingScreen",
        headerMode: "none"
    }
);

const AppContainer = createAppContainer(Router);

export default AppContainer;
