import React from 'react';

import {
    ScrollView,
    View,
    Text,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles, { createNavigationOptions } from '../styles/styles';

Keynotes.navigationOptions = createNavigationOptions("Keynotes");

export default function Keynotes() {
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
                        }) => (
                                <View
                                    key={id}
                                >
                                    <Text>
                                        {title}
                                    </Text>
                                    <Text>
                                        {speakername}
                                    </Text>
                                </View>
                            ))}
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
