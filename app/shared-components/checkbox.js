import React from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import constants from "../config/constants";
import { Icon } from "native-base";

export const Checkbox = ({
  title,
  isSelected,
  onPress,
  fontSize,
  fontColor,
  isFullWidth = true,
  width = "50%",
  isCenter = false
}) => {
  return (
    <CheckboxHolder isFullWidth={isFullWidth} width={width} isCenter={isCenter}>
      <TouchableOpacity
        activeOpacity={constants.active_opacity}
        onPress={() => {
          Keyboard.dismiss();
          onPress();
        }}
      >
        <CheckboxInnerHolder>
          {isSelected ? (
            <CheckboxSelected>
              <Icon
                type={"Octicons"}
                name={"check"}
                style={{ color: "white", fontSize: 18 }}
              />
            </CheckboxSelected>
          ) : (
            <CheckboxUnselected />
          )}
          <WrapView>
            <CheckboxTitle numberOfLines={3} fontSize={fontSize} color={fontColor}>{title}</CheckboxTitle>
          </WrapView>
        </CheckboxInnerHolder>
      </TouchableOpacity>
    </CheckboxHolder>
  );
};

const CheckboxHolder = styled.View`
  width: ${(props) => (props.isFullWidth ? "100%" : (props.width) ? props.width : "50%")};
  align-items: center;
  justify-content:  ${(props) => (props.isCenter ? "center" : "flex-start")};
  flex-direction: row;
  margin-bottom: 6px;
`;

const CheckboxInnerHolder = styled.View`
  width: 90%;
  align-items: ${constants.isTablet ? 'flex-start' : 'center'};
  flex-direction: row;
  margin-bottom: 6px;
`;

const WrapView = styled.View`
  width: ${(props) => (props.isFullWidth ? "90%" : "90%")};
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content:  ${(props) => (props.isCenter ? "center" : "flex-start")};
  flex-direction: row;  
`;

const CheckboxUnselected = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid #999999;
`;

const CheckboxSelected = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid #1374f2;
  background-color: #1374f2;
  align-items: center;
  justify-content: center;
`;

const CheckboxTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${(props) => props.fontSize + 'px'};
  font-weight: bold;
  line-height: 20px;
  margin-left: 7px;
  color: ${(props) => props.color};
`;
