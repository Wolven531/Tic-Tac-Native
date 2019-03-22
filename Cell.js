import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class Cell extends React.Component {
	static PlayerO = 'O'
	static PlayerX = 'X'
	static Blank = ''

	render() {
		const { display } = this.props
		const cellStyles = [styles.cell]
		if (display === Cell.PlayerX) {
			cellStyles.push(styles.cellX)
		} else if (display === Cell.PlayerO) {
			cellStyles.push(styles.cellO)
		}

		return (
			<TouchableOpacity style={cellStyles} onPress={this.onCellPress}>
				<Text style={styles.cellText}>{display}</Text>
			</TouchableOpacity>
		)
	}

	onCellPress = () => {
		switch (this.props.display) {
			case '':
				this.props.onCellPress(Cell.PlayerX)
				break
			case Cell.PlayerX:
				this.props.onCellPress(Cell.PlayerO)
				break
			case Cell.PlayerO:
			default:
				this.props.onCellPress('')
			break
		}
	}
}

Cell.propTypes = {
	display: PropTypes.string.isRequired,
	onCellPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	cell: {
		backgroundColor: 'rgba(100,100,100,.4)',
		borderWidth: 1,
		alignItems: 'center',
		flexGrow: 1,
		height: 100,
		justifyContent: 'space-around'
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
	},
	cellO: {
		backgroundColor: 'rgba(0,0,225,.8)'
	}
})

export { Cell }
