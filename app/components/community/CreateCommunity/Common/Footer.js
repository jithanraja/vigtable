import { StackActions } from "@react-navigation/native";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components/native";
import { HorizontalSpacer, OptionButtonHolder, SubmitButton, VerticalSpacer } from "../../../../config/theme";
import { loginUser, setCommunityStart } from "../../../../stores/actions/users";


const Footer = ({ navigation, route, loginUser, setCommunityStart, changePage, page }) => {

    return (
        <OptionButtonHolder>
            {page != 5 ? <>
                <SubmitButton
                    title="Skip"
                    buttonStyle={'forgotCancel'}
                    onPress={() => {
                        setCommunityStart("true");
                        navigation.dispatch(StackActions.replace('Home', {
                            screen: 'Tabs',
                            params: {
                                screen: 'Dashboard'
                            }
                        }))
                    }}
                ></SubmitButton>
                <HorizontalSpacer width={15} />
                <SubmitButton
                    title="Next"
                    onPress={() => {
                        changePage();
                    }}></SubmitButton>
            </> : null}
            {page == 5 ? <SubmitButton
                title="Skip"
                onPress={() => {
                    setCommunityStart("true")
                    navigation.dispatch(StackActions.replace('Home', {
                        screen: 'Tabs',
                        params: {
                            screen: 'Dashboard'
                        }
                    }))
                    // changePage(1);
                }}>

            </SubmitButton> : null}
        </OptionButtonHolder>
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

export default connect(moveStateToProps, matchDispatchToProps)(Footer);


const BottomView = styled.View`
  z-index:9999;
`;