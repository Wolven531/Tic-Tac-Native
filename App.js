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

	rowHasWinner = row => {
		const leftCol = row[0]
		const middleCol = row[1]
		const rightCol = row[2]

		return leftCol !== '' && (leftCol === middleCol && middleCol === rightCol)
	}

	boardHasWinner = () => {
		const { gridRows } = this.state

		return this.rowHasWinner([ gridRows[0][0], gridRows[0][1], gridRows[0][2] ])
			|| this.rowHasWinner([ gridRows[1][0], gridRows[1][1], gridRows[1][2] ])
			|| this.rowHasWinner([ gridRows[2][0], gridRows[2][1], gridRows[2][2] ])
			|| this.rowHasWinner([ gridRows[0][0], gridRows[1][0], gridRows[2][0] ])
			|| this.rowHasWinner([ gridRows[0][1], gridRows[1][1], gridRows[2][1] ])
			|| this.rowHasWinner([ gridRows[0][2], gridRows[1][2], gridRows[2][2] ])
			|| this.rowHasWinner([ gridRows[0][0], gridRows[1][1], gridRows[2][2] ])
			|| this.rowHasWinner([ gridRows[2][0], gridRows[1][1], gridRows[0][2] ])
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
