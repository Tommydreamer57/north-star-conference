import React from 'react';

import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles, { createNavigationOptions } from '../styles/styles';

Breakouts.navigationOptions = createNavigationOptions("Breakouts");

export default function Breakouts({
    navigation: {
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({ breakouts, schedule }) => (
                <ScrollView>
                    {Object.keys(breakouts)
                        .map(sessionName => (
                            <View
                                key={sessionName}
                                style={styles.breakoutGroup}
                            >
                                <Text
                                    style={styles.breakoutTitle}
                                >
                                    {sessionName}
                                </Text>
                                {breakouts[sessionName]
                                    .map(({
                                        id,
                                        title,
                                        speakername,
                                    }) => (
                                            <TouchableOpacity
                                                key={id}
                                                style={id === schedule[sessionName].id ?
                                                    styles.selectedSession
                                                    :
                                                    styles.session
                                                }
                                                onPress={() => navigate("SessionInfo", { sessionName, id })}
                                            >
                                                <Text
                                                    style={styles.sessionTitle}
                                                >
                                                    {title}
                                                </Text>
                                                <Text>
                                                    &nbsp;--&nbsp;{speakername}
                                                </Text>
                                            </TouchableOpacity>
                                        ))
                                }
                            </View>
                        ))}
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
