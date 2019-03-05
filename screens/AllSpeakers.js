import React, { Component } from 'react';

import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';


export default class AllSpeakers extends Component {
    
    static navigationOptions = createNavigationOptions("All Speakers");

    state = {
        input: "",
    };

    render = () => {
        const {
            state: {
                input,
            },
            props: {
                navigation: {
                    navigate,
                },
            },
        } = this;
        return (
            <StorageConsumer>
                {({ speakers }) => (
                    <ScrollView>
                        <View style={styles.view} >
                            <Text>Search</Text>
                            <TextInput
                                style={styles.input}
                                value={input}
                                onChangeText={input => this.setState({ input })}
                            />
                            {Object.values(speakers)
                                .sort(({ name: a }, { name: b }) => a > b)
                                .filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()))
                                .map(({ name, bio, photo }) => (
                                    <TouchableOpacity
                                        key={name}
                                        onPress={() => navigate("SpeakerInfo", { name, bio, photo })}
                                    >
                                        <Text style={styles.h3} >{name}</Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </ScrollView>
                )}
            </StorageConsumer>
        );
    }
}
