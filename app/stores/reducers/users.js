import {
  HOME_USER_LOGGED_IN,
  HOME_USER_LOGGED_OUT,
  SWITCH_THEME,
  HOME_USER_UPDATE_INFO,
  NOTIFICATION_BADGE_COUNT,
  GET_START,
  ADDRESS_START,
  COMMUNITY_START
} from "../actions/users";
import { lightTheme, darkTheme } from "../../config/theme";

export default function (
  state = {
    loggedUser: null,
    themeScheme: "light_theme",
    theme: lightTheme,
    notificationBadgeCount: 0,
    getStart: null,
    addressStart: null,
    communityStart:null
  },
  action
) {
  switch (action.type) {
    case GET_START:
      return { ...state, getStart: action.getStart };
    case ADDRESS_START:
      return { ...state, addressStart: action.addressStart };
    case COMMUNITY_START:
        return { ...state, communityStart: action.communityStart };
    case HOME_USER_LOGGED_IN:
      return { ...state, loggedUser: action.userInfo };
    case HOME_USER_UPDATE_INFO:
      return { ...state, loggedUser: action.userInfo };
    case HOME_USER_LOGGED_OUT:
      return { ...state, loggedUser: null };
    case NOTIFICATION_BADGE_COUNT:
      return { ...state, notificationBadgeCount: action.badgeCount };
    case SWITCH_THEME:
      return {
        ...state,
        themeScheme: "light_theme",
        theme: lightTheme
      };
    default:
      return state;
  }
}
