import React from 'react';

import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import SessionTile from '../components/SessionTile';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

SelectBreakout.navigationOptions = ({
    navigation: {
        state: {
            params: {
                sessionName = '',
            },
        },
    },
}) => ({
    ...createNavigationOptions("Select Breakout"),
    title: sessionName.slice(0, 1).toUpperCase() + sessionName.slice(1).toLowerCase(),
});

export default function SelectBreakout({
    navigation,
    navigation: {
        state: {
            params: {
                sessionName,
                id,
            },
        },
    },
}) {
    return (
        <StorageConsumer>
            {({
                breakouts: {
                    [sessionName]: breakouts = [],
                },
            }) => (
                    <ScrollView>
                        <View style={styles.view}>
                            {breakouts.map(session => (
                                <SessionTile
                                    key={session.id}
                                    navigation={navigation}
                                    session={session}
                                />
                            ))}
                        </View>
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}
