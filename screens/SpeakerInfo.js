import React from 'react';

import {
    ScrollView,
    Text,
    Image,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

SpeakerInfo.navigationOptions = createNavigationOptions("Speaker Info");

export default function SpeakerInfo({
    navigation: {
        state: {
            params: {
                speakername,
                speakerbio,
                speakerphoto,
            },
        },
    },
}) {
    return (
        <ScrollView>
            <Image
                style={{
                    height: 250,
                    width: 250,
                }}
                source={{
                    uri: speakerphoto
                }}
            />
            <Text>
                {speakername}
            </Text>
            <Text>
                {speakerbio}
            </Text>
        </ScrollView>
    );
}
