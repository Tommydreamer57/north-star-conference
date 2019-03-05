import React from 'react';

import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';
import { StorageConsumer } from '../storage/StorageProvider';
import SessionTile from '../components/SessionTile';

SpeakerInfo.navigationOptions = createNavigationOptions("Speaker Info");

export default function SpeakerInfo({
    navigation,
    navigation: {
        state: {
            params: {
                speakername = '',
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
        <StorageConsumer>
            {({ allSessions }) => (
                <ScrollView>
                    <View style={styles.view}>
                        <Image
                            style={styles.speakerphoto}
                            source={{ uri: speakerphoto || photo }}
                        />
                        <Text style={styles.h1} >
                            {speakername || name}
                        </Text>
                        <Text style={styles.text} >
                            {speakerbio || bio}
                        </Text>
                        <View>
                            <Text style={styles.h2} >Sessions</Text>
                            {Object.values(allSessions)
                                .filter(session => (session.speakername || "").toLowerCase() === (speakername || name).toLowerCase())
                                .map(session => (
                                    <SessionTile
                                        navigation={navigation}
                                        key={session.id}
                                        session={session}
                                        renderTimeInsteadOfSpeaker={true}
                                    />
                                ))}
                        </View>
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
