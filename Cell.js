import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const BlankDisplay = ''
const PlayerODisplay = 'O'
const PlayerXDisplay = 'X'

const Cell = ({ display, onCellPress }) => {
	const cellStyles = [styles.cell]
	const handleCellPress = () => {
		switch (display) {
			case PlayerODisplay:
				onCellPress('')
				break
			case PlayerXDisplay:
				onCellPress(PlayerODisplay)
				break
			case '':
			default:
				onCellPress(PlayerXDisplay)
				break
		}
	}

	if (display === PlayerXDisplay) {
		cellStyles.push(styles.cellX)
	} else if (display === PlayerODisplay) {
		cellStyles.push(styles.cellO)
	}

	return (
		<TouchableOpacity style={cellStyles} onPress={handleCellPress}>
			<Text style={styles.cellText}>{display}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cell: {
		alignItems: 'center',
		backgroundColor: 'rgba(100,100,100,.4)',
		borderWidth: 1,
		flexGrow: 1,
		height: 100,
		justifyContent: 'space-around'
	},
	cellO: {
		backgroundColor: 'rgba(0,0,225,.8)'
	},
	cellText: {
		color: '#fff',
		textShadowColor: '#000',
		textShadowOffset: {
			height: 1,
			width: 1
		},
		textShadowRadius: 1
	},
	cellX: {
		backgroundColor: 'rgba(225,0,0,.8)'
	}
})

export { BlankDisplay, Cell, PlayerODisplay, PlayerXDisplay }
