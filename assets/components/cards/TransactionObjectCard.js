import { View, Pressable, Text, Dimensions } from "react-native";
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get('window')
const TransactionObjectCard = (props) => {
  
  const {externalOuterStyle, externalInnerStyle} = props;

  return (
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
      >
        <View style={[styles.innerView, externalInnerStyle]}>
          <View style={{width:'100%', flexDirection:'row',flex:1}}>
            <View style={{width:'50%', backgroundColor:'green'}}><Text style={{color:'red'}}>Ok</Text></View>
            <View style={{width:'50%', backgroundColor:'green'}}><Text style={{color:'red'}}>Ok</Text></View>
          </View>

          <View style={{width:'100%', backgroundColor:'red', flex:1}}>
          <Text style={{ color: '#01065B' }} >Narration goes here</Text>
          </View>
          
          
          
          
        </View>
      </Pressable>
   
  );
};
export default TransactionObjectCard;

const styles = ScaledSheet.create({
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    minWidth: '100%',
    borderWidth:1,
    height:87,
    borderColor:'#7D1312',
    backgroundColor: '#F4F4F4',
    alignItems: "center",
    justifyContent: "space-between",
  },
  p: {
    color: "#01065B",
    fontSize: 11,
    fontWeight: "700",
    textAlign: 'center'
  },
  outerStyle: {},
});
