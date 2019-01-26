import React from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles, { createNavigationOptions } from '../styles/styles';

import { StorageConsumer } from '../storage/StorageProvider';

Schedule.navigationOptions = createNavigationOptions("Schedule");

export default function Schedule({
    navigation: {
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({ scheduleArray }) => (
                <ScrollView>
                    {scheduleArray
                        .map(({
                            sessionName,
                            selectedSession: {
                                id,
                                title,
                                speakername,
                            }
                        }) => sessionName.match(/keynote/i) ? (
                            <TouchableOpacity
                                key={sessionName}
                                style={styles.keynoteSession}
                                onPress={() => navigate('SessionInfo', { sessionName, id })}
                            >
                                <Text>
                                    {`${
                                        sessionName
                                        }: ${
                                        title
                                        }`}
                                </Text>
                                <Text>
                                    {speakername}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                                    <TouchableOpacity
                                        key={sessionName}
                                        onPress={id ?
                                            () => navigate('SessionInfo', { sessionName, id })
                                            :
                                            () => navigate('SelectBreakout', { sessionName, id })}
                                        style={id ?
                                            styles.selectedSession
                                            :
                                            styles.emptySession}
                                        key={sessionName}
                                    >
                                        <Text>
                                            {`${
                                                sessionName
                                                }: ${
                                                title
                                                }`}
                                        </Text>
                                        <Text>
                                            {speakername}
                                        </Text>
                                    </TouchableOpacity>
                                )
                        )}
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
