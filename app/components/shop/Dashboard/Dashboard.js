import React, { useEffect, useState } from "react";
import {
    TouchableOpacity,
    Keyboard,
    View,
    Text,
    ScrollView,
    Image,
    TextInput
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../stores/actions/users";
import LinearGradient from 'react-native-linear-gradient';
import styled from "styled-components/native";
import constants from "../../../config/constants";
import { HorizontalSpacer, NormalText, VerticalSpacer } from "../../../config/theme";
import Icon from 'react-native-vector-icons/Feather';
import CarouselCards from "../../../shared-components/CarouselCards";

const Dashboard = ({ navigation, route, loginUser }) => {

    const [communityData, setCommunityData] = useState([
        {
            communityName: "Community One",
            communityImage: app.images.community1,
            members: 123,
            private: true
        }, {
            communityName: "Community Two",
            communityImage: app.images.community2,
            members: 13
        }, {
            communityName: "Community Three",
            communityImage: app.images.community3,
            members: 59
        }
    ])

    const [categoryData, setCategoryData] = useState([
        {
            categoryName: "Fruits",
            categoryImage: app.images.category1,
            id: "1"
        }, {
            categoryName: "Veggies",
            categoryImage: app.images.category2,
            id: "2"
        }, {
            categoryName: "Beverage",
            categoryImage: app.images.category3,
            id: "3"
        }
    ])

    const [productData, setProductData] = useState([
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
    ])

    const [couponData, setCouponData] = useState([
        {
            couponImage: app.images.couponBg,
            couponCode:"#FAGS",
            couponDescription: "Use the above code to get 40% Off",
            couponPercentage: 40
        }, {
            couponImage: app.images.couponBg,
            couponCode:"#FES50",
            couponDescription: "Use the above code to get 50% Off",
            couponPercentage: 50
        }, {
            couponImage: app.images.couponBg,
            couponCode:"#Code10",
            couponDescription: "Use the above code to get 10% Off",
            couponPercentage: 10
        }
    ])

    useEffect(() => {
        fetchDashboardData()
    }, []);

    const fetchDashboardData = async => {
        
    }

    return (
        <KeyboardAwareScrollView
            bounces={false}
            keyboardShouldPersistTaps={"handled"}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // extraScrollHeight={50}
            style={{ flex: 1 }}
            contentContainerStyle={{
                alignItems: "center",
                backgroundColor: "transparent",
            }}
        >
			<View style={{ flex: 1 }}>
			{/*<LinearGradient 
                colors={['#68BFEE77', '#FFFFFF']} 
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                locations={[0, 0.08]}
            >*/}
                <ScrollView>
                    <DashboardHolderView>
                        <RowView flexEnd>
                            <View>    
                                {/*<Image source={app.images.menu} />*/}
                            </View>
                            <Image
                                resizeMode="contain"
                                source={app.images.KCLogo}
                                style={{ height: 62, width: 100, marginTop: 25 }}
                            />
                            <Image
                                resizeMode="contain"
                                source={app.images.profile}
                                style={{ height: 45, width: 48 }}
                            />
                        </RowView>
                        <VerticalSpacer height={30} />
                        <NormalText size={20} bold>Get Your Groceries</NormalText>
                        <VerticalSpacer height={15} />
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
                            <HorizontalSpacer width={20} />
                            <TouchableOpacity 
                                activeOpacity={constants.active_opacity}
                                style={{
                                    backgroundColor: '#2D8CC0',
                                    borderRadius: 15,
                                    padding: 15
                                }}
                                onPress={() => {}}
                            >
                                <Image source={app.images.filter}/>
                            </TouchableOpacity>
                            <Icon name="search" size={20} style={{
                                position: 'absolute',
                                left: 25
                            }} />
                        </RowView>
                        <VerticalSpacer height={25} />
                        <CarouselCards 
                            data={communityData}
                            carouselType="community"
                            title="Recommended Communities"
                            seeMoreEnabled
                            seeMoreHandler={() => {
                                navigation.navigate({ 
                                    name: "community"
                                })
                            }}
                            isGuest={true}
                            navigation={navigation}
                            actionHandler={(communityItem) => {
                                navigation.navigate({ 
                                    name: "community"
                                })
                            }}
                        />
                        <VerticalSpacer height={25} />
                        <CarouselCards 
                            data={categoryData}
                            carouselType="category"
                            title="Categories"
                            seeMoreEnabled
                            seeMoreHandler={() => {
                                navigation.navigate({ name: "Categories" })
                            }}
                            actionHandler={(categoryItem) => {
                                navigation.navigate("Products", {
                                    categoryId: categoryItem?.id || null
                                })
                            }}
                        />
                        <VerticalSpacer height={25} />
                        <CarouselCards 
                            data={productData}
                            carouselType="product"
                            title="Products"
                            seeMoreEnabled
                            seeMoreHandler={() => {
                                navigation.navigate("Products")
                            }}
                        />
                        <VerticalSpacer height={25} />
                        <CarouselCards 
                            data={couponData}
                            carouselType="coupon"
                            title="Best Deals"
                            sliderMode
                            titleSize={16}
                        />
                        <VerticalSpacer height={15} />
                    </DashboardHolderView>
                </ScrollView>
				{/*</LinearGradient>*/}
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

export default connect(moveStateToProps, matchDispatchToProps)(Dashboard);

const DashboardHolderView = styled.View`
  width: ${constants.window_width}px;
  flex-direction: column;
  padding: 0px 25px;
  margin-bottom: 10px;
  background-color: transparent;
`;

const RowView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: ${props => props.flexEnd ? 'flex-end' : 'center'};
    background-color: transparent;
`