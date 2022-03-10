import React, { useState,useEffect } from "react";
import {
    TouchableOpacity,
    Keyboard,
    ScrollView,
    Image,
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components/native";
import constants from "../../../config/constants";
import { HeadingText, HorizontalSpacer, NormalText, OptionButtonHolder, SubHeadingText, SubmitButton, VerticalSpacer } from "../../../config/theme";
import { loginUser } from "./../../../stores/actions/users";
const InputField = require("./../../../shared-components/inputField");
import LinearGradient from 'react-native-linear-gradient';
import {utils} from './../../../utility/utils'
import { postCall } from "../../../services/api";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//     webClientId: '634545130272-t8vmudi1di2dfqldurihg2l6e2pujfe1.apps.googleusercontent.com',
//     iosClientId: '634545130272-b9sck71lhucrhq9id0gm54ff0atp2g6k.apps.googleusercontent.com'
// });

const Register = ({ navigation, route, loginUser }) => {

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        async function fetchData() {
            await GoogleSignin.configure({
                scopes: [
                    'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/user.phonenumbers.read'
                ],
                webClientId: '634545130272-c82vjc5ore6ilkfl4kod85ik4brvqn4r.apps.googleusercontent.com',
                iosClientId: '634545130272-b9sck71lhucrhq9id0gm54ff0atp2g6k.apps.googleusercontent.com'
            });
          }
          fetchData()
    }, [])

    const handleRegister = async () => {
        Keyboard.dismiss();

        if (!displayName) {
            utils.showError("Please enter name.");
            return;
        }
        if (!utils.validateEmail(email)) {
            utils.showError("Please enter valid email address.");
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            utils.showError("Please enter valid phone number.");
            return;
        }
        if (!password) {
            utils.showError("Please enter password.");
            return;
        }

        if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/.test(password)) {
            utils.showError("Password must be 8 alphanumeric chars and following special chars #?!@$%^&*-");
            return;
        }

        const response = await postCall('users/register', {
            userData: {
              displayName,
              email,
              password,
              phoneNumber
            }
        })

        if(response.data.status) {
            utils.showSuccess(response.data.message + " Redirecting to login...");
        } else {
            utils.showError(response.data.message);
        }
    }

    const handleGoogleRegister = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            const response = await postCall('users/googleRegister', {
                userData: {
                  displayName: userInfo.user.name,
                  email: userInfo.user.email,
                  photoURL: userInfo.user.photo
                },
                idToken: userInfo.idToken
            })
            console.log(response)
            if(response.data.status) {
                utils.showSuccess(response.data.message + " Redirecting to login...");
            } else {
                utils.showError(response.data.message);
            }
            
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                utils.showError('Register calcelled by user');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                utils.showError('Play services not available or outdated');
            } else {
                utils.showError('Something went wrong, Please try again later.')
            }
        }
    }

    return (
        <KeyboardAwareScrollView
            bounces={false}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // extraScrollHeight={50}
            style={{ flex: 1 }}
            contentContainerStyle={{
                alignItems: "center",
                backgroundColor: "transparent",
            }}
        >
            {/*<LinearGradient 
                colors={['#68BFEE77', '#FFFFFF']} 
                style={{ flex: 1 }}
                end={{ x: 0.3, y: 0.8 }}
                start={{ x: 0, y: 1 }}
                locations={[0, 0.4]}
            >*/}
                <ScrollView>
                    <RegisterHolderView>
                        <IconHolderView>
                            <Image
                                resizeMode="contain"
                                source={app.images.KCLogo}
                                style={{ marginBottom: 50, marginTop: -10, width: 200, height: 100 }}
                            />
                            <TouchableOpacity
                                activeOpacity={app.constants.active_opacity}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    navigation.navigate("Login");
                                }}
                                style={{ position: 'absolute', left: 0, top: 30, width: 25, height: 25 }}
                            >
                                <BackArrowView>
                                    <Image
                                        source={app.images.backArrow}
                                    />
                                </BackArrowView>
                            </TouchableOpacity>
                        </IconHolderView>
                        <View style={{ position: 'absolute', right: -20, top: 75 }}>
                            <Image
                                source={app.images.waterVegetables}
                                resizeMode="contain"
                                style={{
                                    height: 200,
                                    width: 160
                                }}
                            />
                        </View>
                        <HeadingText>Register</HeadingText>
                        <SubHeadingText>
                            Create your new account
                        </SubHeadingText>
                        <VerticalSpacer height={22} />
                        <InputField
                            autoCapitalize="none"
                            value={displayName}
                            maxLength={255}
                            onChangeText={(name) => { setDisplayName(name) }}
                            onSubmitEditing={() => {}}
                            placeholderText={"NAME"}
                        />
                        <VerticalSpacer height={constants.isTablet ? 30 : 25} />
                        <InputField
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            maxLength={255}
                            onChangeText={(email) => { setEmail(email) }}
                            onSubmitEditing={() => {}}
                            placeholderText={"EMAIL"}
                        />
                        <VerticalSpacer height={constants.isTablet ? 30 : 25} />
                        <InputField
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            value={phoneNumber}
                            maxLength={255}
                            onChangeText={(mobile) => { setPhoneNumber(mobile) }}
                            onSubmitEditing={() => {}}
                            placeholderText={"MOBILE"}
                        />
                        <VerticalSpacer height={constants.isTablet ? 30 : 25} />
                        <InputField
                            autoCapitalize="none"
                            secureTextEntry
                            value={password}
                            maxLength={255}
                            onChangeText={(pwd) => { setPassword(pwd) }}
                            onSubmitEditing={() => {}}
                            placeholderText={"PASSWORD"}
                        />
                        <VerticalSpacer height={constants.isTablet ? 30 : 40} />
                        <OptionButtonHolder>
                            <SubmitButton
                                title="Register"
                                onPress={handleRegister}
                            ></SubmitButton>
                        </OptionButtonHolder>
                        <VerticalSpacer height={constants.isTablet ? 20 : 20} />
                        <View style={{ alignItems: 'center' }}>
                            <NormalText>OR</NormalText>
                            <VerticalSpacer height={constants.isTablet ? 20 : 20} />
                            <TouchableOpacity 
                                activeOpacity={app.constants.active_opacity} 
                                style={{ 
                                    flexDirection: 'row', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    // paddingTop: 5,
                                    // paddingBottom: 5,
                                    // paddingLeft: 15,
                                    // paddingRight: 15,
                                    // borderWidth: 1,
                                    // borderColor: '#EDE9E9',
                                    borderRadius: 5,
                                    // shadowColor: 'rgba(0,0,0,0.25)', // IOS
                                    // shadowOffset: { height: 0, width: 4 }, // IOS
                                    // shadowOpacity: 1, // IOS
                                    // shadowRadius: 0,
                                    // elevation: 2
                                }}
                               onPress={handleGoogleRegister} 
                                >
                                <Image
                                    source={app.images.google}
                                    style={{ height: 55, width: 55 }}
                                />
                                {/*<HorizontalSpacer width={15} />
                                <NormalText bold size={16}>Google</NormalText>*/}
                            </TouchableOpacity>
                        </View>
                        <VerticalSpacer height={constants.isTablet ? 35 : 35} />
                        <TouchableOpacity
                            activeOpacity={app.constants.active_opacity}
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.navigate("Login");
                            }}
                            style={{ alignItems: 'center' }}
                        >
                            <NormalText style={{ paddingTop: 1 }}>
                                Already have an account ? {" "}
                                <ForgotPasswordText darkColor>
                                    Sign in
                                </ForgotPasswordText>
                            </NormalText>   
                        </TouchableOpacity>
                    </RegisterHolderView>
                </ScrollView>
            {/*</LinearGradient>*/}
        </KeyboardAwareScrollView>
        
    );
};

function moveStateToProps(state) {
    return {
        users: state.users,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            loginUser,
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(Register);

const RegisterHolderView = styled.View`
  width: ${constants.window_width}px;
  flex-direction: column;
  padding: 25px;
  background-color: transparent;
  justify-content: center;
`;

const ForgotPasswordText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 14px;
  line-height: 14px;
  font-weight: bold;
  color: ${(props) => (props.darkColor ? props.theme.colors.text : "#97999A")};
`;

const IconHolderView = styled.View`
  display: flex;
  padding-left: 15px;
  align-items: center;
`;

const BackArrowView = styled.View`
    background: #C8CED0;
    border-radius: 2px;
    padding: 7px;
    align-items: center;
    justify-content: center;
`;

const BackText = styled.Text`
    font-family: ${(props) => props.theme.fonts.bold};
    color: #413E3E;
`;