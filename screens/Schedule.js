import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {
    getItem,
} from '../service/storage-service';

import Colors from '../constants/Colors';

export default class Schedule extends Component {

    state = {
        scheduleArray: [],
    };

    componentDidMount = async () => {
        const schedule = await getItem("schedule");
        const orderedKeys = [
            "KEYNOTE 1",
            "BREAKOUT 1",
            "BREAKOUT 2",
            "BREAKOUT 3",
            "KEYNOTE 2",
            "KEYNOTE 3",
            "BREAKOUT 4",
            "BREAKOUT 5",
            "BREAKOUT 6",
            "KEYNOTE 4",
        ];
        const scheduleArray = orderedKeys
            .map(key => ({
                breakoutName: key,
                selectedSession: schedule[key],
            }));
        this.setState({ scheduleArray });
    }

    render = () => {
        const {
            state: {
                scheduleArray,
            },
            props: {
                navigation: {
                    navigate,
                },
            },
        } = this;
        return (
            <ScrollView>
                <Text>
                    SCHEDULE
                </Text>
                {scheduleArray
                    .map(({
                        breakoutName,
                        selectedSession: {
                            id,
                            title,
                            speakername,
                        }
                    }) => (
                            <TouchableOpacity
                                onPress={() => breakoutName.match(/breakout/i) && navigate('SelectBreakout', { id })}
                                style={styles.session}
                                key={breakoutName}
                            >
                                {id ? (
                                    <>
                                        <Text>
                                            {breakoutName}: {title}
                                        </Text>
                                        <Text>
                                            {speakername}
                                        </Text>
                                    </>
                                ) : (
                                        <>
                                            <Text>
                                                {breakoutName}
                                            </Text>
                                            <Text>
                                                ADD SESSION
                                            </Text>
                                        </>
                                    )}
                            </TouchableOpacity>
                        ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.blue,
    },
    view: {

    },
    keynote: {
        margin: 5,
        backgroundColor: Colors.blue,
    },
    title: {

    },
    breakoutTitle: {
        fontWeight: 'bold',
    },
    session: {
        margin: 5,
        backgroundColor: Colors.green,
    },
});
