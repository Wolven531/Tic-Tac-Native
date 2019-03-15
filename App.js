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
		const winner = this.checkForBoardWin()
		const winnerDisplay = winner === '' ? 'Board has no winner' : `Winner: ${winner}`

		return (
			<View style={styles.container}>
				<Text>Tic Tac Toe</Text>
				<Text>{winnerDisplay}</Text>
				<Grid gridRows={this.state.gridRows} onGridUpdated={this.onGridUpdated} />
			</View>
		)
	}

	checkForBoardWin = () => {
		const { gridRows } = this.state

		let result = this.checkForRowWin([ gridRows[0][0], gridRows[0][1], gridRows[0][2] ])
		if (result !== '') {
			return result
		}
		result = this.checkForRowWin([ gridRows[1][0], gridRows[1][1], gridRows[1][2] ])
		if (result !== '') {
			return result
		}
		result = this.checkForRowWin([ gridRows[2][0], gridRows[2][1], gridRows[2][2] ])
		if (result !== '') {
			return result
		}
		result = this.checkForRowWin([ gridRows[0][0], gridRows[1][0], gridRows[2][0] ])
		if (result !== '') {
			return result
		}
		result = this.checkForRowWin([ gridRows[0][1], gridRows[1][1], gridRows[2][1] ])
		if (result !== '') {
			return result
		}
		result = this.checkForRowWin([ gridRows[0][2], gridRows[1][2], gridRows[2][2] ])
		if (result !== '') {
			return result
		}
		result = this.checkForRowWin([ gridRows[0][0], gridRows[1][1], gridRows[2][2] ])
		if (result !== '') {
			return result
		}
		result = this.checkForRowWin([ gridRows[2][0], gridRows[1][1], gridRows[0][2] ])
		if (result !== '') {
			return result
		}
		return ''
	}

	checkForRowWin = row => {
		const leftCol = row[0]
		const middleCol = row[1]
		const rightCol = row[2]

		if(leftCol !== '' && (leftCol === middleCol && middleCol === rightCol)) {
			return leftCol
		}
		return ''
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
