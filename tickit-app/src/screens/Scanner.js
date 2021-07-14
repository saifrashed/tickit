import React, {useContext, useEffect, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Button, Text, themeColor, TopNav, useTheme} from "react-native-rapi-ui";
import {Ionicons} from "@expo/vector-icons";
import {BarCodeScanner} from "expo-barcode-scanner";
import {AuthContext} from "../provider/AuthProvider";

const {width} = Dimensions.get('window');

export default function ({navigation}) {
    const {isDarkmode} = useTheme();


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
        console.log(data)
        navigation.navigate("ScannerResult")
    };

    return (
        <View style={{flex: 1, paddingTop: 25, backgroundColor: isDarkmode ? themeColor.dark : themeColor.white}}>
            <TopNav
                middleContent="Scanner"
                leftContent={
                    <Ionicons
                        name="chevron-back"
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.black}
                    />
                }
                leftAction={() => navigation.goBack()}
            />
            <View
                style={{
                    flex:           1,
                    alignItems:     "center",
                    justifyContent: "center",
                }}
            >
                {/* This text using ubuntu font */}
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{
                        height: "100%",
                        width:  "100%"
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

                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
            </View>
        </View>
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
