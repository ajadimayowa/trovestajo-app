import { Pressable, TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../constants";

const PrimaryInput = (props) => {
    const { placeholder } = props
    return (
        <TextInput
            // placeholder={placeholder}
            style={styles.inputStyle}
            {...props}
        />
    )
}
export default PrimaryInput;

const styles = ScaledSheet.create({
    inputStyle: {
        width: '90%',
        height: '30@msr',
        color: '#01065B',
        fontFamily: 'bold',
        fontSize: '17@msr',
        margin: '15@msr',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.troBlue
    }
})
