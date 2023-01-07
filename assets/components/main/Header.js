import { View, StyleSheet, Dimensions } from "react-native";

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
    borderBottomColor: 'black',
    borderBottomWidth: 0.19,
    alignItems: "center",
    paddingHorizontal: '5%',
    paddingTop: '15%',
    paddingBottom: '5%',
    justifyContent: 'space-between'

  },
});
export default Header;
