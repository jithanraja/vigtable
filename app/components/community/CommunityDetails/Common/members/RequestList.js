import React from "react";
import {
    View,
    Image,
    FlatList,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../../../stores/actions/users";
import styled from "styled-components/native";
import constants from "../../../../../config/constants";
import { HorizontalSpacer, NormalText, VerticalSpacer } from '../../../../../config/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const RequestList = ({ navigation, route, loginUser,isModelVisible }) => {

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
                onChangeText={(email) => { }}
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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>

                <VerticalSpacer height={25} />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={['Ela', 'Sam', 'Raja']}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return <HorizontalSpacer width={20} />
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableWithoutFeedback style={{ width: '30%' }} onPress={() => {isModelVisible(true) }}>
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

export default connect(moveStateToProps, matchDispatchToProps)(RequestList);


const RowView = styled.View`
    flex-direction: row;
    margin: 20px 20px 0px 20px;
    justify-content: space-between;
    align-items: ${props => props.flexEnd ? 'flex-end' : 'center'};
    background-color: transparent;
`