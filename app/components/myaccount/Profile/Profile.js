import React from "react";
import {
    TouchableOpacity,
    Keyboard,
    View,
    Text,
    Button
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logoutUser, setAddressStart, setGetStart, setCommunityStart } from "./../../../stores/actions/users";

const Profile = ({ navigation, route, logoutUser, setGetStart, setAddressStart, setCommunityStart }) => {


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
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: app.constants.window_height }}>
                    <Text>Content goes here</Text>
                    <TouchableOpacity
                        activeOpacity={app.constants.active_opacity}
                        onPress={() => {
                            Keyboard.dismiss();
                            setGetStart(false);
                            setAddressStart(null);
                            setCommunityStart('false')
                            logoutUser();
                        }}
                    >
                        <Text style={{ padding: 10, backgroundColor: '#FFAA77' }}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
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
            logoutUser,
            setGetStart,
            setAddressStart,
            setCommunityStart
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(Profile);