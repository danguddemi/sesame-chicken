import React, {memo} from "react";
import {TouchableHighlight, StyleSheet, Image} from "react-native";
import {Title, Surface} from "react-native-paper";

const CategoryCard = ({category, icon, navigate}) => {
    return (<TouchableHighlight onPress={navigate}>
        <Surface style={styles.container}>
            <Title>{category}</Title>
            <Image source={icon}/>
        </Surface>
    </TouchableHighlight>)
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 150,
        margin: 5,
        padding: 5,
        elevation: 1,
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryCard;
