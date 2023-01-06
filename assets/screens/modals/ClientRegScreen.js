import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, TouchableOpacity, View } from "react-native"
import Header from "../../components/main/Header";
import Loader from '../../shared/Loader'
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DisplayMessage from "../../shared/ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import { createAgentArtisan } from "../../../redux/requests/requests";
import { ACCESS_DENIED, COLORS, UNAUHTORIZED } from "../../../constants";
import { getArtisanData } from "../../../redux/slices/artisan.slice";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import SharedList from "../../shared/SharedList";
import SelectList from 'react-native-dropdown-select-list'
import { MaterialIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

const { width, height } = Dimensions.get('window')
const ClientRegScreen = (props) => {
  const { navigation } = props
  const formData = new FormData()
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const { token } = useSelector(state => state.agent)
  const { isLoading } = useSelector(state => state.artisan)
  const [artisanForm, setartisanForm] = useState({ full_name: '', identification: '', identification_number: '', address: '', mobile: '', bvn: '', next_kin: '', next_kin_mobile: '', next_kin_address: '' })
  const [artisanImage, setartisanImage] = useState({})
  const [identification, setidentification] = useState([])
  const [identificationTypes, setidentificationTypes] = useState([
    {
      id: "1",
      key: "Nin",
      value: "Nin"
    },
    {
      id: "2",
      key: "Passport",
      value: "Passport"
    },
    {
      id: "3",
      key: "Drivers license",
      value: "Drivers license"
    },
    {
      id: "4",
      key: "BVN",
      value: "BVN"
    }
  ])
  const [imageUri, setimageUri] = useState('https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg')
  const handleGoToPrevScreen = () => {
    navigation.goBack()
  }

  const checkInput = async () => {
    try {
      let valid = true
      const { full_name, identification, identification_number, address, mobile, bvn, next_kin, next_kin_mobile, next_kin_address } = artisanForm
      if (full_name === '' || (identification.length <= 0) || identification_number === '' || address === '' || mobile === '' || bvn === '' || next_kin === '' || next_kin_mobile === '' || next_kin_address === '' || artisanImage.uri === '') {
        valid = false
        return valid
      }
      return valid
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured')
    }
  }

  const selectPicture = async () => {
    try {
      (async () => {
        // if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          DisplayMessage('Sorry, we need camera roll permissions to make this work!', 'warning', 'Permission Denied')
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            type: 'image',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            const newresult = await ImageManipulator.
              manipulateAsync(result.assets[0].uri, [
                { resize: { width: 500, height: 500 } },
                { rotate: 0 },
              ],
                { compress: 0.9, format: ImageManipulator.SaveFormat.PNG });
            setartisanImage({
              name: 'artisan-image',
              uri: newresult.uri,
              "type": "image/jpeg"
            })
            setimageUri(newresult.uri)
          }
          else {
            DisplayMessage('Image upload canceled', 'warning', 'Canceled')
          }
        }
        // }
      })();
    } catch (error) {
      this.setState({ loading: false, message: error.meesage });
    }
  }

  const selectIdentification = async () => {
    try {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          DisplayMessage('Sorry, we need camera roll permissions to make this work!', 'warning', 'Permission Denied')
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            type: 'image',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            const newresult = await ImageManipulator.
              manipulateAsync(result.assets[0].uri, [
                { resize: { width: 500, height: 500 } },
                { rotate: 0 },
              ],
                { compress: 0.1, format: ImageManipulator.SaveFormat.PNG });
            const imageItem = {
              id: uuid.v4(),
              name: 'artisan-image',
              uri: newresult.uri,
              "type": "image/jpeg"
            }
            setidentification([...identification, imageItem])
          }
          else {
            DisplayMessage('Image upload cancel', 'Canceled')
          }
        }
        // }
      })();
    } catch (error) {
      this.setState({ loading: false, message: error.meesage });
    }
  }

  const deleteImage = (id) => {
    const filteredItem = identification.filter(item => {
      if (item.id !== id) {
        return item
      }
    })
    setidentification(filteredItem)
  }
  const registerArtisan = async () => {
    try {
      const valid = await checkInput()
      console.log('Vale', valid)
      if (valid === false) {
        DisplayMessage('Some fields are empty', 'warning', 'Empty fields')
      }
      else {
        formData.append('full_name', artisanForm.full_name)
        formData.append('identification', artisanForm.identification)
        formData.append('address', artisanForm.address)
        formData.append('mobile', artisanForm.mobile)
        formData.append('bvn', artisanForm.bvn)
        formData.append('next_kin', artisanForm.next_kin)
        formData.append('next_kin_mobile', artisanForm.next_kin_mobile)
        formData.append('next_kin_address', artisanForm.next_kin_address)
        formData.append('folder', 'artisan')
        formData.append('image', artisanImage)
        identification.map((item) => formData.append("identification", item));
        setloading(true)
        const response = await createAgentArtisan(token, formData)
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
          <Image source={{ uri: imageUri }} style={{
            width: moderateScale(180),
            height: moderateScale(180),
            borderRadius: moderateScale(180),
            backgroundColor: "#fff",
          }} />
          <View style={styles.butttonSeperate}>
            <TouchableOpacity onPress={() => selectPicture()}>
              <Image source={require('../../components/assets/images/upload.png')} style={styles.butttonSeperateImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../components/assets/images/shutter.png')} style={styles.butttonSeperateImage} />
            </TouchableOpacity>
          </View>
          <PrimaryInput placeholder={'Full Name'}
            value={artisanForm.full_name}
            onChangeText={(text) => setartisanForm({ ...artisanForm, full_name: text })}
          />
          <PrimaryInput placeholder={'Means of Identification'}
            value={artisanForm.identification}
            onChangeText={(text) => setartisanForm({ ...artisanForm, identification: text })}
          />
          <PrimaryInput placeholder={'Identification Number'}
            value={artisanForm.identification_number}
            onChangeText={(text) => setartisanForm({ ...artisanForm, identification_number: text })}
          />
          <SharedList
            data={identification}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item, index }) => (
              <View style={styles.identificationView}>
                <Image source={{ uri: item.uri }} style={{
                  width: moderateScale(130),
                  height: moderateScale(130),
                  marginLeft: moderateScale(5),
                  marginRight: moderateScale(5),
                  marginBottom: moderateScale(10),
                  backgroundColor: "#fff",
                }} />
                <Pressable onPress={() => deleteImage(item.id)}>
                  <MaterialIcons name="delete-outline" size={30} color={COLORS.troGold} />
                </Pressable>
              </View>
            )}
          />
          <View style={styles.butttonSeperate}>
            <TouchableOpacity onPress={() => selectIdentification()}>
              <Image source={require('../../components/assets/images/upload.png')} style={styles.butttonSeperateImage} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../components/assets/images/shutter.png')} style={styles.butttonSeperateImage} />
            </TouchableOpacity>
          </View>
          <PrimaryInput placeholder={'Address'}
            value={artisanForm.address}
            inputStyles={{
              marginTop: moderateScale(20)
            }}
            onChangeText={(text) => setartisanForm({ ...artisanForm, address: text })}
          />
          <PrimaryInput placeholder={'Phone Number'}
            value={artisanForm.mobile}
            inputStyles={{
              marginTop: moderateScale(20)
            }}
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
          <PrimaryInput placeholder={'Next of Kin Phone Number'}
            value={artisanForm.next_kin_mobile}
            onChangeText={(text) => setartisanForm({ ...artisanForm, next_kin_mobile: text })}
          />
          <PrimaryInput placeholder={'Next of kin Address'}
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
    paddingBottom: '30@msr'
  },
  contentContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  container: {
    marginTop: '20@msr',
    marginBottom: '20@msr',
    alignItems: 'center',
    width: "97%",
  },
  left: {
    width: '22@msr',
    height: '22@msr',
  },
  butttonSeperate: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '10@msr',
  },
  identificationView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10@msr',
  },
  butttonSeperateImage: {
    width: '30@msr',
    height: '30@msr',
    borderRadius: '30@msr',
    backgroundColor: "#fff",
    margin: '5@msr',
    marginTop: '20@msr',
    marginRight: '7@msr'
  },
  vs: {
    marginLeft: 0,
    marginBottom: 0,
    width: "100%",
    paddingLeft: '10@msr',
    borderRadius: '12@msr',
    overflow: 'hidden',
    backgroundColor: "#F1F1F1",
    marginTop: '5@msr',
    borderWidth: 0
  }
})

export default ClientRegScreen;