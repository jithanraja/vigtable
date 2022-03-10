import React, { useState, createRef, useEffect } from "react";
import {
    TouchableOpacity,
    Keyboard,
    Image,
    View,
    ScrollView
} from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";

import * as Animatable from "react-native-animatable";
import constants from "../../../config/constants";
import { StackActions } from "@react-navigation/native";
import { postCall } from "../../../services/api";
import {
    HeadingText,
    SubHeadingText,
    VerticalSpacer,
    OptionButtonHolder,
    SubmitButton,
    NormalText,
    HorizontalSpacer
} from "./../../../config/theme";
const InputField = require("./../../../shared-components/inputField");
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "./../../../stores/actions/users";
import { utils } from './../../../utility/utils'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const Login = ({ navigation, route, loginUser }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let emailInput = createRef();
    let passwordInput = createRef();

    const { enableSignup } = route.params;
    const { colors } = useTheme();

    useEffect(() => {
        console.log(Image.resolveAssetSource(app.images.loginBg))
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

    const handleUserLogin = async(email = "", password = "") => {
        const response = await postCall('users/login', {
              email,
              password
        })

        if(response.data.status) {
            loginUser({ user: response.data.data });
            utils.showSuccess(response.data.message);
        } else {
            utils.showError(response.data.message);
        }
        // navigation.navigate("Home");
    };

    const didTapLoginButton = () => {
        Keyboard.dismiss();
        if (!utils.validateEmail(email) && email.length < 10) {
            utils.showError("Please enter valid email address or phone number.");
            return;
        }
        if (!password) {
            utils.showError("Please enter password.");
            return;
        }

        handleUserLogin(email, password);
    };

    const handleGoogleLogin = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            const response = await postCall('users/googleLogin', {
                idToken: userInfo.idToken
            })
            console.log(response)
            if(response.data.status) {
                loginUser({ user: response.data.data });
                utils.showSuccess(response.data.message);
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
            <LoginHolderView>
                
                <View style={{ 
                    aspectRatio: 1 * 1.4
                 }}>
                    <Image
                        source={app.images.loginBg}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        blurRadius={0}
                        borderRadius={0}
                    />
                </View>
                <View style={{  }}>
                    <Image
                        source={app.images.waterVegetables}
                        resizeMode="contain"
                        style={{
                            height: 200,
                            width: 160,
                            position: 'absolute', 
                            right: -10, 
                            top: -70
                        }}
                    />
                </View>
                <IconHolderView style={{
                    backgroundColor: 'transparent'
                }}>
                    <Animatable.Image
                        resizeMode="contain"
                        animation="zoomIn"
                        iterationCount={1}
                        source={app.images.KCLogo}
                        style={{ marginBottom: (constants.isTablet ? 50 : 0), width: (constants.isTablet ? 208 : 200), height: (constants.isTablet ? 220 : 150) }}
                    />
                </IconHolderView>
                
                <Animatable.View
                    animation="slideInUp"
                    iterationCount={1}
                    style={{
                        width: (constants.isTablet ? 422 : app.constants.window_width),
                        backgroundColor: 'transparent',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        padding: 20
                    }}
                >
                    <ScrollView>
                        <HeadingText>Welcome Back</HeadingText>
                        <SubHeadingText>
                            Login to your account
                        </SubHeadingText>
                        <VerticalSpacer height={22} />
                        <InputField
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            maxLength={255}
                            ref={emailInput}
                            onChangeText={(email) => setEmail(email)}
                            onSubmitEditing={() => passwordInput.current.inputRef.focus()}
                            placeholderText={"EMAIL/MOBILE"}
                        />
                        <VerticalSpacer height={constants.isTablet ? 30 : 25} />
                        <InputField
                            autoCapitalize="none"
                            secureTextEntry
                            value={password}
                            maxLength={20}
                            ref={passwordInput}
                            onChangeText={(password) => setPassword(password)}
                            onSubmitEditing={didTapLoginButton}
                            placeholderText={"PASSWORD"}
                        />
                        <VerticalSpacer height={constants.isTablet ? 25 : 25} />
                        <OptionButtonHolder>
                            <SubmitButton
                                title="Login"
                                onPress={didTapLoginButton}
                            ></SubmitButton>
                        </OptionButtonHolder>
                        <VerticalSpacer height={5} />
                        <TouchableOpacity
                            activeOpacity={app.constants.active_opacity}
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.navigate("ForgotPassword", {
                                    enableSignup: enableSignup,
                                });
                            }}
                        >
                            <ForgotPasswordView>
                                <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
                            </ForgotPasswordView>
                        </TouchableOpacity>
                        <VerticalSpacer height={constants.isTablet ? 21 : 10} />
                        <View style={{ alignItems: 'center' }}>
                            <NormalText>OR</NormalText>
                            <VerticalSpacer height={constants.isTablet ? 21 : 10} />
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
                                onPress={handleGoogleLogin}>
                                <Image
                                    source={app.images.google}
                                    style={{ height: 55, width: 55 }}
                                />
                                {/*<HorizontalSpacer width={15} />
                                <NormalText bold size={16}>Google</NormalText>*/}
                            </TouchableOpacity>
                        </View>
                        <VerticalSpacer height={constants.isTablet ? 21 : 10} />
                        {enableSignup && (
                            <TouchableOpacity
                                activeOpacity={app.constants.active_opacity}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    navigation.navigate("RegisterProfile");
                                }}
                            >
                                <RegisterHolderView>
                                    <NormalText style={{ paddingTop: 1 }}>
                                        Don't have an account ? {" "}
                                        <ForgotPasswordText darkColor>
                                            Sign up
                                        </ForgotPasswordText>
                                    </NormalText>
                                </RegisterHolderView>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </Animatable.View>
                
            </LoginHolderView>
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

export default connect(moveStateToProps, matchDispatchToProps)(Login);

const LoginHolderView = styled.View`
  width: ${constants.window_width}px;
  flex-direction: column;
`;

const IconHolderView = styled.View`
  display: flex;
  margin-top: -60px;
  padding-left: 15px;
`;

const ForgotPasswordView = styled.View`
  margin-left: 10px;
  margin-top: 6px;
  background-color: transparent;
  align-items: flex-end;
  justify-content: center;
`;

const ForgotPasswordText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 14px;
  line-height: 14px;
  font-weight: bold;
  color: ${(props) => (props.darkColor ? props.theme.colors.text : "#97999A")};
`;

const RegisterHolderView = styled.View`
  height: 38px;
  padding: 10px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;
