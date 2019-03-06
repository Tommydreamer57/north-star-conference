import React from 'react';

import {
    ScrollView,
    View,
    Text,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

import styles from '../styles/styles';

Notifications.navigationOptions = createNavigationOptions("Notifications");

export default function Notifications() {
    return (
        <ScrollView>
            <View style={styles.view}>
                <Text>
                    NOTIFICATIONS
                </Text>
            </View>
        </ScrollView>
    );
}