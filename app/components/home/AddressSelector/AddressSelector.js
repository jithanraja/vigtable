import React, { useEffect, useState } from "react";
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    Keyboard
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAddressStart } from "./../../../stores/actions/users";
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from "react-native-animatable";
import styled from "styled-components/native";
import { HorizontalSpacer, NormalText, VerticalSpacer } from "../../../config/theme";
import Icon from 'react-native-vector-icons/Feather';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { utils } from "../../../utility/utils";
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from 'react-native-google-places';

Geolocation.setRNConfiguration({
    authorizationLevel: 'whenInUse'
})

const AddressSelector = ({ navigation, route, setAddressStart }) => {

    const [showMap, setShowMap] = useState(false);
    const [addressCoordinates, setAddressCoordinates] = useState({
        latitude: 10.99835602,
        longitude: 77.01502627
    });
    const [isLoading, setIsLoading] = useState(false)
    const [address, setAddress] = useState(null);
    const [searchAddress, setSearchAddress] = useState(null);
    
    useEffect(() => {
        const requestLocationPermission = async () => {
          if (Platform.OS === 'ios') {
            getOneTimeLocation();
            // subscribeLocationLocation();
          } else {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Location Access Required',
                  message: 'Konnect Kart needs to access your location',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                getOneTimeLocation();
                // subscribeLocationLocation();
              } else {
                console.log('Permission Denied');
              }
            } catch (err) {
              console.warn(err);
            }
          }
        };
        showMap && requestLocationPermission();
        return () => {
        //   Geolocation.clearWatch(watchID);
        };
      }, [showMap]);
    
    const getOneTimeLocation = () => {
        setIsLoading(true);
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                setAddressCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                setIsLoading(false)
            },
            (error) => { 
                setIsLoading(false)
                console.log(error.message); 
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };
    
    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            //Will give you the location on location change
            (position) => {
                console.log(position);
                setAddressCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (error) => { console.log(error.message); },
            { 
                enableHighAccuracy: false, 
                maximumAge: 1000 
            },
        );
    };

    useEffect(() => {
        if(addressCoordinates) {
            updateAddress(addressCoordinates)
        }
    }, [addressCoordinates])

    const updateAddress = async(coordinates) => {
        const response = await utils.getAddressComponentsFromGeoLocation(coordinates.latitude, coordinates.longitude);
        if(response) {
            setAddress(response);
        } else {
            setAddress(null)
        }
    }

    const openPlaceSelectionScreen = () => {
        Keyboard.dismiss();
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                Keyboard.dismiss();
                // console.log(place)
                setAddressCoordinates({
                    latitude: place.location.latitude,
                    longitude: place.location.longitude
                })
          })
          .catch((error) => utils.showError(error.message));
    };

    return (
        <View style={{ flex: 1}}>
            {!showMap ?
				<View style={{ flex: 1, alignItems: "center" }}>
                {/*<LinearGradient 
                    colors={['#68BFEE', '#FFFFFF']} 
                    style={{ flex: 1, alignItems: "center" }}
                    start={{ x: 1, y: 0.05 }}
                    end={{ x: 0.6, y: 0.7 }}
                    locations={[0, 0.14]}
				>*/}
                    <Image
                        resizeMode="contain"
                        source={app.images.KCLogo}
                        style={{ marginTop: 25, height: 55, width: 100 }}
                    />
                    <Animatable.View 
                        animation="slideInUp"
                        iterationCount={1}
                        style={{ flex: 1, position: 'relative', alignItems: 'center' }}
                    >
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <View style={{ position: 'relative', alignItems: 'center' }}>
                                <CircleBorderView>
                                    <CircleView />
                                </CircleBorderView>
                                <Image source={app.images.markerPinBlue} alt="Blue Pin"/>
                            </View>
                            <VerticalSpacer height={40} />
                            <NormalText size={20} bold>Set your delivery location</NormalText>
                            <VerticalSpacer height={5} />
                            <NormalText size={10} bold>You can add multiple delivery locations later</NormalText>
                            <VerticalSpacer height={40} />
                            <TouchableOpacity
                                activeOpacity={app.constants.active_opacity}
                                onPress={() => {
                                    setShowMap(true);
                                }}
                            >
                                <GoBox>
                                    <Icon name="arrow-right" style={{ fontWeight: 'bold' }} size={50} color="#FFF" />
                                </GoBox>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
					{/*</LinearGradient>*/}
				</View>
            : <Animatable.View 
                animation="bounceInDown"
                iterationCount={1}
                style={{ flex: 1, position: 'relative' }}>
                <MapHeadingView>
                    <NormalText size={16} style={{ color: '#FFF' }} bold>DELIVERY LOCATION</NormalText>
                    
                </MapHeadingView>
                <MapView
                    region={{
                        ...(addressCoordinates),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ flex: 1 }}
                >
                    <MapView.Marker
                        draggable
                        onDragEnd={(e) => setAddressCoordinates(e.nativeEvent.coordinate)}
                        coordinate={addressCoordinates}
                        calloutAnchor={{ x: -0.7, y: 0.4 }}
                    >
                        <Image 
                            source={app.images.addressMarker} 
                            alt="address marker" 
                            resizeMode="contain" 
                            style={{ height: 80, width: 80 }} />
                        <MapView.Callout tooltip style={styles.customView}>
                            <View style={[styles.container]}>
                                <View style={styles.bubble}>
                                    <View style={styles.amount}>
                                        <NormalText style={{ color: '#FFF' }}>
                                            GET YOUR GROCERIES
                                        </NormalText>
                                    </View>
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                </MapView>
                <OverlayDetailsView>
                    <NormalText style={{ 
                        fontWeight: '500', 
                        position: 'absolute', 
                        top: -30, 
                        right: 40,
                        backgroundColor: '#FFF',
                        padding: 15,
                        borderRadius: 10
                    }}>DELIVERY LOCATION</NormalText>
                    <Image 
                        source={app.images.markerPinWhiteSm} 
                        alt="marker"
                    />
                    <HorizontalSpacer width={15} />
                    {address ? <View>
                        <NormalText style={{ color: '#FFF' }} size={20}>{address?.readableAddressTitle}</NormalText>
                        <NormalText style={{ color: '#FFF' }} size={12}>{address?.readableAddress}</NormalText>
                    </View> : <NormalText style={{ color: '#FFF' }} size={16}>
                        Unable to fetch the address
                    </NormalText>}
                    <TouchableOpacity
                        activeOpacity={app.constants.active_opacity}
                        onPress={() => {
                            setAddressStart(address ? JSON.stringify(address) : '')
                            // navigation.navigate("Home", {
                            //     screen: "Tabs"
                            // });
                            navigation.navigate("Home", {
                                screen: "Tabs",
                                params: {
                                    screen: "community",
                                    params: {
                                        screen: 'CreateCommunity'
                                    }
                                }
                            });
                        }}
                        style={{
                            position: 'absolute',
                            right: -14
                        }}
                    >
                        <NextSectionArrowView>
                            <Icon name="chevron-right" style={{ fontWeight: 'bold' }} size={20} color="#000" />
                        </NextSectionArrowView>
                    </TouchableOpacity>
                </OverlayDetailsView>
                <SearchAddressBox>
                    <TouchableOpacity
                        activeOpacity={app.constants.active_opacity}
                        onPress={() => {
                            openPlaceSelectionScreen()
                        }}
                    >
                        <SearchTextField
                            autoCapitalize="words"
                            value={address?.readableAddress}
                            maxLength={255}
                            editable={false}
                            placeholderText={'Search here'}
                        />
                    </TouchableOpacity>
                </SearchAddressBox>
            </Animatable.View>}
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
            setAddressStart
        },
        dispatch
    );
}

