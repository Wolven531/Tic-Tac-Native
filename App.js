import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Grid } from './Grid'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPlayer: 'X',
			gridRows: [
				['','',''],
				['','',''],
				['','','']
			]
		}
	}

	render() {
		const { currentPlayer, gridRows } = this.state
		const winner = this.checkForBoardWin()
		const hasWinner = winner === ''
		const winnerDisplay = hasWinner ? 'Board has no winner' : `Winner: ${winner}`

		return (
			<View style={styles.container}>
				<Text>Tic Tac Toe</Text>
				<Text>Player: {currentPlayer}</Text>
				{hasWinner && <Text>{winnerDisplay}</Text>}
				<Grid gridRows={gridRows} onGridUpdated={this.onGridUpdated} />
			</View>
		)
	}

	checkForBoardWin = () => {
		const { gridRows } = this.state

		const checks = [
			this.checkForRowWin([ gridRows[0][0], gridRows[0][1], gridRows[0][2] ]),
			this.checkForRowWin([ gridRows[1][0], gridRows[1][1], gridRows[1][2] ]),
			this.checkForRowWin([ gridRows[2][0], gridRows[2][1], gridRows[2][2] ]),
			this.checkForRowWin([ gridRows[0][0], gridRows[1][0], gridRows[2][0] ]),
			this.checkForRowWin([ gridRows[0][1], gridRows[1][1], gridRows[2][1] ]),
			this.checkForRowWin([ gridRows[0][2], gridRows[1][2], gridRows[2][2] ]),
			this.checkForRowWin([ gridRows[0][0], gridRows[1][1], gridRows[2][2] ]),
			this.checkForRowWin([ gridRows[2][0], gridRows[1][1], gridRows[0][2] ])
		]

		const winner = checks.find(result => result !== '')

		return winner || ''
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
