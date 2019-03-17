import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { Cell } from './Cell'

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
		const updatedGrid = [...this.props.gridRows]
		if (updatedGrid[row] === undefined ||
			updatedGrid[row][col] === undefined) {
			console.warn(`Invalid cell supplied: row=${row} col=${col} newVal="${newVal}"`)
			return
		}
		if (updatedGrid[row][col] !== '') {
			console.warn(`Cannot write; cell set previously: row=${row} col=${col} newVal="${newVal}" cellPrev="${updatedGrid[row][col]}"`)
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
		borderColor: '#000',
		borderStyle: 'solid',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: {
			height: 5,
			width: 5
		},
		shadowOpacity: 1,
		shadowRadius: 3,
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
