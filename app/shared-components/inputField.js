"use strict";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import createReactClass from "create-react-class";
import styled from "styled-components/native";
import constants from "../config/constants";
import { lightTheme } from "../config/theme";
import {
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Text,
  ViewPropTypes,
} from "react-native";

var textPropTypes = Text.propTypes || ViewPropTypes;
var textInputPropTypes = TextInput.propTypes || textPropTypes;
var propTypes = {
  ...textInputPropTypes,
  disabled: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
};

var InputField = createReactClass({
  propTypes: propTypes,

  getInitialState() {
    var state = {
      text: this.props.value,
      dirty: this.props.value || this.props.placeholder,
      inputPlaceholder: this.props.inputplaceholder,
      placeholdertxt : ''
    };

    var style = state.dirty ? dirtyStyle : cleanStyle;
    state.labelStyle = {
      fontSize: new Animated.Value(style.fontSize),
      top: new Animated.Value(style.top),
    };

    return state;
  },

  componentWillReceiveProps(props) {
    if (typeof props.value !== "undefined" && props.value !== this.state.text) {
      this.setState({ text: props.value, dirty: !!props.value });
      this._animate(!!props.value);
    }
  },

  _animate(dirty) {
    var nextStyle = dirty ? dirtyStyle : cleanStyle;
    var labelStyle = this.state.labelStyle;
    var anims = Object.keys(nextStyle).map((prop) => {
      return Animated.timing(
        labelStyle[prop],
        {
          toValue: nextStyle[prop],
          duration: 200,
          useNativeDriver: false,
        },
        Easing.ease
      );
    });

    Animated.parallel(anims).start();
  },

  _onFocus() {
    this._animate(true);
    this.setState({ dirty: true });
    if (this.props.onFocus) {
      this.props.onFocus(arguments);
    }
    if (!this.state.text) { 
      this.state.placeholdertxt = this.props.inputplaceholder
    }else {
      this.state.placeholdertxt = '';
    }
  },

  _onBlur() {
    if (!this.state.text) {
      this._animate(false);
      this.setState({ dirty: false });
      
    }
    this.state.placeholdertxt = '';

    if (this.props.onBlur) {
      this.props.onBlur(arguments);
    }
  },

  onChangeText(text) {
    this.setState({ text });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  },

  updateText(event) {
    var text = event.nativeEvent.text;
    this.setState({ text });

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  },

  _renderLabel(placeholderText) {
    return (
      <Animated.Text ref="label" style={[this.state.labelStyle, styles.label]}>
        {placeholderText}
      </Animated.Text>
    );
  },

  _renderInput() {
    return (
      <InputTextInput
        ref={(ref) => (this.inputRef = ref)}
        {...this.props}
        onBlur={this._onBlur}
        onChangeText={this.onChangeText}
        onEndEditing={this.updateText}
        onFocus={this._onFocus}
        value={this.state.text}
        placeholder={this.state.placeholdertxt}
        returnKeyType={Platform.OS == 'ios' ? 'done' : "next"}
        clearButtonMode="while-editing"
        keyboardAppearance="dark"
        underlineColorAndroid={"transparent"}
        selectionColor={lightTheme.colors.text}
        autoCompleteType={"off"}
        blurOnSubmit={true}
      />
    );
  },

  renderInputField() {
    const editable =
      typeof this.props.editable === "undefined" ? true : this.props.editable;
    return (
      <InputContainer
        pointerEvents={editable ? "auto" : "none"}
        style={this.props.containerStyle}
        isMultiline={this.props.multiline}
        disabled={this.props.disabled}
        noBorderFlag={this.props.noBorderFlag}
      >
        {this.props.leftView ? this.props.leftView : null}
        <WrapperView>
          {this._renderLabel(this.props.placeholderText)}
          {this._renderInput()}
        </WrapperView>
        {this.props.rightView ? this.props.rightView : null}
      </InputContainer>
    );
  },

  render() {
    const editable =
      typeof this.props.editable === "undefined" ? true : this.props.editable;
    if (editable) {
      return this.renderInputField();
    }
    return (
      <TouchableOpacity
        activeOpacity={constants.active_opacity}
        onPress={() => {
          this.props.tapHandler();
        }}
      >
        {this.renderInputField()}
      </TouchableOpacity>
    );
  },
});

var labelStyleObj = {
  marginTop: 8,
  color: "#3F559570",
  position: "absolute",
};

var styles = StyleSheet.create({
  label: labelStyleObj,
});

var cleanStyle = {
  fontSize: 14,
  top: 10,
};

var dirtyStyle = {
  fontSize: 12,
  top: 0,
};

module.exports = InputField;

const InputContainer = styled.View`
  height: ${(props) => (props.isMultiline ? 140 : 54)}px;
  width: 100%;
  position: relative;
  background-color: ${(props) => (props.disabled ? "#d9e5f340" : "#F1F1F1")};
  border: ${(props) => (props.noBorderFlag ? "none" : "1px solid #C4E4F5")};
  border-radius: 8px;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
`;

const WrapperView = styled.View`
  flex: 1;
`;

const InputTextInput = styled.TextInput`
  height: ${(props) =>
    props.multiline ? 100 : constants.isAndroid ? 40 : 30}px;
  justify-content: center;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  margin-left: ${(props) => (constants.isAndroid ? -4 : 0)}px;
  margin-top: ${(props) =>
    props.multiline ? 30 : constants.isAndroid ? 15 : 20}px;
`;
