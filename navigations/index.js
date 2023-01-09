import React from 'react'
import Stacknavigation from './stacknavigation'
import { NavigationContainer } from '@react-navigation/native';


export default function index() {
    return (
        <NavigationContainer>
            <Stacknavigation />
        </NavigationContainer>
    )
}