import React from 'react';

import {
    ScrollView,
    View,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';
import SessionTile from '../components/SessionTile';
import { extractSessionType } from '../utils/sessions';

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
                        <FlatList
                            keyExtractor={({ sessionName }) => sessionName}
                            data={scheduleArray}
                            renderItem={({
                                item: {
                                    sessionName,
                                    selectedSession,
                                    selectedSession: {
                                        id,
                                    } = {},
                                },
                                index,
                            }) => (
                                    <View>
                                        {index === 0 ? (
                                            <Text style={[
                                                styles.title,
                                                styles.marginBottomXLarge,
                                            ]}>Friday</Text>
                                        ) : index === 5 ? (
                                            <Text style={[
                                                styles.title,
                                                styles.marginBottomXLarge,
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
                                                ]}>{extractSessionType(selectedSession)}</Text>
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
                                                    ]}>+ {extractSessionType({ sessiontype: sessionName })}</Text>
                                                    <Text style={[
                                                        styles.h4,
                                                    ]}>{(Object.values(allSessions).find(({ sessiontype }) => sessiontype.toLowerCase() === sessionName.toLowerCase()) || {}).sessiontime || ''}</Text>
                                                </TouchableOpacity>
                                            )}
                                    </View>
                                )}
                        />
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
