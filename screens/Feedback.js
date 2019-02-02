import React, {
    Component,
} from 'react';

import {
    Text,
    TextInput,
    Slider,
    Button,
    Picker,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import KeyboardView from '../components/KeyboardView';

export default class Feedback extends Component {

    static navigationOptions = createNavigationOptions("Feedback");

    state = {
        sessionId: 0,
        sessionName: "",
        likeFeedback: "",
        dislikeFeedback: "",
        rating: 0,
        generalFeedback: "",
        email: "",
        username: "",
    };

    onSubmitEditing = ref => () => {
        const nextRef = this[ref];
        nextRef.focus();
    }

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
            props: {
                navigation: {
                    goBack,
                },
            },
            onSubmitEditing,
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
                    scheduleArray,
                    submitReview,
                }) => (
                        <KeyboardView>
                            <Picker
                                selectedValue={sessionId}
                                onValueChange={sessionId => this.setState({ sessionId })}
                            >
                                <Picker.Item
                                    value={0}
                                    label="Select A Session"
                                />
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
                            {sessionId ? (
                                <>
                                    <Text>{sessionName}</Text>
                                    <Text>{title}</Text>
                                    <Text>{speakername}</Text>
                                    <Text>{sessiontime}</Text>

                                    <Text>How would you rate this session overall?</Text>
                                    <Slider
                                        ref={el => this.rating = el}
                                        value={rating}
                                        minimumValue={0}
                                        maximumValue={10}
                                        onSlidingComplete={rating => this.setState({ rating })}
                                    />
                                    <Text>What did you like about this session?</Text>
                                    <TextInput
                                        ref={el => this.likeFeedback = el}
                                        style={styles.input}
                                        value={likeFeedback}
                                        onChangeText={likeFeedback => this.setState({ likeFeedback })}
                                        onSubmitEditing={onSubmitEditing("dislikeFeedback")}
                                    />
                                    <Text>What didn't you like about this session?</Text>
                                    <TextInput
                                        ref={el => this.dislikeFeedback = el}
                                        style={styles.input}
                                        value={dislikeFeedback}
                                        onChangeText={dislikeFeedback => this.setState({ dislikeFeedback })}
                                        onSubmitEditing={onSubmitEditing("generalFeedback")}
                                    />
                                    <Text>What general feedback do you have?</Text>
                                    <TextInput
                                        ref={el => this.generalFeedback = el}
                                        style={styles.input}
                                        value={generalFeedback}
                                        onChangeText={generalFeedback => this.setState({ generalFeedback })}
                                        onSubmitEditing={onSubmitEditing("username")}
                                    />
                                    <Text>What is your name?</Text>
                                    <TextInput
                                        ref={el => this.username = el}
                                        style={styles.input}
                                        value={username}
                                        onChangeText={username => this.setState({ username })}
                                        onSubmitEditing={onSubmitEditing("email")}
                                    />
                                    <Text>What is your email?</Text>
                                    <TextInput
                                        ref={el => this.email = el}
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
                                </>
                            ) : (
                                    <Text>Please Select A Session</Text>
                                )}
                        </KeyboardView>
                    )}
            </StorageConsumer>
        )
    }
};
