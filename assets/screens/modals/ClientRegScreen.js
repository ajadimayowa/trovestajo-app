import React, { useEffect, useState, useLayoutEffect } from "react";
import { Dimensions, Image, Pressable, ScrollView, TouchableOpacity, View, Text } from "react-native"
import Header from "../../components/main/Header";
import Loader from '../../shared/Loader'
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DisplayMessage from "../../shared/ShowMessage";
import { useDispatch, useSelector } from "react-redux";
import { createAgentArtisan } from "../../../redux/requests/requests";
import { ACCESS_DENIED, COLORS, UNAUHTORIZED } from "../../../constants";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import SharedList from "../../shared/SharedList";
import uuid from 'react-native-uuid';
import { AntDesign, MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import IconButton from "../../components/buttons/IconButton";

const { width, height } = Dimensions.get("window");

const ClientRegScreen = (props) => {
  const { navigation } = props;
  const formData = new FormData();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { token } = useSelector((state) => state.agent);
  const { isLoading } = useSelector((state) => state.artisan);
  const [artisanForm, setartisanForm] = useState({
    full_name: "",
    identification: "",
    identification_number: "",
    address: "",
    mobile: "",
    bvn: "",
    next_kin: "",
    next_kin_mobile: "",
    next_kin_address: "",
  });
  const [artisanImage, setartisanImage] = useState({});
  const [identification, setidentification] = useState([]);
  const [imageUri, setimageUri] = useState(
    "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <IconButton
            onPress={handleGoBack}
            externalInnerStyle={{
              backgroundColor: "#fff",
              backgroundColor: null,
              elevation: null,
            }}
            iconName={"chevron-back-outline"}
            iconSize={24}
            iconColor={"black"}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              fontFamily: "bold",
              color: COLORS.troBlue,
            }}
          >
            Registration
          </Text>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}
          >
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </Pressable>
        </Header>
      ),
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const checkInput = async () => {
    try {
      let valid = true;
      const {
        full_name,
        identification,
        identification_number,
        address,
        mobile,
        bvn,
        next_kin,
        next_kin_mobile,
        next_kin_address,
      } = artisanForm;
      if (
        full_name === "" ||
        identification.length <= 0 ||
        identification_number === "" ||
        address === "" ||
        mobile === "" ||
        bvn === "" ||
        next_kin === "" ||
        next_kin_mobile === "" ||
        next_kin_address === "" ||
        artisanImage.uri === ""
      ) {
        valid = false;
        return valid;
      }
      return valid;
    } catch (error) {
      DisplayMessage(error.message, "danger", "Error Occured");
    }
  };

  const selectPicture = async () => {
    try {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          DisplayMessage(
            "Sorry, we need camera roll permissions to make this work!",
            "warning",
            "Permission Denied"
          );
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            type: "image",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            const newresult = await ImageManipulator.manipulateAsync(
              result.assets[0].uri,
              [{ resize: { width: 500, height: 500 } }, { rotate: 0 }],
              { compress: 0.9, format: ImageManipulator.SaveFormat.PNG }
            );
            setartisanImage({
              name: "artisan-image",
              uri: newresult.uri,
              type: "image/jpeg",
            });
            setimageUri(newresult.uri);
          } else {
            DisplayMessage("Image upload canceled", "warning", "Canceled");
          }
        }
      })();
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured', 'top')
    }
  };

  const selectIdentification = async () => {
    try {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          DisplayMessage(
            "Sorry, we need camera roll permissions to make this work!",
            "warning",
            "Permission Denied"
          );
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            type: "image",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled) {
            const newresult = await ImageManipulator.manipulateAsync(
              result.assets[0].uri,
              [{ resize: { width: 500, height: 500 } }, { rotate: 0 }],
              { compress: 0.1, format: ImageManipulator.SaveFormat.PNG }
            );
            const imageItem = {
              id: uuid.v4(),
              name: "artisan-image",
              uri: newresult.uri,
              type: "image/jpeg",
            };
            setidentification([...identification, imageItem]);
          } else {
            DisplayMessage("Image upload cancel", "Canceled");
          }
        }
        // }
      })();
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured', 'top')
    }
  };

  const openCamera = async () => {
    try {
      const { status, granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "denied" && granted === false) {
        DisplayMessage(
          "Sorry, grant app permissions in your settings to be able to use camera!",
          "warning",
          "Permission Denied"
        );
      }
      else {
        let cameraResult = await ImagePicker.launchCameraAsync({
          type: "image",
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!cameraResult.canceled) {
          const newresult = await ImageManipulator.manipulateAsync(
            cameraResult.assets[0].uri,
            [{ resize: { width: 500, height: 500 } }, { rotate: 0 }],
            { compress: 0.9, format: ImageManipulator.SaveFormat.PNG }
          );
          setartisanImage({
            name: "artisan-image",
            uri: newresult.uri,
            type: "image/jpeg",
          });
          setimageUri(newresult.uri);
        } else {
          DisplayMessage("Image upload canceled", "warning", "Canceled");
        }
      }
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured', 'top')
    }
  }

  const openCameraForIdentification = async () => {
    try {
      const { status, granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "denied" && granted === false) {
        DisplayMessage(
          "Sorry, grant app permissions in your settings to be able to use camera!",
          "warning",
          "Permission Denied"
        );
      }
      else {
        let cameraResult = await ImagePicker.launchCameraAsync({
          type: "image",
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!cameraResult.canceled) {
          const newresult = await ImageManipulator.manipulateAsync(
            cameraResult.assets[0].uri,
            [{ resize: { width: 500, height: 500 } }, { rotate: 0 }],
            { compress: 0.1, format: ImageManipulator.SaveFormat.PNG }
          );
          const imageItem = {
            id: uuid.v4(),
            name: "artisan-image",
            uri: newresult.uri,
            type: "image/jpeg",
          };
          setidentification([...identification, imageItem]);
        } else {
          DisplayMessage("Image upload cancel", "Canceled");
        }
      }
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured', 'top')
    }
  }

  const deleteImage = (id) => {
    const filteredItem = identification.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setidentification(filteredItem);
  };

  const registerArtisan = async () => {
    try {
      const valid = await checkInput();
      if (valid === false) {
        DisplayMessage("Some fields are empty", "warning", "Empty fields");
      } else {
        formData.append("full_name", artisanForm.full_name);
        formData.append("identification", artisanForm.identification);
        formData.append("address", artisanForm.address);
        formData.append("mobile", artisanForm.mobile);
        formData.append("bvn", artisanForm.bvn);
        formData.append("next_kin", artisanForm.next_kin);
        formData.append("next_kin_mobile", artisanForm.next_kin_mobile);
        formData.append("next_kin_address", artisanForm.next_kin_address);
        formData.append("folder", "artisan");
        formData.append("image", artisanImage);
        identification.map((item) => formData.append("identification", item));
        setloading(true);
        const response = await createAgentArtisan(token, formData);
        const { success, message } = response.data;
        console.log('response.data',response.data)
        if (success === true) {
          DisplayMessage(message, "success", "Success");
          setloading(false);
          setimageUri("https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg")
          setartisanForm({
            full_name: "",
            identification: "",
            identification_number: "",
            address: "",
            mobile: "",
            bvn: "",
            next_kin: "",
            next_kin_mobile: "",
            next_kin_address: "",
          })
          setidentification([])
          setartisanImage({})
          // setTimeout(() => {
          //   handleGoBack()
          // }, 900);
        } else if (message === ACCESS_DENIED || message === UNAUHTORIZED) {
          setloading(false);
          DisplayMessage(message, "warning", ACCESS_DENIED);
          navigation.navigate("Login");
        } else {
          setloading(false);
          DisplayMessage(message, "warning", "Information");
        }
      }
    } catch (error) {
      setloading(false);
      DisplayMessage(error.message, "danger", "Error Occured");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: moderateScale(150),
              height: moderateScale(150),
              borderRadius: moderateScale(150),
              backgroundColor: "#fff",
            }}
          />
          <View style={styles.butttonSeperate}>
            <TouchableOpacity onPress={() => selectPicture()}>
              <Image
                source={require("../../components/assets/images/upload.png")}
                style={styles.butttonSeperateImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openCamera()}>
              <Image
                source={require("../../components/assets/images/shutter.png")}
                style={styles.butttonSeperateImage}
              />
            </TouchableOpacity>
          </View>
          <PrimaryInput
            iconName={"person"}
            iconSize={16}
            placeholder={"Full Name"}
            value={artisanForm.full_name}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, full_name: text })
            }
          />
          <PrimaryInput
            iconName={"md-card-sharp"}
            iconSize={16}
            placeholder={"Means of Identification"}
            value={artisanForm.identification}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, identification: text })
            }
          />
          <PrimaryInput
            iconName={"md-card-sharp"}
            iconSize={16}
            placeholder={"Identification Number"}
            value={artisanForm.identification_number}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, identification_number: text })
            }
          />
          <SharedList
            data={identification}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item, index }) => (
              <View style={styles.identificationView}>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: moderateScale(130),
                    height: moderateScale(130),
                    marginLeft: moderateScale(5),
                    marginRight: moderateScale(5),
                    marginBottom: moderateScale(10),
                    backgroundColor: "#fff",
                  }}
                />
                <Pressable onPress={() => deleteImage(item.id)}>
                  <MaterialIcons
                    name="delete-outline"
                    size={30}
                    color={COLORS.troGold}
                  />
                </Pressable>
              </View>
            )}
          />
          <View style={styles.butttonSeperate}>
            <TouchableOpacity onPress={() => selectIdentification()}>
              <Image
                source={require("../../components/assets/images/upload.png")}
                style={styles.butttonSeperateImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openCameraForIdentification()}>
              <Image
                source={require("../../components/assets/images/shutter.png")}
                style={styles.butttonSeperateImage}
              />
            </TouchableOpacity>
          </View>
          <PrimaryInput
            iconName={"location"}
            iconSize={16}
            placeholder={"Address"}
            value={artisanForm.address}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, address: text })
            }
          />
          <PrimaryInput
            iconName={"call"}
            iconSize={16}
            placeholder={"Phone Number"}
            value={artisanForm.mobile}
            maxLength={11}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, mobile: text })
            }
          />
          <PrimaryInput
            iconName={"key"}
            iconSize={16}
            placeholder={"Bvn"}
            value={artisanForm.bvn}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, bvn: text })
            }
          />
          <PrimaryInput
            iconName={"people"}
            iconSize={16}
            placeholder={"Name of Next Of Kin"}
            value={artisanForm.next_kin}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, next_kin: text })
            }
          />
          <PrimaryInput
            iconName={"call"}
            iconSize={16}
            maxLength={11}
            placeholder={"Next of Kin Phone Number"}
            value={artisanForm.next_kin_mobile}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, next_kin_mobile: text })
            }
          />
          <PrimaryInput
            iconName={"location"}
            iconSize={16}
            placeholder={"Next of kin Address"}
            value={artisanForm.next_kin_address}
            onChangeText={(text) =>
              setartisanForm({ ...artisanForm, next_kin_address: text })
            }
          />
          <PrimaryButton onPress={() => registerArtisan()}>
            Register Client
          </PrimaryButton>
        </View>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width,
    paddingBottom: "30@msr",
  },
  contentContainerStyle: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: '4%'
  },
  container: {
    marginTop: "20@msr",
    marginBottom: "20@msr",
    alignItems: "center",
    width: "97%",
  },
  left: {
    width: "22@msr",
    height: "22@msr",
  },
  butttonSeperate: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "10@msr",
  },
  identificationView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10@msr",
  },
  butttonSeperateImage: {
    width: "30@msr",
    height: "30@msr",
    borderRadius: "30@msr",
    backgroundColor: "#fff",
    margin: "5@msr",
    marginTop: "20@msr",
    marginRight: "7@msr",
  },
});

export default ClientRegScreen;
