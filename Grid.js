import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Cell } from './Cell'

class Grid extends React.Component {
	render() {
		const gridRows = [
			['X','X','X'],
			['O','O','O'],
			['X','X','X']
		]

		return (
			<View style={styles.gridStyle}>
				{gridRows.map((row, rowInd) =>
					<View style={styles.rowStyle} key={`row${rowInd}`}>
						{row.map((cell, cellInd) =>
							<Cell key={`cell${cellInd}`} display={cell} />)}
					</View>)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
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
