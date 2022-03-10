import React, { useEffect, useState } from "react";
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Image,
    FlatList
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "./../../../stores/actions/users";
import LinearGradient from 'react-native-linear-gradient';
import styled from "styled-components/native";
import constants from "../../../config/constants";
import { HorizontalSpacer, NormalText, VerticalSpacer } from '../../../config/theme'
import Icon from 'react-native-vector-icons/FontAwesome5'
import FIcon from 'react-native-vector-icons/FontAwesome'

const FavList = ({ navigation, route, loginUser }) => {

    const productData = [
        {
            productName: "Eggs",
            productImage: app.images.product,
            id: "1",
            qty: 4,
            unit: 'pcs',
            price: 40
        }, {
            productName: "Eggs",
            productImage: app.images.product,
            id: "1",
            qty: 4,
            unit: 'pcs',
            price: 40
        }, {
            productName: "Eggs",
            productImage: app.images.product,
            id: "1",
            qty: 4,
            unit: 'pcs',
            price: 40
        }
    ]

    return (
        <ScrollView
            bounces={false}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: "center",
                backgroundColor: "transparent",
                flex: 1
            }}
        >
				{/*<LinearGradient
                    colors={['#68BFEE', '#FFFFFF']}
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
                        <NormalText size={22} bold>Favorites</NormalText>
                    </TittleView>
                    <Image
                        resizeMode="contain"
                        source={app.images.profile}
                        style={{ height: 35, width: 38 }}
                    />
                </HeaderView>
                <ContentView>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={[...productData]}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                        contentContainerStyle={{ paddingRight: 20, }}
                        columnWrapperStyle={{ 
                            justifyContent: 'space-between'
                        }}
                        numColumns={2} 
                        renderItem={({item, index}) => (<View style={{
                            width: '50%',
                            alignItems: index%2 !== 0 ? 'flex-end' : 'flex-start',
                            marginTop: index%2 !== 0 ? 35 : 0,
                            marginBottom: 5
                        }}>
                            <ProductView>
                                <View style={{ alignItems: 'center' }}>
                                    <Image 
                                        source={item.productImage} 
                                        resizeMode='cover'
                                        style={{ 
                                            height: 48, 
                                            width: 48
                                        }}
                                        borderRadius={10} />
                                    <NormalText size={14} bold>{item.productName}</NormalText>
                                </View>
                                <VerticalSpacer height={5} />
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                    <NormalText size={8} style={{ color: '#7C7C7C' }}>{item.qty}{item.unit} price</NormalText>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <FIcon name='inr' color={'#2D8CC0'} />
                                        <NormalText style={{ color: '#2D8CC0' }} bold>{item.price}</NormalText>
                                    </View>
                                </View>
                                <FIcon
                                    name="heart"
                                    size={14}
                                    color={'#F90D62'}
                                    style={{
                                        position: 'absolute',
                                        top: 10,
                                        left: 10
                                    }}
                                />
                                <AddToCartView>
                                    <Icon
                                        name="plus"
                                        size={20}
                                        color={'#FFF'}
                                    />
                                </AddToCartView>
                            </ProductView>
                        </View>)}
                    />
                </ContentView>
        </ScrollView>
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

export default connect(moveStateToProps, matchDispatchToProps)(FavList);

const HeaderView = styled.View`
  display: flex;
  align-items: center;
  padding: 30px 25px 35px;
  flex-direction: row;
  justify-content: space-between;
  width: ${constants.window_width};
`;

const TittleView = styled.View`
    display: flex;   
    flex-direction: row;
    align-items: center;
`

const BackArrowView = styled.View`
    background: #C8CED0;
    border-radius: 2px;
    padding: 7px;
    align-items: center;
    justify-content: center;
`;

const ContentView = styled.View`
    padding: 0px 25px 10px;
    flex: 1;
`

const AddToCartView = styled.View`
    position: absolute;
    top: -15px;
    right: -15px;
    background: #2D8CC0;
    border-radius: 7px;
    padding: 5px 10px;
`

const ProductView = styled.View`
    padding: 20px 0 5px;
    background: #FFFFFF;
    border: 1px solid #DFDEDE;
    border-radius: 10px;
    width: 80%;
    margin-top: 20px;
    
    margin-left: 10px;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: { width: 0, height: 1 };
    shadow-opacity: 0.8;
    shadow-radius: 2;
`
