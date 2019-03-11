import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Cell } from './Cell'

class Grid extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			gridRows: [
				['X','','X'],
				['','X',''],
				['X','','X']
			]
		}
	}

	render() {
		const { gridRows } = this.state

		return (
			<View style={styles.gridStyle}>
				{gridRows.map((row, rowInd) =>
					<View style={styles.rowStyle} key={`row${rowInd}`}>
						{row.map((cell, cellInd) =>
							<Cell key={`cell${cellInd}`}
								display={cell}
								onCellPress={newValue => this.updateBoardCell(rowInd, cellInd, newValue)} />)}
					</View>)}
			</View>
		)
	}

	updateBoardCell = (row, col, newVal) => {
		const updatedGrid = [...this.state.gridRows]
		updatedGrid[row][col] = newVal
		this.setState({ gridRows: updatedGrid })
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
