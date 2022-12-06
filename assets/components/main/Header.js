import { View, StyleSheet } from "react-native";

const Header = (props) => {
  const { children } = props
  return <View style={style.container}>{children}</View>;
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: 'black',
    borderBottomWidth: 0.19,
    alignItems: "space-around",
    paddingHorizontal: '5%',
    paddingTop: '15%',
    paddingBottom: '5%',
    justifyContent:'center'

  },
});
export default Header;
