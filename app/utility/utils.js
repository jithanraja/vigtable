import React from "react";
import { fonts } from "../config/theme";
import "react-native-get-random-values";
import { showMessage } from "react-native-flash-message";
import { v4 as uuidv4 } from "uuid";
import Geocoder from "react-native-geocoding";
var parseGooglePlace = require("parse-google-place");
import messaging from "@react-native-firebase/messaging";
import DeviceInfo from 'react-native-device-info';

export class utils {
  static stackOptions(gestureEnabled = true) {
    return {
      headerShown: false,
      animationEnabled: true,
      headerStyle: {
        shadowColor: "transparent",
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 1,
      },
      headerTintColor: '#3F5595',
      headerTitleStyle: {
        fontFamily: fonts.bold,
        fontWeight: "bold",
        fontSize: DeviceInfo.isTablet() ? 26 : 20,
        textAlign: "center",
      },
      headerBackTitleVisible: false,
      headerHideBackButton: true,
      gestureEnabled: gestureEnabled,
    };
  }

  static getUniqueId() {
    return uuidv4();
  }

  static async getAddressComponentsFromGeoLocation(latitude, longitude, addPostal = false) {
    try {
      const addressData = await Geocoder.from(latitude, longitude);
      const locationValues = [];
      for (const component of addressData.results) {
        const parsedData = parseGooglePlace(component);
        locationValues.push(parsedData);
      }
      merged = locationValues.reduce((r, o) => {
        Object.keys(o).forEach((k) => {
          if (!r[k] && o[k]) {
            r[k] = o[k];
          }
        });
        return r;
      }, {});

      let components = [];
      if (merged.streetNumber && merged.streetName) {
        components.push(`${merged.streetNumber} ${merged.streetName}`);
      } else {
        if (merged.streetNumber) {
          components.push(merged.streetNumber);
        } else if (merged.streetName) {
          components.push(merged.streetName);
        }
      }
      if (merged.city) {
        components.push(merged.city);
      }

      merged.readableAddress = components.join(", ");

      components = [];

      if (merged.city) {
        components.push(merged.city);
      }

      if (merged.stateShort) {
        components.push(merged.stateShort);
      }

      merged.readableAddressTitle = components.join(", ");

      if (addPostal && merged.zipCode) {
        merged.readableAddressTitle += " - " + merged.zipCode;
      }

      return merged;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  static async getAddressComponentsFromGeoLocationC(latitude, longitude, dataCallback, addPostal = false) {
    try {
      const addressData = await Geocoder.from(latitude, longitude);
      const locationValues = [];
      for (const component of addressData.results) {
        const parsedData = parseGooglePlace(component);
        locationValues.push(parsedData);
      }
      merged = locationValues.reduce((r, o) => {
        Object.keys(o).forEach((k) => {
          if (!r[k] && o[k]) {
            r[k] = o[k];
          }
        });
        return r;
      }, {});

      let components = [];
      if (merged.streetNumber && merged.streetName) {
        components.push(`${merged.streetNumber} ${merged.streetName}`);
      } else {
        if (merged.streetNumber) {
          components.push(merged.streetNumber);
        } else if (merged.streetName) {
          components.push(merged.streetName);
        }
      }
      if (merged.city) {
        components.push(merged.city);
      }

      merged.readableAddress = components.join(", ");

      components = [];

      if (merged.city) {
        components.push(merged.city);
      }

      if (merged.stateShort) {
        components.push(merged.stateShort);
      }

      merged.readableAddressTitle = components.join(", ");

      if (addPostal && merged.zipCode) {
        merged.readableAddressTitle += " - " + merged.zipCode;
      }

      dataCallback(merged.readableAddressTitle);
    } catch (error) {
      dataCallback('');
    }
  }

  static showError(text) {
    if (typeof text !== "string") {
      return;
    }
    showMessage({
      message: text,
      type: "danger",
      floating: true,
      icon: "danger",
      duration: 4000,
    });
  }

  static showErrorModal(text, modal) {
    if (typeof text !== "string") {
      return;
    }
    modal.current.showMessage({
      message: text,
      type: "danger",
      floating: true,
      icon: "danger",
      duration: 4000,
    });
  }

  static showSuccess(text) {
    if (typeof text !== "string") {
      return;
    }

    showMessage({
      message: text,
      type: "success",
      floating: true,
      icon: "success",
      duration: 4000,
    });
  }

  static showSuccessModal(text, modal) {
    if (typeof text !== "string") {
      return;
    }

    modal.current.showMessage({
      message: text,
      type: "success",
      floating: true,
      icon: "success",
      duration: 4000,
    });
  }

  static showInfo(text, onPress = null) {
    if (typeof text !== "string") {
      return;
    }

    showMessage({
      message: text,
      type: "info",
      floating: true,
      icon: "info",
      duration: 4000,
      onPress,
    });
  }

  static isNumber(value) {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  static isURL(text) {
    return text.startsWith("http");
  }

  static formatPhoneText(value) {
    newVal = value.replace(/\D/g, "");

    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }

    /*
    if (value.length > 3 && value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    }*/

    return newVal;
  }

  static validatePhoneNumber(phone) {
    var phoneNumberPattern = /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g;
    return phoneNumberPattern.test(phone);
  }

  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static getDisplayOptions(config) {
    const displayOptions = [];
    config.map((item) => {
      displayOptions.push({
        id: item.id,
        title: app.messages[item.title_key],
      });
    });
    return displayOptions;
  }

  static getDisplayValue(config, value) {
    for (let index = 0; index < config.length; ++index) {
      const configId = config[index].id;
      if (configId === value) {
        return app.messages[config[index].title_key];
      }
    }
    return "";
  }

  static isValidResponse(response) {
    if (response && response.data && response.data.status === true) {
      return true;
    }
    return false;
  }

  static getWeekDay(number) {
    switch (number) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "Sun";
    }
  }

  static async requestNotificationPermissions() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  }

}
