import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Grid } from './Grid'

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Tic Tac Toe</Text>
				<Grid />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		flexDirection: 'column',
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
		justifyContent: 'center'
	}
})
