import React, {useState} from 'react';
import {ScrollView} from "react-native";
import {Dialog, RadioButton} from "react-native-paper";
import Button from "./Button";
import categoryAssets from "../core/categories";

const SelectionDialog = ({categories, addCallback}) => {
    const availableCategories = Object.keys(categoryAssets).filter((el) => !categories.includes(el));
    const [selectedValue, setSelectedValue] = useState(null);

    return (<>
        <Dialog.Title>Category Options</Dialog.Title>
        <Dialog.Content>
            <ScrollView style={{height: '80%'}}>
                <RadioButton.Group
                    onValueChange={val => setSelectedValue(val)}
                    value={selectedValue}
                >
                    {availableCategories.map(category => <RadioButton.Item
                        label={category}
                        value={category}
                        key={category}
                    />)}
                </RadioButton.Group>
            </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={() => addCallback(selectedValue)}>Add</Button>
        </Dialog.Actions>
    </>)
};

export default SelectionDialog;
