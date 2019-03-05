import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export const Window = {
    height,
    width,
};

export const Colors = {
    green: "#C8C751",
    blueGreen: "#60A471",
    blue: "#00849B",
    yellow: "#44CC22",
    white: "#FFFFFF",
    black: "#000000",
};

export default StyleSheet.create({
    view: {
        backgroundColor: Colors.white,
        paddingTop: 24,
        paddingBottom: 48,
        paddingLeft: 18,
        paddingRight: 18,
        flex: 1,
        flexGrow: 1,
    },
    // extra large bold
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 13,
    },
    // large bold
    h1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    // medium large bold
    header: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    // medium large bold blue
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.blue,
        marginBottom: 16,
    },
    // medium bold
    h3: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    // medium small italic
    h4: {
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    // small
    text: {
        fontSize: 11,
        marginBottom: 5,
    },
    speakerphoto: {
        height: Window.width * 0.7,
        width: Window.width * 0.7,
        borderRadius: Window.width * 0.35,
        marginLeft: Window.width * 0.15 - 18,
        marginRight: Window.width * 0.15 - 18,
        marginBottom: 20,
    },
    input: {
        margin: 5,
        padding: 5,
        borderColor: Colors.black,
        borderWidth: 1,
        marginBottom: 16,
    },
    emptySession: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.blue,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    sessionTile: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
    },
    sessionTileBar: {
        height: '100%',
        width: 5,
        marginRight: 10,
    },
    blueBackground: {
        backgroundColor: Colors.blue + '44',
    },
    blackBackground: {
        backgroundColor: Colors.black + '44',
    },
    noMargin: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    blackText: {
        color: Colors.black,
    },
});
