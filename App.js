import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import StorageProvider from './storage/StorageProvider';
import OneSignal from 'react-native-onesignal';
import { validKeys } from './storage/service';

export default class App extends Component {

    constructor(properties) {
        super(properties);
        OneSignal.init("d8ca736c-86df-4151-9df8-2fbfecf81436");

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    async onReceived(notification) {
        try {
            const result = await AsyncStorage.getItem(validKeys.notifications);

            const previousNotifications = JSON.parse(result || "[]");
            const allNotifications = [notification].concat(previousNotifications);

            try {
                await AsyncStorage.setItem(validKeys.notifications, JSON.stringify(allNotifications));
            } catch (err) {
                console.error('Error setting notifications: ', err);
            }
        } catch (err) {
            console.error('Error getting notifications: ', err);
        }
    }

    //Sample Payload:

    // {
    //   "displayType": 1,
    //   "isAppInFocus": true,
    //   "payload": Object {
    //     "actionButtons": Array [],
    //     "body": "This is a sample payload",
    //     "notificationID": "8acfff59-b592-4bf5-91a5-9f1640b22bf4",
    //     "rawPayload": Object {
    //       "aps": Object {
    //         "alert": Object {
    //           "body": "This is a sample payload",
    //           "title": "Test",
    //         },
    //         "mutable-content": 1,
    //         "sound": "default",
    //       },
    //       "custom": Object {
    //         "i": "8acfff59-b592-4bf5-91a5-9f1640b22bf4",
    //       },
    //     },
    //     "sound": "default",
    //     "title": "Test",
    //   },
    //   "shown": true,
    // }

    onOpened(openResult) {
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    render() {
        return (
            <StorageProvider>
                <AppNavigator />
            </StorageProvider>
        );
    }
}
