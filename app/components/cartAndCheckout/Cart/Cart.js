import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, ScrollView } from "react-native"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { HorizontalSpacer, NormalText } from '../../../config/theme';
import styled from "styled-components/native";
import { logoutUser, setAddressStart, setGetStart, setCommunityStart } from "./../../../stores/actions/users";
import constants from '../../../config/constants';
import Icon from 'react-native-vector-icons/FontAwesome5'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialIcons'

const Cart = ({ navigation, route, logoutUser, setGetStart, setAddressStart, setCommunityStart }) => {

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

    return (<View style={{ flex: 1, backgroundColor: '#EAF1F4' }}>
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
                <NormalText size={22} bold>Cart</NormalText>
            </TittleView>
            <Image
                resizeMode="contain"
                source={app.images.profile}
                style={{ height: 35, width: 38 }}
            />
        </HeaderView>
        <View style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#EEF8FE',
            flexDirection: 'row'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <NormalText size={10} color={'#99A5AC'}>Items</NormalText>
                <HorizontalSpacer width={5} />
                <HorizontalSpacer width={2} style={{ height: 12 }} backgroundColor={'#99A5AC'}  />
                <HorizontalSpacer width={5} />
                <NormalText size={12} color={'#194D6B'}>4</NormalText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <NormalText size={10} color={'#99A5AC'}>Delivery</NormalText>
                <HorizontalSpacer width={5} />
                <HorizontalSpacer width={2} style={{ height: 12 }} backgroundColor={'#99A5AC'}  />
                <HorizontalSpacer width={5} />
                <NormalText size={12} color={'#194D6B'}>Home, No 66 Lakshmi...</NormalText>
                <MIcon size={20} name="keyboard-arrow-down" />
            </View>
        </View>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <FlatList
                data={[...productData, ...productData]}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{ paddingRight: 20, }}
                renderItem={({ item, index }) => (<View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    borderBottomColor: '#AC9F9F',
                    borderBottomWidth: 1
                }}>
                    <View>
                        <NormalText size={14} bold>{item.productName}</NormalText>
                        <NormalText color={'#7C7C7C'} size={8}>{item.qty} {item.unit}, Price</NormalText>
                    </View>
                    <Image 
                        source={item.productImage} 
                        resizeMode='cover'
                        style={{ 
                            height: 48, 
                            width: 48
                        }}
                        borderRadius={10} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <FIcon name='inr' size={16} color={'#2D8CC0'} />
                        <NormalText size={16} style={{ color: '#2D8CC0' }} bold> {item.price}</NormalText>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {}} style={{
                            borderRadius: 7,
                            marginBottom: 10,
                        }}>
                            <MIcon name='close' size={16} color={'#68BFEE'} />
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={() => {}} style={{
                                backgroundColor: '#194D6B',
                                borderRadius: 7,
                                padding: 6
                            }}>
                                <Icon name='minus' color={'#FFF'} />
                            </TouchableOpacity>
                            <HorizontalSpacer width={10} />
                            <NormalText>{item.qty}</NormalText>
                            <HorizontalSpacer width={10} />
                            <TouchableOpacity onPress={() => {}} style={{
                                backgroundColor: '#194D6B',
                                borderRadius: 7,
                                padding: 6
                            }}>
                                <Icon name='plus' color={'#FFF'} />
                            </TouchableOpacity>
                        </View> 
                    </View>
                </View>)}
            />
        </ScrollView>
        <View style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#daf1fc',
            flexDirection: 'row'
        }}>
            <View>
                <NormalText size={14} color={'#929B9F'}>Sub Total</NormalText>
                <NormalText size={14} color={'#929B9F'}>Delivery</NormalText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FIcon name='inr' size={20} color={'#0074B1'} />
                    <NormalText size={20} style={{ color: '#0074B1' }} bold> 120</NormalText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FIcon name='inr' size={16} color={'#0074B1'} />
                    <NormalText size={16} style={{ color: '#0074B1' }} bold> 20</NormalText>
                </View>
            </View>
        </View>
        <View style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: '#0074B1',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <NormalText size={14} color={'#FFF'}>Wallet</NormalText>
            <FIcon name='chevron-right' size={14} color={'#FFF'} />
        </View>
        <View style={{
            justifyContent: 'space-around',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#F9F9F9',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <NormalText size={14} color={'#929B9F'}>To be Paid</NormalText>
            <TouchableOpacity onPress={() => {}} style={{
                backgroundColor: '#0074B1',
                borderRadius: 5,
                paddingHorizontal: 40,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'baseline',
            }}>
                <NormalText size={16} color={'#FFF'}>Pay {''}</NormalText>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <FIcon name='inr' size={22} color={'#FFF'} style={{ lineHeight: 25 }} />
                    <NormalText size={22} color={'#FFF'} style={{ lineHeight: 25 }}> 70</NormalText>
                </View>
            </TouchableOpacity>
        </View>
		<TouchableOpacity
			activeOpacity={app.constants.active_opacity}
			onPress={() => {
				setGetStart(false);
				setAddressStart(null);
				setCommunityStart('false')
				logoutUser();
			}}
		>
			<Text style={{ padding: 10, backgroundColor: '#FFAA77' }}>Back to Login (For Temporary Purpose)</Text>
		</TouchableOpacity>
    </View>)
}

function moveStateToProps(state) {
    return {
        users: state.users,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            logoutUser,
            setGetStart,
            setAddressStart,
            setCommunityStart
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(Cart);

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
