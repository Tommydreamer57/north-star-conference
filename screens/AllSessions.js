import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import SessionTile from '../components/SessionTile';

import filterSessions from '../utils/filters';

import { extractSessionType } from '../utils/sessions';


export default class AllSessions extends Component {

    static navigationOptions = createNavigationOptions("All Sessions");

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
                    <FlatList
                        keyExtractor={(_, i) => `${i}`}
                        data={[
                            {
                                input,
                                day: "Friday",
                                keynoteIndeces: [0, 1],
                                breakoutNames: [
                                    'BREAKOUT 1',
                                    'BREAKOUT 2',
                                    'BREAKOUT 3',
                                ],
                                navigation,
                            },
                            {
                                input,
                                day: "Saturday",
                                keynoteIndeces: [2, 3],
                                breakoutNames: [
                                    'BREAKOUT 4',
                                    'BREAKOUT 5',
                                    'BREAKOUT 6',
                                ],
                                navigation,
                            },
                        ]}
                        renderItem={({ item }) => (
                            <Day {...item} />
                        )}
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
                    <FlatList
                        keyExtractor={name => name}
                        data={breakoutNames}
                        renderItem={({ item: breakoutName }) => {
                            const breakout = breakouts[breakoutName] || [];
                            const [
                                {
                                    sessiontime = '',
                                } = {}
                            ] = breakout;
                            return (
                                <>
                                    <View
                                        style={[
                                            styles.breakoutHeader,
                                            styles.marginTopXxLarge,
                                            styles.marginBottomMedium,
                                        ]}
                                    >
                                        <Text style={[
                                            styles.h2,
                                        ]} >{extractSessionType({ sessiontype: breakoutName })}</Text>
                                        <Text style={[
                                            styles.h4,
                                        ]} >{sessiontime}</Text>
                                    </View>
                                    <FlatList
                                        keyExtractor={({ id }) => id}
                                        data={breakout
                                            .filter(filterSessions({ state: { input } }))}
                                        renderItem={({ item: session }) => (
                                            <SessionTile
                                                session={session}
                                                navigation={navigation}
                                                addedToSchedule={schedule[breakoutName]
                                                    &&
                                                    schedule[breakoutName].id === session.id}
                                            />
                                        )}
                                    />
                                </>
                            );
                        }}
                    />
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
