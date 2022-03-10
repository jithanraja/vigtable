import React from "react";
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
import { HorizontalSpacer, NormalText } from '../../../config/theme'

const colors = ['#D0BB00', '#05551B', '#552626', '#F90D62', '#74C4BF']

const Categories = ({ navigation, route, loginUser }) => {

    const categoryData = [
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
                    <NormalText size={22} bold>Categories</NormalText>
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
                    data={categoryData}
                    columnWrapperStyle={{ 
                        justifyContent: 'space-between', 
                        flexShrink: 1 
                    }}
                    numColumns={2} 
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            activeOpacity={constants.active_opacity}
                            onPress={() => {
                                navigation.navigate("Products", {
                                    categoryId: item.id
                                })
                            }}
                            style={{
                                width: '50%'
                            }}
                        >
                            <CategoryView>
                                <Image 
                                    source={item.categoryImage} 
                                    resizeMode='cover'
                                    style={{ 
                                        height: 62, 
                                        width: 42,
                                        marginRight: -25,
                                        zIndex: 2,
                                    }}
                                    borderRadius={10} />
                                <CategoryTextView colorCode={index}>
                                    <NormalText style={{ color: '#FFF' }} >{item.categoryName}</NormalText>
                                </CategoryTextView>
                            </CategoryView>
                        </TouchableOpacity>
                    )}
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

export default connect(moveStateToProps, matchDispatchToProps)(Categories);

const HeaderView = styled.View`
  display: flex;
  align-items: center;
  padding: 30px 25px 35px;
  flex-direction: row;
  justify-content: space-between;
  width: ${constants.window_width}
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
    padding: 0px 30px;
    flex: 1;
`

const CategoryView = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 20px;
    width: 100%;
    position: relative;
`

const CategoryTextView = styled.View`
    background: ${props => colors[props.colorCode] || '#05551B'};
    min-height: 35px;
    justify-content: center;
    padding: 5px 10px 5px 30px;
    min-width: 80%;
    border-radius: 5px;
`