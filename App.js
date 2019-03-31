import React from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'

import { Cell } from './Cell'
import { Adversary, GameConfigurationScreen } from './GameConfigurationScreen'
import { GameStatusScreen } from './GameStatusScreen'
import { Grid } from './Grid'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentAdversary: '',
			currentPlayer: Cell.Blank,
			gameEnded: false,
			gridRows: this.getNewBoard()
		}
	}

	render() {
		const { currentAdversary, currentPlayer, gridRows } = this.state

		return (
			<View style={styles.container}>
				<Text>Tic Tac Toe</Text>
				{(currentPlayer === Cell.Blank || currentAdversary === '') && <GameConfigurationScreen startNewGame={this.startNewGame} />}
				{currentPlayer !== Cell.Blank && currentAdversary !== '' && <View style={styles.gameBox}>
					<GameStatusScreen
						currentAdversary={currentAdversary}
						currentPlayer={currentPlayer}
						isGameOver={this.checkEndGame(gridRows)}
						startNewGame={this.startNewGame}
						winner={this.checkBoardWin()} />
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

	checkEndGame = gridRows => !gridRows.some(row => row.some(cell => cell === Cell.Blank))

	checkRowWin = row => {
		const leftCol = row[0]
		const middleCol = row[1]
		const rightCol = row[2]

		if (leftCol !== Cell.Blank && (leftCol === middleCol && middleCol === rightCol)) {
			return leftCol
		}
		return Cell.Blank
	}

	fillRandomCell = grid => {
		if (this.checkEndGame(grid)) {
			return
		}

		const updatedGrid = [
			[...grid[0]],
			[...grid[1]],
			[...grid[2]]
		]
		const { randomCellIndex, randomRowIndex } = this.getRandomEmptyCell(grid)
		updatedGrid[randomRowIndex][randomCellIndex] = this.state.currentPlayer
		this.onGridUpdated(updatedGrid)
	}

	getNewBoard = () => [
		[Cell.Blank,Cell.Blank,Cell.Blank],
		[Cell.Blank,Cell.Blank,Cell.Blank],
		[Cell.Blank,Cell.Blank,Cell.Blank]
	]

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

	onGridUpdated = gridRows => {
		if (this.state.gameEnded) {
			return
		}
		let gameEnded = false
		if (this.checkBoardWin() !== Cell.Blank || this.checkEndGame(gridRows)) {
			gameEnded = true
		}
		if (!gameEnded && this.state.currentAdversary === Adversary) {
			const { randomCellIndex, randomRowIndex } = this.getRandomEmptyCell(gridRows)
			gridRows[randomRowIndex][randomCellIndex] = this.nextPlayer()
			this.setState({ gridRows })
			return
		}
		this.setState(
		{
			currentPlayer: this.nextPlayer(),
			gameEnded,
			gridRows
		})
	}

	startNewGame = (currentPlayer, currentAdversary) => {
		this.setState(
		{
			currentAdversary,
			currentPlayer,
			gameEnded: false,
			gridRows: this.getNewBoard()
		})
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#aaa',
		flex: 1,
		flexDirection: 'column',
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
		justifyContent: 'center',
		paddingVertical: 50
	},
	gameBox: {
		alignItems: 'center',
		flexDirection: 'column',
		width: '80%'
	}
})
