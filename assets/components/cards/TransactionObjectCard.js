import { View, Pressable, Text, Dimensions } from "react-native";
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from "@react-navigation/native";
import { COLORS, convertToThousand, timeFunction } from "../../../constants";


const { width, height } = Dimensions.get('window')
const TransactionObjectCard = (props) => {

  const { externalOuterStyle, externalInnerStyle, item, status, navigation } = props;
  // DepositThriftScreen
  return (
    <>
      {item.status === status && <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
      >
        <View style={[styles.innerView, externalInnerStyle]}>
          <View style={styles.outerStyle}>
            {item.status === 0 && <Text style={styles.thriftData}>{new Date(item?.updatedAt).toDateString()}</Text>}
            {item.status === 1 && <Text style={styles.thriftData}>{new Date(item?.updatedAt).toDateString()}</Text>}
            <View style={styles.amountStyle}>
              <Text style={styles.amountStyleText}>{`${convertToThousand(item?.total)}`}</Text>
            </View>
          </View>
          <View style={styles.outerStyle}>
            {item.status === 0 && <Text style={styles.collectionText}>{'Yet to deposit thrifts'}</Text>}
            {item.status === 1 && <Text style={styles.collectionText1}>{item?.payment_reference}</Text>}
          </View>
        </View>
      </Pressable>}
    </>
  );
};
export default TransactionObjectCard;

const styles = ScaledSheet.create({
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    borderWidth: 1,
    marginBottom: '4@msr',
    paddingTop: '15@msr',
    paddingBottom: '15@msr',
    borderColor: '#7D1312',
    width: width * .97,
    alignItems: "center",
    justifyContent: "space-between",
  },
  outerStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '97%'
  },
  thriftData: {
    color: COLORS.troGold,
    fontSize: '12@msr',
    fontFamily: 'semiBold',
    textAlign: 'center'
  },
  collectionText: {
    color: COLORS.troBrown,
    fontSize: '14@msr',
    fontFamily: 'semiBold',
    textAlign: 'center',
    // textTransform: ''
  },
  collectionText1: {
    color: COLORS.troBrown,
    marginTop: '10@msr',
    fontSize: '14@msr',
    fontFamily: 'semiBold',
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  amountStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.troBrown,
    width: '95@msr',
    paddingTop: '5@msr',
    paddingBottom: '5@msr',
  },
  amountStyleText: {
    color: '#fff',
    fontSize: '14@msr',
    fontFamily: 'semiBold',
    textAlign: 'center'
  },
});
