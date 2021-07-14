import React, {useContext} from "react";
import {Image, Linking, View} from "react-native";
import {Button, Layout, Section, SectionContent, SectionImage, Text, useTheme} from "react-native-rapi-ui";
import {AuthContext} from "../provider/AuthProvider";


export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    const auth = useContext(AuthContext);

    return (
        <Layout>
            <View
                style={{
                    flex:             1,
                    alignItems:       "center",
                    justifyContent:   "center",
                    marginHorizontal: 20,
                }}
            >
                <Section>
                    <SectionContent>
                        <Image
                            resizeMode="contain"
                            style={{
                                height: 220,
                                width:  220,
                            }}
                            source={require("../../assets/tickit_logo.png")}
                        />
                        <Text fontWeight="bold" style={{textAlign: "center"}}>
                            Handelingen
                        </Text>
                        <Button
                            style={{marginTop: 10}}
                            text="Evenementen"
                            status="info"
                            onPress={() => {
                                navigation.navigate("Events");
                            }}
                        />
                        <Button
                            style={{marginTop: 10}}
                            text="Profiel"
                            status="success"
                            onPress={() => {
                                navigation.navigate("Profile");
                            }}
                        />
                        <Button
                            status="danger"
                            text="Uitloggen"
                            onPress={() => {
                                auth.logout();
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        />
                        <Button
                            text={isDarkmode ? "Lichte thema" : "Donkere thema"}
                            status={isDarkmode ? "success" : "warning"}
                            onPress={() => {
                                if (isDarkmode) {
                                    setTheme("light");
                                } else {
                                    setTheme("dark");
                                }
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        />
                    </SectionContent>
                </Section>
            </View>
        </Layout>
    );
}
