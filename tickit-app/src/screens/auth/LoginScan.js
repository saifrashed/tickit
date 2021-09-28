import React, {useContext, useEffect, useState} from "react";
import {KeyboardAvoidingView, StyleSheet, View} from "react-native";
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Button, Layout, Text, useTheme,} from "react-native-rapi-ui";
import axios from "axios";
import {AuthContext} from "../../provider/AuthProvider";

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();

    const [loading, setLoading] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned]             = useState(false);
    const auth                              = useContext(AuthContext);


    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleBarCodeScanned = async ({type, data}) => {
        try {
            setScanned(true);

            const scanResult = await axios.get("https://tickit.vorm.tech/users/", {headers: {"x-auth-token": data}});

            console.log(scanResult)

            // auth.login(scanResult.data[0], data);

        } catch (err) {
            // alert("Foute code!");
            // setScanned(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior="height" enabled style={{flex: 1}}>
            <Layout>
                <View>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{
                            height: "100%"
                        }}
                    >
                        <View style={styles.layerTop}/>
                        <View style={styles.layerCenter}>
                            <View style={styles.layerLeft}/>
                            <View style={styles.focused}/>
                            <View style={styles.layerRight}/>
                        </View>
                        <View style={styles.layerBottom}/>
                    </BarCodeScanner>
                </View>
            </Layout>
        </KeyboardAvoidingView>
    );
}

const opacity = 'rgba(0, 0, 0, .2)';
const styles  = StyleSheet.create({
    container:   {
        flex:          1,
        flexDirection: 'column'
    },
    layerTop:    {
        flex:            2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex:          1,
        flexDirection: 'row'
    },
    layerLeft:   {
        flex:            1,
        backgroundColor: opacity
    },
    focused:     {
        flex: 2,
        borderRadius: 10,

        borderWidth: 1,
        borderColor: '#FFF'
    },
    layerRight:  {
        flex:            1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex:            2,
        backgroundColor: opacity
    },
});
