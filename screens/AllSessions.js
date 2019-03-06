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
                    <Text style={[
                        styles.title,
                        styles.marginTopXxLarge,
                        styles.marginBottomXLarge,
                    ]} >{day}</Text>
                    <View
                        style={[
                            styles.breakoutHeader,
                            styles.marginBottomMedium,
                        ]}
                    >
                        <Text style={[
                            styles.h2,
                        ]} >Keynote {k1 + 1}</Text>
                        <Text style={[
                            styles.h4,
                        ]} >{(keynotes[k1] || {}).sessiontime || ''}</Text>
                    </View>
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
                                    style={[
                                        styles.breakoutHeader,
                                        styles.marginTopXxLarge,
                                        styles.marginBottomMedium,
                                    ]}
                                >
                                    <Text style={[
                                        styles.h2,
                                    ]} >{breakoutName.slice(0, 1) + breakoutName.slice(1).toLowerCase()}</Text>
                                    <Text style={[
                                        styles.h4,
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
                    <View
                        style={[
                            styles.breakoutHeader,
                            styles.marginTopMedium,
                            styles.marginBottomMedium,
                        ]}
                    >
                        <Text style={[
                            styles.h2,
                        ]} >Keynote {k2 + 1}</Text>
                        <Text style={[
                            styles.h4,
                        ]} >{(keynotes[k2] || {}).sessiontime || ''}</Text>
                    </View>
                    <SessionTile
                        navigation={navigation}
                        session={keynotes[k2]}
                    />
                </>
            )}
        </StorageConsumer>
    );
}
