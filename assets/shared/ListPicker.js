import React from 'react'
import SelectList from 'react-native-dropdown-select-list'

const ListPicker = (props) => {
    const { data, setSelected, onSelect } = props
    return (
        <SelectList setSelected={setSelected} data={data} onSelect={onSelect} {...props} />
    )

};

export default ListPicker