import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from "react-native";
import {SwipeListView} from "react-native-swipe-list-view";
import Background from '../components/Background';
import useGeoLocation from '../api/geo-location';
import useYelpApi from '../api/yelp-client';
import CogButton from "../components/CogButton";
import CategoryCard from "../components/CategoryCard";
import firebase from "firebase/app";
import '@firebase/auth';
import '@firebase/firestore';
import {Title, Divider, IconButton, Portal, Dialog} from "react-native-paper";
import {theme} from "../core/theme";
import {getStatusBarHeight} from "react-native-status-bar-height";
import Button from "../components/Button";
import categoryAssets from "../core/categories";
import SelectionDialog from "../components/SelectionDialog";

const Dashboard = ({navigation}) => {
    const [location, errorMessage] = useGeoLocation();
    const [businesses, getBusinesses] = useYelpApi();
    const [categories, setCategories] = useState([]);
    const user = firebase.auth().currentUser;
    const userData = firebase.firestore().collection('users').doc(user.uid);
    const [visible, setVisible] = useState(false);

    const updateCategories = async () => {
        await userData.get().then(
            doc => doc.exists ? setCategories(doc.get('categories')) : setCategories([])
        ).catch(err => console.error(err));
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...categories];
        const prevIndex = categories.findIndex(item => item === rowKey);
        newData.splice(prevIndex, 1);
        userData.update({categories: newData})
            .then(() => setCategories(newData))
            .catch(err => console.error(err));
    };

    const addCategory = (newCategory) => {
        const newData = [...categories];
        newData.push(newCategory);
        userData.update({categories: newData})
            .then(() => setCategories(newData))
            .catch(err => console.error(err));
    };

    const addRow = (newCategory) => {
        setVisible(false);
        addCategory(newCategory);
    };

    useEffect(() => {
        const latitude = 42.317023;
        const longitude = -71.109545;
        getBusinesses(latitude, longitude);
    }, [location]);

    useEffect(() => {
        updateCategories()
    }, []);

    return (
        <Background>
            <CogButton goTo={() => navigation.navigate("SettingScreen")}/>
            <Title style={styles.header}>Your Categories</Title>
            <Portal>
                <SwipeListView
                    style={styles.listView}
                    data={categories}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item}
                    closeOnRowBeginSwipe={true}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack}>
                            <IconButton
                                icon={require('../assets/delete-bin.png')}
                                onPress={() => deleteRow(rowMap, data.item)}/>
                            <Text>Right</Text>
                        </View>
                    )}
                    renderItem={({item}) => <CategoryCard category={item} icon={categoryAssets[item].icon}/>}
                    ItemSeparatorComponent={() => <Divider style={{opacity: 0}}/>}
                    ListFooterComponent={categories.length < 4 ? <Button onPress={() => setVisible(true)}>Add Category</Button> : null}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                />
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <SelectionDialog categories={categories} addCallback={(value) => addRow(value)}/>
                </Dialog>
            </Portal>
        </Background>);
};

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        color: theme.colors.primary,
        fontWeight: "bold",
        paddingVertical: 14,
        position: 'absolute',
        top: getStatusBarHeight()
    },
    listView: {
        marginTop: 100,
        width: '100%'
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        margin: 5
    }
});

export default memo(Dashboard);
