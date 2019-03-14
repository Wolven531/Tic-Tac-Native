import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Grid } from './Grid'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			gridRows: [
				['X','','X'],
				['','O',''],
				['X','','X']
			]
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Tic Tac Toe</Text>
				<Text>Board Has Winner: {this.boardHasWinner() ? 'True' : 'False'}</Text>
				<Grid gridRows={this.state.gridRows} onGridUpdated={this.onGridUpdated} />
			</View>
		)
	}

	boardHasWinner = () => {
		return false
	}

	onGridUpdated = updatedGrid => this.setState({gridRows: updatedGrid})
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
