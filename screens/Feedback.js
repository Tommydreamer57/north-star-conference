import React, {
    Component,
    // createRef,
} from 'react';

import {
    ScrollView,
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    Slider,
    Button,
    Picker,
} from 'react-native';

import {
    Header,
} from 'react-navigation';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import KeyboardView from '../components/KeyboardView';

export default class Feedback extends Component {

    static navigationOptions = createNavigationOptions("Feedback");

    state = {
        sessionId: undefined,
        sessionName: "",
        likeFeedback: "",
        dislikeFeedback: "",
        rating: 0,
        generalFeedback: "",
        email: "",
        usename: "",
    };

    // refs = {
    //     likeFeedback: createRef(),
    //     dislikeFeedback: createRef(),
    //     rating: createRef(),
    //     generalFeedback: createRef(),
    //     email: createRef(),
    //     usename: createRef(),
    // };

    componentDidMount = () => {
        const {
            props: {
                navigation: {
                    state: {
                        params: {
                            sessionName,
                            id: sessionId,
                        } = {},
                    },
                },
            },
        } = this;
        this.setState({
            sessionName,
            sessionId,
        });
    }

    render = () => {
        const {
            state: {
                sessionId,
                sessionName,
                likeFeedback,
                dislikeFeedback,
                rating,
                generalFeedback,
                email,
                username,
            },
        } = this;
        return (
            <StorageConsumer>
                {({
                    allSessions: {
                        [sessionId]: {
                            title,
                            speakername,
                            sessiontime,
                        } = {},
                    },
                    schedule: {
                        [sessionName]: {
                            id: selectedSessionId,
                        } = {},
                    },
                    scheduleArray,
                    submitReview,
                }) => (
                        <KeyboardView>
                            <Picker
                                selectedValue={sessionId}
                                onValueChange={sessionId => this.setState({ sessionId })}
                            >
                                {scheduleArray
                                    .filter(({ selectedSession: { id } }) => id)
                                    .map(({ sessionName, selectedSession: { id, title } }) => (
                                        <Picker.Item
                                            key={sessionName}
                                            value={id}
                                            label={title}
                                        />
                                    ))}
                            </Picker>
                            <Text>{sessionName}</Text>
                            <Text>{title}</Text>
                            <Text>{speakername}</Text>
                            <Text>{sessiontime}</Text>

                            <Text>How would you rate this session overall?</Text>
                            <Slider
                                // ref={this.refs.rating}
                                value={rating}
                                minimumValue={0}
                                maximumValue={10}
                                onValueChange={rating => this.setState({ rating })}
                            />
                            <Text>What did you like about this session?</Text>
                            <TextInput
                                // ref={this.refs.likeFeedback}
                                style={styles.input}
                                value={likeFeedback}
                                onChangeText={likeFeedback => this.setState({ likeFeedback })}
                            />
                            <Text>What didn't you like about this session?</Text>
                            <TextInput
                                // ref={this.refs.dislikeFeedback}
                                style={styles.input}
                                value={dislikeFeedback}
                                onChangeText={dislikeFeedback => this.setState({ dislikeFeedback })}
                            />
                            <Text>What general feedback do you have?</Text>
                            <TextInput
                                // ref={this.refs.generalFeedback}
                                style={styles.input}
                                value={generalFeedback}
                                onChangeText={generalFeedback => this.setState({ generalFeedback })}
                            />
                            <Text>What is your name?</Text>
                            <TextInput
                                // ref={this.refs.username}
                                style={styles.input}
                                value={username}
                                onChangeText={username => this.setState({ username })}
                            />
                            <Text>What is your email?</Text>
                            <TextInput
                                // ref={this.refs.email}
                                style={styles.input}
                                value={email}
                                onChangeText={email => this.setState({ email })}
                            />
                            <Button
                                title="Submit Review"
                                onPress={async () => {
                                    if (await submitReview({
                                        ...this.state,
                                        sessionTitle: title,
                                        sessionSpeaker: speakername,
                                    }))
                                        goBack();
                                }}
                            />
                            <Text>bottom</Text>
                        </KeyboardView>
                    )}
            </StorageConsumer>
        )
    }
};
