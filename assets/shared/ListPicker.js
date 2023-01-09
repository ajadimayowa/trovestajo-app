import React from "react";
import { Picker } from '@react-native-picker/picker';

const ListPicker = (props) => {
    const { data, setSelected, selected } = props;

    return (
        <>
            <Picker
                {...props}
                selectedValue={selected}
                onValueChange={setSelected}>
                {data.map((item, index) => (
                    <Picker.Item label={item.value} value={item.key} key={index} />
                ))}
            </Picker>
        </>
    );

};

export default ListPicker