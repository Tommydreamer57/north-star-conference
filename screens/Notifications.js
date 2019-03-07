import React from 'react';

import {
    ScrollView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

import styles from '../styles/styles';

import { StorageConsumer } from '../storage/StorageProvider';

Notifications.navigationOptions = createNavigationOptions("Notifications");

// const sampleNotificationPayload = {
//     displayType: 1,
//     isAppInFocus: true,
//     // NOTIFICATIONS ARRAY WILL ONLY CONTAIN `payload`s
//     payload: {
//         actionButtons: [],
//         body: "This is a sample payload",
//         notificationID: "8acfff59-b592-4bf5-91a5-9f1640b22bf4",
//         rawPayload: {
//             aps: {
//                 alert: {
//                     body: "This is a sample payload",
//                     title: "Test",
//                 },
//                 "mutable-content": 1,
//                 sound: "default",
//             },
//             custom: {
//                 i: "8acfff59-b592-4bf5-91a5-9f1640b22bf4",
//             },
//         },
//         sound: "default",
//         title: "Test",
//     },
//     shown: true,
// };

// const notifications = [sampleNotificationPayload.payload];

// Notifications array only contains `payload`s

export default function Notifications() {
    return (
        <StorageConsumer>
            {({ notifications, deleteNotification }) => (
                <ScrollView>
                    <View style={styles.view}>
                        <FlatList
                            keyExtractor={({ notificationID }) => notificationID}
                            data={notifications}
                            renderItem={({
                                item: {
                                    title = '',
                                    body = '',
                                    notificationID,
                                },
                            }) => (
                                    <View style={[
                                        styles.speakerButton,
                                        styles.marginBottomLarge,
                                    ]} >
                                        <View>
                                            <Text style={[
                                                styles.h3,
                                                styles.marginBottomXxSmall,
                                            ]} >{title}</Text>
                                            <Text style={[
                                                styles.text,
                                            ]} >{body}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => deleteNotification(notificationID)}
                                        >
                                            <Text style={[
                                                styles.speakerButtonArrow,
                                            ]} >X</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                        />
                    </View>
                </ScrollView>
            )}
        </StorageConsumer>
    );
}