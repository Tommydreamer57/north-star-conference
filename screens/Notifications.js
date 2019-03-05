import React from 'react';

import {
    ScrollView,
    Text,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

Notifications.navigationOptions = createNavigationOptions("Notifications");

export default function Notifications() {
    return (
        <ScrollView>
            <Text>
                NOTIFICATIONS
            </Text>
        </ScrollView>
    );
}