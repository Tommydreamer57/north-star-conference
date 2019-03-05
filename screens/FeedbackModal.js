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
    ScrollView,
    Modal,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageContext, StorageConsumer } from '../storage/StorageProvider';

// import { log } from '../storage/service';

import styles from '../styles/styles';

// import KeyboardView from '../components/KeyboardView';
import SessionTile from '../components/SessionTile';

import filters from '../utils/filters';

export default class FeedbackModal extends Component {

    static contextType = StorageContext;

    static navigationOptions = createNavigationOptions("Select Session");

    state = {
        input: "",
        sessionId: 0,
        filter: filters.filterByTextInput,
    };

    render = () => {
        const {
            state,
            state: {
                input,
                filter,
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
                {context => (
                    <Modal
                        visible={visible}
                        animationType={animationType}
                        onRequestClose={onRequestClose}
                    >
                        <ScrollView>
                            <View style={styles.view}>
                                <Text>Search</Text>
                                <TextInput
                                    style={styles.input}
                                    value={input}
                                    clearTextOnFocus={true}
                                    onChangeText={input => this.setState({ input })}
                                />
                                {/* <Text>Filter By</Text>
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
                                </Picker> */}
                                {/* <Text>Select A Session</Text> */}
                                {Object.values(context.allSessions)
                                    .filter(filter({ context, state }))
                                    .map(session => (
                                        <SessionTile
                                            key={session.id}
                                            session={session}
                                            navigation={navigation}
                                            onPress={() => onSelect(session.id)}
                                        />
                                    ))}
                            </View>
                        </ScrollView>
                    </Modal>
                )}
            </StorageConsumer>
        );
    }
}
