/// <reference types="prop-types" />

import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
	bool as PropBool,
	func as PropFunc,
	string as PropString
} from 'prop-types'

import { PlayerXDisplay } from './Cell'

class PlayerSelectionButton extends React.Component {
	render() {
		const { display, isHighlighted, onPress } = this.props

		return (
			<TouchableOpacity onPress={onPress}>
				<Text
					style={[
						display === PlayerXDisplay
							? styles.playerX
							: styles.playerO,
						isHighlighted ? styles.highlight : {}
					]}>
					{display}
				</Text>
			</TouchableOpacity>
		)
	}
}

PlayerSelectionButton.propTypes = {
	display: PropString.isRequired,
	isHighlighted: PropBool.isRequired,
	onPress: PropFunc.isRequired
}

const styles = StyleSheet.create({
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
	}
})

export { PlayerSelectionButton }
