import React from "react";
import {
    TouchableOpacity,
    Keyboard,
    View,
    Text
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "./../../../stores/actions/users";

const ChatList = ({ navigation, route, loginUser }) => {


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
            loginUser,
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(ChatList);