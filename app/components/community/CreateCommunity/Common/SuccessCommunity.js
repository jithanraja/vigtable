import React from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components/native";
import { loginUser, setCommunityStart } from "../../../../stores/actions/users";
const SuccessCommunity = ({navigation}) => {

    return (
        <Animatable.View
            animation="flipInX"
            iterationCount={1}>
            <ViewPopContainer>
                <Image
                    resizeMode="contain"
                    source={app.images.greenTick}
                    style={styles.tick}
                />
                <BoldText>Woo hoo..</BoldText>
                <NormalText>Your All set with your new community</NormalText>
                <Image
                    resizeMode="contain"
                    source={app.images.multiverse}
                    style={styles.multiverse}
                />
                <TouchableOpacity onPress={()=>{
                    setCommunityStart("true")
                    navigation.dispatch(StackActions.replace('Home', {
                        screen: 'Tabs',
                        params: {
                            screen: 'Dashboard'
                        }
                    }))
                }}>
                <InviteButton>
                    Invite Friends
                </InviteButton>
                </TouchableOpacity>
            </ViewPopContainer>
        </Animatable.View>
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
            loginUser, setCommunityStart
        },
        dispatch
    );
}
export default  connect(moveStateToProps, matchDispatchToProps)(SuccessCommunity);
const styles = StyleSheet.create({

    tick: {
        width: 93,
        height: 93,
        margin: 10,
        alignItems: 'center',
    },
    multiverse: {
        width: 103,
        height: 30,
        margin: 25,
        alignItems: 'center',
    }

})

export const InviteButton = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
    display:flex;
    padding: 10px 20px;
    background: #384509;
    border-radius: 5px;
    margin-top: 50px;
`;

export const NormalText = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    margin-top:6px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #000000;
`;
export const BoldText = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    margin-top:10px;
    line-height: 20px;
    letter-spacing: 0.4px;
    color: #000000;
`;

export const ViewPopContainer = styled.View`
    position: relative;
    width: 90%;
    min-height: 383px;
    padding: 20px 0; 
    elevation: 3;
    margin: auto;
    align-items: center;
    background: #F8F8F8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
`;
