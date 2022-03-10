import React from "react";
import {
    View,
    Image,
    FlatList,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../../../stores/actions/users";
import styled from "styled-components/native";
import constants from "../../../../../config/constants";
import { HorizontalSpacer, NormalText,VerticalSpacer } from '../../../../../config/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const MemberList = ({ navigation, route, loginUser }) => {

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
               <RowView>
                            <TextInput
                                autoCapitalize="none"
                                value={''}
                                onChangeText={(email) => {}}
                                placeholder={"Search"}
                                style={{
                                    backgroundColor: '#EFEEEE',
                                    borderRadius: 10,
                                    flex: 1,
                                    paddingLeft: 60,
                                    fontWeight: '600',
                                    fontSize: 16,
                                    lineHeight: 24
                                }}
                            />
                          
                            <Icon name="search" size={20} style={{
                                position: 'absolute',
                                left: 25
                            }} />
                        </RowView>
                <SafeAreaView style={{ flex: 1 , marginTop:10,}}>
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
                            height: 87,
                            paddingLeft:10,
                            borderColor:'#8B8181',
                            borderBottomWidth:0.5,
                            position:'relative',
                        }}>
                            <CommunityView>

                                <Image
                                    source={item.communityImage}
                                    resizeMode='cover'
                                    style={{
                                        height: 60,
                                        width: 68,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        backgroundColor: '#FAFAFA',
                                        borderRadius:4
                                    }} />
                                <View style={{ flex: 1 }}>
                                    <ContentView>
                                        <NormalText style={{ flex: 1 }} size={14} color={'#000000'} bold>Ela san</NormalText>
                                        <NormalText size={12} color={'#ADADAD'} >Tap to Chat</NormalText>
                                    </ContentView>
                                    <ContentView>
                                        <NormalText size={10} color={'#847E7E'} >Admin</NormalText>
                                    </ContentView>
                                </View>
                                <View style={{position:'absolute',bottom:2,right:0,flexDirection:'row'}}>
                                <ChooseBotton>Make Admin</ChooseBotton>
                                <ChooseBotton>Unfriend</ChooseBotton>
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

export default connect(moveStateToProps, matchDispatchToProps)(MemberList);



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
    background: #FFFFFF;
    justify-content:center;
    align-items:center;
    border-radius: 2px;
    margin-left: 10px;
`
const RowView = styled.View`
    flex-direction: row;
    margin: 20px 20px 0px 20px;
    justify-content: space-between;
    align-items: ${props => props.flexEnd ? 'flex-end' : 'center'};
    background-color: transparent;
`
const ChooseBotton = styled.Text`
    background: #1B4D7B;
    border-radius: 2px
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    margin-right:5px;
    text-align:center;
    width:103px;
    padding:5px 10px;
    color: #FFFFFF;
`