import React from "react";
import {
    TouchableOpacity,
    Image,
} from "react-native";

import styled from "styled-components/native";
import constants from "../../../../config/constants";
import { HorizontalSpacer, NormalText } from '../../../../config/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'

const CommunityDetailsHeader = ({ navigation, route, title, isAdmin,isMember }) => {
    return (
        <HeaderView>
            <TittleView>
                <TouchableOpacity
                    activeOpacity={app.constants.active_opacity}
                    onPress={() => {
                        console.log(navigation)
                        navigation.navigate('ListCommunity');
                    }}>
                    <BackArrowView>
                        <Image source={app.images.backArrow} />
                    </BackArrowView>
                </TouchableOpacity>
                <HorizontalSpacer width={15} />
                <NormalText color={'#FFFFFF'} size={22} bold>{title}</NormalText>
                {isAdmin ? <>
                        <Icon style={{ marginLeft: 5, marginTop: 5 }} color={'#908A8A'} name="lock" />
                       {isMember? null: <Icon style={{ marginLeft: 5, marginTop: 5 }} color={'#FFF'} name="pen" />}
                    </>
                    : <Icon style={{ marginLeft: 5, marginTop: 5 }} color={'#908A8A'} name="users" />}
            </TittleView>
        </HeaderView>);
};


export default CommunityDetailsHeader;

const HeaderView = styled.View`
  display: flex;
  align-items: center;
  padding: 30px 25px 20px;
  flex-direction: row;
  justify-content: space-between;
  width: ${constants.window_width};
  background: transparent;
`;

const TittleView = styled.View`
    display: flex;   
    flex-direction: row;
    align-items: center;
    background: transparent;
`

const BackArrowView = styled.View`
    background: #E7EAEB;
    border-radius: 2px;
    padding: 7px;
    align-items: center;
    justify-content: center;
`;

