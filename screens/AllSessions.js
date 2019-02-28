import React from 'react';

import {
    ScrollView,
    View,
    Text,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';
import SessionTile from '../components/SessionTile';

AllSessions.navigationOptions = createNavigationOptions("Sessions");

export default function AllSessions({
    navigation,
}) {
    return (
        <ScrollView>
            <Day
                day="Friday"
                keynoteIndeces={[0, 1]}
                breakoutNames={[
                    'BREAKOUT 1',
                    'BREAKOUT 2',
                    'BREAKOUT 3',
                ]}
                navigation={navigation}
            />
            <Day
                day="Saturday"
                keynoteIndeces={[2, 3]}
                breakoutNames={[
                    'BREAKOUT 4',
                    'BREAKOUT 5',
                    'BREAKOUT 6',
                ]}
                navigation={navigation}
            />
        </ScrollView>
    );
}

function Day({
    day,
    keynoteIndeces: [k1, k2],
    breakoutNames,
    navigation,
}) {
    return (
        <StorageConsumer>
            {({ keynotes, breakouts, schedule }) => (
                <View
                    style={styles.view}
                >
                    <Text style={styles.h1} >{day}</Text>
                    <SessionTile
                        navigation={navigation}
                        session={keynotes[k1]}
                    />
                    {breakoutNames.map(breakoutName => (
                        <View
                            key={breakoutName}
                        >
                            <Text
                                style={styles.h3}
                            >{breakoutName}: {breakouts[breakoutName][0].sessiontime}</Text>
                            <View>
                                {breakouts[breakoutName].map(session => (
                                    <SessionTile
                                        key={session.id}
                                        session={session}
                                        navigation={navigation}
                                        addedToSchedule={schedule[breakoutName].id === session.id}
                                    />
                                ))}
                            </View>
                        </View>
                    ))}
                    <SessionTile
                        navigation={navigation}
                        session={keynotes[k2]}
                    />
                </View>
            )}
        </StorageConsumer>
    );
}
