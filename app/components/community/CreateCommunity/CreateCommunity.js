import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components/native";
import constants from "../../../config/constants";
import { VerticalSpacer } from "../../../config/theme";
import { loginUser,setCommunityStart } from "../../../stores/actions/users";
import CommunityName from './CommunityFields/CommunityName'
import CommunityRange from './CommunityFields/CommunityRange'
import CommunityImage from './CommunityFields/CommunityImage'
import Header from './Common/Header'
import AllSetHeader from './Common/AllSetHeader'
import Footer from './Common/Footer'
import SuccessCommunity from './Common/SuccessCommunity'
import AnimatedEllipsis from "../../../shared-components/AnimatedEllipsis";
import {utils} from './../../../utility/utils'
import { postCall } from "../../../services/api";

import * as Animatable from "react-native-animatable";



const CreateCommunity = ({ navigation, route, loginUser }) => {

    const [page, setPage] = useState(1)
    const [communityName, setName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [postByAdminOnly, setPostByAdminOnly] = useState(false)
    const [image, setImage] = useState('')
    const [rangeInKm, setRangeInKm] = useState('')
    const [rangeCoordinates, setRangeCoordinates] = useState({lat: 10.99835602,lang: 77.01502627})

    useEffect(() => {
        page == 4 && setTimeout(() => {
            createCommunity()
        }, 5000)
    }, [page])

    const changePage = (pageNo = null) => {
        if(pageNo) {
            setPage(pageNo)
            return;
        }
        if (page < 5) {
            console.log(pageNo || page + 1)
            if((pageNo || page + 1)==2)
            {
                if (!communityName) {
                    utils.showError("Please enter name.");
                    return;
                }
            }
            if((pageNo || page + 1)==3)
            {
                if (!rangeInKm) {
                    utils.showError("Please select range.");
                    return;
                }
            }
            if((pageNo || page + 1)==4)
            {
                if (!image) {
                    utils.showError("Please upload image.");
                    return;
                }
            }
             setPage(pageNo || page + 1)
        }
    }

    const createCommunity = async() => {
        const response = await postCall('community', {
            communityName,
            isPrivate,
            postByAdminOnly,
            image,
            rangeInKm,
            rangeCoordinates
        })

        if(response.data.status) {
            changePage();
            utils.showSuccess(response.data.message);
        } else {
            utils.showError(response.data.message);
            setCommunityStart("true");
                        navigation.dispatch(StackActions.replace('Home', {
                            screen: 'Tabs',
                            params: {
                                screen: 'Dashboard'
                            }
                        }))
           
        }
        // navigation.navigate("Home");
    };



    return (
        <View
            style={styles.container} >
            <CreateCommunityHolderView>
                {page != 4 && page != 5 ? <Header /> : null}
                {page != 4 ? <VerticalSpacer height={constants.isTablet ? 30 : 40} /> : null}
                {page == 1 && <Animatable.View
                    animation="bounceInRight"
                    iterationCount={1} >
                    <CommunityName name={communityName} setName={setName} setIsPrivate={setIsPrivate} isPrivate={isPrivate}  setPostByAdminOnly={setPostByAdminOnly} postByAdminOnly={postByAdminOnly}/>
                </Animatable.View>}
                {page == 2 && <Animatable.View
                    animation="bounceInRight"
                    iterationCount={1} >
                    <CommunityRange rangeInKm={rangeInKm} setRangeInKm={setRangeInKm} rangeCoordinates={rangeCoordinates} setRangeCoordinates={setRangeCoordinates}  changePage={changePage} />
                </Animatable.View>}
                {page == 3 && <Animatable.View
                    animation="bounceInRight"
                    iterationCount={1} >
                    <CommunityImage image={image} setImage={setImage}/>
                </Animatable.View>}

                {/* All Set */}
                {page == 4 ? <AllSetHeader /> : null}
                {page == 4 ? <View style={styles.allTextContent}>
                    <Animatable.Text animation="pulse" direction="alternate" easing="ease-out" iterationCount="infinite">
                        <AllSetText>
                            All Set
                            <AnimatedEllipsis
                                animationDelay={200}
                                style={{
                                    color: '#000',
                                    fontSize: 30,
                                    marginBottom: -7
                                }} />
                        </AllSetText>
                    </Animatable.Text>
                </View> : null}
                {page != 4 && page != 5 ? <VerticalHeight /> : null}
                {page == 5 && <SuccessCommunity navigation={navigation} />}
                {page != 4 ? <Footer navigation={navigation} changePage={changePage} page={page} /> : null}
            </CreateCommunityHolderView>
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
            setCommunityStart
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(CreateCommunity);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        width: constants.window_width,
        position: 'relative'
    },
    allTextContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


const CreateCommunityHolderView = styled.View`
  width: ${constants.window_width}px;
  flex-direction: column;
  padding: 25px;
  height: ${constants.window_height}px;
  flex-direction: column;
  justify-content: space-between;
`;

export const VerticalHeight = styled.View`
  width: 100%;
  display: flex;
  flex:1;
  background-color: ${(props) =>
        props.backgroundColor ? props.backgroundColor : "transparent"};
`;

export const AllSetText = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-weight: bold;
    font-size: 18px;
    color: #000000;
`;


