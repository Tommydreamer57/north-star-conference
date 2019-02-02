import React from 'react';

import {
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

export default function AllSpeakers({
    navigation: {
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({ speakers }) => (
                <ScrollView>
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
                </ScrollView>
            )}
        </StorageConsumer>
    )
}
