import React from 'react';

import {
    ScrollView,
    View,
    FlatList,
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
                speakerphoto = '',
                name,
                bio,
                photo = '',
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
                            source={{
                                uri: speakerphoto
                                    ||
                                    photo
                                    ||
                                    'https://www.nycc.edu/themes/nycc/images/default_profile.jpg'
                            }}
                        />
                        <Text style={[
                            styles.h1,
                            styles.marginBottomLarge,
                        ]} >{speakername || name}</Text>
                        <Text style={[
                            styles.text,
                            styles.marginBottomXLarge,
                        ]} >{speakerbio || bio}</Text>
                        <View>
                            <Text style={[
                                styles.h2,
                                styles.marginTopMedium,
                                styles.marginBottomMedium,
                            ]} >Sessions</Text>
                            <FlatList
                                keyExtractor={({ id }) => id}
                                data={Object.values(allSessions)
                                    .filter(session => (session.speakername || "").toLowerCase() === (speakername || name).toLowerCase())}
                                renderItem={({ item: session }) => (
                                    <SessionTile
                                        navigation={navigation}
                                        session={session}
                                        renderTimeInsteadOfSpeaker={true}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
