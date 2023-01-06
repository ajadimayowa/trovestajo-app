import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import { COLORS } from "../../../constants";
import { Entypo } from "@expo/vector-icons";
import IconButton from "../buttons/IconButton";
import { moderateScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

const DefaultHeader = (props) => {

  const { headerTitle, handleGoBack } = props;


  return (
    <View style={style.container}>
      <IconButton
        onPress={handleGoBack}
        externalInnerStyle={{
          backgroundColor: "#fff",
          backgroundColor: null,
          elevation: null,
        }}
        iconName={"chevron-back-outline"}
        iconSize={20}
        iconColor={"black"}
      />
      <Text
        style={{
          fontSize: moderateScale(16),
          fontFamily: "bold",
          color: COLORS.troBlue,
        }}
      >
        {headerTitle}
      </Text>

      <Pressable style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </Pressable>
    </View>
  );
};


const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width,
    borderBottomColor: "black",
    borderBottomWidth: 0.19,
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingTop: "15%",
    paddingBottom: "5%",
    justifyContent: "space-between",
  },
});
export default DefaultHeader;
