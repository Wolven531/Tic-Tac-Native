import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

class Grid extends React.Component {
	render() {
		return (
			<View style={styles.gridStyle}>
				<View style={styles.rowStyle}>
					<TouchableOpacity style={styles.cell}>
						<Text>X</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cell}>
						<Text>X</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cell}>
						<Text>X</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.rowStyle}>
					<TouchableOpacity style={styles.cell}>
						<Text>O</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cell}>
						<Text>O</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cell}>
						<Text>O</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.rowStyle}>
					<TouchableOpacity style={styles.cell}>
						<Text>X</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cell}>
						<Text>X</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cell}>
						<Text>X</Text>
					</TouchableOpacity>
				</View>
			</View>
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
	},
	gridStyle: {
		backgroundColor: 'rgba(0,200,200,.5)',
		marginTop: 20,
		width: '80%'
	},
	rowStyle: {
		display: 'flex',
		flexDirection: 'row'
	}
})

export { Grid }
