import AsyncStorage from "@react-native-community/async-storage";
import { configureAPI } from "../../services/api";
import Geocoder from "react-native-geocoding";
import constants from "../../config/constants";

export const GET_START = "GET_START";
export const ADDRESS_START = "ADDRESS_START";
export const COMMUNITY_START = "COMMUNITY_START";
export const HOME_USER_LOGGED_IN = "HOME_USER_LOGGED_IN";
export const HOME_USER_LOGGED_OUT = "HOME_USER_LOGGED_OUT";
export const SWITCH_THEME = "SWITCH_THEME";
export const HOME_USER_UPDATE_INFO = "HOME_USER_UPDATE_INFO";
export const NOTIFICATION_BADGE_COUNT = "NOTIFICATION_BADGE_COUNT";

export function loginUser(loginInfo) {
  return (dispatch) => {
    global.app.loginUser = loginInfo.user;
    AsyncStorage.setItem("LOGGED_USER", JSON.stringify(loginInfo.user));
   AsyncStorage.setItem("ACCESS_TOKEN", loginInfo.user.token);
     global.app.accessToken = loginInfo.user.token;
      configureAPI();
    Geocoder.init(constants.googleMapApiKey);

    dispatch({
      type: HOME_USER_LOGGED_IN,
      userInfo: loginInfo.user,
    });

    // utils.requestNotificationPermissions();
    // setTimeout(() => {
    //   utils.startReceivingMessages();
    //   utils.watchUnreadMessageCount();
    // }, 2000);
  };
}

export function updateUserInfo(userInfo) {
  return (dispatch) => {
    global.app.loginUser = userInfo;
    AsyncStorage.setItem("LOGGED_USER", JSON.stringify(userInfo));

    dispatch({
      type: HOME_USER_UPDATE_INFO,
      userInfo: userInfo,
    });
  };
}

export function loadUserSession() {
  return async (dispatch) => {
    const userInfoString = await AsyncStorage.getItem("LOGGED_USER");
    if (userInfoString) {
      global.app.loginUser = JSON.parse(userInfoString);
      dispatch({
        type: HOME_USER_LOGGED_IN,
        userInfo: JSON.parse(userInfoString),
      });
    }

    const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
    console.log("ACCCCCCCCCCCCCSSSSSSSS",accessToken)
    if (accessToken) {
      global.app.accessToken = accessToken;
      configureAPI();
    }

    Geocoder.init(constants.googleMapApiKey);

    if (global.app.loginUser) {
      // utils.requestNotificationPermissions();
      // setTimeout(() => {
      //   utils.startReceivingMessages();
      //   utils.watchUnreadMessageCount();
      // }, 2000);
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    // utils.stopReceivingMessages();

    global.app.loginUser = null;
    global.app.accessToken = null;
    configureAPI();

    AsyncStorage.multiRemove(
      ["LOGGED_USER", "ACCESS_TOKEN"],
      null
    );
    dispatch({ type: HOME_USER_LOGGED_OUT });
    dispatch({ type: "USER_LOGOUT" });
  };
}

export const switchTheme = (BaseTheme) => {
  return (dispatch) => {
    AsyncStorage.setItem("APP_USER_THEME", BaseTheme);
    dispatch({
      type: SWITCH_THEME,
      baseTheme: BaseTheme,
    });
  };
};

export function loadUserSettings() {
  return async (dispatch) => {
    const appUserTheme = await AsyncStorage.getItem("APP_USER_THEME");
    if (appUserTheme) {
      dispatch({
        type: SWITCH_THEME,
        baseTheme: appUserTheme,
      });
    }
  };
}

export function updateNotificationBadgeCount(badgeCount) {
  return (dispatch) => {
    dispatch({
      type: NOTIFICATION_BADGE_COUNT,
      badgeCount: badgeCount,
    });
  };
}

export function setGetStart(status) {
  return (dispatch) => {
    global.app.getStart = status;
    if(status) {
      AsyncStorage.setItem("GET_START", status?.toString());
    } else {
      AsyncStorage.removeItem("GET_START");
    }
    dispatch({
      type: GET_START,
      getStart: status,
    });
  };
}

export function setAddressStart(status) {
  return (dispatch) => {
    global.app.addressStart = status;
    if(status) {
      AsyncStorage.setItem("ADDRESS_START", status);
    } else {
      AsyncStorage.removeItem("ADDRESS_START");
    }
    dispatch({
      type: ADDRESS_START,
      addressStart: status,
    });
  };
}
export function setCommunityStart(status) {
  return (dispatch) => {
    global.app.communityStart = status;
    if(status == 'true') {
      AsyncStorage.setItem("COMMUNITY_START", status);
    } else {
      AsyncStorage.removeItem("COMMUNITY_START");
    }
    dispatch({
      type: COMMUNITY_START,
      communityStart: status,
    });
  };
}
export function loadGetStartSession() {
  return async (dispatch) => {
    const getStart = await AsyncStorage.getItem("GET_START");
    if (getStart) {
      global.app.getStart = Boolean(getStart);
      dispatch({
        type: GET_START,
        getStart: Boolean(getStart),
      });
    }
  };
}

export function loadAddressStartSession() {
  return async (dispatch) => {
    const addressStart = await AsyncStorage.getItem("ADDRESS_START");
    if (addressStart) {
      global.app.addressStart = addressStart;
      dispatch({
        type: ADDRESS_START,
        addressStart: addressStart,
      });
    } 
  }
}

export function loadCommunityStartSession() {
  return async (dispatch) => {
    const communityStart = await AsyncStorage.getItem("COMMUNITY_START");
    if (communityStart) {
      global.app.communityStart = communityStart;
      dispatch({
        type: COMMUNITY_START,
        communityStart: communityStart,
      });
    } 
  }
}