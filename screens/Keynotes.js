import React from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles, { createNavigationOptions } from '../styles/styles';

Keynotes.navigationOptions = createNavigationOptions("Keynotes");

export default function Keynotes({
    navigation: {
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({ keynotes }) => (
                <ScrollView>
                    <Text>
                        KEYNOTES
                    </Text>
                    <View>
                        {keynotes.map(({
                            id,
                            title,
                            speakername,
                            sessiontype,
                        }) => (
                                <TouchableOpacity
                                    key={id}
                                    onPress={() => navigate("SessionInfo", { sessionName: sessiontype, id })}
                                    style={styles.keynoteSession}
                                >
                                    <Text>
                                        {title}
                                    </Text>
                                    <Text>
                                        {speakername}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
