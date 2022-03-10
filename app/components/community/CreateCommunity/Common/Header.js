import React from "react";
import {
    TouchableOpacity,
    Keyboard,
    StyleSheet,
    Image,
    View
} from "react-native";
import styled from "styled-components/native";
import constants from "../../../../config/constants";

const Header = () => {

    return (
        <>
            <IconHolderView>
                <Image
                    resizeMode="contain"
                    source={app.images.KCLogo}
                    style={styles.imageLogo}
                />
                <TouchableOpacity
                    activeOpacity={app.constants.active_opacity}
                    onPress={() => {
                        Keyboard.dismiss();
                        // navigation.navigate("Login");
                    }}
                    style={styles.backArrow}>
                    <BackArrowView>
                        <Image
                            source={app.images.backArrow}
                        />
                    </BackArrowView>
                </TouchableOpacity>
            </IconHolderView>
            <View style={{ position: 'absolute', right: -22, top: 50 }}>
                <Image
                    source={app.images.waterVegetables}
                    resizeMode="contain"
                    style={{
                        height: 250,
                        width: 180
                    }}
                />
            </View>
            <HeadingText>Create</HeadingText>
            <HeadingText>Community</HeadingText>
            <SubHeadingText>
                What is a Community ?
            </SubHeadingText>
        </>
    );
};

export default Header;
const styles = StyleSheet.create({
    imageLogo: {
        marginBottom: 50,
        width: 95,
        height: 56
    },
    backArrow: {
        position: 'absolute',
        left: 0,
        top: 30,
        width: 25,
        height: 25
    }
})


export const HeadingText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 28px;
  line-height: 42px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

export const SubHeadingText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: ${constants.isTablet ? 10 : 10}px;
  line-height: ${constants.isTablet ? 15 : 17}px;
  color: #97999A;
  text-decoration-line: underline;
  height: 20px;
  margin-top: 5px;
`;

const IconHolderView = styled.View`
  display: flex;
  padding-left: 15px;
  align-items: center;
`;

const BackArrowView = styled.View`
    background: #C8CED0;
    border-radius: 2px;
    padding: 7px;
    align-items: center;
    justify-content: center;
`;

