import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../stores/actions/users";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../../config/constants";
import { HorizontalSpacer, NormalText, VerticalSpacer } from '../../../config/theme'
import CommunityDetailsHeader from './Common/CommunityDetailsHeader'
import PostsList from './Common/PostsList'

const CommunityDetailsMember = ({ navigation, route, loginUser }) => {
    return (
        <KeyboardAwareScrollView
            bounces={false}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                flex: 1
            }}>
            <LinearGradient
                colors={['#68BFEE', '#153A4F']}
                start={{ x: 1, y: 2 }} end={{ x: 0.7, y: 0.7 }}
                style={{
                    backgroundColor: 'transparent',
                    paddingTop: 10,
                    width: constants.window_width,
                    minHeight: constants.window_height - 65,
                    position: 'absolute'
                }}>
            </LinearGradient>
            <CommunityDetailsHeader navigation={navigation} title={'Multiverse'}></CommunityDetailsHeader>
            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5 }}>
                <HorizontalSpacer width={142} />
                <View >
                    <NormalText color={'#FFFAFA'} numberOfLines={1} size={14}>Member</NormalText>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <NormalText size={10} color={'#FFFAFA'} >Since 13-Dec-2021</NormalText>
                    </View>
                </View>
            </View>
            <PostsList></PostsList>
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

export default connect(moveStateToProps, matchDispatchToProps)(CommunityDetailsMember);
