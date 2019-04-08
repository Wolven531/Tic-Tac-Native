import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const SelectionButton = ({ display, isHighlighted, onPress, textStyle }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text
				style={[
					textStyle,
					isHighlighted ? styles.highlight : {}
				]}>
				{display}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	highlight: {
		backgroundColor: 'rgba(0,180,0,.5)',
		borderColor: '#fff',
		borderWidth: 1
	}
})

export { SelectionButton }
