import AsyncStorage from '@react-native-async-storage/async-storage';
export const host = `https://tro-vestcapitalpartners.com`
// export const host = `https://trovestbackend.up.railway.app`
// export const host = `http://localhost:5100`
export const root = 'root:'
export const UNAUHTORIZED = 'Unauthorized Access';
export const ACCESS_DENIED = 'Access Denied';
export const agentKey = `${root}agent_key`
export const COLORS = {
    troBlue: '#01065B',
    troBrown: '#7A0D0C'
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