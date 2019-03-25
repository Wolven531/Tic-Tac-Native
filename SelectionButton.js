/// <reference types="prop-types" />

import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
	bool as PropBool,
	func as PropFunc,
	object as PropObj,
	string as PropString
} from 'prop-types'

class SelectionButton extends React.Component {
	render() {
		const { display, isHighlighted, onPress, textStyle } = this.props

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
}

SelectionButton.propTypes = {
	display: PropString.isRequired,
	isHighlighted: PropBool.isRequired,
	onPress: PropFunc.isRequired,
	textStyle: PropObj
}

const styles = StyleSheet.create({
	highlight: {
		backgroundColor: 'rgba(0,180,0,.5)',
		borderColor: '#fff',
		borderWidth: 1
	}
})

export { SelectionButton }
