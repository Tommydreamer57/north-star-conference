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

Schedule.navigationOptions = createNavigationOptions("Schedule");

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
                                            <Text style={styles.title}>Friday</Text>
                                        ) : i === 5 ? (
                                            <Text style={styles.title}>Saturday</Text>
                                        ) : null}
                                        {id ? (
                                            <View
                                                style={{
                                                    marginBottom: 16,
                                                }}
                                            >
                                                <Text style={[
                                                    styles.h2,
                                                    styles.noMargin,
                                                    {
                                                        marginTop: 10,
                                                    }
                                                ]}>{sessionName}</Text>
                                                <SessionTile
                                                    navigation={navigation}
                                                    session={selectedSession || keynotes.find(({ sessiontype }) => sessiontype.toUpperCase() === sessionName.toUpperCase())}
                                                    addedToSchedule={true}
                                                />
                                            </View>
                                        ) : (
                                                <TouchableOpacity
                                                    style={styles.emptySession}
                                                    onPress={() => navigate('SelectBreakout', { sessionName })}
                                                >
                                                    <Text style={[
                                                        styles.h2,
                                                        styles.noMargin,
                                                        {
                                                            fontSize: 12,
                                                        },
                                                    ]}>{sessionName}</Text>
                                                    <Text style={[
                                                        styles.h4,
                                                        styles.noMargin,
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
