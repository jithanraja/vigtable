import React,{useState} from "react";
import {
    View,
    Image,
    FlatList,
    SafeAreaView,
    Text
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../../stores/actions/users";
import styled from "styled-components/native";
import MemberList from './members/MemberList'
import RequestList from './members/RequestList'
import {  NormalText } from '../../../../config/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const Members = ({ navigation, route, loginUser ,isModelVisible}) => {
    const [index,setIndex] =useState(0)
    const [routes,setRoutes] =useState([
        { key: 'members', title: 'Members' },
        { key: 'requests', title: 'Requests' },
    ])
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
  const  handleIndexChange = index => {
    setIndex(index);
	};


    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#0C1A4A' }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: focused ? "#0C1A4A" : "#AAA6A6", margin: 4, fontWeight: "bold",fontSize:16 }}>
                    {route.title}
                </Text>
            )}
            style={{ backgroundColor: 'white', color: "#AAA6A6", elevation: 1 }}
        />
    );

    return (<View style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: '100%',
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {/* <UserImageView>
                        <Image source={app.images.community4}
                            resizeMode='cover'
                            style={{ width: '100%', flex: 1 }}
                            borderRadius={10} />
                    </UserImageView> */}
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <UserImageView>
                        <Image source={app.images.community4}
                            resizeMode='cover'
                            style={{ width: '100%', flex: 1 }}
                            borderRadius={10} />
                    </UserImageView>
                        </View>
    
                    </View>
                </View>
                {/* <View style={{ paddingLeft: 25, paddingTop: 17 }}>
                    <NormalText color={'#15153A'} size={16} bold>Recent Posts</NormalText>
                </View> */}


                <TabView
					navigationState={{ index: index, routes: routes }}
					indicatorStyle={{ color: "#EF757B",height: 2, }}
                    style={{marginTop:15, borderTopLeftRadius: 20,
                        borderTopRightRadius: 20}}
					renderTabBar={renderTabBar}
					renderScene={({ route }) => {
						switch (route.key) {
							case 'members':
								return <MemberList/>
							case 'requests':
								return <RequestList isModelVisible={isModelVisible} />;
							default:
								return null;
						}
					}}
					onIndexChange={handleIndexChange}
				/>
  
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

export default connect(moveStateToProps, matchDispatchToProps)(Members);


const UserImageView = styled.View`
    width: 79px;
    height: 72px;
    border-radius: 10px;
    margin-top: -50px;
    elevation: 5;
    margin-right:25px;
    background-color:#FAFAFA;
`;
const InviteButton = styled.Text`
    background: #384509;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    font-family: ${(props) => props.theme.fonts.regular};
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    padding:5px 5px;
    line-height: 20px;
    text-align:center;
    letter-spacing: 0.4px;
    color: #FFFFFF;
    margin-right:22px;
    margin-top:-18px;
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