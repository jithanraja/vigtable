import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setGetStart } from "./../../../stores/actions/users";
import GetStartSwiper from '../../../shared-components/GetStartSwiper';
import styled from "styled-components/native";

const GetStart = ({ navigation, route, setGetStart}) => {

    const  handleGettingStarted = () => {
        setGetStart(true)
        navigation.navigate("AddressSelect")
    };

    return (
        <ContainerView> 
            <GetStartSwiper handleGettingStarted={handleGettingStarted} />
        </ContainerView>
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
            setGetStart
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(GetStart);

const ContainerView = styled.View`
  display: flex;
  align-items: center;
  flex: 1;
  background-color:transparent;
  justify-content:space-between;;
`;