import { Dimensions, Image, Pressable, ScrollView, View } from "react-native"
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import Header from "../../components/main/Header";
import Loader from '../../shared/Loader'
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { ScaledSheet } from "react-native-size-matters";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DisplayMessage from "../../shared/ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import { createAgentArtisan } from "../../../redux/requests/requests";
import { ACCESS_DENIED, UNAUHTORIZED } from "../../../constants";
import { getArtisanData } from "../../../redux/slices/artisan.slice";


const { width, height } = Dimensions.get('window')
const ClientRegScreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const { token } = useSelector(state => state.agent)
  const { isLoading } = useSelector(state => state.artisan)
  const [artisanForm, setartisanForm] = useState({
    full_name: '',
    identification: '',
    address: '',
    mobile: '',
    bvn: '',
    next_kin: '',
    next_kin_mobile: '',
    next_kin_address: '',

  })

  const handleGoToPrevScreen = () => {
    navigation.goBack()
  }

  const checkInput = async () => {
    try {
      let valid = true
      const { full_name, identification, address, mobile, bvn, next_kin, next_kin_mobile, next_kin_address } = artisanForm
      if (!full_name && !identification && !address && !mobile && !bvn && !next_kin && !next_kin_mobile && !next_kin_address) {
        valid = false
      }
      return valid;
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured')
    }
  }

  const registerArtisan = async () => {
    try {
      const valid = await checkInput()
      if (valid === false) {
        DisplayMessage('Some fields are empty', 'warning', 'Empty fields')
      }
      else {
        const formData = {
          data: artisanForm,
          token: token
        }
        setloading(true)
        const response = await createAgentArtisan(formData)
        const { success, message } = response.data
        if (success === true) {
          DisplayMessage(message, 'success', 'Success')
          setloading(false)
          setTimeout(() => {
            handleGoToPrevScreen()
          }, 900);
        }
        else if (message === ACCESS_DENIED || message === UNAUHTORIZED) {
          setloading(false)
          DisplayMessage(message, 'warning', ACCESS_DENIED)
          navigation.navigate('Login')
        }
        else {
          setloading(false)
          DisplayMessage(message, 'warning', 'Information')
        }
      }
    } catch (error) {
      setloading(false)
      DisplayMessage(error.message, 'danger', 'Error Occured')
    }
  }
  return (
    <>
      <Header>
        <Pressable onPress={handleGoToPrevScreen}>
          <Image source={require('../../components/assets/images/left.png')} style={styles.left} />
        </Pressable>
      </Header>
      {loading && <Loader />}
      <ScrollView style={styles.screen}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.container}>
          <PrimaryInput placeholder={'Full Name'}
            value={artisanForm.full_name}
            onChangeText={(text) => setartisanForm({ ...artisanForm, full_name: text })}
          />
          <PrimaryInput placeholder={'Means of Id'}
            value={artisanForm.identification}
            onChangeText={(text) => setartisanForm({ ...artisanForm, identification: text })}
          />
          <PrimaryInput placeholder={'Address'}
            value={artisanForm.address}
            onChangeText={(text) => setartisanForm({ ...artisanForm, address: text })}
          />
          <PrimaryInput placeholder={'Phone Number'}
            value={artisanForm.mobile}
            onChangeText={(text) => setartisanForm({ ...artisanForm, mobile: text })}
          />
          <PrimaryInput placeholder={'Bvn'}
            value={artisanForm.bvn}
            onChangeText={(text) => setartisanForm({ ...artisanForm, bvn: text })}
          />
          <PrimaryInput placeholder={'Name of Next Of Kin'}
            value={artisanForm.next_kin}
            onChangeText={(text) => setartisanForm({ ...artisanForm, next_kin: text })}
          />
          <PrimaryInput placeholder={'Phone Number'}
            value={artisanForm.next_kin_mobile}
            onChangeText={(text) => setartisanForm({ ...artisanForm, next_kin_mobile: text })}
          />
          <PrimaryInput placeholder={'Address'}
            value={artisanForm.next_kin_address}
            onChangeText={(text) => setartisanForm({ ...artisanForm, next_kin_address: text })}
          />
          <PrimaryButton onPress={() => registerArtisan()}>Register Client</PrimaryButton>
        </View>
      </ScrollView>
    </>
  )
}

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width,
  },
  contentContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  container: {
    marginTop: '20@msr',
    alignItems: 'center',
    width: "97%",
  },
  left: {
    width: '22@msr',
    height: '22@msr',
  },
})

export default ClientRegScreen;