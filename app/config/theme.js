import React from "react";
import { TouchableOpacity, Keyboard, View, Image } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import constants from "./constants";
import styled from "styled-components/native";
import DeviceInfo from "react-native-device-info";

export const fonts = {
  regular: "Poppins_Regular",
  medium: "Poppins_Medium",
  semibold: "Poppins_SemiBold",
  bold: "Poppins_Bold",
  light: "Poppins_Light",
  heavy: "Poppins_Thin",
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#0074B1",
    background: "black",
    card: "black",
    text: "#0074B1",
    border: "#D9E5F3",
    notification: "red",
    screenBg: "#F0F4F9",
  },
  barStyle: "light-content",
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0074B1",
    background: "white",
    card: "white",
    text: "#0074B1",
    border: "#D9E5F3",
    notification: "red",
    screenBg: "#2D8CC0",
  },
  barStyle: "dark-content",
};

export const ScreenBgView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.screenBg};
`;

export const ScreenWhiteView = styled.View`
  flex: 1;
  padding-bottom:20px;
  background-color: #fff;
`;

export const ScreenWhiteViewNB = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const HeadingText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 30px;
  line-height: 37px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

export const MHeadingText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 20px;
  line-height: 24.36px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

export const SubHeadingText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: ${constants.isTablet ? 18 : 14}px;
  line-height: ${constants.isTablet ? 20 : 17}px;
  color: #97999A;
  height: 20px;
  margin-top: 5px;
`;

export const NormalText = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${(props) => (props.size ? props.size : "14")}px;
  font-weight: ${(props) => (props.bold ? 'bold' : "normal")};
  color: ${(props) => (props.color ? props.color : "#15153A")} ;
  
`;

export const HorizontalSpacer = styled.View`
  width: ${(props) => props.width}px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
`;

export const VerticalSpacer = styled.View`
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
`;

export const OptionButtonHolder = styled.View`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const LaneFromTo = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 12px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 8px;
`;

export const LaneFromData = styled.View`
  flex-direction: column;
  align-items: ${(props) => (props.leftFlag ? "flex-start" : "flex-end")};
  margin-bottom: ${constants.isTablet ? '20px' : 'auto'};
  margin-top: ${constants.isTablet ? '20px' : 'auto'};
  flex-wrap: wrap;
`;

export const LaneHourList = styled.View`
  justify-content: ${constants.isTablet ? 'space-around' : 'space-between'};
  align-items: center;
  flex-direction: row;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #B4C2DC;

`;

export const LaneHourIconData = styled.View`
  flex-direction: row;
  padding-right: 5.34px;
  border-color: #B4C2DC;
  border-top-width: 0px;
  border-left-width: 0px;
  border-bottom-width: 0px;
  border-right-width: ${(props) => props.borderWidth}px;
`;

export const AccHeading = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  margin-left: 18px;
  margin-right: 18px;
  border-color: #DEE4EA;
  border-top-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-right-width: 1px;
`;

export const AccHeadingTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 19px;
  color: #3F5595;
`;

export const AccHeadingTitleCap = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 19px;
  color: #3F5595;
  text-transform: uppercase;
`;

export const AccHeadingAction = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 19px;
  color: #1374F2;
`;

export const Laneouter = styled.View`
    margin-left: 18px;
    margin-right: 18px;

    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    padding-top: 8px;
    background: #F9FBFD;
    border-color: #DEE4EA;
  border-left-width: 1px;
  border-right-width: 1px;
`;

export const LaneouterNMargin = styled.View`
    margin-left: 0px;
    margin-right: 0px;

    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    padding-top: 8px;
    background: #F9FBFD;
    border-color: #DEE4EA;
  border-left-width: 1px;
  border-right-width: 1px;
`;

export const LaneTitleData = styled.View`
  flex-direction: column;
  margin-left: 6;
`;

export const LaneHourListData = styled.View`
  flex-direction: column;
`;

export const LaneHourTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 2px;
  color: #3F5595;
`;

export const LaneHourTitleNM = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 0px;
  color: #3F5595;
`;

export const LaneHourValue = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 10px;
  line-height: 12px;
  font-weight: 800;
  color: #3F5595;
`;

