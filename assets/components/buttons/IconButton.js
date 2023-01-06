import { View, StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
const IconButton = ({ children, onPress,iconName,iconSize,externalInnerStyle,iconColor }) => {
  return (
    
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={onPress}
      >
        <View style={[styles.innerView, externalInnerStyle]}>
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
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
    height:25,
    width:25,
    borderRadius:3,
    flexDirection:'row',
    padding:'5%',
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    elevation:5
    
  },
  p: {
    color: "blue",
    fontSize: 15,
    fontWeight: "700",
  },
  outerStyle: {},
});
