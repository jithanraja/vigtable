import React from "react";
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    TextInput,
    TouchableWithoutFeedback
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "./../../../stores/actions/users";
import LinearGradient from 'react-native-linear-gradient';
import styled from "styled-components/native";
import constants from "../../../config/constants";
import { HorizontalSpacer, NormalText, VerticalSpacer } from '../../../config/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import FIcon from 'react-native-vector-icons/Feather';
import CarouselCards from "../../../shared-components/CarouselCards";

const ListCommunity = ({ navigation, route, loginUser }) => {

    const communityData = [
        {
            communityName: "Community One",
            communityImage: app.images.community1,
            members: 123,
            private: true
        }, {
            communityName: "Community Two",
            communityImage: app.images.community2,
            members: 13
        }, {
            communityName: "Community Three",
            communityImage: app.images.community3,
            members: 59
        }
    ]

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
            }}
        >
            {/*<LinearGradient
                    colors={['#68BFEE', '#E5E5E5']}
                    start={{ x: 0.75, y: 0 }}
                    end={{ x: 0.6, y: 0.28 }}
                    locations={[0, 0.4]} 
                    style={{
                        backgroundColor: 'transparent',
                        paddingTop: 10,
                        width: constants.window_width,
                        minHeight: constants.window_height - 65,
                        position: 'absolute'
                    }}>
			</LinearGradient>*/}
            <HeaderView>
                <TittleView>
                    <TouchableOpacity
                        activeOpacity={app.constants.active_opacity}
                        onPress={() => {
                            console.log(navigation)
                            navigation.goBack();
                        }}
                    >
                        <BackArrowView>
                            <Image
                                source={app.images.backArrow}
                            />
                        </BackArrowView>
                    </TouchableOpacity>
                    <HorizontalSpacer width={15} />
                    <NormalText size={22} bold>Communities</NormalText>
                </TittleView>
                <Image
                    resizeMode="contain"
                    source={app.images.profile}
                    style={{ height: 35, width: 38 }}
                />
            </HeaderView>
            <RowView>
                <TextInput
                    autoCapitalize="none"
                    value={''}
                    onChangeText={(email) => { }}
                    placeholder={"Search"}
                    style={{
                        backgroundColor: '#FFF',
                        borderRadius: 10,
                        flex: 1,
                        paddingLeft: 60,
                        fontWeight: 'bold',
                        fontSize: 16,
                        lineHeight: 24,
                    }}
                />
                <FIcon name="search" size={20} style={{
                    position: 'absolute',
                    left: 45
                }} />
            </RowView>
            <ScrollView
                keyboardShouldPersistTaps={"handled"}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <ContentView>
                    <VerticalSpacer height={25} />
                    <CarouselCards
                        data={communityData}
                        carouselType="community"
                        title="Near You"
                        navigation={navigation}
                        isGuest={true}
                        containerSmall
                    />
                    <VerticalSpacer height={25} />
                    <NormalText bold>My Communities</NormalText>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={communityData}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets={false}
                        contentContainerStyle={{ paddingRight: 20, }}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            backgroundColor: 'transparent'
                        }}
                        numColumns={2}
                        renderItem={({ item, index }) => (<View style={{
                            width: '50%',
                            // alignItems: index%2 !== 0 ? 'flex-end' : 'flex-start',
                            marginBottom: 5
                        }}>
                            <TouchableWithoutFeedback onPress={() => {
                                navigation.navigate({
                                    name: "community",
                                    params: { screen: item.private ? "CommunityDetailsAdmin" : "CommunityDetailsMember" }

                                })
                            }}>
                                <CommunityView >
                                    <Image
                                        source={item.communityImage}
                                        resizeMode='cover'
                                        style={{
                                            height: 80,
                                            width: 120,
                                            marginTop: -20,
                                            backgroundColor: '#FAFAFA'
                                        }}
                                        borderRadius={10} />
                                    <VerticalSpacer height={15} />
                                    <View style={{ width: 120 }}>
                                        <NormalText numberOfLines={1} size={18}>{item.communityName}</NormalText>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            {item.private ? <Icon name="lock" /> : <Icon name="users" />}
                                            <HorizontalSpacer width={5} />
                                            <NormalText size={17} bold style={{ color: '#0074B1' }}>{item.members}</NormalText>
                                        </View>
                                    </View>
                                </CommunityView>
                            </TouchableWithoutFeedback>
                        </View>)}
                    />
                </ContentView>
            </ScrollView>
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

export default connect(moveStateToProps, matchDispatchToProps)(ListCommunity);

const HeaderView = styled.View`
  display: flex;
  align-items: center;
  padding: 30px 25px 35px;
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
    background: #C8CED0;
    border-radius: 2px;
    padding: 7px;
    align-items: center;
    justify-content: center;
`;

const ContentView = styled.View`
    padding: 0px 25px;
    flex: 1;
    background: transparent;
`

const CommunityView = styled.View`
    padding: 0px 20px 12px;
    background: #FFFFFF;
    border: 1px solid #DFDEDE;
    border-radius: 10px;
    margin-top: 35px;
    margin-bottom: 10px;
    margin-left: 10px;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: { width: 0, height: 1 };
    shadow-opacity: 0.8;
    shadow-radius: 2;
`

const RowView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: ${props => props.flexEnd ? 'flex-end' : 'center'};
    background-color: transparent;
    padding: 0 20px
`