export const LaneHourValueBold = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 10px;
  line-height: 12px;
  font-weight: bold;
  color: #3F5595;
`;

export const LaneHourValueDark = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  color: #3F5595;
`;

export const LaneHourValueNormal = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  line-height: 17px;
  font-weight: normal;
  color: #3F5595;
`;

export const LaneHeading = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  margin-bottom: 25px;
  margin-top: 21px;
  margin-left: 20px;
  margin-right: 20px;
  color: #3F5595;
`;

export const PilotHeading = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 0px;
  margin-left: 20px;
  margin-right: 20px;
  color: #3F5595;
`;

export const AddressTextBlue = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  margin-bottom: 7px;
  color: #1374F2;
`;

export const AddressTextDark = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
  margin-bottom: 7px;
  color: #3F5595;
`;

export const PlainText = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 10px;
  line-height: 12px;
  color: #5C5C5C;
  flex-wrap: wrap;
  text-align: ${(props) =>
    props.isRight ? "right" : "left"};
`;

export const SubmitButton = ({ buttonStyle, title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      style={{ flex: 1}}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
      disabled={disabled}
    >
      <SubmitButtonView buttonStyle={buttonStyle} disabled={disabled}>
        <ButtonText buttonStyle={buttonStyle} numberOfLines={1}>
          {title}
        </ButtonText>
      </SubmitButtonView>
    </TouchableOpacity>
  );
};

export const SubmitButtonCustom = ({ buttonStyle, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <SubmitButtonViewCustom buttonStyle={buttonStyle}>
        <ButtonText buttonStyle={buttonStyle} numberOfLines={1}>
          {title}
        </ButtonText>
      </SubmitButtonViewCustom>
    </TouchableOpacity>
  );
};

export const RemoveButton = ({ buttonStyle, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <RemoveButtonView buttonStyle={buttonStyle}>
        <ButtonText buttonStyle={buttonStyle} numberOfLines={1}>
          {title}
        </ButtonText>
      </RemoveButtonView>
    </TouchableOpacity>
  );
};



export const ActiveButton = ({ buttonStyle, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <ActionButtonView buttonStyle={buttonStyle}>
        <ActionButtonText buttonStyle={buttonStyle} numberOfLines={1}>
          {title}
        </ActionButtonText>
      </ActionButtonView>
    </TouchableOpacity>
  );
};

export const ADDButton = ({ buttonStyle, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      
      onPress={() => {
        onPress();
      }}
    >
      <AddButtonView buttonStyle={buttonStyle}>
        <AddButtonText buttonStyle={buttonStyle} numberOfLines={1}>
          {title}
        </AddButtonText>
      </AddButtonView>
    </TouchableOpacity>
  );
};

export const GrayButton = ({ buttonStyle, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <GrayButtonView buttonStyle={buttonStyle}>
        <GrayButtonText buttonStyle={buttonStyle} numberOfLines={1}>
          {title}
        </GrayButtonText>
      </GrayButtonView>
    </TouchableOpacity>
  );
};

export const HeaderLeftTextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <HeaderLeftTextButtonView leftFlag={true}>
        <HeaderLeftText numberOfLines={1}>{title}</HeaderLeftText>
      </HeaderLeftTextButtonView>
    </TouchableOpacity>
  );
};

export const HeaderTitleTextView = ({ title }) => {
  return (
      <HeaderTitleText>{title}</HeaderTitleText>
  );
};


export const HeaderRightTextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <HeaderLeftTextButtonView leftFlag={false}>
        <RegisterProgressText numberOfLines={1}>{title}</RegisterProgressText>
      </HeaderLeftTextButtonView>
    </TouchableOpacity>
  );
};

export const NoItemText = ({ top = 200, content = 'No item to display here' }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: top,
        left: 0,
        right: 0,
      }}
    >
      <SubHeadingText>{content}</SubHeadingText>
    </View>
  );
};

export const HeaderIconButton = ({
  icon,
  onPress,
  leftFlag,
  rightFlag,
  needBadge,
  badgeCount,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={constants.active_opacity}
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <HeaderLeftTextButtonView leftFlag={leftFlag} rightFlag={rightFlag}>
        <HeaderIcon
          source={icon}
          leftFlag={leftFlag}
          rightFlag={rightFlag}
          needBadge={needBadge}
        ></HeaderIcon>
        {needBadge && badgeCount > 0 ? (
          <BadgeView>
            <BadgeText>{badgeCount}</BadgeText>
          </BadgeView>
        ) : null}
      </HeaderLeftTextButtonView>
    </TouchableOpacity>
  );
};

