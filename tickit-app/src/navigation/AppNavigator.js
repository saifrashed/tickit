import React, {useContext} from "react";
import * as firebase from "firebase";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {themeColor, useTheme} from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
//Screens
import Home from "../screens/Home";
import Scanner from "../screens/Scanner";
import ScannerResult from "../screens/ScannerResult";
import Events from "../screens/Events";
import Profile from "../screens/Profile";
import Loading from "../screens/utils/Loading";
// Auth screens
import Login from "../screens/auth/Login";
import LoginScan from "../screens/auth/LoginScan";
import {AuthContext} from "../provider/AuthProvider";

// Better put your these secret keys in .env file
const firebaseConfig = {
    apiKey:            "",
    authDomain:        "",
    databaseURL:       "",
    projectId:         "",
    storageBucket:     "",
    messagingSenderId: "",
    appId:             "",
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();
const Auth      = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="Login" component={Login}/>
            <AuthStack.Screen name="LoginScan" component={LoginScan}/>
        </AuthStack.Navigator>
    );
};

const MainStack = createStackNavigator();
const Main      = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="MainTabs" component={MainTabs}/>
            <MainStack.Screen name="Scanner" component={Scanner}/>
            <MainStack.Screen name="ScannerResult" component={ScannerResult}/>

        </MainStack.Navigator>
    );
};

const Tabs     = createBottomTabNavigator();
const MainTabs = () => {
    const {isDarkmode} = useTheme();
    return (
        <Tabs.Navigator
            tabBarOptions={{
                style: {
                    borderTopWidth:  1,
                    borderTopColor:  isDarkmode ? themeColor.dark100 : "#c0c0c0",
                    backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
                },
            }}
        >
            {/* these icons using Ionicons */}
            <Tabs.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: ({focused}) => (
                        <TabBarText focused={focused} title="Home"/>
                    ),
                    tabBarIcon:  ({focused}) => (
                        <TabBarIcon focused={focused} icon={"md-home"}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="Events"
                component={Events}
                options={{
                    tabBarLabel: ({focused}) => (
                        <TabBarText focused={focused} title="Evenementen"/>
                    ),
                    tabBarIcon:  ({focused}) => (
                        <TabBarIcon focused={focused} icon={"calendar"}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: ({focused}) => (
                        <TabBarText focused={focused} title="Profiel"/>
                    ),
                    tabBarIcon:  ({focused}) => (
                        <TabBarIcon focused={focused} icon={"person"}/>
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default () => {
    const auth = useContext(AuthContext);
    const isLogged = auth.isLogged;
    return (
        <NavigationContainer>
            {isLogged == null && <Loading/>}
            {isLogged == false && <Auth/>}
            {isLogged == true && <Main/>}
        </NavigationContainer>
    );
};
