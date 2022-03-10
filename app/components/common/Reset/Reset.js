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

const Reset = ({ navigation, route, loginUser }) => {


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
                    <TouchableOpacity
                        activeOpacity={app.constants.active_opacity}
                        onPress={() => {
                            Keyboard.dismiss();
                            navigation.navigate("Login");
                        }}
                    >
                        <Text style={{ backgroundColor: '#FFADEF', padding: 10 }}>Back to Login</Text>
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
            loginUser,
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(Reset);