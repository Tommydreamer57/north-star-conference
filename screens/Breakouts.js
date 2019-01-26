import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    getItems,
} from '../service/storage-service';

import Colors from '../constants/Colors';

export default class Breakouts extends Component {

    static navigationOptions = {
        title: "Breakouts",
        headerStyle: {
            backgroundColor: Colors.blue,
        },
        headerTintColor: 'white',
    }

    state = {
        breakouts: [],
        schedule: {},
    };

    componentDidMount = async () => {
        const [breakouts, schedule] = await getItems("breakouts", "schedule");
        this.setState({
            breakouts,
            schedule,
        });
    }

    render = () => {
        const {
            state: {
                breakouts,
                schedule,
            },
        } = this;
        return (
            <ScrollView
                style={styles.view}
            >
                <View>
                    {Object.keys(breakouts)
                        .map(key => (
                            <View
                                key={key}
                                style={styles.breakout}
                            >
                                <Text
                                    style={styles.title}
                                >
                                    {key}
                                </Text>
                                {breakouts[key]
                                    .map(({
                                        id,
                                        title,
                                        speakername,
                                    }) => (
                                            <View
                                                key={id}
                                                style={styles.session}
                                            >
                                                <Text
                                                    style={styles.breakoutTitle}
                                                >
                                                    {title}
                                                </Text>
                                                <Text>
                                                    &nbsp;--&nbsp;{speakername}
                                                </Text>
                                            </View>
                                        ))
                                }
                            </View>
                        ))}
                </View>
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
    breakout: {
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