export default connect(moveStateToProps, matchDispatchToProps)(AddressSelector);

const CircleView = styled.View`
    background: rgba(13, 27, 97, 0.3);
    border-radius: 100px;
    height: 100%;
    width: 100%;
`

const CircleBorderView = styled.View`
    position: absolute;
    height: 70px;
    width: 70px;
    background: transparent;
    border-radius: 100px;
    padding: 3px;
    border: 1px solid rgba(13, 27, 97, 0.3);
    bottom: -25px;
`

const GoBox = styled.View`
    background: #FFC100;
    padding: 10px 15px;
    border-radius: 20px;
`

const MapHeadingView = styled.View`
    background: #2D90C6;
    padding: 20px;
    align-items: center;
`

const OverlayDetailsView = styled.View`
    padding: 35px 20px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background: #00507C;
    position: absolute;
    bottom: 60px;
    border-radius: 26px;
    width: 75%;
    margin: 0px 10%;
`
const SearchAddressBox  = styled.View`
    justify-content: flex-start;
    background: transparent;
    position: absolute;
    top: 80px;
    border-radius: 26px;
    width: 100%;
    padding: 0px 10%;
`

const SearchTextField = styled.TextInput`
    background: #FFF;
    padding: 10px 20px;
    border: 1px solid #EBEBEB;
    border-radius: 10px;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
`

const NextSectionArrowView = styled.View`
    background: #FFF;
    border-radius: 2px;
    padding: 8px;
`

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignSelf: 'flex-start',
      borderRadius: 6,
    },
    bubble: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      backgroundColor: '#221F1F',
      paddingHorizontal: 15,
      paddingVertical: 20,
      width: 180,
      borderRadius: 6,
    },
    amount: {
    },
    arrow: {
      backgroundColor: 'transparent',
      borderWidth: 16,
      borderColor: 'transparent',
      borderTopColor: '#221F1F',
      alignSelf: 'flex-end',
      borderRadius: 6,
      marginTop: -36,
      marginRight: -10,
    },
    arrowBorder: {
      backgroundColor: 'transparent',
      borderWidth: 16,
      borderColor: 'transparent',
      borderTopColor: '#221F1F',
      alignSelf: 'flex-end',
      borderRadius: 6,
      marginRight: -10,
      marginTop: -6,
    },
    customView: {
        padding: 10,
        width: 185,
        borderRadius: 6,
    }
});