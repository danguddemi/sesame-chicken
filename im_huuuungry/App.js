import React from "react";
import {Provider} from "react-native-paper";
import App from "./src";
import {theme} from "./src/core/theme";
import {decode, encode} from 'base-64'

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => {
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = Math.floor(256 * Math.random());
    }
}
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

const Main = () => (
    <Provider theme={theme}>
        <App/>
    </Provider>
);

export default Main;
