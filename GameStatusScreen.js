import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { BlankDisplay, PlayerXDisplay } from './Cell'

const GameStatusScreen = ({
	currentAdversary,
	currentPlayer,
	isGameOver,
	startNewGame,
	winner
}) => {
	const hasWinner = winner !== BlankDisplay
	const winnerDisplay = hasWinner
		? `Winner: ${winner}`
		: 'Board has no winner'

	return (
		<View style={styles.gameBox}>
			<View style={styles.currentPlayer}>
				<Text>Current Turn:</Text>
				<Text style={
						currentPlayer === PlayerXDisplay
							? styles.playerX
							: styles.playerO
					}>
					{currentPlayer}
				</Text>
			</View>
			{(hasWinner || isGameOver) && (
				<View style={styles.currentPlayer}>
					{hasWinner && (
						<Text
							style={[
								styles.winnerDisplay,
								winner === PlayerXDisplay
									? styles.playerX
									: styles.playerO
							]}>
							{winnerDisplay}
						</Text>
					)}
					<Button
						onPress={() => {
							startNewGame(currentPlayer, currentAdversary)
						}}
						title="New Game"
						color="gold"
						accessibilityLabel="Start a new game of tic tac toe"
					/>
				</View>
			)}
		</View>
	)
}

export { GameStatusScreen }

const styles = StyleSheet.create({
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
		borderStyle: 'solid',
		borderWidth: 1,
		color: '#fff',
		marginHorizontal: 10,
		padding: 5
	},
	playerX: {
		backgroundColor: '#f00',
		borderColor: '#000',
		borderStyle: 'solid',
		borderWidth: 1,
		color: '#fff',
		marginHorizontal: 10,
		padding: 5
	},
	winnerDisplay: {
		fontSize: 18
	}
})
