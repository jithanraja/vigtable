import React from "react";
import { FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, TextInput } from "react-native";
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
const InputField = require("../../../shared-components/inputField");
import EntypoIcon from 'react-native-vector-icons/Entypo'

const CreatePost = ({ navigation, route, loginUser }) => {
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
                    <NormalText color={'#FFFFFF'} size={22} bold>{'Marvels'}</NormalText>
                    <Icon style={{ marginLeft: 5, marginTop: 5 }} color={'#908A8A'} name="lock" />
                    <Icon style={{ marginLeft: 5, marginTop: 5 }} color={'#FFF'} name="pen" />
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
                        width: 111,
                        height: 100,
                        borderRadius: 10,
                        marginTop: -50,
                        elevation: 5,
                        backgroundColor: '#FAFAFA'
                    }}>
                        <Image
                            source={app.images.createPost}
                            resizeMode='cover'
                            style={{ width: '100%', flex: 1 }}
                            borderRadius={10} />
                    </View>
                    <VerticalSpacer height={10} />
                    <View style={{ paddingLeft: 25, paddingTop: 17, width: '100%' }}>
                        <NormalText color={'#15153A'} size={16} bold>New Post</NormalText>
                    </View>

                    <View style={{ margin: 20 }}>
                        <InputField
                            autoCapitalize="none"
                            value={''}
                            maxLength={255}
                            containerStyle={{ marginBottom: 20 }}
                            onChangeText={(email) => { }}
                            onSubmitEditing={() => { }}
                            placeholderText={"Head"} />
                        <InputField
                            autoCapitalize="none"
                            value={''}
                            numberOfLines={1}
                            multiline={true}
                            textAlignVertical="top"
                            maxLength={255}
                            onChangeText={(email) => { }}
                            onSubmitEditing={() => { }}
                            placeholderText={"Description"} />

                    </View>
                    <ViewImageContainer>
                        <Image
                            resizeMode="contain"
                            source={app.images.Camera}
                            style={styles.addPhoto}
                        />
                        <NormalText size={14} color={'#030303'}>
                            Upload Picture
                        </NormalText>
                    </ViewImageContainer>
                </View>
                <BottomOptionsView style={{ paddingTop: 8, paddingBottom: 8, height: 68 }}>
                    <OptionButtonHolder style={{}}>
                        <SubmitButton title="Post" onPress={() => { }}></SubmitButton>
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

export default connect(moveStateToProps, matchDispatchToProps)(CreatePost);

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    addPhoto: {
        width: 45,
        height: 41,
        marginBottom: 10
    }
})




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

// export const NormalText = styled.Text`
//     font-family: ${(props) => props.theme.fonts.regular};
//     font-size: ${(props) => (props.size ? props.size : "14")}px;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 14px;
//     line-height: 21px;
//     color: #15153A;
//     position: absolute;
//     bottom:10px
// `;

export const ViewImageContainer = styled.View`
  position: relative;
  width: 90%;
  height: 163px;
  align-items: center;
  justify-content: center;
  margin:auto;
  border: 1px solid #DFDFDF;
  border-radius: 10px;
`;
