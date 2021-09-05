import React, {createContext, useState} from 'react';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = (props) => {
    // user null = loading

    const BASE_URL = 'https://tickit.vorm.tech';

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser]         = useState({});
    const [token, setToken]       = useState(undefined);

    const [events, setEvents] = useState(undefined);
    const [event, setEvent]   = useState(undefined);
    const [ticket, setTicket] = useState(undefined);


    let login = async (user, token) => {

        const events = await axios.get(BASE_URL + '/events/active', {headers: {"x-auth-token": token}});

        setIsLogged(true);
        setUser(user);
        setToken(token);
        setEvents(events)
    };

    let logout = () => {
        setIsLogged(false);
        setUser({})
    };

    let setScannerEvent = (eventId) => {
        setEvent(eventId);
    };

    let setScannerTicket = (ticketId) => {
        setTicket(ticketId);
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged:         isLogged,
                user:             user,
                token:            token,
                login:            login,
                logout:           logout,
                events:           events,
                setScannerEvent:  setScannerEvent,
                setScannerTicket: setScannerTicket,
                scannerData:      {
                    eventId:  event,
                    ticketId: ticket
                }
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
