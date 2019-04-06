import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { BlankDisplay } from './Cell'

class Grid extends React.Component {
	render() {
		const { currentPlayer, gridRows } = this.props

		return (
			<View style={styles.gridStyle}>
				{gridRows.map((row, rowInd) => (
					<View style={styles.rowStyle} key={`row${rowInd}`}>
						{row.map((cell, cellInd) => (
							<Cell
								key={`cell${cellInd}`}
								display={cell}
								onCellPress={newValue =>
									this.updateBoardCell(
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

	updateBoardCell = (row, col, newVal) => {
		// NOTE: need to create new array, because otherwise
		// inner arrays would retain reference during slice
		const updatedGrid = [
			[...this.props.gridRows[0]],
			[...this.props.gridRows[1]],
			[...this.props.gridRows[2]]
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
		this.props.onGridUpdated(updatedGrid)
	}
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
Grid.propTypes = {
	currentPlayer: PropTypes.string.isRequired,
	gridRows: PropTypes.arrayOf(PropTypes.array).isRequired,
	onGridUpdated: PropTypes.func.isRequired
}

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
