import { View, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'


const {height,width } = Dimensions.get('window')
export default function Loader() {
    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.2)',
            height,
            width
        }}>
            <ActivityIndicator color={COLORS.troBlue} size="large" />
        </View>
    )
}