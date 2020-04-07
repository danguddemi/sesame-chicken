import React, {useState} from 'react';
import {ScrollView} from "react-native";
import {Dialog, RadioButton} from "react-native-paper";
import Button from "./Button";
import categoryAssets from "../core/categories";

const SelectionDialog = ({categories, addCallback, cancel}) => {
    const availableCategories = Object.keys(categoryAssets).filter((el) => !categories.includes(el));
    const [selectedValue, setSelectedValue] = useState(null);

    return (<>
        <Dialog.Title>Category Options</Dialog.Title>
        <Dialog.ScrollArea>
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
        </Dialog.ScrollArea>
        <Dialog.Actions>
            <Button style={{width: '50%'}} onPress={cancel}>Cancel</Button>
            <Button style={{width: '50%'}} onPress={() => addCallback(selectedValue)}>Add</Button>
        </Dialog.Actions>
    </>)
};

export default SelectionDialog;
