import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-rapi-ui';
import {AuthContext} from "../provider/AuthProvider";
import axios from "axios";

export default function ({navigation}) {
    const [isValid, setValidity]             = useState(false);
    const [message, setMessage]             = useState("");

    const auth     = useContext(AuthContext);
    // const imgUrl = (isValid ? "../../assets/cross.png" : "../../assets/checkmark.png");

    useEffect(() => {
        handleScanRequest()
    }, []);

    const handleScanRequest = async () => {
        try {
            console.log("token: " + auth.token);
            console.log(auth.scannerData);

            const scanResult = await axios.post("https://tickit.vorm.tech/tickets/scan", auth.scannerData,{
                headers: {"x-auth-token": auth.token},
            });

            setValidity(scanResult.data.isValid);
            setMessage(scanResult.data.message);

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <View
            style={{
                flex:            1,
                alignItems:      'center',
                justifyContent:  'center',
                backgroundColor: "#fff"
            }}
        >

            {isValid ? (
                <Image
                    resizeMode="contain"
                    style={{
                        height: 500,
                        width:  500,
                    }}
                    source={require("../../assets/checkmark.png")}
                />
            ) : (
                <Image
                    resizeMode="contain"
                    style={{
                        height: 500,
                        width:  500,
                    }}
                    source={require("../../assets/cross.png")}
                />
            )}

            <Text>{message}</Text>
        </View>
    );
}
