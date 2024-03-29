import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// export const host = `https://tro-vestcapitalpartners.com`
// export const host = `https://trovestbackend.onrender.com`
export const AWS_URL = 'https://trovestajo.s3.us-west-1.amazonaws.com'
export const host = Platform.OS === 'ios' ? `http://192.168.1.173:5100` : `http://10.0.2.2:5100`
export const root = 'tro-vest-ajo'
export const UNAUHTORIZED = 'Unauthorized Access';
export const ACCESS_DENIED = 'Access Denied';
export const agentKey = `${root}@agent_key`


export const COLORS = {
    troBlue: '#01065B',
    troGold: '#7A0D0C',
    backgroundGray: '#e3e3e3',
    cardColor: '#F4F4F4',
    troBrown: '#7D1312'
}

export const agentToken = async () => {
    const token = await AsyncStorage.getItem(agentKey)
    return token
}

export const Naira = '₦'
export const dateFormat = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let day = newDate.getDate()
    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    return `${day}-${month}-${year}`
}

export const returnYearMonthDate = async (date) => {
    const year = new Date(date).getFullYear();
    let month = new Date(date).getMonth() + 1;
    let day = new Date(date).getDate();
    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month
    return `${year}-${month}-${day}`
}

export const timeFunction = (data) => {
    const date = new Date(data);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const timeOfDay = hours > 11 ? 'PM' : 'AM'
    if (hours > 12) hours = hours % 12
    if (hours === 0) hours = 12
    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${hours}:${minutes}:${seconds} ${timeOfDay}`
}

export const convertToThousand = (value) => {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
    return `${Naira}${value}`
}

export const calculateRevenueTotalObject = (collection) => {
    let total = 0;
    collection.map(item => {
        return total += parseInt(item.total || 0)
    })
    return total
}
export const calculateRevenueAmount = (collection) => {
    let total = 0;
    collection.map(item => {
        return total += parseInt(item.amount || 0)
    })
    return total
}
export const calculateRevenueAmountDecimal = (collection) => {
    let total = 0;
    collection.map(item => {
        return total += parseFloat(item?.amount?.$numberDecimal || 0)
    })
    return total
}
export const fontsLoaded = {
    bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    montExtra: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    italic: require('../assets/fonts/Montserrat-Italic.ttf'),
    light: require('../assets/fonts/Montserrat-Light.otf'),
    medium: require('../assets/fonts/Montserrat-Medium.ttf'),
    regular: require('../assets/fonts/Montserrat-Regular.ttf'),
    semiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
};