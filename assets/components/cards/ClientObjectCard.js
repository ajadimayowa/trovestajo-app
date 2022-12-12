import { View, Pressable, Text, Dimensions } from "react-native";
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants";


const { width, height } = Dimensions.get('window')
const ClientObjectCard = (props) => {
  const navigation = useNavigation()
  const { clientId, nameOfClient, totalSaved, externalOuterStyle, externalInnerStyle, artisan, getUser } = props;
  const goToClientDetails = () => {
    navigation.navigate('ClientDetailScreen', {
      artisan: artisan,
      totalSaved: totalSaved,
    })
  }

  return (
    <View style={[styles.outerView, externalOuterStyle]} key={artisan._id}>
      <Pressable
        key={artisan._id}
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={goToClientDetails}
      >
        <View style={[styles.innerView, externalInnerStyle]}>
          <Text style={styles.p}>{nameOfClient}</Text>
          <View style={{
            backgroundColor: COLORS.troBrown,  width: moderateScale(75), paddingTop: moderateScale(7), paddingBottom: moderateScale(7),borderRadius: 3,
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Text style={{ color: '#fff', fontFamily: 'medium', fontSize: moderateScale(14), textAlign: 'center' }} >{`${totalSaved}`}</Text> 
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default ClientObjectCard;

const styles = ScaledSheet.create({
  outerView: {
    width: '100%',
  },
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    flexDirection: 'row',
    marginTop: '10@msr',
    padding: '10@msr',
    backgroundColor: COLORS.cardColor,
    alignItems: "center",
    justifyContent: "space-between",
  },
  p: {
    color: COLORS.troBlue,
    fontSize: '15@msr',
    fontFamily: "semiBold",
    textAlign: 'center'
  },
  outerStyle: {},
});
