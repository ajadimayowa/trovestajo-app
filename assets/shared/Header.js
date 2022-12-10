import { View, Text } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'

export default function Header(props) {
    const { navigation } = props
    return (
        <View style={styles.container}>
            <Text>Header</Text>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'red'
    }
})