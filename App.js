import React, { Component } from 'react';

import {
    Permissions,
    Notifications,
} from 'expo';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import axios from 'axios';

import AppNavigator from './navigation/AppNavigator';

import StorageProvider from './storage/StorageProvider';

export default class App extends Component {

    state = {
        token: "",
        notification: {},
    };

    _registerAppForPushNotifications = async (tryagain = true) => {
        const { status, ...permissions } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        console.log({ status, ...permissions });
        // if (status !== 'granted') {
        //     if (tryagain) {
        //         this._registerAppForPushNotifications(false);
        //     }
        // } else {
        const token = await Notifications.getExpoPushTokenAsync();

        this.subscription = Notifications.addListener(this._handleNotification);

        this.setState({ token });
        // }
    }

    _handleNotification = notification => this.setState({ notification });

    sendNotification = async () => {
        const {
            state: {
                token,
            },
        } = this;

        const notification = await axios.post('https://exp.host/--/api/v2/push/send', {
            to: token,
            title: "NOTIFICATION",
            body: "some text for a notification",
            data: {
                message: "hello Tommy",
            },
        });
        console.log({ notification });
    }

    // componentDidMount = () => this._registerAppForPushNotifications();

    render = () => {

        const {
            state: {

            },
            _registerAppForPushNotifications,
            sendNotification,
        } = this;

        return (
            // <View
            //     style={{
            //         height: '100%',
            //         width: '100%',
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //     }}
            // >
            //     <TouchableOpacity
            //         onPress={_registerAppForPushNotifications}
            //     >
            //         <Text>
            //             REGISTER FOR NOTIFICATIONS
            //         </Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity
            //         onPress={sendNotification}
            //     >
            //         <Text>
            //             SEND NOTIFICATION
            //         </Text>
            //     </TouchableOpacity>
            // </View>
            <StorageProvider>
                <AppNavigator />
            </StorageProvider>
        );
    }
}
