import React, { useState, createRef } from "react";
import {
    TouchableOpacity,
    Keyboard,
    Image,
    View,
    ScrollView
} from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as Animatable from "react-native-animatable";
import constants from "../../../config/constants";
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

const Forgot = ({ navigation, route, loginUser }) => {


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
            <ForgotHolderView style={{ height: constants.window_height }}>
                <View>    
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
                    <View>
                        <Animatable.Image
                            source={app.images.waterVegetables}
                            resizeMode="contain"
                            style={{
                                height: 200,
                                width: 160,
                                position: 'absolute', 
                                right: -10, 
                                top: -70
                            }}
                            animation="slideInRight"
                            iterationCount={1}
                        />
                    </View>
                    <IconHolderView>
                        <Animatable.Image
                            resizeMode="contain"
                            animation="slideInLeft"
                            iterationCount={1}
                            source={app.images.KCLogo}
                            style={{ marginBottom: (constants.isTablet ? 50 : 0), width: (constants.isTablet ? 208 : 200), height: (constants.isTablet ? 220 : 150) }}
                        />
                    </IconHolderView>
                </View>
                
                <Animatable.View
                    animation="slideInUp"
                    iterationCount={1}
                    style={{
                        width: (constants.isTablet ? 422 : app.constants.window_width),
                        backgroundColor: 'transparent',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 20,
                        elevation: 2,
                        shadowColor: 'rgba(0,0,0,0.25)', // IOS
                        shadowOffset: { height: 0, width: 4 }, // IOS
                        shadowOpacity: 0.8, // IOS
                        shadowRadius: 0,
                    }}
                >
                    <ScrollView>
                        <HeadingText>Forgot Password</HeadingText>
                        <SubHeadingText>
                            Enter the Email/Phone
                        </SubHeadingText>
                        <VerticalSpacer height={22} />
                        <InputField
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={''}
                            maxLength={255}
                            onChangeText={(email) => {}}
                            onSubmitEditing={() => {}}
                            placeholderText={"EMAIL/MOBILE"}
                        />
                        <VerticalSpacer height={constants.isTablet ? 25 : 25} />
                        <OptionButtonHolder>
                            <SubmitButton
                                title="Cancel"
                                buttonStyle={'forgotCancel'}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    navigation.navigate("Login");
                                }}
                            ></SubmitButton>
                            <HorizontalSpacer width={15} />
                            <SubmitButton
                                title="Send OTP"
                                onPress={() => {
                                    Keyboard.dismiss();
                                    navigation.navigate("OTP");
                                }}
                            ></SubmitButton>
                        </OptionButtonHolder>
                        
                    </ScrollView>
                </Animatable.View>
                
            </ForgotHolderView>
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

export default connect(moveStateToProps, matchDispatchToProps)(Forgot);

const ForgotHolderView = styled.View`
  width: ${constants.window_width}px;
  flex-direction: column;
  justify-content: space-between;
`;

const IconHolderView = styled.View`
  display: flex;
  margin-top: -60px;
  padding-left: 15px;
`;