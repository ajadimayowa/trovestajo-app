import { Pressable, TextInput, View, StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons'

const PrimaryInput = ({placeholder})=> {
    return (
        <TextInput placeholder={placeholder} style={styles.inputStyle}></TextInput>
    )
} 
export default PrimaryInput;

const styles = StyleSheet.create({
    inputStyle :{
        width:'90%',
        height : 30,
        color:'#01065B',
        fontWeight:'700',
        fontSize:14,
        margin: 15,
        borderBottomWidth: 1,
        borderBottomColor:'#01065B'
    }
})
