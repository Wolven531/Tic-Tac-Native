import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class Cell extends React.Component {
	render() {
		const { display } = this.props
		const cellStyles = [styles.cell]
		if (display === 'X') {
			cellStyles.push(styles.cellX)
		} else if (display === 'O') {
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
				this.props.onCellPress('X')
				break
			case 'X':
				this.props.onCellPress('O')
				break
			case 'O':
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
