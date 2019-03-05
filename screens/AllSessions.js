import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
    TextInput,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import SessionTile from '../components/SessionTile';

import filters from '../utils/filters';


export default class AllSessions extends Component {

    static navigationOptions = createNavigationOptions("Sessions");

    state = {
        input: '',
    };

    render = () => {
        const {
            state: {
                input,
            },
            props: {
                navigation,
            },
        } = this;
        return (
            <ScrollView>
                <View
                    style={styles.view}
                >
                    <Text>Search</Text>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={input => this.setState({ input })}
                    />
                    <Day
                        input={input}
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
                        input={input}
                        day="Saturday"
                        keynoteIndeces={[2, 3]}
                        breakoutNames={[
                            'BREAKOUT 4',
                            'BREAKOUT 5',
                            'BREAKOUT 6',
                        ]}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
        );
    }
}

function Day({
    input,
    day,
    keynoteIndeces: [k1, k2],
    breakoutNames,
    navigation,
}) {
    return (
        <StorageConsumer>
            {({ keynotes, breakouts, schedule }) => (
                <>
                    <Text style={styles.title} >{day}</Text>
                    <SessionTile
                        navigation={navigation}
                        session={keynotes[k1]}
                    />
                    {breakoutNames.map(breakoutName => {
                        const breakout = breakouts[breakoutName] || [];
                        const [
                            {
                                sessiontime = '',
                            } = {}
                        ] = breakout;
                        return (
                            <View
                                key={breakoutName}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Text style={[
                                        styles.h2,
                                        styles.noMargin,
                                        {
                                            marginTop: 10,
                                        },
                                    ]} >{breakoutName.slice(0, 1) + breakoutName.slice(1).toLowerCase()}: </Text>
                                    <Text styles={[
                                        styles.h4,
                                        styles.noMargin,
                                    ]} >{sessiontime}</Text>
                                </View>
                                <View>
                                    {breakout
                                        .filter(filters.filterByTextInput({ state: { input } }))
                                        .map(session => (
                                            <SessionTile
                                                key={session.id}
                                                session={session}
                                                navigation={navigation}
                                                addedToSchedule={schedule[breakoutName]
                                                    &&
                                                    schedule[breakoutName].id === session.id}
                                            />
                                        ))}
                                </View>
                            </View>
                        );
                    })}
                    <SessionTile
                        navigation={navigation}
                        session={keynotes[k2]}
                    />
                </>
            )}
        </StorageConsumer>
    );
}
