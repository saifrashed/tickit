import React, {useState} from "react";
import {Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, View,} from "react-native";

import {Button, Layout, Text, themeColor, useTheme,} from "react-native-rapi-ui";

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    const [loading, setLoading]  = useState(false);

    return (
        <KeyboardAvoidingView behavior="height" enabled style={{flex: 1}}>
            <Layout>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                >
                    <View
                        style={{
                            flex:              3,
                            paddingHorizontal: 20,
                            paddingBottom:     20,
                            backgroundColor:   isDarkmode ? themeColor.dark : themeColor.white,
                            justifyContent:    "center",
                            alignItems:        "center",
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            style={{
                                height: 220,
                                width:  220,
                            }}
                            source={require("../../../assets/tickit_logo.png")}
                        />
                        <Text
                            fontWeight="bold"
                            style={{
                                alignSelf: "center",
                                padding:   30,
                            }}
                            size="h3"
                        >
                            Login
                        </Text>

                        <Button
                            text={loading ? "Loading" : "Scan QR code voor toegang"}
                            onPress={() => {
                                navigation.navigate("LoginScan")
                            }}
                            style={{
                                marginTop: 20,
                            }}
                            status="warning"
                            disabled={loading}
                        />

                        <View
                            style={{
                                flexDirection:  "row",
                                alignItems:     "center",
                                marginTop:      10,
                                justifyContent: "center",
                            }}
                        >

                        </View>
                        <View
                            style={{
                                flexDirection:  "row",
                                alignItems:     "center",
                                marginTop:      30,
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    isDarkmode ? setTheme("light") : setTheme("dark");
                                }}
                            >
                                <Text
                                    size="md"
                                    fontWeight="bold"
                                    style={{
                                        marginLeft: 5,
                                    }}
                                >
                                    {isDarkmode ? "☀️ Lichte thema" : "🌑 Donkere thema"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}
