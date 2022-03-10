import React, { Component } from 'react';
import { Animated, FlatList, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import constants from '../config/constants';
import { HorizontalSpacer, NormalText, VerticalSpacer } from '../config/theme';
import Icon from 'react-native-vector-icons/FontAwesome5'
import FIcon from 'react-native-vector-icons/FontAwesome'
import Pagination from './PaginationDot';

export class CarouselCards extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            scrollX: new Animated.Value(1),
            index: 0
        };
        this.currIndex = React.createRef(0)
    }

    keyExtractor = (item, index) => index.toString();

    renderCarousel = ({item}) => (
        <CardView {...this.props}>
            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.actionHandler && this.props.actionHandler(item);
                }}
            >
                <View style={{ backgroundColor: 'transparent' }}>
                    {this.props.carouselType == "community" && <CommunityCard item={item} {...this.props} />}
                    {this.props.carouselType == "category" && <CategoryCard item={item} />}
                    {this.props.carouselType == "product" && <ProductCard item={item} {...this.props} />}
                    {this.props.carouselType == "coupon" && <CouponCard item={item} />}
                </View>
            </TouchableWithoutFeedback>
        </CardView>
    );

    handleScroll = (e) => {
        this.currIndex.current = Math.ceil(e.nativeEvent.contentOffset.x / (constants.window_width - 20))
        this.setState({ index: this.currIndex.current })
    }

    render() {
        const { scrollX, index } = this.state

        return <WrapperView>
            <RowView>
                <NormalText size={this.props.titleSize || 14} bold>{this.props.title}</NormalText>
                {this.props.seeMoreEnabled && <TouchableOpacity
                    activeOpacity={app.constants.active_opacity}
                    onPress={() => {
                        this.props.seeMoreHandler && this.props.seeMoreHandler()
                    }}
                >
                    <SeeMoreText>
                        See More
                    </SeeMoreText>
                </TouchableOpacity>}
                {!this.props.seeMoreEnabled && this.props.sliderMode && <View>
                    <Pagination
                        type="animated"
                        activeVisit={Animated.divide(scrollX, constants.window_width - 20)}
                        count={this.props.data.length}
                        containerStyle={{}}
                        color='#DDD'
                        activeColor='#301249'
                        size={12}
                        dotStyle={{
                            height: 8,
                            width: 8
                        }}
                    />
                </View>}
            </RowView>
            <CardsView>
                {this.props.data ? <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this.keyExtractor}
                    data={this.props.data}
                    renderItem={this.renderCarousel}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: { x: scrollX },
                            },
                        },
                    ], {
                        listener: event => {
                            this.handleScroll(event);
                        }
                    })}
                    style={{
                        backgroundColor: 'transparent'
                    }}
                /> : <View style={{ alignItems: 'center', flex: 1, paddingTop: 10, paddingBottom: 10 }}>
                    <NormalText>No items to view</NormalText>
                </View>}
            </CardsView>
        </WrapperView>;
    }
}

export default CarouselCards;

const CommunityCard = (props) => {
    return <TouchableOpacity activeOpacity={app.constants.active_opacity} onPress={() => {
        props.navigation.navigate({
            name: "community",
            params: { screen: props.isGuest ? 'CommunityDetailsGuest' : props.item.private ? "CommunityDetailsAdmin" : "CommunityDetailsMember" }

        })
    }}>
        <CommunityView small={props.containerSmall ? 20 : 35}>
            <Image 
                source={props.item.communityImage} 
                resizeMode='cover' 
                style={{ 
                    height: props.containerSmall ? 60 : 80, 
                    width: props.containerSmall ? 90 : 120,
                    marginTop: -20,
                    backgroundColor: '#FAFAFA'
                }}
                borderRadius={10} />
            <VerticalSpacer height={15} />
            <View style={{ width: props.containerSmall ? 90 : 120 }}>
                <NormalText numberOfLines={1} size={18}>{props.item.communityName}</NormalText>
                <VerticalSpacer height={5} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {props.item.private ? <Icon name="lock" /> : <Icon name="users" /> }
                    <HorizontalSpacer width={5} />
                    <NormalText size={16} bold style={{ color: '#0074B1' }}>{props.item.members}</NormalText>
                </View>
            </View>
        </CommunityView>
    </TouchableOpacity>
}

