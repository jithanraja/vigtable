import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Image, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../stores/actions/users";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../../config/constants";
import { HorizontalSpacer, NormalText, VerticalSpacer, SubmitButton } from '../../../config/theme'
import CommunityDetailsHeader from './Common/CommunityDetailsHeader'
import PostsList from './Common/PostsList'
import Members from './Common/Members'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import styled from "styled-components/native";

const CommunityDetailsAdmin = ({ navigation, route, loginUser }) => {
    const [isMember, setIsMember] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [isAccept, setIsAccept] = useState(true)
    const renderOutSideTouchable = (onTouch) => {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) view
        return (<TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
            {view}
        </TouchableWithoutFeedback>)
    }
    const onTouchOutSide = () => {
        setModalVisible(false)
    }
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
                style={styles.linearStyle}>
            </LinearGradient>
            <CommunityDetailsHeader navigation={navigation} title={'Marvels'} isAdmin={true} isMember={isMember} ></CommunityDetailsHeader>
            {isMember ? <View style={{ flexDirection: 'row-reverse', width: '100%', marginBottom: 5 }}>
                <HorizontalSpacer width={113} />
                <View >
                    <NormalText color={'#C4C4C4'} numberOfLines={1} size={14}>Members</NormalText>
                </View>
            </View> : <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5 }}>
                <HorizontalSpacer width={142} />
                <View >
                    <NormalText color={'#FFFAFA'} numberOfLines={1} size={14}>Admin</NormalText>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <NormalText size={10} color={'#FFFAFA'} >Since 13-Dec-2021</NormalText>
                    </View>
                </View>
            </View>}
            {isMember ? <Members  isModelVisible={setModalVisible}/> : <PostsList memberPage={setIsMember} />}


            <TouchableOpacity onPress={() =>  navigation.navigate("Home", {
                                screen: "Tabs",
                                params: {
                                    screen: "community",
                                    params: {
                                        screen: 'CreatePost'
                                    }
                                }
                            })} style={styles.floatButton} >
                <AntDesignIcon name='plus' size={30} color='#FFF' />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);

                }}>
                <View
                    style={styles.modelContainer}>
                    {renderOutSideTouchable(onTouchOutSide)}
                    <View style={styles.modelSubContainer}>
                        <ModelRectangle />
                        <NormalText color={'#000'} numberOfLines={1} size={16} bold>Elasamraj</NormalText>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <NormalText color={'#A8A8A8'} numberOfLines={1} size={13} >wants to join your</NormalText>
                            <NormalText color={'#000'} numberOfLines={1} size={13} bold> Marvel </NormalText>
                            <NormalText color={'#A8A8A8'} numberOfLines={1} size={13} >Community</NormalText>
                        </View>

                        <TouchableOpacity onPress={() => setIsAccept(true)} style={styles.acceptStyle}>
                            <NormalText color={'#000'} style={{ flex: 1 }} numberOfLines={1} size={16} bold> Accept </NormalText>
                            {isAccept ? <Image
                                resizeMode="contain"
                                source={app.images.greenTick}
                                style={styles.tick} /> : null}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsAccept(false)} style={styles.denyStyle}>
                            <NormalText color={'#000'} style={{ flex: 1 }} numberOfLines={1} size={16} bold> Deny </NormalText>
                            {!isAccept ? <Image
                                resizeMode="contain"
                                source={app.images.greenTick}
                                style={styles.tick} /> : null}
                        </TouchableOpacity>

                        <BottomContainer>
                            <SubmitButton
                                title="Cancel"
                                buttonStyle={'forgotCancel'}
                                onPress={() => { setModalVisible(false) }}></SubmitButton>
                            <HorizontalSpacer width={15} />
                            <SubmitButton
                                title="Confirm"
                                onPress={() => {
                                    // changePage();
                                }}>
                            </SubmitButton>
                        </BottomContainer>
                    </View>
                </View>
            </Modal>
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

export default connect(moveStateToProps, matchDispatchToProps)(CommunityDetailsAdmin);


const styles = StyleSheet.create({
    linearStyle:{
        backgroundColor: 'transparent',
        paddingTop: 10,
        width: constants.window_width,
        minHeight: constants.window_height - 65,
        position: 'absolute'
    },
    floatButton: {
        borderWidth: 1,
        borderColor: '#2D8CC0',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 20,
        right: 12,
        height: 70,
        elevation: 4,
        backgroundColor: '#2D8CC0',
        borderRadius: 100,
    },
    modelContainer: {
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'flex-end'
    },
    modelSubContainer: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tick: {
        width: 11,
        height: 11,
        margin: 5,
        alignItems: 'center',
    },
    acceptStyle:{
        borderBottomWidth: 1,
        borderBottomColor:'#D6D6D6',
        width: '100%', 
        padding: 15, 
        flexDirection: 'row'
    },
    denyStyle:{
        width: '100%', 
        padding: 15, 
        flexDirection: 'row'
    }
})

export const BottomContainer = styled.View`
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top:10px;
    margin-bottom:25px;
`;

export const ModelRectangle = styled.View`
    width: 105px;
    height: 5px;
    margin:auto;
    margin-bottom:5px;
    background: #000000;
    border-radius: 4px;
`;
