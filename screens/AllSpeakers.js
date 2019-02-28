import React from 'react';

import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

export default function AllSpeakers({
    navigation: {
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({ speakers }) => (
                <ScrollView>
                    <View style={styles.view} >
                        {Object.values(speakers)
                            .sort(({ name: a }, { name: b }) => a > b)
                            .map(({ name, bio, photo }) => (
                                <TouchableOpacity
                                    key={name}
                                    onPress={() => navigate("SpeakerInfo", { name, bio, photo })}
                                >
                                    <Text>{name}</Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
