import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

class Cell extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			display: props.display || ''
		}
	}

	render() {
		const { display } = this.state

		return (
			<TouchableOpacity style={styles.cell} onPress={this.onCellPress}>
				<Text>{display}</Text>
			</TouchableOpacity>
		)
	}

	onCellPress = () => {
		switch (this.state.display) {
			case '':
				this.setState({ display: 'X' })
			break
			case 'X':
				this.setState({ display: 'O' })
			break
			case 'O':
			default:
				this.setState({ display: '' })
			break
		}
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
