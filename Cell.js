import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class Cell extends React.Component {
	render() {
		const { display } = this.props

		return (
			<TouchableOpacity style={styles.cell} onPress={this.onCellPress}>
				<Text>{display}</Text>
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
		alignItems: 'center',
		backgroundColor: 'rgba(0,255,0,.7)',
		borderColor: '#000',
		borderStyle: 'solid',
		borderWidth: 1,
		height: 75,
		justifyContent: 'center',
		width: '33.33%'
	}
})

export { Cell }
