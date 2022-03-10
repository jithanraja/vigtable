import React, { useRef } from "react";
import {
    TouchableOpacity,
    Keyboard,
    Image,
    View,
    KeyboardAvoidingView
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components/native";
import constants from "../../../config/constants";
import { HeadingText, HorizontalSpacer, NormalText, OptionButtonHolder, SubHeadingText, SubmitButton, VerticalSpacer } from "../../../config/theme";
import { loginUser } from "./../../../stores/actions/users";
import OTPTextView from 'react-native-otp-textinput'
import LinearGradient from 'react-native-linear-gradient';

const OTP = ({ navigation, route, loginUser }) => {

    let otpInput = useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View 
                //colors={['#68BFEE', '#FFFFFF']} 
                style={{ flex: 1 }}
                //start={{ x: 1, y: 0.01 }}
                //end={{ x: 0.2, y: 0.7 }}
                //locations={[0, 0.12]}
            >
                <RegisterHolderView>
                    <View>
                        <IconHolderView>
                            <Image
                                resizeMode="contain"
                                source={app.images.KCLogo}
                                style={{ marginBottom: 50, width: 200, height: 100 }}
                            />
                            <TouchableOpacity
                                activeOpacity={app.constants.active_opacity}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    navigation.navigate("Login");
                                }}
                                style={{ position: 'absolute', left: 0, top: 50, width: 25, height: 25 }}
                            >
                                <BackArrowView>
                                    <Image
                                        source={app.images.backArrow}
                                    />
                                </BackArrowView>
                            </TouchableOpacity>
                        </IconHolderView>
                        <View>
                            <Image
                                source={app.images.waterVegetables}
                                resizeMode="contain"
                                style={{
                                    height: 200,
                                    width: 160,
                                    position: 'absolute',
                                    right: -55,
                                    top: -110
                                }}
                            />
                        </View>
                        <VerticalSpacer height={50} />
                        <View style={{ alignItems: 'center' }}>
                            <NormalText size={26}>Enter your 4-digit code</NormalText>
                            <VerticalSpacer height={5} />
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <NormalText size={12} style={{ color: '#7C7C7C' }}>
                                    Sent to
                                </NormalText>
                                <HorizontalSpacer width={10} />
                                <NormalText size={16}>
                                    + 91 999 492 3393
                                </NormalText>
                            </View>
                        </View>
                        <VerticalSpacer height={10} />
                        <OTPTextView 
                            inputCount={4}
                            keyboardType="numeric" 
                            ref={e => (otpInput = e)} 
                            handleTextChange={(text) => {}}
                            tintColor="#AE9C9C"
                        />
                    </View>
                    <OptionButtonHolder>
                        <SubmitButton
                            title="Resend"
                            buttonStyle={'forgotCancel'}
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.navigate("Login");
                            }}
                        ></SubmitButton>
                        <HorizontalSpacer width={15} />
                        <SubmitButton
                            title="Reset"
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.navigate("ResetPassword");
                            }}
                        ></SubmitButton>
                    </OptionButtonHolder>
                </RegisterHolderView>
            </View>
        </KeyboardAvoidingView>
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

export default connect(moveStateToProps, matchDispatchToProps)(OTP);

const RegisterHolderView = styled.View`
  width: ${constants.window_width}px;
  flex-direction: column;
  padding: 25px;
  background-color: transparent;
  flex-direction: column;
  justify-content: space-between;
  height: ${constants.window_height}px;
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