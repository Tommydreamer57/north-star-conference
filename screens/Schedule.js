import React from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';
import SessionTile from '../components/SessionTile';

Schedule.navigationOptions = createNavigationOptions("Schedule");

export default function Schedule({
    navigation,
    navigation: {
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({ scheduleArray, keynotes }) => (
                <ScrollView>
                    <View style={styles.view}>
                        {scheduleArray
                            .map(({
                                sessionName,
                                selectedSession,
                                selectedSession: {
                                    id,
                                    title,
                                    speakername,
                                } = {},
                            }) => sessionName.match(/keynote/i) ? (
                                <SessionTile
                                    key={id || sessionName}
                                    session={
                                        selectedSession
                                        ||
                                        keynotes.find(({ sessiontype }) => sessiontype.toUpperCase() === sessionName.toUpperCase())
                                    }
                                    navigation={navigation}
                                    addedToSchedule={true}
                                />
                                // <TouchableOpacity
                                //     key={sessionName}
                                //     style={styles.sessionTile}
                                //         onPress={() => navigate('SessionInfo', {
                                //             sessionName,
                                //             id,
                                //         })}
                                // >
                                //     <Text>
                                //         {`${
                                //             sessionName
                                //             }: ${
                                //             title
                                //             }`}
                                //     </Text>
                                //     <Text>
                                //         {speakername}
                                //     </Text>
                                // </TouchableOpacity>
                            ) : (
                                        <TouchableOpacity
                                            key={sessionName}
                                            onPress={id ?
                                                () => navigate('SessionInfo', { sessionName, id })
                                                :
                                                () => navigate('SelectBreakout', { sessionName, id })}
                                            style={id ?
                                                styles.selectedSession
                                                :
                                                styles.emptySession}
                                            key={sessionName}
                                        >
                                            <Text>
                                                {`${
                                                    sessionName
                                                    }: ${
                                                    title
                                                    }`}
                                            </Text>
                                            <Text>
                                                {speakername}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                            )}
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}
