import React from 'react';
import {Image, View} from 'react-native';
import {Layout, SectionContent, Text} from 'react-native-rapi-ui';

export default function ({navigation}) {

    const imageUrl = (false ? "../../assets/cross.png" : "../../assets/checkmark.png");


    return (
            <View
                style={{
                    flex:           1,
                    alignItems:     'center',
                    justifyContent: 'center',
                    backgroundColor: "#fff"
                }}
            >

                <Image
                    resizeMode="contain"
                    style={{
                        height: 500,
                        width:  500,
                    }}
                    source={require(imageUrl)}
                />
                <Text>Gelukt</Text>
            </View>
    );
}
