import React, { useState } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    Modal,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components/native";
import { loginUser } from "../../../../stores/actions/users";
import RangeMap from "../Common/RangeMap";
import Footer from "../Common/Footer";
import { VerticalSpacer } from "../../../../config/theme";
const InputField = require("../../../../shared-components/inputField");
const deviceHeight = Dimensions.get('window').height

const CommunityRange = ({ setRangeInKm,rangeCoordinates,setRangeCoordinates,rangeInKm, changePage }) => {

    const [modalVisible, setModalVisible] = useState(false)

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
        <>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View pointerEvents="none">
            <InputField
                autoCapitalize="none"
                value={rangeInKm+''}
                maxLength={255}
                // onChangeText={(km) => { setRangeInKm(km)}}
                // onSubmitEditing={() => { }}
                // editable={false}
                
                placeholderText={"SET RANGE"}
                rightView={<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.rangeImage}>
                    <Image
                        source={app.images.gps}
                        resizeMode="contain"
                        style={styles.viewIcon} /></TouchableOpacity>}
            />
            </View>
            </TouchableOpacity>
            <VerticalSpacer height={22} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);

                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#000000AA',
                        justifyContent: 'flex-end'
                    }}>
                    {renderOutSideTouchable(onTouchOutSide)}
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        paddingHorizontal: 10,
                        paddingTop: 20,
                        height: deviceHeight * 0.85
                    }}>

                        <RangeMap rangeInKm={rangeInKm} setRangeInKm={setRangeInKm} rangeCoordinates={rangeCoordinates} setRangeCoordinates={setRangeCoordinates} />
                        <BottomContainer>
                            <Footer changePage={changePage} />
                        </BottomContainer>
                    </View>
                </View>
            </Modal>
        </>
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

export default connect(moveStateToProps, matchDispatchToProps)(CommunityRange);
const styles = StyleSheet.create({
    rangeImage: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewIcon: {
        height: 20,
        width: 20,
        marginRight: 5,
        marginLeft: 10
    },
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        borderRadius: 6,
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