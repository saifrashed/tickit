import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Layout, Section, SectionContent, SectionImage, Text} from 'react-native-rapi-ui';
import {AuthContext} from "../provider/AuthProvider";

export default function ({navigation}) {
    const [events, setEvents] = useState([]);
    const auth                = useContext(AuthContext);

    useEffect(() => {
        setEvents(auth.events.data);
    }, []);

    const handleEventScanner = (event) => {
        console.log(event);
        auth.setScannerEvent(event._id);
        navigation.navigate("Scanner")
    };

    return (
        <Layout>
            <ScrollView style={{padding: 20}}>
                <Text size={"h1"} style={{textAlign: "center", padding: 10}}>Evenementen</Text>

                {events.length ? events.map((value, key) => (
                    <TouchableOpacity key={key} onPress={() => {
                        handleEventScanner(value)
                    }}>
                        <Section style={{margin: 5}}>
                            <SectionImage source={{uri: 'https://tickit.vorm.tech/' + value.eventImage}}/>
                            <SectionContent>
                                <Text>{value.eventName}</Text>
                            </SectionContent>
                        </Section>
                    </TouchableOpacity>
                )) : <Text style={{textAlign: "center", padding: 10}}>Geen actieve evenementen</Text>}


            </ScrollView>
        </Layout>
    );
}
