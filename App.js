import React, { Component } from 'react';
import AppNavigator from './navigation/AppNavigator';
import StorageProvider from './storage/StorageProvider';
import OneSignal from 'react-native-onesignal';
import { handleReceivedNotification } from './storage/service';

export default class App extends Component {

    state = {
        notification: {},
    };

    constructor(properties) {
        super(properties);
        OneSignal.init("d8ca736c-86df-4151-9df8-2fbfecf81436");

        OneSignal.addEventListener('received', handleReceivedNotification);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', handleReceivedNotification);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
        clearInterval(this.interval);
    }

    onReceived = notification => this.setState({ notification });

    onOpened(openResult) {}

    onIds(device) {
        console.log('Device info: ', device);
    }

    render() {
        return (
            <StorageProvider newNotification={this.state.notification} >
                <AppNavigator />
            </StorageProvider>
        );
    }
}
