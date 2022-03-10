import React, { useEffect, forwardRef } from 'react';
import { StatusBar, View, Text, Image } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components/native';
import { utils } from './utility/utils';
import { fonts, lightTheme } from './config/theme';

import {
  loadUserSession,
  loadUserSettings,
  loadGetStartSession,
  loadAddressStartSession,
  loadCommunityStartSession
} from './stores/actions/users';
import { navigationRef, routeNameRef } from './services/NavigationService';
import constants from './config/constants';
import Login from './components/common/Login/Login';
import Forgot from './components/common/Forgot/Forgot';
import Reset from './components/common/Reset/Reset';
import Register from './components/common/Register/Register';
import GetStart from './components/home/GetStart/GetStart';
import AddressSelector from './components/home/AddressSelector/AddressSelector';
import Dashboard from './components/shop/Dashboard/Dashboard';
import ListCommunity from './components/community/ListCommunity/ListCommunity';
import CreateCommunity from './components/community/CreateCommunity/CreateCommunity';
import CommunityDetailsMember from './components/community/CommunityDetails/CommunityDetailsMember';
import CommunityDetailsAdmin from './components/community/CommunityDetails/CommunityDetailsAdmin';
import Profile from './components/myaccount/Profile/Profile';
import Categories from './components/shop/Categories/Categories';
import ChatList from './components/chats/ChatList/ChatList';
import OTP from './components/common/OTP/OTP';
import ErrorBoundary from './shared-components/ErrorBoundary';
import FIcon from 'react-native-vector-icons/Feather';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import EIcon from 'react-native-vector-icons/Entypo';
import Products from './components/shop/Products/Products';
import Cart from './components/cartAndCheckout/Cart/Cart';
import CommunityDetailsGuest from './components/community/CommunityDetails/CommunityDetailsGuest';
import CreatePost from './components/community/CommunityDetails/CreatePost';
import FavList from './components/favorite/FavList/FavList';

///////////////////// User account screen ///////////////////
const CommonStack = createStackNavigator();
function createCommonStack() {
  return (
    <CommonStack.Navigator initialRouteName='Login' screenOptions={utils.stackOptions()}>
      <CommonStack.Screen
        name="Login"
        component={Login}
        initialParams={{ enableSignup: true }}
        options={{
          headerShown: false,
        }}
      />
      <CommonStack.Screen
        name="ForgotPassword"
        component={Forgot}
        options={{
          headerShown: false,
        }}
      />
      <CommonStack.Screen
        name="ResetPassword"
        component={Reset}
        options={{
          title: 'Password Reset',
          headerLeft: null,
        }}
      />
      <CommonStack.Screen
        name="OTP"
        component={OTP}
        options={{
          title: 'OTP',
          headerLeft: null,
        }}
      />
      <CommonStack.Screen
        name="RegisterProfile"
        component={Register}
        options={{
          title: 'Registration',
        }}
      />
    </CommonStack.Navigator>
  );
}

///////////////////// Home screens ///////////////////
const HomeStack = createStackNavigator();
function createHomeStack() {
  return (
    <HomeStack.Navigator initialRouteName={global.app.getStart ? 'AddressSelect' : 'GetStart'} screenOptions={utils.stackOptions()}>
      <HomeStack.Screen name="GetStart" component={GetStart} />
      <HomeStack.Screen name="AddressSelect" component={AddressSelector} />
    </HomeStack.Navigator>
  );
}

///////////////////// MyAccount screen ///////////////////
const MyAccountStack = createStackNavigator();
function createMyAccountStack() {
  return (
    <MyAccountStack.Navigator initialRouteName='Profile' screenOptions={utils.stackOptions()}>
      <MyAccountStack.Screen name="Profile" component={Profile} />
    </MyAccountStack.Navigator>
  );
}

///////////////////// MyAccount screen ///////////////////
const CartAndCheckoutStack = createStackNavigator();
function createCartAndCheckoutStack() {
  return (
    <CartAndCheckoutStack.Navigator initialRouteName='Cart' screenOptions={utils.stackOptions()}>
      <CartAndCheckoutStack.Screen name="Cart" component={Cart} />
    </CartAndCheckoutStack.Navigator>
  );
}

