import React, {
    Component,
    createRef,
} from 'react';

import {
    ScrollView,
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    Slider,
    Button,
} from 'react-native';

import {
    Header,
} from 'react-navigation';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

export default class Feedback extends Component {
    
    static navigationOptions = createNavigationOptions("Feedback");

    state = {
        likeFeedback: "",
        dislikeFeedback: "",
        rating: 0,
        generalFeedback: "",
        email: "",
        usename: "",
    };

    refs = {
        likeFeedback: createRef(),
        dislikeFeedback: createRef(),
        rating: createRef(),
        generalFeedback: createRef(),
        email: createRef(),
        usename: createRef(),
    };

    render = () => {
        const {
            state: {
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
                    state: {
                        params: {
                            sessionName,
                            id,
                        },
                    },
                },
            },
        } = this;
        return (
            <StorageConsumer>
                {({
                    allSessions: {
                        [id]: {
                            title,
                            speakername,
                            sessiontime,
                        },
                    },
                    schedule: {
                        [sessionName]: {
                            id: selectedSessionId,
                        }
                    },
                    submitReview,
                }) => (
                        <ScrollView>
                            {/* <KeyboardAvoidingView
                                keyboardVerticalOffset={Header.HEIGHT + 20}
                                style={{ flex: 1 }}
                                behavior="height"
                            > */}
                            <Text>{sessionName}</Text>
                            <Text>{title}</Text>
                            <Text>{speakername}</Text>
                            <Text>{sessiontime}</Text>
                            <Text>How would you rate this session overall?</Text>
                            <Slider
                                ref={this.refs.rating}
                                value={0}
                                minimumValue={0}
                                maximumValue={10}
                                onValueChange={rating => this.setState({ rating })}
                            />
                            <Text>What did you likeFeedback about this session?</Text>
                            <TextInput
                                ref={this.refs.likeFeedback}
                                style={styles.input}
                                value={likeFeedback}
                                onChangeText={likeFeedback => this.setState({ likeFeedback })}
                            />
                            <Text>What didn't you likeFeedback about this session?</Text>
                            <TextInput
                                ref={this.refs.dislikeFeedback}
                                style={styles.input}
                                value={dislikeFeedback}
                                onChangeText={dislikeFeedback => this.setState({ dislikeFeedback })}
                            />
                            <Text>What generalFeedback feedback do you have?</Text>
                            <TextInput
                                ref={this.refs.generalFeedback}
                                style={styles.input}
                                value={generalFeedback}
                                onChangeText={generalFeedback => this.setState({ generalFeedback })}
                            />
                            <Text>What is your name?</Text>
                            <TextInput
                                ref={this.refs.username}
                                style={styles.input}
                                value={username}
                                onChangeText={username => this.setState({ username })}
                            />
                            <Text>What is your email?</Text>
                            <TextInput
                                ref={this.refs.email}
                                style={styles.input}
                                value={email}
                                onChangeText={email => this.setState({ email })}
                            />
                            <Button
                                title="Submit Review"
                                onPress={async () => {
                                    if (await submitReview({
                                        ...this.state,
                                        sessionId: id,
                                        sessionTitle: title,
                                        sessionSpeaker: speakername,
                                    }))
                                        goBack();
                                }}
                            />
                            <View
                                style={{
                                    margin: 10,
                                    paddingTop: 10,
                                    paddingBottom: 250,
                                }}
                            >
                                <Text>bottom</Text>
                            </View>
                            {/* </KeyboardAvoidingView> */}
                        </ScrollView>
                    )}
            </StorageConsumer>
        )
    }
};