const BadgeView = styled.View`
  position: absolute;
  top: ${constants.isAndroid ? 10 : 6}px;
  left: ${constants.isAndroid ? 14 : 16}px;
  background-color: #d90d0d;
  border-radius: 7px;
  min-width: 14px;
  height: 14px;
  justify-content: center;
  align-items: center;
`;

const BadgeText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  color: white;
  font-size: 10px;
  line-height: 10px;
  padding: 3px;
`;

const SubmitButtonView = styled.View`
  width: 100%;
  height: 50px;
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  background-color: ${(props) =>
    props.buttonStyle === "reject"
      ? "#D90D0D"
      : props.buttonStyle === "complete"
      ? "#04D9C4"
      : props.buttonStyle === "forgotCancel" ? "transparent"
      : props.buttonStyle === "cancel" ? "#DDDCE7" : props.theme.colors.primary};
  border-radius: 5px;
  border: 1px solid #0074B1;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SubmitButtonViewCustom = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.buttonStyle === "reject"
      ? "#D90D0D"
      : props.buttonStyle === "complete"
      ? "#04D9C4"
      : props.buttonStyle === "cancel" ? "#DDDCE7" :props.theme.colors.primary};
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) =>
      props.buttonStyle === "cancel"
        ? "transparent"
        : props.buttonStyle === "complete"
        ? "#04D9C4"
        : props.buttonStyle === "reject" ? "transparent" : props.theme.colors.primary};
`;

const RemoveButtonView = styled.View`
  width: 90px;
  margin-top: 5px;
  height: 40px;
  background-color: #D90D0D;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
`;

const ActionButtonView = styled.View`
  width: auto;
  height: 25px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: ${(props) =>
    props.buttonStyle === "cancel" || props.buttonStyle === "reject"
      ? "#D90D0D"
      : props.buttonStyle === "active"
      ? "#04D9C4"
      : props.theme.colors.primary};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) =>
      props.buttonStyle === "cancel"  || props.buttonStyle === "reject"
        ? "transparent"
        : props.buttonStyle === "active"
        ? "#04D9C4"
        : props.theme.colors.primary};
`;

const AddButtonView = styled.View`
  width: 102px;
  height: 36px;
  background-color: #1374F2;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  border: 0px solid #000;
`;

const GrayButtonView = styled.View`
  width: ${(props) => (props.buttonStyle == "browse")? "100px":"100%"};
  height: 52px;
  padding-left: 17.67px;
  padding-right: 17.67px;
  background-color: #5C5C5C;
  borderBottomLeftRadius: 6px;
  borderBottomRightRadius: 6px;
  borderTopLeftRadius: 6px;
  borderTopRightRadius: 6px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${(props) =>
    props.buttonStyle === "forgotCancel"
      ? "#0074B1"
      : props.buttonStyle === "reject"
      ? "white"
      : "white"};
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
`;

const ActionButtonText = styled.Text`
  color: ${(props) =>
    props.buttonStyle === "cancel"
      ? "#30A8F2"
      : props.buttonStyle === "reject"
      ? "white"
      : "white"};
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 12px;
  line-height: 15px;
`;

const AddButtonText = styled.Text`
  color: white;
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
`;

const GrayButtonText = styled.Text`
  color: white;
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 16px;
  line-height: 16px;
`;

const HeaderLeftTextButtonView = styled.View`
  height: ${constants.isAndroid ? 54 : 44}px;
  min-width: 25px;
  align-items: ${(props) => (props.leftFlag ? "flex-start" : "flex-end")};
  justify-content: center;
`;

const HeaderLeftText = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  line-height: 14px;
  text-align: left;
  color: #1374f2;
  margin-left: 20px;
  margin-top: ${constants.isAndroid ? 8 : 0}px;
`;