///////////////////// Community screen ///////////////////
const CommunityStack = createStackNavigator();
function createCommunityStack() {
  return (
    <CommunityStack.Navigator screenOptions={utils.stackOptions()}>
      
      <CommunityStack.Screen name="ListCommunity" component={ListCommunity} />
      <CommunityStack.Screen name="CreateCommunity" component={CreateCommunity} />
      <CommunityStack.Screen name="CommunityDetailsMember" component={CommunityDetailsMember} />
      <CommunityStack.Screen name="CommunityDetailsAdmin" component={CommunityDetailsAdmin} />
      <CommunityStack.Screen name="CommunityDetailsGuest" component={CommunityDetailsGuest} />
      <CommunityStack.Screen name="CreatePost" component={CreatePost} />
    </CommunityStack.Navigator>
  );
}

///////////////////// Shop screen ///////////////////
const ShopStack = createStackNavigator();
function createShopStack() {
  return (
    <ShopStack.Navigator initialRouteName='Dashboard' screenOptions={utils.stackOptions()}>
      <CommunityStack.Screen name="Dashboard" component={Dashboard} />
      <ShopStack.Screen name="Categories" component={Categories} />
      <ShopStack.Screen name="Products" component={Products} />
    </ShopStack.Navigator>
  );
}

///////////////////// Chats screen ///////////////////
const FavStack = createStackNavigator();
function createFavStack() {
  return (
    <FavStack.Navigator initialRouteName='Favorite' screenOptions={utils.stackOptions()}>
      <FavStack.Screen name="Favorite" component={FavList} />
    </FavStack.Navigator>
  );
}

///////////////////// Bottom Tab bar ///////////////////
const tab_key_home = 'home';
const tab_key_community = 'community';
const tab_key_favList = 'favList';
const tab_key_cart = 'cart';

function IconWithBadge({ tabKey, cartCount, focused, isIcon = false }) {
  let IconImage = null;
  let IconFromFont = null;
  let tabTitle = null;
  let titleColor = !focused ? '#ADADAF': '#0074B1';
  let badgeCount = false;

  switch (tabKey) {
    case tab_key_home:
      IconImage = !focused ? app.images.home : app.images.homeSelected;
      IconFromFont = { elem: EIcon, name: "home" }
      tabTitle = 'Home';
      break;
    case tab_key_community:
      IconImage = !focused ? app.images.community : app.images.communitySelected;
      IconFromFont = { elem: FA5Icon, name:"users" }
      tabTitle = 'Community';
      break;
    case tab_key_favList:
      IconImage = !focused ? app.images.heart : app.images.heartSelected;
      IconFromFont = { elem: FIcon, name:"heart"}
      tabTitle = 'Favorites';
      break;
    case tab_key_cart:
      IconFromFont = { elem: FIcon, name:"shopping-cart"}
      IconImage = !focused ? app.images.cart : app.images.cartSelected;
      tabTitle = 'Cart';
      badgeCount = true;
      break;
    default:
      return null;
  }

  return (
    <React.Fragment>
      {isIcon ?
        <View style={{ position: 'relative' }}>
          {/* IconImage && <Image source={IconImage} /> */}
          {badgeCount && cartCount > 0 && <View style={{
            position: 'absolute',
            right: -8,
            top: -8,
            backgroundColor: '#0074B1',
            borderRadius: 100,
            zIndex: 3,
            height: 15,
            width: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{fontSize: 10, color: '#FFF'}}>{cartCount > 9 ? '9+' : cartCount}</Text>
          </View>}
          {IconFromFont && <IconFromFont.elem name={IconFromFont.name} size={22} color={!focused ? '#ADADAF': '#0074B1'} />}
        </View>
        : <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: constants.isTablet ? 14 : 12,
            lineHeight: constants.isTablet ? 16 : 12,
            color: titleColor,
            marginTop: 4,
          }}>
          {tabTitle}
        </Text>
      }
    </React.Fragment>
  );
}

function moveChatStateToProps(state) {
  return {
    cartCount: 5,
  };
}
const TabIconWithBadge = connect(moveChatStateToProps)(IconWithBadge);

