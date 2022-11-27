import { View, StyleSheet, Text } from "react-native";

const CircleCard = ({ children }) => {
  
  return (<View style ={styles.container}>
    <Text style={styles.p}>{children}</Text>
  </View>)
}

const styles = StyleSheet.create({
    container : {
       width:67,
       height:67,
       justifyContent:'center',
       alignItems:'center',
       borderRadius:34,
       borderWidth:1,
       borderColor:'#7D1312',
       
    },
    p : {
      fontSize: 20,
      color:'#01065B',
      
    }
})
export default CircleCard;
