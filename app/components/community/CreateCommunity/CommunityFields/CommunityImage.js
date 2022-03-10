import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components/native";
import { loginUser } from "../../../../stores/actions/users";
import * as ImagePicker from 'react-native-image-picker';
import { postCall } from "../../../../services/api";
import { utils } from './../../../../utility/utils'
import config from '../../../../config/appConfig'
const CommunityImage = ({ image,setImage}) => {

  const [imaguri, setImageUri] = useState('')

  const checkAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };

  const requestCameraPermission = async () => {
    checkAndroidPermission()
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //chooseImage()
        launchImageLibrary()
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        if (response.assets)
         
        console.log('response', response.assets[0].uri);
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
        let file = response.assets


        let formData = new FormData();
        if (file.length > 0) {
          let fileimge = {
            name: file[0].fileName,
            type: file[0].type,
            uri:
              Platform.OS === 'android'
                ? file[0].uri
                : file[0].uri.replace('file://', ''),
          }
          formData.append("uploads[]", fileimge, fileimge.name);
          const response = await postCall('common/upload', formData, false, null, true)
          if (response.data.status) {
            console.log(response.data.path)
            setImage(response.data.path)
            setImageUri(config.assets_url+response.data.path)
            utils.showSuccess("Image Uploaded");
          } else {
            console.log(response)
            utils.showError(response.data.message);
          }
        }
      }
    });

  }



  return (
    <>
      <ViewImageContainer>
        <TouchableOpacity onPress={requestCameraPermission}  >
          <Image
            resizeMode="contain"
            source={imaguri ? {uri:imaguri} : app.images.addPhoto}
            style={styles.addPhoto}
          />
        </TouchableOpacity>

        <NormalText>
          <Text>Set an image to your Community</Text>
        </NormalText>
      </ViewImageContainer>
      {/* <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
            </View> */}
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

export default connect(moveStateToProps, matchDispatchToProps)(CommunityImage);
const styles = StyleSheet.create({

  addPhoto: {
    width: 45,
    height: 39
  }
})

export const NormalText = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${(props) => (props.size ? props.size : "14")}px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #15153A;
    position: absolute;
    bottom:10px
`;

export const ViewImageContainer = styled.View`
  position: relative;
  width: 90%;
  height: 163px;
  align-items: center;
  justify-content: center;
  margin:auto;
  border: 1px solid #0074B1;
  border-radius: 20px;
`;