const isTabBarVisible = (routeState, navigation, route) => {
  const routeName = routeState.state
    ? routeState.state.routes[routeState.state.index].name
    : routeState.params
      ? routeState.params.screen
      : 'Dashboard';
  // const routeName = navigationRef.current.getCurrentRoute()?.name || 'Dashboard';
  // const routeName = routeState.route ? (routeState.route.params ? routeState.route.params.screen : routeState.route.name) : 'Dashboard';
  console.log(routeName, JSON.stringify(routeState),routeNameRef.current, navigationRef.current.getCurrentRoute().name)
  return [
    'Dashboard', 
    'Favorite', 
    'Cart', 
    'ListCommunity',
    'Categories',
    'Products',
    "Home",
    'CommunityDetailsMember',
    'CommunityDetailsAdmin'
  ].includes(routeName);
};

const Tab = createBottomTabNavigator();
function AppTabsScreen() {
  const routeState = useRoute();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarVisible: isTabBarVisible(route, navigation, routeState),
        tabBarLabel: ({ focused, color }) => {
          return (
            <>
              {/*<TabIconWithBadge
                tabKey={route.name}
                color={color}
                focused={focused}
              />*/}
            </>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          return <TabIconWithBadge
            tabKey={route.name}
            color={color}
            focused={focused}
            isIcon={true}
          />;
        },
      })}
      tabBarOptions={{
        headerShown: true,
        allowFontScaling: false,
        keyboardHidesTabBar: true,
        style: {
          fontFamily: fonts.bold,
          paddingTop: 5,
          paddingBottom: 5,
          height: 55
        },
      }}>

      <Tab.Screen name={tab_key_home} component={createShopStack} />
      <Tab.Screen name={tab_key_community}  component={createCommunityStack} />
      <Tab.Screen name={tab_key_favList} component={createFavStack} />
      <Tab.Screen name={tab_key_cart} component={createCartAndCheckoutStack} />

    </Tab.Navigator>
  );
}

///////////////////// Drawer Menu ///////////////////
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
      drawerStyle={{ width: '100%' }}
      overlayColor="transparent"
      screenOptions={{
        swipeEnabled: false
      }}
      drawerContent={(props) => <View />}
      initialRouteName={global.app.getStart && global.app.addressStart ? (global.app.communityStart ? 'Tabs' : 'CreateCommunity')  : 'Main'}>
      <Drawer.Screen name="Main" component={createHomeStack} />
      <Drawer.Screen name="Tabs" component={AppTabsScreen} />
      <Drawer.Screen name="CreateCommunity" component={CreateCommunity} />
    </Drawer.Navigator>
  );
};

///////////////////// Root Stack screen ///////////////////
const RootStack = createStackNavigator();
function App({ home, loadUserSession, loadUserSettings, loadGetStartSession, loadCommunityStartSession, isGetStartViewed, loadAddressStartSession }) {
  useEffect(() => {
    loadAddressStartSession()
    loadGetStartSession()
    loadCommunityStartSession()
    loadUserSession();
    loadUserSettings();
    return () => { };
  }, []);

  const theme = home.theme;
  theme.fonts = fonts;

  return (
    <ThemeProvider theme={theme}>
      <AppearanceProvider>
        <StatusBar
          hidden={false}
          barStyle={home.theme.barStyle}
          backgroundColor={home.theme.colors.background}
        />
        {<ErrorBoundary>
          <NavigationContainer
            theme={home.theme}
            style={{ flex: 1 }}
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
              const currentRouteName = navigationRef.current.getCurrentRoute().name;
              routeNameRef.current = currentRouteName;
            }}>
            
            <RootStack.Navigator
              headerMode="none"
              screenOptions={{ animationEnabled: true, headerShown: false }}
              mode="modal">
        
              {!home.loggedUser && (
                <RootStack.Screen
                  name="Login"
                  component={createCommonStack}
                />
              )}
              {home.loggedUser && (<>
                
                <RootStack.Screen name="Home" component={DrawerNavigator} />
                <RootStack.Screen name="MyAccount" component={createMyAccountStack} />
              </>)} 
            </RootStack.Navigator>
          </NavigationContainer>
        </ErrorBoundary>}
      </AppearanceProvider>
    </ThemeProvider>
  );
}

function moveStateToProps(state) {
  return {
    home: state.users,
    isGetStartViewed: state.users?.getStart
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadUserSettings,
      loadUserSession,
      loadGetStartSession,
      loadAddressStartSession,
      loadCommunityStartSession
    },
    dispatch,
  );
}

export default connect(moveStateToProps, matchDispatchToProps)(forwardRef(App));
