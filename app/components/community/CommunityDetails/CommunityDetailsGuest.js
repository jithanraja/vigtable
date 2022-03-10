import React from "react";
import { FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../stores/actions/users";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../../config/constants";
import { BottomOptionsView, HorizontalSpacer, NormalText, OptionButtonHolder, SubmitButton, VerticalSpacer } from '../../../config/theme'
import PostsList from './Common/PostsList'
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const CommunityDetailsGuest = ({ navigation, route, loginUser }) => {
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
                    <NormalText color={'#FFFFFF'} size={22} bold>{'Community'}</NormalText>
                </TittleView>
            </HeaderView>
            <View style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: '100%',
                flex: 1,
                justifyContent: 'space-between',
                marginTop: 50
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: 188,
                        height: 174,
                        borderRadius: 10,
                        marginTop: -50,
                        elevation: 5,
                        backgroundColor: '#FAFAFA'
                    }}>
                        <Image 
                            source={app.images.community4}
                            resizeMode='cover'
                            style={{ width: '100%', flex: 1 }}
                            borderRadius={10} />
                    </View>
                    <VerticalSpacer height={20} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <NormalText size={22} color={'#15153A'} bold>{'Multiverse'}</NormalText>
                        <HorizontalSpacer width={5} />
                        <Icon name="users" />
                    </View>
                    <VerticalSpacer height={10} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '50%' }}>
                        <KMView >
                            <EntypoIcon color={'#0074B1'} size={15} name="location-pin" />
                            <NormalText size={13} color={'#656565'} bold>3</NormalText>
                            <NormalText size={11} style={{ marginTop: 4 }} color={'#656565'}> kms</NormalText>
                        </KMView>
                        <MemberCountView >
                            <Icon color={'#0074B1'} style={{ marginRight: 5, paddingTop: 3 }} size={13} name="user-friends" />
                            <NormalText size={13} color={'#656565'} bold>130</NormalText>
                        </MemberCountView>
                    </View>
                    <VerticalSpacer height={25} />
                    <View style={{ width: '100%', paddingLeft: 28, paddingRight: 28 }}>
                        <NormalText bold>Friends</NormalText>
                        <VerticalSpacer height={10} />
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={['Name', 'Name']}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => {
                                return <HorizontalSpacer width={18} />
                            }}
                            renderItem={({ item, index }) => (
                                <TouchableWithoutFeedback onPress={() => {}}>
                                    <View style={{
                                        backgroundColor: '#0074B1',
                                        borderRadius: 4,
                                        width: 100,
                                        alignItems: 'center',
                                        padding: 8
                                    }}>
                                        <Image source={app.images.profile} resizeMode="contain" style={{ height: 60, width: 70 }} />
                                        <VerticalSpacer height={5} />
                                        <NormalText color={'#FFF'} bold>{item}</NormalText>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        />
                        {/*<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                            <NormalText>No Friends!!</NormalText>
                        </View>*/}
                    </View>
                </View>
                <BottomOptionsView style={{ paddingTop: 8, paddingBottom: 8, height: 68 }}>
                    <OptionButtonHolder style={{ }}>
                        <SubmitButton title="Join" onPress={() => {}}></SubmitButton>
                    </OptionButtonHolder>
                </BottomOptionsView>
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

export default connect(moveStateToProps, matchDispatchToProps)(CommunityDetailsGuest);

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

const MemberCountView = styled.View`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const KMView = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    border-right-width: 1px;
    flex-direction: row;
    border-right-color:#C4C4C4;
`;