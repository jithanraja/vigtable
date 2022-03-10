import React, { useState } from "react";
import {
    StyleSheet,
    Image,
    View,
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { loginUser } from "../../../../stores/actions/users";
import { NormalText } from "../../../../config/theme";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const RangeMap = ({  setRangeInKm,rangeCoordinates,setRangeCoordinates,rangeInKm }) => {
    
    const ranges = [2,3,5]

    const [selectedRange, setSelectedRange] = useState(rangeInKm)
    const [addressCoordinates, setAddressCoordinates] = useState({
        latitude: rangeCoordinates.lat,
        longitude: rangeCoordinates.lang
    });

    return (<>
        <SelectDropdown
            data={ranges}
            onSelect={(selectedItem, index) => {
                setSelectedRange(selectedItem)
                setRangeInKm(selectedItem)
            }}
            defaultButtonText={"Select Radius Range"}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            dropdownOverlayColor={"transparent"}
            rowTextStyle={{
                textAlign: 'justify'
            }}
            rowStyle={{
                backgroundColor: 'white'
            }}
            renderDropdownIcon={(isOpened) => {
                return (
                    <FontAwesome
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"#444"}
                        size={10}
                    />
                );
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
        <MapView
            region={{
                ...(addressCoordinates),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            followUserLocation={true}
            rotateEnabled={false}
            loadingEnabled={true}
            style={{ flex: 1, marginTop: 5, marginBottom: 5, }}
        >
            {<MapView.Circle
                key = {`rangeIntimaterCircle`}
                center = {addressCoordinates}
                radius = { selectedRange * 1000 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(0,116,204,0.3)' }
                
            />}
            <MapView.Marker
                draggable
                onDragEnd={(e) => {setAddressCoordinates(e.nativeEvent.coordinate)
                    setRangeCoordinates({lat:e.nativeEvent.coordinate.latitude,lang:e.nativeEvent.coordinate.longitude})
                }}
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
            {/* </MapView.Circle> */}
        </MapView>
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

export default connect(moveStateToProps, matchDispatchToProps)(RangeMap);
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
    },
    dropdownBtnStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#D5D4DC",
		textAlign: "left"
    },
    dropdownBtnTxtStyle: { color: "#444", textAlign: "left" }
})

