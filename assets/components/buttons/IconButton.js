import { View, StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const IconButton = ({ children, onPress,iconName,externalInnerStyle }) => {
  return (
    
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={onPress}
      >
        <View style={[styles.innerView, externalInnerStyle]}>
          <Ionicons name={iconName} />
          <Text style={styles.p}>{children}</Text>
        </View>
      </Pressable>
   
  );
};
export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    height:50,
    width:50,
    flexDirection:'row',
    padding:'5%',
    
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  p: {
    color: "blue",
    fontSize: 15,
    fontWeight: "700",
  },
  outerStyle: {},
});
