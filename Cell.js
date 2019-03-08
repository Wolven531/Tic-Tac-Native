import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class Cell extends React.Component {
	render() {
		const { display } = this.props

		return (
			<TouchableOpacity style={styles.cell}>
				<Text>{display}</Text>
			</TouchableOpacity>
		)
	}
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
