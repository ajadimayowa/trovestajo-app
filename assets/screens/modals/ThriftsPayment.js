import React, { useState } from "react";
import { Alert, Modal, Text, Pressable, View, Dimensions, TextInput } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../constants";
import PrimaryInput from '../../components/inputs/PrimaryInput'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { collectThrift } from "../../../redux/requests/requests";
import DisplayMessage from "../../shared/ShowMessage";
import Loader from "../../shared/Loader";

const { width } = Dimensions.get('window')
export default function ThriftsPayment(props) {
  const { artisan, token,setloading ,navigation} = props
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setamount] = useState(0)


  const payThrift = async () => {
    try {
      if (parseInt(amount) === 0) {
        return Alert.alert('Amount is empty')
      }
      if (parseInt(amount) < 1000) {
        return Alert.alert('1000 is the minimum amount allowed')
      }
      else {
        setloading(true)
        const formData = {}
        formData.date_paid = new Date();
        formData.amount = parseInt(amount);
        formData.artisan_id = artisan._id
        const requestData = {
          data: formData,
          token: token
        }
        const response = await collectThrift(requestData)
        const { data, success, message } = response.data
        if (response && response.data && success === true) {
          navigation.navigate("AllClients");
          setloading(false)
          setModalVisible(!modalVisible)
          DisplayMessage(message, 'success')
        }
        else {
          setloading(false)
          setModalVisible(!modalVisible)
          DisplayMessage(message, 'warning')
        }
      }
    } catch (error) {
      setloading(false)
      Alert.alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            <View style={styles.modalInput}>
              <TextInput placeholder={'Enter Amount'}
                keyboardType={'number-pad'}
                style={styles.modalTextInput}
                onChangeText={(text) => setamount(text)}
              />
            </View>
            <View style={styles.modalInput}>
              <PrimaryButton
                style={styles.submit}
                button={styles.modalButton}
                onPress={() => payThrift()}
              >
                Pay
              </PrimaryButton>
              <PrimaryButton
                style={styles.submit}
                button={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                Close
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Pay</Text>
      </Pressable>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '22@msr',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,.5)',
    marginBottom: '22@msr',
  },
  modalView: {
    width: width * .8,
    backgroundColor: "white",
    borderRadius: '10@msr',
    paddingTop: '25@msr',
    paddingBottom: '25@msr',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalInput: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalTextInput: {
    fontSize: '18@msr',
    width: '90%',
    paddingTop: '10@msr',
    paddingBottom: '7@msr',
    borderBottomWidth: '2@msr'
  },
  modalButton: {
    width: '90%',
    backgroundColor: COLORS.troBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25@msr',
    paddingTop: '10@msr',
    paddingBottom: '10@msr',
    elevation: 2
  },
  submit: {
    fontSize: '20@msr',
  },
  button: {
    marginTop: '20@msr',
    backgroundColor: COLORS.troBlue,
    borderRadius: '50@msr',
    height: '70@msr',
    width: '70@msr',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: '18@msr'
  },
});