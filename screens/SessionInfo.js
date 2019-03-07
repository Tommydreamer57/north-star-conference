import React from 'react';

import {
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';

import { extractSessionDay } from '../utils/sessions';

SessionInfo.navigationOptions = createNavigationOptions("Session Info");

export default function SessionInfo({
    navigation: {
        state: {
            params: {
                sessionName = '',
                id,
            },
        },
        goBack,
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({
                allSessions: {
                    [id]: {
                        sessiontime = '',
                        title = '',
                        description = '',
                        demographic = '',
                        speakername = '',
                        speakerbio = '',
                        speakerphoto = '',
                    } = {},
                },
                scheduleArray,
                addToSchedule,
                removeFromSchedule,
            }) => (
                    <ScrollView>
                        <View style={styles.view} >
                            <Text style={[
                                styles.h1,
                                styles.marginBottomXLarge,
                            ]} >{title}</Text>
                            <TouchableOpacity
                                onPress={() => navigate('SpeakerInfo', {
                                    speakername,
                                    speakerbio,
                                    speakerphoto,
                                })}
                            >
                                <Image
                                    style={styles.speakerphoto}
                                    source={{
                                        uri: speakerphoto
                                            ||
                                            'https://www.nycc.edu/themes/nycc/images/default_profile.jpg',
                                    }}
                                />
                                <Text style={[
                                    styles.h2,
                                    styles.marginBottomXxSmall,
                                ]}>{speakername}</Text>
                            </TouchableOpacity>
                            <Text style={[
                                styles.h4,
                                styles.marginBottomXxSmall,
                            ]} >{extractSessionDay({ sessiontype: sessionName })} {sessiontime}</Text>
                            <Text style={[
                                styles.h4,
                                styles.marginBottomLarge,
                            ]} >{demographic}</Text>
                            <Text style={[
                                styles.text,
                                styles.marginBottomXxLarge,
                            ]} >{description || 'No description'}</Text>
                            <Text style={[
                                styles.h3,
                                styles.marginBottomLarge,
                            ]} >About The Speaker{speakername.match(/,|and/) ? 's' : ''}</Text>
                            <Text style={[
                                styles.text,
                                styles.marginBottomXLarge
                            ]} >{speakerbio}</Text>

                            {scheduleArray.some(({
                                selectedSession: {
                                    id: selectedId,
                                } = {},
                            }) => selectedId === id) ? (
                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            styles.marginTopMedium,
                                        ]}
                                        onPress={async () => {
                                            await removeFromSchedule(id);
                                            goBack();
                                        }}
                                    >
                                        <Text style={[
                                            styles.buttonText,
                                        ]} >Remove From Schedule</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            styles.marginTopMedium,
                                        ]}
                                        onPress={async () => {
                                            await addToSchedule(id);
                                            goBack();
                                        }}
                                    >
                                        <Text style={[
                                            styles.buttonText,
                                        ]} >Add To Schedule</Text>
                                    </TouchableOpacity>
                                )}
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.marginTopMedium,
                                ]}
                                onPress={() => navigate("Feedback", { id, sessionName })}
                            >
                                <Text style={[
                                    styles.buttonText,
                                ]} >Provide Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}