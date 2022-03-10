import React, { useState } from "react";
import { View } from "react-native";
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
import DateTimePickerComponent from "@react-native-community/datetimepicker";

const DateTimePicker = ({
  isVisible,
  onCloseScreen,
  title,
  subHeadingText,
  selectedDate,
  mode,
  onSelectDate,
  minimumDate,
  maximumDate
}) => {
  const [date, setDate] = useState(selectedDate || new Date());
  const { colors } = useTheme();

  const onChange = (event, selectedDate) => {
    if (constants.isAndroid) {
      if (event.type === "set") {
        onSelectDate(selectedDate || date);
        return;
      }

      if (event.type === "dismissed") {
        onCloseScreen();
      }
      return;
    }

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  if (constants.isAndroid) {
    return (
      <DateTimePickerComponent
        testID="dateTimePicker"
        value={date}
        mode={mode}
        display="default"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
      />
    );
  }

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
        <DateTimePickerComponent
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={onChange}
        />
        <VerticalSpacer height={20} />

        <OptionButtonHolder>
          <SubmitButton
            buttonStyle="cancel"
            title="CANCEL"
            onPress={() => {
              onCloseScreen();
            }}
          ></SubmitButton>
          <HorizontalSpacer width={6} />
          <SubmitButton
            title="SELECT"
            onPress={() => {
              onCloseScreen();
              onSelectDate(date);
            }}
          ></SubmitButton>
        </OptionButtonHolder>

        {DeviceInfo.hasNotch() && <VerticalSpacer height={20} />}
      </View>
    </Modal>
  );
};

export default DateTimePicker;
