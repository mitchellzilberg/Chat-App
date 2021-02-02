import React from 'react'; 
import {
    View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity, 
} from 'react-native'; 

const image = require('../assets/BackgroundImage.png');

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: '', //Place name in header for Chat view
            color: '', //used for background color for Chat view
        };
    }

    render() {

        const { navigation } = this.props; //allows name and color to navigate to Chat view
        const { name, color} = this.state; //sets name and background color to state

        return ( 
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.title}>Chat App</Text>
                <View style={styles.container} >

                    {/* Input for setting up name */}
                    <View style={styles.input}> 
                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder='Your Name'
                        />
                    </View>
                    <Text style={styles.chooseColorText}>
                        Choose Your Background Color
                    </Text>

                    {/* Background color options below */}
                    <View style={styles.colorContainer}>
                        <TouchableOpacity 
                            style={[styles.color, {backgroundColor: '#9ac8fc'}]}
                            onPress={() => {
                                this.setState({color: '#9ac8fc'});
                            }}
                        />
                        <TouchableOpacity 
                            style={[styles.color, {backgroundColor: '#f2bab8'}]}
                            onPress={() => {
                                this.setState({color: '#f2bab8'});
                            }}
                        />
                        <TouchableOpacity 
                            style={[styles.color, {backgroundColor: '#090C08'}]}
                            onPress={() => {
                                this.setState({color: '#090C08'});
                            }}
                        />
                        <TouchableOpacity 
                            style={[styles.color, {backgroundColor: '#B9C6AE'}]}
                            onPress={() => {
                                this.setState({color: '#B9C6AE'});
                            }}
                        />
                    </View>

                    {/* Button to navigate to Chat view */}
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('Chat', { name: this.state.name, color: this.state.color})}
                    >
                        <Text style={styles.buttonText}>
                            Start Chatting
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    image:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flexDirection: 'column',
        flex: 0.4,
        fontSize: 45,
        fontWeight: '600',
        fontWeight: 'bold',
        color: '#FFFFFF', 
        marginBottom: 100,
        padding: 20,
        textAlign: 'center',
    },
    container: {
        flexDirection: 'column',     
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '88%',
        height: '44%'
    },
    input : {
        width: '88%',
        height: 'auto',
        marginTop: 15
    },
    textInput: {
        margin: 5,
        fontSize: 24,
        fontWeight: '600',
        color: '#757083',
        opacity: 50,
        height:60,  
        borderColor: 'gray', 
        borderWidth: 1,
        textAlign: 'center',
    },
    button: {
        backgroundColor:'#757083', 
        width: '88%',
        height: 60,
        justifyContent: 'center',
        marginTop: 20, 
        marginBottom: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16, 
        fontWeight: '600', 
    },
    chooseColorText: {
        fontSize: 16,
        color: '#757083',
        marginBottom:5,
        marginTop: 5
    },
    colorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    color: {
        width: 45,
        height: 45,
        borderRadius: 50,
        margin: 10,
        borderColor: 'black',
        borderWidth: 2
      },

})