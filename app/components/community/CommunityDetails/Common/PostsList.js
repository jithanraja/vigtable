import React from "react";
import {
    View,
    Image,
    FlatList,
    SafeAreaView,
    TouchableWithoutFeedback,
    Text
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "./../../../../stores/actions/users";
import styled from "styled-components/native";
import {  NormalText } from '../../../../config/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from "react-native-gesture-handler";

const PostsList = ({ navigation, route, loginUser,memberPage }) => {

    const communityData = [
        {
            communityName: "Community One",
            communityImage: app.images.unflash,
            members: 123,
            private: true
        }, {
            communityName: "Community Two",
            communityImage: app.images.unflash,
            members: 13
        }, {
            communityName: "Community Three",
            communityImage: app.images.unflash,
            members: 59
        }
    ]

    return (<View style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: '100%',
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <UserImageView>
                        <Image source={app.images.community4}
                            resizeMode='cover'
                            style={{ width: '100%', flex: 1 }}
                            borderRadius={10} />
                    </UserImageView>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <InviteButton >
                            <TouchableWithoutFeedback style={{padding:10}} onPress={()=>{memberPage(true)}}>
                                <InviteText >Invite Friends</InviteText>
                                 </TouchableWithoutFeedback>
                                  </InviteButton>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 10, width: '80%' }}>
                            <KMView >
                                <EntypoIcon color={'#0074B1'} size={15} name="location-pin" />
                                <NormalText size={13} color={'#656565'} bold>3</NormalText>
                                <NormalText size={11} style={{ marginTop: 4 }} color={'#656565'}> kms</NormalText>
                            </KMView>
                            <TouchableWithoutFeedback  onPress={()=>{memberPage(true)}}>
                            <MemberCountView>
                                <Icon color={'#0074B1'} style={{ marginRight: 5, paddingTop: 3 }} size={13} name="user-friends" />
                                <NormalText size={13} color={'#656565'} bold>130</NormalText>
                            </MemberCountView>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={{ paddingLeft: 25, paddingTop: 17 }}>
                    <NormalText color={'#15153A'} size={16} bold>Recent Posts</NormalText>
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={communityData}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets={false}
                        contentContainerStyle={{ flex: 1, marginLeft: 10, marginBottom: 20, marginRight: 20 }}

                        renderItem={({ item, index }) => (<View style={{
                            width: '100%',
                            height: 83,
                            marginBottom: 20
                        }}>
                            <CommunityView>
                                <Image
                                    source={item.communityImage}
                                    resizeMode='cover'
                                    style={{
                                        height: 91,
                                        width: 100,
                                        marginTop: -5,
                                        backgroundColor: '#FAFAFA'
                                    }} />
                                <View style={{ flex: 1 }}>
                                    <ContentView>
                                        <NormalText style={{ flex: 1 }} size={12} color={'#000000'} bold>New Post</NormalText>
                                        <NormalText size={10} color={'#ADADAD'} >2 Comments</NormalText>
                                    </ContentView>
                                    <ContentView>
                                        <NormalText size={10} color={'#ADADAD'} >Lorem Ipsum is simply dummy text</NormalText>
                                    </ContentView>
                                    <ContentView style={{ position: 'absolute', bottom: 0, }}>

                                        <NormalText style={{ flex: 1 }} size={10} color={'#ADADAD'} >15-Nov-2021, 10:30 AM</NormalText>
                                        <NormalText size={12} color={'#000000'} >Elasamraj</NormalText>
                                    </ContentView>
                                </View>
                            </CommunityView>
                        </View>)} />
                </SafeAreaView>
            </View>

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

export default connect(moveStateToProps, matchDispatchToProps)(PostsList);


const UserImageView = styled.View`
    width: 108px;
    height: 100px;
    border-radius: 10px;
    margin-top: -50px;
    elevation: 5;
    margin-left:25px;
    background-color:#FAFAFA;
`;
const InviteButton = styled.View`
    background: #384509;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    margin-right:22px;
    margin-top:-18px;
`;
const InviteText = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    padding:5px 5px;
    line-height: 20px;
    text-align:center;
    letter-spacing: 0.4px;
    color: #FFFFFF;
`

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

const ContentView = styled.View`
    display: flex;
    padding: 2px 10px;
    flex-direction: row;
    background: transparent;
`

const CommunityView = styled.View`
    display: flex;
    flex-direction: row;
     height:83px;
    padding: 0px;
    background: #F4F4F4;
    border: 1px solid #E4FDFF;
    border-radius: 2px;
    margin-top: 35px;
    margin-bottom: 10px;
    margin-left: 10px;
    elevation: 1;
`