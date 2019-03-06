import React, { Component, AsyncStorage } from 'react';
import AppNavigator from './navigation/AppNavigator';
import StorageProvider from './storage/StorageProvider';
import OneSignal from 'react-native-onesignal';

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
        const result = await AsyncStorage.getItem('notifications');

        if (result) {
            const notifications = JSON.parse(result).concat(notification);
            await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
        } else {
            await AsyncStorage.setItem('notifications', JSON.stringify([notification]));
        }
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    render = () => {
        return (
            <StorageProvider>
                <AppNavigator />
            </StorageProvider>
        );
    }
}
