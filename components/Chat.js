import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            name: '',
            color: '',
        };
    }

    render() {
        // All props passed from the Start view
        let name = this.props.route.params.name;
        let color = this.props.route.params.color;
        this.props.navigation.setOptions({title: name});

        return (
            <View style={[styles.container, {backgroundColor: color}]}>
                <Text>Hello Screen 2!</Text>
                <Button
                    title='Go to home page'
                    onPress={() => this.props.navigation.navigate('Start')}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
})