const HeaderTitleText = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #3F5595;
`;

const HeaderIcon = styled.Image`
  margin-left: ${(props) => (props.leftFlag ? 10 : 0)}px;
  margin-right: ${(props) =>
    props.rightFlag ? (props.needBadge ? 15 : 10) : 0}px;
`;

export const NavHeaderText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #5c5c5c;
`;

export const RegisterProgressText = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  line-height: 14px;
  text-align: right;
  color: #1374f2;
  margin-right: 20px;
  margin-top: ${constants.isAndroid ? 8 : 0}px;
`;

export const SectionView = styled.View`
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.text};
  font-size: ${constants.isTablet ? 16 : 14}px;
  font-weight: bold;
  line-height: ${constants.isTablet ? 19 : 17}px;
  text-align: left;
  

`;

export const SectionSubTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  color: #5c5c5c;
  font-size: 14px;
  line-height: 14px;
  text-align: left;
`;

export const SectionSubTitleNote = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #3F5595;
`;

export const TabBarTitle = styled.Text`
  font-size: ${constants.isTablet ? 15: 14}px;
  line-height: ${constants.isTablet ? 18: 14}px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) =>
    props.selected ? props.theme.colors.primary : "#DDDCE7"};
  margin: 0px;
  padding: 0px;
`;

export const SearchView = styled.View`
    padding-left: 14px;
    padding-top: 9px;
    padding-bottom: 9px;
    padding-right: 14px;
    flex-direction: row;
    justify-content: space-between;
`;

export const FilterIcon = styled.View`
    background-color: white;
    border-width: 1px;
    border-radius: 6px;
    border-color: #D9E5F3;
    height: 55px;
    padding-top: 17.5px;
    padding-bottom: 17.5px;
    padding-right: 10.67px;
    padding-left: 11.33px;
    
`;

export const CountSection = styled.View`
    padding-left: 13px;
    padding-top: ${constants.isTablet ? 23 : 8}px;
    padding-bottom: ${constants.isTablet ? 20 : 15}px;
    padding-right: 13px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CSTitle = styled.Text`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.bold};
  color: #30A8F2;
  flex: 1;
`;

export const CSTitleWithOutFlex = styled.Text`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.bold};
  color: #30A8F2;
`;

export const BottomOptionsView = styled.View`
  width: ${constants.window_width}px;
  height: ${DeviceInfo.hasNotch() ? 100 : 90}px;
  padding: 20px;
  padding-left: ${(props) =>
    props.horizontalPadding ? props.horizontalPadding : 20}px;
  padding-right: ${(props) =>
    props.horizontalPadding ? props.horizontalPadding : 20}px;
  border-top-width: 1px;
  border-bottom-width: 0px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  shadow-color: #DEE4EA;
    shadow-offset: {width: 0px, height: 1px};
    shadow-opacity: 1.0;
    shadow-radius: 7px;
    elevation: 1;
`;

export const BottomOptionsViewNotes = styled.View`
  width: ${constants.window_width}px;
  height: ${DeviceInfo.hasNotch() ? 100 : 90}px;
  padding: 20px;
  border-top-width: 1px;
  border-bottom-width: 0px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  shadow-color: #DEE4EA;
    shadow-offset: {width: 0px, height: 1px};
    shadow-opacity: 1.0;
    shadow-radius: 7px;
    elevation: 1;
`;

export const InputBoxContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: ${constants.isTablet ? 'row' : 'column'};
`

export const InputContainer = styled.View`
  flex: ${(props) => (constants.isTablet ? (props.width ? '0.5' : '1') : '1')};;
  width: ${(props) => (constants.isTablet ? (props.width ? props.width : '100%') : '100%')};
`

export const LoaderView = styled.View`
  flex-direction: row; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${(props) => (props.topSpace ? props.topSpace : 5)}px;
  padding-bottom: ${(props) => (props.bottomSpace ? props.bottomSpace : 5)}px;
  position: absolute;
  width: 100%;
  background: transparent;
  elevation: 0;
  z-index: 3;
`

export const LoaderImage = styled.Image`
  height: 20;
  width: 30;
`

export const Loader = (props) => {
  return <LoaderView {...props}>
    <PlainText>Loading Data</PlainText>
    <HorizontalSpacer width="5"/>
    {/*<LoaderImage source={app.images.Logo} />*/}
  </LoaderView>
}