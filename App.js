import React from 'react'
import { Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Cell } from './Cell'
import { Grid } from './Grid'

export default class App extends React.Component {
	static NEW_BOARD = [
		[Cell.Blank,Cell.Blank,Cell.Blank],
		[Cell.Blank,Cell.Blank,Cell.Blank],
		[Cell.Blank,Cell.Blank,Cell.Blank]
	]

	constructor(props) {
		super(props)
		this.state = {
			currentPlayer: Cell.Blank,
			gameEnded: false,
			gridRows: App.NEW_BOARD
		}
	}

	render() {
		const { currentPlayer, gridRows } = this.state
		const winner = this.checkBoardWin()
		const hasWinner = winner !== Cell.Blank
		const winnerDisplay = hasWinner ? `Winner: ${winner}` : 'Board has no winner'

		return (
			<View style={styles.container}>
				<Text>Tic Tac Toe</Text>
				{currentPlayer === Cell.Blank && <View style={styles.configBox}>
					<Text style={{ marginBottom: 25 }}>Which player would you like to play?</Text>
					<View style={{
						// backgroundColor: 'rgba(0,0,0,.2)',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						marginBottom: 20
					}}>
						<TouchableOpacity onPress={() => { this.setState({ currentPlayer: Cell.PlayerX }) }}>
							<Text style={styles.playerX}>X</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { this.setState({ currentPlayer: Cell.PlayerO }) }}>
							<Text style={styles.playerO}>O</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ marginBottom: 25 }}>Which opponent?</Text>
					<View style={{
						// backgroundColor: 'rgba(0,0,0,.2)',
						flexDirection: 'row',
						justifyContent: 'space-evenly'
					}}>
						<TouchableOpacity>
							<Text style={styles.playerX}>Human</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.playerO}>ArtI</Text>
						</TouchableOpacity>
					</View>
				</View>}
				{currentPlayer !== Cell.Blank && <View style={styles.gameBox}>
					<View style={styles.currentPlayer}>
						<Text>Current Turn:</Text>
						<Text style={currentPlayer === Cell.PlayerX ? styles.playerX : styles.playerO}>{currentPlayer}</Text>
					</View>
					{hasWinner && <View style={styles.currentPlayer}>
						<Text style={styles.winnerDisplay}>{winnerDisplay}</Text>
						<Button
							onPress={() => { this.startNewGame() }}
							title="New Game"
							color="green"
							accessibilityLabel="Start a new game of tic tac toe"
						/>
					</View>}
					<Grid currentPlayer={currentPlayer} gridRows={gridRows} onGridUpdated={this.onGridUpdated} />
				</View>}
			</View>
		)
	}

	checkBoardWin = () => {
		const { gridRows } = this.state

		const checks = [
			this.checkRowWin([ gridRows[0][0], gridRows[0][1], gridRows[0][2] ]),
			this.checkRowWin([ gridRows[1][0], gridRows[1][1], gridRows[1][2] ]),
			this.checkRowWin([ gridRows[2][0], gridRows[2][1], gridRows[2][2] ]),
			this.checkRowWin([ gridRows[0][0], gridRows[1][0], gridRows[2][0] ]),
			this.checkRowWin([ gridRows[0][1], gridRows[1][1], gridRows[2][1] ]),
			this.checkRowWin([ gridRows[0][2], gridRows[1][2], gridRows[2][2] ]),
			this.checkRowWin([ gridRows[0][0], gridRows[1][1], gridRows[2][2] ]),
			this.checkRowWin([ gridRows[2][0], gridRows[1][1], gridRows[0][2] ])
		]

		const winner = checks.find(result => result !== Cell.Blank)

		return winner || Cell.Blank
	}

	checkRowWin = row => {
		const leftCol = row[0]
		const middleCol = row[1]
		const rightCol = row[2]

		if (leftCol !== Cell.Blank && (leftCol === middleCol && middleCol === rightCol)) {
			return leftCol
		}
		return Cell.Blank
	}

	nextPlayer = () => this.state.currentPlayer === Cell.PlayerX ? Cell.PlayerO : Cell.PlayerX

	onGridUpdated = updatedGrid => {
		if (this.state.gameEnded) {
			return
		}
		if (this.checkBoardWin() !== Cell.Blank) {
			this.setState({ gameEnded: true })
			return
		}
		this.setState(
		{
			currentPlayer: this.nextPlayer(),
			gridRows: updatedGrid
		})
	}

	startNewGame = () => {
		this.setState(
		{
			currentPlayer: Cell.PlayerX,
			gameEnded: false,
			gridRows: App.NEW_BOARD
		})
	}
}

const styles = StyleSheet.create({
	configBox: {
		backgroundColor: 'rgba(255,255,255,.5)',
		flexDirection: 'column',
		padding: 20
	},
	container: {
		alignItems: 'center',
		backgroundColor: '#aaa',
		flex: 1,
		flexDirection: 'column',
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
		justifyContent: 'center',
		paddingVertical: 50
	},
	currentPlayer: {
		alignItems: 'center',
		color: '#000',
		flexDirection: 'row',
		padding: 5
	},
	gameBox: {
		alignItems: 'center',
		flexDirection: 'column',
		width: '80%'
	},
	playerO: {
		backgroundColor: '#00f',
		borderColor: '#000',
		// borderRadius: 50,
		borderStyle: 'solid',
		borderWidth: 1,
		color: '#fff',
		marginHorizontal: 10,
		padding: 5
	},
	playerX: {
		backgroundColor: '#f00',
		borderColor: '#000',
		// borderRadius: 50,
		borderStyle: 'solid',
		borderWidth: 1,
		color: '#fff',
		marginHorizontal: 10,
		padding: 5
	},
	winnerDisplay: {
		backgroundColor: '#0a0',
		borderColor: '#000',
		// borderRadius: 50,
		borderStyle: 'solid',
		borderWidth: 1,
		color: '#ff0',
		fontSize: 18,
		marginHorizontal: 10,
		padding: 5
	}
})
