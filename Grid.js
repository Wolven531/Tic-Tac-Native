import React from 'react'
import { StyleSheet, View } from 'react-native'

import { BlankDisplay, Cell } from './Cell'

const Grid = ({ currentPlayer, gridRows, onGridUpdated }) => {
	const updateBoardCell = (row, col, newVal) => {
		// NOTE: need to create new array, because otherwise
		// inner arrays would retain reference during slice
		const updatedGrid = [
			[...gridRows[0]],
			[...gridRows[1]],
			[...gridRows[2]]
		]
		if (
			updatedGrid[row] === undefined ||
			updatedGrid[row][col] === undefined
		) {
			console.warn(`Invalid cell supplied: row=${row} col=${col} newVal="${newVal}"`)
			return
		}
		if (updatedGrid[row][col] !== BlankDisplay) {
			// console.warn(`Cannot write; cell set previously: row=${row} col=${col} newVal="${newVal}" cellPrev="${updatedGrid[row][col]}"`)
			return
		}
		updatedGrid[row][col] = newVal
		onGridUpdated(updatedGrid)
	}

	return (
		<View style={styles.gridStyle}>
			{gridRows.map((row, rowInd) => (
				<View style={styles.rowStyle} key={`row${rowInd}`}>
					{row.map((cell, cellInd) => (
						<Cell key={`cell${cellInd}`}
							display={cell}
							onCellPress={newValue =>
								updateBoardCell(
									rowInd,
									cellInd,
									currentPlayer
								)
							}
						/>
					))}
				</View>
			))}
		</View>
	)
}

/*
	NOTE: structure of gridRows is array of 3 arrays each containing 3 strings
	Example:
		gridRows: [
			['X','','X'],
			['','O',''],
			['X','','X']
		]
*/

const styles = StyleSheet.create({
	gridStyle: {
		alignContent: 'stretch',
		alignItems: 'stretch',
		height: 300,
		marginTop: 20,
		// overflow: 'hidden',
		width: '80%'
	},
	rowStyle: {
		display: 'flex',
		flexDirection: 'row'
	}
})

export { Grid }
