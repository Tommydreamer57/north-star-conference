import React, {
    Component,
} from 'react';

import {
    Text,
    TextInput,
    Slider,
    Button,
    Picker,
    View,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import KeyboardView from '../components/KeyboardView';

import FeedbackModal from './FeedbackModal';

export default class Feedback extends Component {

    static navigationOptions = createNavigationOptions("Feedback");

    state = {
        sessionId: -1,
        sessionName: "",
        likeFeedback: "",
        dislikeFeedback: "",
        rating: 5,
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

    selectSession = sessionId => this.setState({ sessionId });

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
                navigation,
                navigation: {
                    goBack,
                },
            },
            selectSession,
            onSubmitEditing,
        } = this;
        return (
            <StorageConsumer>
                {({
                    allSessions: {
                        [sessionId]: session,
                        [sessionId]: {
                            title,
                            speakername,
                            sessiontime,
                            sessiontype = '',
                        } = {},
                    },
                    scheduleArray,
                    submitReview,
                }) => (
                        <KeyboardView>
                            <FeedbackModal
                                navigation={navigation}
                                visible={!sessionId}
                                animationType={'slide'}
                                onRequestClose={() => { }}
                                onSelect={selectSession}
                            />
                            <View style={styles.view}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }} >{title}</Text>
                                <Text style={{
                                    fontSize: 14,
                                }} >{sessiontype.slice(0, 1).toUpperCase() + sessiontype.slice(1).toLowerCase()}, {sessiontime}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    marginBottom: 16,
                                }} >{speakername}</Text>

                                <Text style={{
                                    marginTop: 16,
                                    fontWeight: 'bold',
                                }} >Overall Rating</Text>
                                <Slider
                                    ref={el => this.rating = el}
                                    value={rating}
                                    minimumValue={0}
                                    step={1}
                                    maximumValue={16}
                                    onSlidingComplete={rating => this.setState({ rating })}
                                />
                                <Text style={{
                                    marginTop: 16,
                                    fontWeight: 'bold',
                                }} >Likes</Text>
                                <TextInput
                                    ref={el => this.likeFeedback = el}
                                    style={styles.input}
                                    multiline={true}
                                    value={likeFeedback.replace(/\n/, '')}
                                    onChangeText={likeFeedback => this.setState({ likeFeedback })}
                                    onSubmitEditing={onSubmitEditing("dislikeFeedback")}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                }} >Suggestions</Text>
                                <TextInput
                                    ref={el => this.dislikeFeedback = el}
                                    style={styles.input}
                                    multiline={true}
                                    value={dislikeFeedback.replace(/\n/, '')}
                                    onChangeText={dislikeFeedback => this.setState({ dislikeFeedback })}
                                    onSubmitEditing={onSubmitEditing("generalFeedback")}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                }} >General Feedback</Text>
                                <TextInput
                                    ref={el => this.generalFeedback = el}
                                    style={styles.input}
                                    multiline={true}
                                    value={generalFeedback.replace(/\n/, '')}
                                    onChangeText={generalFeedback => this.setState({ generalFeedback })}
                                    onSubmitEditing={onSubmitEditing("username")}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                }} >Your Name</Text>
                                <TextInput
                                    ref={el => this.username = el}
                                    style={styles.input}
                                    multiline={true}
                                    value={username.replace(/\n/, '')}
                                    onChangeText={username => this.setState({ username })}
                                    onSubmitEditing={onSubmitEditing("email")}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                }} >Your Email</Text>
                                <TextInput
                                    ref={el => this.email = el}
                                    style={styles.input}
                                    multiline={true}
                                    value={email.replace(/\n/, '')}
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
                            </View>
                        </KeyboardView>
                    )}
            </StorageConsumer>
        )
    }
};
