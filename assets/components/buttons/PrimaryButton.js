import { View,StyleSheet, Pressable,Text} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../constants";
const PrimaryButton = ({children, onPress, externalStyle,externalOuterStyle})=>{
return(
    <View style={[styles.outerView, {marginTop:"5%"}, externalOuterStyle]}>
        <Pressable style={({pressed})=>pressed ? styles.pressed : null}
        onPress={onPress}>
            <View style={[styles.innerView,externalStyle]}><Text style={styles.p}>{children}</Text></View>
        </Pressable>
    </View>
)
}
export default PrimaryButton;

const styles = ScaledSheet.create({
    outerView:{
        width:'90%',
        height:'45@msr', 
         
    },
    pressed:{
        opacity:0.7
    },
    innerView:{
        minWidth:'100%',
        minHeight:'45@msr',
        borderRadius:5,
        backgroundColor: COLORS.troBlue,
        alignItems:'center',
        justifyContent:'center'
    },
    p:{
        color:'#fff',
        fontSize:'15@msr',
        fontFamily: 'bold'
    },
    outerStyle :{

    }
})