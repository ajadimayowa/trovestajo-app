import { View,StyleSheet, Pressable,Text} from "react-native";
const PrimaryButton = ({children, onPress})=>{
return(
    <View style={[styles.outerView, {marginTop:"5%"}]}>
        <Pressable style={({pressed})=>pressed ? styles.pressed : null}
        onPress={onPress}>
            <View style={styles.innerView}><Text style={styles.p}>{children}</Text></View>
        </Pressable>
    </View>
)
}
export default PrimaryButton;

const styles = StyleSheet.create({
    outerView:{
        width:'90%',
        height:45,  
    },
    pressed:{
        opacity:0.7
    },
    innerView:{
        minWidth:'100%',
        minHeight:45,
        borderRadius:5,
        backgroundColor:'#01065B',
        alignItems:'center',
        justifyContent:'center'
    },
    p:{
        color:'#fff',
        fontSize:15,
        fontWeight:'700'
    },
    outerStyle :{

    }
})