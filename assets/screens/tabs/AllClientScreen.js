import React, { useLayoutEffect, useEffect, useState, useMemo } from "react";
import {
  Pressable,
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClientObjectCard from "../../components/cards/ClientObjectCard";
import LabelCard from "../../components/cards/LabelCard";
import { AllCustormer } from "../../store/data";
import { useSelector, useDispatch } from "react-redux";
import SharedList from "../../shared/SharedList";
import { ScaledSheet } from "react-native-size-matters";
import { calculateRevenueAmount, convertToThousand } from "../../../constants";
import Loader from "../../shared/Loader";
import { getAgentArtisan } from "../../../redux/requests/requests";
import { getAgentArtisanSuccess } from "../../../redux/slices/artisan.slice";
import DisplayMessage from "../../shared/ShowMessage";
import DefaultHeader from "../../components/main/DefaultHeader";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { logOutAgent } from "../../../redux/slices/agent.slice";

const { width } = Dimensions.get("window");

const AllClientScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [agentArtisans, setagentArtisans] = useState([]);
  const { token, agentData } = selector.agent;
  const { artisans } = selector.artisan;
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [search, setsearch] = useState('')

  const checkButton = () => {
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <PrimaryInput iconSize={20} iconName={'search-outline'} placeholder={"Enter Client Name To Search…."}
            onChangeText={(text) => setsearch(text)} />
        </Header>
      )
    });
  }, [navigation]);

  useEffect(() => {
    getUser();
    const unsubscribe = navigation.addListener("focus", () => {
      getUser();
    });
    return unsubscribe;
  }, [navigation]);

  const logOutUser = () => {
    dispatch(logOutAgent())
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  }


  const getArtisans = async () => {
    try {
      if (token) {
        const response = await getAgentArtisan(token);
        const { success, message, data } = response.data;
        if (success === true) {
          const payload = {
            data,
            message: message,
            success: success,
            isLoading: false,
          };
          setagentArtisans(data);
          dispatch(getAgentArtisanSuccess(payload));
          setloading(false);
          setrefreshing(false);
        } else if (message === UNAUHTORIZED || message === ACCESS_DENIED) {
          DisplayMessage(message, "warning", "Something went wrong");
          setloading(false);
          setrefreshing(false);
          logOutUser()
        } else {
          DisplayMessage(message, "warning", "Something went wrong");
          setloading(false);
          setrefreshing(false);
        }
      } else {
        setloading(false);
        setrefreshing(false);
        setTimeout(() => {
          checkButton();
        }, 2000);
      }
    } catch (error) {
      DisplayMessage(error.message, "danger", "Error Occured");
      setloading(false);
      setrefreshing(false);
    }
  };

  const getUser = () => {
    if (token) {
      setloading(true);
      setrefreshing(true);
      setagentArtisans(artisans);
      getArtisans();
    } else {
      setloading(false);
      setrefreshing(false);
      checkButton();
    }
  }

  const handleKeyUp = async () => {
    try {
      if (search !== '') {
        const matcher = new RegExp(`^${search}`, 'g');
        const filteredData = agentArtisans.filter(name => name?.full_name.match(matcher))
        setagentArtisans(filteredData);
      }
      else {
        setagentArtisans([]);
        return getUser()
      }
    } catch (error) {
      DisplayMessage(error.message, "danger", "Error Occured");
      setloading(false);
      setrefreshing(false);
    }
  }

  useMemo(() => {
    handleKeyUp()
  }, [search])


  const onRefresh = () => {
    getUser();
  };
  return (
    <>
      {loading && <Loader />}
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LabelCard
          title={"Your Registered Artisans"}
          totalClientRegistered={(agentArtisans && agentArtisans.length > 0) && agentArtisans.length}
        />
        <View style={styles.container}>
          {agentArtisans.length > 0 && < SharedList
            style={{
              width: width * 0.97,
              alignSelf: "center",
            }}
            data={agentArtisans}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ClientObjectCard
                totalSaved={`${convertToThousand(
                  calculateRevenueAmount(item?.thrifts)
                )}`}
                nameOfClient={item?.full_name}
                key={item._id}
                artisan={item}
              />
            )}
          />}
        </View>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width,
    backgroundColor: "#e3e3e3",
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: width * 0.97,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    width: "100%",
    alignItems: "center",
  },
  p: {
    color: "#fff",
    fontSize: "14@msr",
  },
  left: {
    width: "22@msr",
    height: "22@msr",
  },
});

export default AllClientScreen;
