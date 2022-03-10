import React from "react";
import {
    StyleSheet,
    Image,
} from "react-native";
import styled from "styled-components/native";

const AllSetHeader = () => {
    return (
        <>
            <IconHolderView>
                <Image
                    resizeMode="contain"
                    source={app.images.KCLogo}
                    style={styles.imageLogo}
                />
            </IconHolderView>
        </>
    );
};

export default AllSetHeader;
const styles = StyleSheet.create({
    imageLogo: {
        marginBottom: 50,
        marginTop: -10,
        width: 95,
        height: 56,
        alignItems: 'center'
    },

})

const IconHolderView = styled.View`
  display: flex;
  padding-left: 15px;
  width:100%;
  align-items: center;
  position:absolute;
  top:50px
`;


