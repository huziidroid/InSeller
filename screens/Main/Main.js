import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";
import {
  Container,
  LabelText,
  InfoText,
  InfoTextWrapper,
  StyledButton,
} from "./styles";

const getUser = async (dispatch) => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("@user")) || null;
    if (user !== null) {
      dispatch(setUser(user));
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    getUser(dispatch).then((isSuccess) => {
      setIsLoading(!isLoading);
      navigation.navigate(isSuccess ? "drawer" : "Main");
    });
  }, []);
  return (
    <Container>
      {!isLoading && (
        <>
          <LabelText> InSeller</LabelText>
          <InfoTextWrapper>
            <InfoText>Give your local shop Online Presence</InfoText>
            <InfoText>Take Pictures and Start Selling</InfoText>
          </InfoTextWrapper>
          <StyledButton
            title="Get Started"
            onPress={() => {
              navigation.navigate("login");
            }}
          ></StyledButton>
        </>
      )}
    </Container>
  );
};

export default Main;
