import React from 'react'
import { Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Cell } from './Cell'
import { Grid } from './Grid'

import { SelectionButton } from './SelectionButton'

export default class App extends React.Component {
	static NEW_BOARD = [
		[Cell.Blank,Cell.Blank,Cell.Blank],
		[Cell.Blank,Cell.Blank,Cell.Blank],
		[Cell.Blank,Cell.Blank,Cell.Blank]
	]
	static ADVERSARY = 'A'
	static HUMAN = 'H'

	constructor(props) {
		super(props)
		this.state = {
			currentAdversary: '',
			currentPlayer: Cell.Blank,
			gameEnded: false,
			gridRows: App.NEW_BOARD
		}
	}

	render() {
		const { currentAdversary, currentPlayer, gridRows } = this.state
		const winner = this.checkBoardWin()
		const hasWinner = winner !== Cell.Blank
		const winnerDisplay = hasWinner ? `Winner: ${winner}` : 'Board has no winner'

		return (
			<View style={styles.container}>
				<Text>Tic Tac Toe</Text>
				{(currentPlayer === Cell.Blank || currentAdversary === '') && <View style={styles.configBox}>
					<Text style={{ marginBottom: 25 }}>Which player would you like to play?</Text>
					<View style={[styles.selectionContainer, { marginBottom: 20 }]}>
						<SelectionButton display={Cell.PlayerX}
							isHighlighted={currentPlayer === Cell.PlayerX}
							onPress={() => { this.setState({ currentPlayer: Cell.PlayerX }) }}
							textStyle={styles.playerX} />
						<SelectionButton display={Cell.PlayerO}
							isHighlighted={currentPlayer === Cell.PlayerO}
							onPress={() => { this.setState({ currentPlayer: Cell.PlayerO }) }}
							textStyle={styles.playerO} />
					</View>
					<Text style={{ marginBottom: 25 }}>Which adversary?</Text>
					<View style={styles.selectionContainer}>
						<SelectionButton display={'Human'}
							isHighlighted={currentAdversary === App.HUMAN}
							onPress={() => { this.setState({ currentAdversary: App.HUMAN }) }}
							textStyle={styles.playerX} />
						<SelectionButton display={'Device'}
							isHighlighted={currentAdversary === App.ADVERSARY}
							onPress={() => { this.setState({ currentAdversary: App.ADVERSARY }) }}
							textStyle={styles.playerO} />
					</View>
				</View>}
				{currentPlayer !== Cell.Blank
					&& currentAdversary !== ''
					&& <View style={styles.gameBox}>
					<View style={styles.currentPlayer}>
						<Text>Current Turn:</Text>
						<Text style={currentPlayer === Cell.PlayerX ? styles.playerX : styles.playerO}>{currentPlayer}</Text>
					</View>
					{hasWinner && <View style={styles.currentPlayer}>
						<Text style={[winner === Cell.PlayerX ? styles.playerX : styles.playerO, styles.winnerDisplay]}>{winnerDisplay}</Text>
						<Button
							onPress={() => { this.startNewGame() }}
							title="New Game"
							color="gold"
							accessibilityLabel="Start a new game of tic tac toe"
						/>
					</View>}
					<Grid currentPlayer={currentPlayer} gridRows={gridRows} onGridUpdated={this.onGridUpdated} />
					<View style={{ marginTop: 25 }}>
						<Button title="Get Random Cell" onPress={() => { this.displayRandomCell(gridRows) }} />
					</View>
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

	displayRandomCell = grid => {
		alert(JSON.stringify(this.getRandomEmptyCell(grid), null, 4))
	}

	getRandomArrayIndex = arr => {
		const maxIndex = arr.length - 1
		return Math.round(Math.random() * maxIndex)
	}

	getRandomEmptyCell = grid => {
		const emptyCellIndexes = []
		const randomRowIndex = this.getRandomEmptyRowIndex(grid)
		const row = grid[randomRowIndex]

		for (let cellIndex = 0; cellIndex < 3; cellIndex++) {
			if (row[cellIndex] === Cell.Blank) {
				emptyCellIndexes.push(cellIndex)
			}
		}

		const randomCellIndex = emptyCellIndexes[this.getRandomArrayIndex(emptyCellIndexes)]

		return {
			randomCellIndex,
			randomRowIndex
		}
	}

	getRandomEmptyRowIndex = grid => {
		const rowIndexesWithEmptyCells = []

		for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
			if (grid[rowIndex].some(cell => cell === Cell.Blank)) {
				rowIndexesWithEmptyCells.push(rowIndex)
			}
		}

		return rowIndexesWithEmptyCells[this.getRandomArrayIndex(rowIndexesWithEmptyCells)]
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
	highlight: {
		backgroundColor: 'rgba(0,180,0,.5)',
		borderColor: '#fff',
		borderWidth: 1
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
	selectionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	winnerDisplay: {
		fontSize: 18
	}
})