const CategoryCard = (props) => {
    return <CategoryView>
        <Image 
            source={props.item.categoryImage} 
            resizeMode='cover'
            style={{ 
                height: 58, 
                width: 40,
                marginRight: -25,
                zIndex: 2,
            }}
            borderRadius={10} />
        <CategoryTextView>
            <NormalText style={{ color: '#FFF' }} >{props.item.categoryName}</NormalText>
        </CategoryTextView>
    </CategoryView>
}

const ProductCard = (props) => {
    return <ProductView>

        <View style={{ alignItems: 'center' }}>
            <Image 
                source={props.item.productImage} 
                resizeMode='cover'
                style={{ 
                    height: 48, 
                    width: 48
                }}
                borderRadius={10} />
            <NormalText size={14} bold>{props.item.productName}</NormalText>
        </View>
        <VerticalSpacer height={5} />
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
            <NormalText size={8} style={{ color: '#7C7C7C' }}>{props.item.qty}{props.item.unit} price</NormalText>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <FIcon name='inr' color={'#2D8CC0'} />
                <NormalText style={{ color: '#2D8CC0' }} bold>{props.item.price}</NormalText>
            </View>
        </View>
        {!props.favEnabled && <FIcon
            name="heart-o"
            size={14}
            style={{
                position: 'absolute',
                top: 10,
                left: 10
            }}
        />}
        {!props.addCartEnabled && <AddToCartView>
            <Icon
                name="plus"
                size={20}
                color={'#FFF'}
            />
        </AddToCartView>}
    </ProductView>
}

const CouponCard = (props) => {
    return <CouponView>
        <ImageBackground
            source={props.item.couponImage}
            borderRadius={10}
            resizeMode="cover"
            style={{
                width: constants.window_width - 50,
                minHeight: 150
            }}
        >
            <CouponDetailsView>
                <NormalText style={{ color: '#FFF' }} size={12}>#GET {props.item.couponPercentage} %</NormalText>
                <NormalText style={{ color: '#FFF' }} size={24} bold>USE CODE {props.item.couponCode}</NormalText>
                <NormalText style={{ color: '#FFF' }} size={8}>{props.item.couponDescription}</NormalText>
            </CouponDetailsView>
        </ImageBackground>
    </CouponView>
}

const WrapperView = styled.View`

`

const AddToCartView = styled.View`
    position: absolute;
    top: -15px;
    right: -15px;
    background: #2D8CC0;
    border-radius: 7px;
    padding: 5px 10px;
`

const CouponView = styled.View`
    margin-top: 12px;
`

const CouponDetailsView = styled.View`
    justify-content: space-between;
    flex: 1;
    padding: 25px;
`

const SeeMoreText = styled.Text`
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #7EB6D5;
`

const RowView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
    align-items: center;
`

const CardsView = styled.View`
    flex-direction: row;
    background: transparent;
`

const CardView = styled.View`
    marginRight: ${props => props.containerSmall ? 10 : 20}px;
`

const CommunityView = styled.View`
    padding: 0px 20px 12px;
    background: #FFFFFF;
    border: 1px solid #DFDEDE;
    border-radius: 10px;
    margin-top: ${props => props.small ? props.small : 35}px;
    margin-bottom: 10px;
    margin-left: 10px;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: { width: 0, height: 1 };
    shadow-opacity: 0.8;
    shadow-radius: 2;
`

const CategoryView = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`

const ProductView = styled.View`
    padding: 20px 0 5px;
    background: #FFFFFF;
    border: 1px solid #DFDEDE;
    border-radius: 10px;
    min-width: 115px;
    position: relative;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: { width: 0, height: 1 };
    shadow-opacity: 0.8;
    shadow-radius: 2;
`

const CategoryTextView = styled.View`
    background: #D0BB00;
    height: 30px;
    justify-content: center;
    padding: 5px 10px 5px 30px;
    min-width: 100px;
    border-radius: 5px;
`