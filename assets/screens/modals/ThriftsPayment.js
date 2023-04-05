import React, { useState } from "react";
import { Alert, Modal, Text, Pressable, View, Dimensions, TextInput } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ACCESS_DENIED, COLORS, returnYearMonthDate, UNAUHTORIZED } from "../../../constants";
import PrimaryInput from '../../components/inputs/PrimaryInput'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { collectThrift } from "../../../redux/requests/requests";
import DisplayMessage from "../../shared/ShowMessage";
import Loader from "../../shared/Loader";
import { useDispatch } from "react-redux";


const { width } = Dimensions.get('window')
export default function ThriftsPayment(props) {
  const dispatch = useDispatch();
  const { artisan, token, setloading, navigation } = props
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setamount] = useState(0)


  const logOutUser = () => {
    dispatch(logOutAgent())
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  }

  const payThrift = async () => {
    const hour = new Date().getHours()
    try {
      if (Number.isInteger(amount) === false) {
        return Alert.alert('Enter digits above 500')
      }
      if (parseInt(amount) === 0) {
        return Alert.alert('Amount is empty')
      }
      if (Number.isInteger(amount) === true && parseInt(amount) < 500) {
        return Alert.alert('500 is the minimum amount allowed')
      }
      // if (hour >= 17) {
      //   return Alert.alert('Payment can only be made on or before 5pm')
      // }
      else {
        setloading(true)
        const formData = {}
        formData.date_paid = await returnYearMonthDate(new Date());
        formData.amount = parseInt(amount);
        formData.artisan_id = artisan._id
        const requestData = {
          data: formData,
          token: token
        }
        const response = await collectThrift(requestData)
        const { data, success, message } = response.data
        if (response && response.data && success === true) {
          navigation.goBack();
          setloading(false)
          setModalVisible(!modalVisible)
          DisplayMessage(message, 'success')
        }
        else if (message === UNAUHTORIZED || message === ACCESS_DENIED) {
          DisplayMessage(message, "warning", "Something went wrong");
          setloading(false);
          logOutUser()
        }
        else if (response && success === false) {
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
            <View style={styles.modalInput}>
              <TextInput placeholder={'Enter Amount'}
                keyboardType={'number-pad'}
                style={styles.modalTextInput}
                onChangeText={(text) => setamount(parseInt(text))}
                value={parseInt(amount)}
              />
            </View>
            <View style={styles.modalInput1}>
              <Pressable
                style={styles.modalButton}
                onPress={() => payThrift()}
              >
                <Text style={styles.submit}>Pay</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.submit}>Close</Text>
              </Pressable>
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
    borderRadius: '7@msr',
    paddingTop: '40@msr',
    paddingBottom: '35@msr',
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

  modalInput1: {
    width: '90%',
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row'
  },
  modalTextInput: {
    fontSize: '18@msr',
    width: '90%',
    paddingTop: '10@msr',
    paddingBottom: '7@msr',
    borderBottomWidth: '2@msr'
  },
  modalButton: {
    width: '45%',
    backgroundColor: COLORS.troBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30@msr',
    paddingTop: '5@msr',
    paddingBottom: '5@msr',
  },
  submit: {
    fontSize: '20@msr',
    fontFamily: 'medium',
    color: '#fff'
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
    fontFamily: "bold",
    textAlign: "center",
    fontSize: '18@msr'
  },
});