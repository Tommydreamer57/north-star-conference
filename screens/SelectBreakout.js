import React from 'react';

import {
    ScrollView,
    View,
    FlatList,
} from 'react-native';

import SessionTile from '../components/SessionTile';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';
import { extractSessionType } from '../utils/sessions';

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
    title: extractSessionType({ sessiontype: sessionName }),
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
                            <FlatList
                                keyExtractor={({ id }) => id}
                                data={breakouts}
                                renderItem={({ item: session }) => (
                                    <SessionTile
                                        navigation={navigation}
                                        session={session}
                                    />
                                )}
                            />
                        </View>
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}
