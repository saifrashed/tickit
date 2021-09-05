import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Layout, Text, Avatar} from 'react-native-rapi-ui';
import {AuthContext} from "../provider/AuthProvider";

export default function ({navigation}) {
    const [user, setUser] = useState([]);
    const auth = useContext(AuthContext);


    useEffect(() => {
        setUser(auth.user)
    }, []);


    console.log(auth.user);

    return (
        <Layout>

            <View
                style={{
                    flex:           1,
                    alignItems:     'center',
                    justifyContent: 'center',
                }}
            >
                <Avatar
                    source={{ uri: 'https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png' }}
                    size="xl"
                    shape="round"
                />

                <Text>{user.firstName + " " + user.lastName}</Text>
                <Text>{user.userEmail}</Text>
            </View>
        </Layout>
    );
}
