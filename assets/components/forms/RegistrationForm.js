import { View, StyleSheet, Alert } from "react-native";
import PrimaryInput from "../inputs/PrimaryInput";
import PrimaryButton from "../buttons/PrimaryButton";

const RegistrationForm = ({handleGoBack, }) => {
    const SubmitData = ()=> {
      Alert.alert('Registration Succesfull')
        handleGoBack()
    }
  return (
    <View style={styles.container}>
      <PrimaryInput placeholder={'First Name'} />
      <PrimaryInput placeholder={'Last Name'} />
      <PrimaryInput placeholder={'Means of Id'} />
      <PrimaryInput placeholder={'Address'} />
      <PrimaryInput placeholder={'Phone Number'} />
      <PrimaryInput placeholder={'Bvn'} />
      <PrimaryInput placeholder={'Name of Next Of Kin'} />
      <PrimaryInput placeholder={'Phone Number'} />
      <PrimaryInput placeholder={'Address'} />
      <PrimaryButton onPress={SubmitData}>Submit</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    width: "100%",
    padding:'10%'
  },
});

export default RegistrationForm;
