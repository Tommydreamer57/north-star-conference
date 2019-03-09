import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import StorageProvider from './storage/StorageProvider';

export default function App() {
    return (
        <StorageProvider>
            <AppNavigator />
        </StorageProvider>
    );
}
