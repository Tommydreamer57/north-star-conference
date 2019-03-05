import React, { Component } from 'react';

import {
    Alert,
    Text,
    TextInput,
    Slider,
    TouchableOpacity,
    Picker,
    Button,
    View,
    Modal,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageContext, StorageConsumer } from '../storage/StorageProvider';

import { log } from '../storage/service';

import styles from '../styles/styles';

import KeyboardView from '../components/KeyboardView';
import SessionTile from '../components/SessionTile';


const filters = [
    {
        name: "Schedule",
        filter: ({ scheduleArray }) => ({ id }) => scheduleArray.find(({ selectedSession }) => selectedSession && selectedSession.id === id),
    },
    {
        name: "Display All",
        filter: () => () => true,
    }
];

export default class FeedbackModal extends Component {

    static contextType = StorageContext;

    static navigationOptions = createNavigationOptions("Select Session");

    state = {
        sessionId: 0,
        filter: filters[0],
    };

    render = () => {
        const {
            state: {
                sessionId,
                sessionName,
                filter: {
                    name,
                    filter,
                },
            },
            props: {
                navigation,
                visible,
                animationType,
                onRequestClose,
                onSelect,
            },
        } = this;

        return (
            <StorageConsumer>
                {context => {
                    const {
                        keynotes,
                        breakouts,
                        allSessions,
                        allSessions: {
                            [sessionId]: {
                                title,
                                speakername,
                                sessiontime,
                            } = {},
                        },
                        scheduleArray,
                    } = context;

                    log({ FEEDBACK_SCHEDULE: scheduleArray });

                    return (
                        <Modal
                            visible={visible}
                            animationType={animationType}
                            onRequestClose={onRequestClose}
                        >
                            <KeyboardView>
                                <View style={styles.view}>
                                    <Text>Filter By</Text>
                                    <Picker
                                        selectedValue={name}
                                        onValueChange={filterName => this.setState({
                                            filter: filters.find(({ name }) => name === filterName),
                                        })}
                                    >
                                        {filters.map(({ name }) => (
                                            <Picker.Item
                                                key={name}
                                                label={name}
                                                value={name}
                                            />
                                        ))}
                                    </Picker>
                                    <Text>Select A Session</Text>
                                    {Object.values(allSessions)
                                        .filter(filter(context))
                                        .map(session => (
                                            <SessionTile
                                                key={session.id}
                                                session={session}
                                                navigation={navigation}
                                                onPress={() => onSelect(session.id)}
                                            />
                                        ))}
                                </View>
                            </KeyboardView>
                        </Modal>
                    );
                }}
            </StorageConsumer>
        );
    }
}
