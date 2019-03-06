import React from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';
import SessionTile from '../components/SessionTile';

Schedule.navigationOptions = createNavigationOptions("Your Schedule");

export default function Schedule({
    navigation,
    navigation: {
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({ scheduleArray, keynotes, allSessions }) => (
                <ScrollView>
                    <View style={styles.view}>
                        {scheduleArray
                            .map(({
                                sessionName,
                                selectedSession,
                                selectedSession: {
                                    id,
                                } = {},
                            }, i) => (
                                    <View key={sessionName}>
                                        {i === 0 ? (
                                            <Text style={[
                                                styles.title,
                                                styles.marginBottomMedium,
                                            ]}>Friday</Text>
                                        ) : i === 5 ? (
                                            <Text style={[
                                                styles.title,
                                                styles.marginBottomMedium,
                                            ]}>Saturday</Text>
                                        ) : null}
                                        {id ? (
                                            <View
                                                style={[
                                                    styles.marginBottomMedium
                                                ]}
                                            >
                                                <Text style={[
                                                    styles.h2,
                                                    styles.marginBottomMedium,
                                                ]}>{sessionName.slice(0, 1).toUpperCase() + sessionName.slice(1).toLowerCase()}</Text>
                                                <SessionTile
                                                    navigation={navigation}
                                                    session={selectedSession || keynotes.find(({ sessiontype }) => sessiontype.toUpperCase() === sessionName.toUpperCase())}
                                                    addedToSchedule={true}
                                                />
                                            </View>
                                        ) : (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.emptySession,
                                                        styles.marginBottomMedium,
                                                    ]}
                                                    onPress={() => navigate('SelectBreakout', { sessionName })}
                                                >
                                                    <Text style={[
                                                        styles.buttonText,
                                                    ]}>+ {sessionName.slice(0, 1).toUpperCase() + sessionName.slice(1).toLowerCase()}</Text>
                                                    <Text style={[
                                                        styles.h4,
                                                    ]}>{(Object.values(allSessions).find(({ sessiontype }) => sessiontype.toLowerCase() === sessionName.toLowerCase()) || {}).sessiontime || ''}</Text>
                                                </TouchableOpacity>
                                            )}
                                    </View>
                                ))}
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
