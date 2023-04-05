import { View, StyleSheet, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";

const { width, height } = Dimensions.get('window')
const Header = (props) => {
  const { children } = props
  return <View style={style.container}>{children}</View>;
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width,
    elevation:2,
    alignItems: "center",
    paddingHorizontal: '5%',
    paddingTop: '10%',
    paddingBottom: '3%',
    justifyContent: 'space-between'

  },
});
export default Header;
