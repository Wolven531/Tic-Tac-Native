import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { BlankDisplay, PlayerXDisplay } from './Cell'

class GameStatusScreen extends Component {
	render() {
		const { isGameOver, currentAdversary, currentPlayer, winner } = this.props
		const hasWinner = winner !== BlankDisplay
		const winnerDisplay = hasWinner ? `Winner: ${winner}` : 'Board has no winner'

		return (
			<View style={styles.gameBox}>
				<View style={styles.currentPlayer}>
					<Text>Current Turn:</Text>
					<Text style={currentPlayer === PlayerXDisplay
						? styles.playerX
						: styles.playerO}>{currentPlayer}</Text>
				</View>
				{(hasWinner || isGameOver) && <View style={styles.currentPlayer}>
					{hasWinner && <Text style={[winner === PlayerXDisplay
						? styles.playerX
						: styles.playerO, styles.winnerDisplay]}>{winnerDisplay}</Text>}
					<Button
						onPress={() => { this.props.startNewGame(currentPlayer, currentAdversary) }}
						title="New Game"
						color="gold"
						accessibilityLabel="Start a new game of tic tac toe"
					/>
				</View>}
			</View>
		)
	}
}

GameStatusScreen.propTypes = {
	currentAdversary: PropTypes.string.isRequired,
	currentPlayer: PropTypes.string.isRequired,
	isGameOver: PropTypes.bool.isRequired,
	startNewGame: PropTypes.func.isRequired,
	winner: PropTypes.string.isRequired
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
