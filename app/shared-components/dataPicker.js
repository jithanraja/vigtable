import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "@react-navigation/native";
import constants from "../config/constants";
import {
  HeadingText,
  SubHeadingText,
  VerticalSpacer,
  HorizontalSpacer,
  OptionButtonHolder,
  SubmitButton,
} from "../config/theme";
import DeviceInfo from "react-native-device-info";
import styled from "styled-components/native";
import { Icon } from "native-base";

const DataPicker = ({
  isVisible,
  onCloseScreen,
  title,
  subHeadingText,
  dataSource,
  selectedItems,
  onSelectItems,
  isMultiSelect,
}) => {
  const [selectedItemsList, setSelectedItemsList] = useState(
    selectedItems || []
  );

  const { colors } = useTheme();

  const isItemSelected = (item) => {
    return (
      selectedItemsList.filter((selected) => selected._id === item._id).length >
      0
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropColor="rgb(5, 2, 89)"
      backdropOpacity={0.75}
      deviceWidth={constants.window_width}
      deviceHeight={constants.window_height}
      style={{ margin: 0, padding: 0, justifyContent: "flex-end" }}
      onModalHide={onCloseScreen}
      onBackdropPress={onCloseScreen}
    >
      <View
        style={{
          backgroundColor: colors.background,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 20,
        }}
      >
        <HeadingText>{title}</HeadingText>
        <SubHeadingText>{subHeadingText}</SubHeadingText>
        <VerticalSpacer height={20} />
        <View
          style={{
            width: "100%",
            height: Math.min(
              constants.window_height - 300,
              dataSource.length * 44 + 20
            ),
          }}
        >
          <FlatList
            bounces={false}
            style={{
              flex: 1,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            keyExtractor={(item, index) => "key" + index}
            data={dataSource}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  activeOpacity={app.constants.active_opacity}
                  onPress={() => {
                    let selectedItemsListTemp = [...selectedItemsList];
                    if (isMultiSelect) {
                      if (isItemSelected(item.item)) {
                        selectedItemsListTemp = selectedItemsList.filter(
                          (selected) => selected._id !== item.item._id
                        );
                      } else {
                        selectedItemsListTemp.push(item.item);
                      }
                    } else {
                      selectedItemsListTemp = [item.item];
                    }
                    setSelectedItemsList(selectedItemsListTemp);
                  }}
                >
                  <ListItemHolder>
                    <ListItemTextHolder>
                      <ListItemText>{item.item.Title}</ListItemText>
                    </ListItemTextHolder>
                    <ListSelectedMarkView>
                      {isItemSelected(item.item) && (
                        <Icon
                          type={"Octicons"}
                          name={"check"}
                          style={{ color: colors.primary, fontSize: 18 }}
                        />
                      )}
                    </ListSelectedMarkView>
                  </ListItemHolder>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <VerticalSpacer height={20} />

        <OptionButtonHolder>
          <SubmitButton
            buttonStyle="cancel"
            title="CANCEL"
            onPress={() => {
              onCloseScreen();
            }}
          ></SubmitButton>
          <HorizontalSpacer width={84} />
          <SubmitButton
            title="SELECT"
            onPress={() => {
              onSelectItems(selectedItemsList);
              onCloseScreen();
            }}
          ></SubmitButton>
        </OptionButtonHolder>

        {DeviceInfo.hasNotch() && <VerticalSpacer height={20} />}
      </View>
    </Modal>
  );
};

export default DataPicker;

const ListItemHolder = styled.View`
  min-height: 44px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  background-color: transparent;
  border-bottom-width: 1px;
  border-bottom-color: #d9e5f3;
  flex-direction: row;
`;

const ListItemTextHolder = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

const ListItemText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
`;

const ListSelectedMarkView = styled.View`
  width: 40px;
  align-items: center;
  justify-content: center;
`;
