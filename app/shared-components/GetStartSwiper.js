import React from 'react';

import {
    StyleSheet,
    View,
    Image,
    Animated,
    Dimensions,
    SafeAreaView,
    Text,
    ImageBackground
} from 'react-native';
import Pagination from './PaginationDot';
import * as Animatable from "react-native-animatable";
import constants from "../config/constants";
import LinearGradient from 'react-native-linear-gradient';
import styled from "styled-components/native";

const { width, height } = Dimensions.get('window');

class GetStartSwiper extends React.Component {

    constructor(props) {
        super(props);
        this.state = { scrollX: new Animated.Value(1), height: 0, index: 0 };
        this.currIndex = React.createRef(0)
    }

    handleScroll = (e) => {
        this.currIndex.current = Math.ceil(e.nativeEvent.contentOffset.x / width)
        this.setState({ index: this.currIndex.current })
    }

    render() {
        const { scrollX, index } = this.state;
        const position = Animated.divide(scrollX, width);
        const data = [
            {
                bgImage: app.images.canvasBg,
                image: app.images.vegetables,
                title: 'WELCOME',
                subtitle: 'Lorem ipsum,or lipsum as it is sometimes known, is dummy text used'
            },
            {
                bgImage: app.images.canvasBg,
                image: app.images.basketOfVegetables,
                title: 'ORDER',
                subtitle: 'Lorem ipsum,or lipsum as it is sometimes known, is dummy text used'
            },
            {
                bgImage: app.images.canvasBg,
                image: app.images.mobileWithVegetables,
                title: 'DELIVER',
                subtitle: 'Lorem ipsum,or lipsum as it is sometimes known, is dummy text used'
            },
        ];

        return (
            <View style={{ flex: 1 }}>
            {/*<LinearGradient
                colors={['#68BFEE', '#FFFFFF']}
                style={{ flex: 1 }}
                start={{ x: 0.7, y: 0.0 }}
                end={{ x: 0.6, y: 0.3 }}
                locations={[0, 0.26]} style={styles.containerView}>*/}
                <IconHolderView>
                    <Image
                        source={app.images.KCLogo}
                        resizeMode="stretch"
                        style={styles.imageLogo}
                    />
                </IconHolderView>
                <View style={styles.safeContainer}>
                    <SafeAreaView >
                        <Animated.ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            ref={(node) => (this.scroll = node)}
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
                            scrollEventThrottle={16} >
                            {data.map((swiper, index) => (
                                <View key={index} style={styles.viewItem}>
                                    <ImageBackground source={swiper.bgImage} resizeMode="contain" style={styles.viewInfo}>
                                        <Image
                                            source={swiper.image}
                                            resizeMode='contain'
                                            style={styles.image}
                                        />
                                    </ImageBackground>
                                </View>
                            ))}
                        </Animated.ScrollView>
                    </SafeAreaView>
                </View>
                <Pagination
                    type="animated"
                    activeVisit={position}
                    count={data.length}
                    containerStyle={styles.viewPagination}
                />
                <Animatable.View
                    animation="slideInUp"
                    iterationCount={1}
                    style={styles.bottomAnimation}>
                    <LinearGradient
                        colors={['#2D8CC0', '#343A3E']}
                        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                        style={styles.bottomContainer}>

                        <TitleHolderView>
                            <Text colorSecondary style={styles.title}>
                                {data[index].title}
                            </Text>
                        </TitleHolderView>
                        <ContentTextView>
                            <Text style={styles.contentText}>
                                {data[index].subtitle}
                            </Text>
                        </ContentTextView>
                        <BottomSkipNextContainer >
                            <Text onPress={() => {
                                this.props.handleGettingStarted();
                            }} style={styles.skipText}>
                                Skip
                            </Text>
                            <Text onPress={() => {
                                this.currIndex.current += 1
                                this.currIndex.current == 3 && this.props.handleGettingStarted()
                                this.scroll.scrollTo({ x: width * this.currIndex.current, animated: true, });
                            }} style={styles.nextText}>
                                Next
                            </Text>
                        </BottomSkipNextContainer>
                    </LinearGradient>
                </Animatable.View>
            {/*</LinearGradient>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        width: constants.window_width,
        justifyContent: 'space-between',
    },
    viewItem: {
        width: constants.window_width,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    safeContainer: {
        flex: 1.5,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    imageLogo: {
        alignSelf: 'center',
        width: 150,
        height: 83,
    },
    bottomContainer: {
        position: 'relative',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        width: constants.window_width - 40,
        height: 400
    },
    viewInfo: {
        width: constants.window_width - 40,
        height: 400
    },
    viewPagination: {
        marginBottom: 16,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 36,
        fontWeight: "700",
    },
    nextText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "400",
        marginLeft: 'auto',
        padding: 5,
    },
    skipText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "400",
        padding: 5,
    },
    contentText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 15,
        fontWeight: "normal",
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomAnimation: {
		flex: 1,
        width: constants.window_width,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
        shadowColor: 'rgba(0,0,0,0.25)', // IOS
        shadowOffset: { height: 0, width: 4 }, // IOS
        shadowOpacity: 0.8, // IOS
        shadowRadius: 0,
		maxHeight: 300
    }
});

export default GetStartSwiper;

const IconHolderView = styled.View`
  display: flex;
  align-items: center;
  padding-top: 15px;
`;

const TitleHolderView = styled.View`
   position: absolute;
   top:10;
   width: 100%;
   margin-top: 10px;
`;

const BottomSkipNextContainer = styled.View`
    position: absolute;
    display: flex;
    flex-direction: row;
    padding:7px 15px;
    bottom:15;
    width: 100%;
`
const ContentTextView = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content:center;`