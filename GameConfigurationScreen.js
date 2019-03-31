import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { Cell } from './Cell'

import { SelectionButton } from './SelectionButton'

class GameConfigurationScreen extends Component {
	static ADVERSARY = 'A'
	static HUMAN = 'H'

	constructor(props) {
		super(props)
		this.state = {
			currentAdversary: props.adversary || GameConfigurationScreen.HUMAN,
			currentPlayer: props.player || Cell.Blank
		}
	}

	render() {
		const { currentAdversary, currentPlayer } = this.state

		return (
			<View style={styles.configBox}>
				<Text style={styles.spacerBottom}>Which player would you like to play?</Text>
				<View style={[styles.selectionContainer, styles.spacerBottom]}>
					<SelectionButton display={Cell.PlayerX}
						isHighlighted={currentPlayer === Cell.PlayerX}
						onPress={() => { this.setState({ currentPlayer: Cell.PlayerX }) }}
						textStyle={styles.playerX} />
					<SelectionButton display={Cell.PlayerO}
						isHighlighted={currentPlayer === Cell.PlayerO}
						onPress={() => { this.setState({ currentPlayer: Cell.PlayerO }) }}
						textStyle={styles.playerO} />
				</View>
				<Text style={styles.spacerBottom}>Which adversary?</Text>
				<View style={styles.selectionContainer}>
					<SelectionButton display={'Human'}
						isHighlighted={currentAdversary === GameConfigurationScreen.HUMAN}
						onPress={() => { this.setState({ currentAdversary: GameConfigurationScreen.HUMAN }) }}
						textStyle={styles.playerX} />
					<SelectionButton display={'Device'}
						isHighlighted={currentAdversary === GameConfigurationScreen.ADVERSARY}
						onPress={() => { this.setState({ currentAdversary: GameConfigurationScreen.ADVERSARY }) }}
						textStyle={styles.playerO} />
				</View>
				{currentPlayer !== Cell.Blank && <View>
					<Button
							onPress={() => { this.startNewGame() }}
							title="Start Game"
							color="green"
							accessibilityLabel="Start a new game of tic tac toe"
						/>
				</View>}
			</View>
		)
	}

	startNewGame = () => {
		this.props.startNewGame(this.state.currentPlayer, this.state.currentAdversary)
	}
}

GameConfigurationScreen.propTypes = {
	adversary: PropTypes.string,
	player: PropTypes.string,
	startNewGame: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	configBox: {
		backgroundColor: 'rgba(255,255,255,.5)',
		flexDirection: 'column',
		padding: 20
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
	selectionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 25
	},
	spacerBottom: {
		marginBottom: 25
	}
})

const Adversary = GameConfigurationScreen.ADVERSARY
const Human = GameConfigurationScreen.HUMAN

export { 
	Adversary,
	GameConfigurationScreen,
	Human
}
