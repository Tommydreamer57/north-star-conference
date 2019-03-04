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
                name,
                bio,
                photo,
            },
        },
    },
}) {
    return (
        <ScrollView style={styles.view} >
            <Image
                style={styles.speakerphoto}
                source={{ uri: speakerphoto || photo }}
            />
            <Text style={styles.h2} >
                {speakername || name}
            </Text>
            <Text style={styles.paragraph} >
                {speakerbio || bio}
            </Text>
        </ScrollView>
    );
}
