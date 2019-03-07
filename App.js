import React, { Component } from 'react';
import AppNavigator from './navigation/AppNavigator';
import StorageProvider from './storage/StorageProvider';

export default function App() {
    return (
        <StorageProvider newNotification={this.state.notification} >
            <AppNavigator />
        </StorageProvider>
    );
}
