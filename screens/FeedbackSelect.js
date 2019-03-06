import React, { Component } from 'react';

import {
    Text,
    TextInput,
    View,
    ScrollView,
    FlatList,
    Switch,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageContext, StorageConsumer } from '../storage/StorageProvider';

// import { log } from '../storage/service';

import styles, { COLORS } from '../styles/styles';

// import KeyboardView from '../components/KeyboardView';
import SessionTile from '../components/SessionTile';

import filterSessions from '../utils/filters';

export default class FeedbackSelect extends Component {

    static navigationOptions = createNavigationOptions("Select Session");

    state = {
        input: "",
        sessionId: 0,
        filterBySchedule: true,
    };

    render = () => {
        const {
            state,
            state: {
                input,
                filterBySchedule,
            },
            props: {
                navigation,
                navigation: {
                    navigate,
                },
            },
        } = this;

        return (
            <StorageConsumer>
                {context => (
                    <ScrollView>
                        <View style={styles.view}>
                            <Text style={[
                                styles.title,
                                styles.marginTopXxLarge,
                                styles.marginBottomXxLarge,
                            ]} >Select A Session</Text>
                            <Text>Search</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    styles.marginBottomMedium,
                                ]}
                                value={input}
                                onChangeText={input => this.setState({ input })}
                            />
                            <View style={styles.switchWrapper}>
                                <Switch
                                    trackColor={{
                                        true: COLORS.blue,
                                        false: COLORS.gray,
                                    }}
                                    value={filterBySchedule}
                                    onValueChange={filterBySchedule => this.setState({ filterBySchedule })}
                                />
                                <Text style={styles.switchLabel}>Filter By Schedule</Text>
                            </View>
                            <View style={[
                                styles.marginTopXxLarge,
                            ]}>
                                <FlatList
                                    keyExtractor={({ id }) => id}
                                    data={Object.values(context.allSessions)
                                        .filter(filterSessions({ context, state }))}
                                    renderItem={({ item: session }) => (
                                        <SessionTile
                                            session={session}
                                            navigation={navigation}
                                            onPress={() => navigate("Feedback", {
                                                id: session.id,
                                                sessionName: (session.sessiontype || '').toUpperCase(),
                                            })}
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
}
