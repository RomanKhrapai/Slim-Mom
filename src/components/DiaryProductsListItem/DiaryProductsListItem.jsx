import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { userOperations, productsSelectors } from '../../redux/user';
import closeGreySvg from '../../assets/images/close-button-grey.svg';

import style from './DiaryProductsListItem.module.scss';

export default function DiaryProductsListItem(rowItem) {
  const dispatch = useDispatch();
  const currentDate = useSelector(productsSelectors.getTodayDate);
  let chosenDate = useSelector(productsSelectors.getChosenDate);

  const { row } = rowItem;
  return (
    <tr key={row.id} {...row.getRowProps()} className={style.tableRow}>
      {row.cells.map((cell, i) => {
        const { key, ...restCellProps } = cell.getCellProps();
        return (
          <td key={key} {...cell.getCellProps()} className={style.tableCell}>
            {cell.render('Cell')}
          </td>
        );
      })}
      {currentDate === chosenDate && <td className={style.tableCell}>
        <button
          data-id={row.id}
          className={style.closeButton}
          onClick={() => {
            dispatch(userOperations.removeProductFromDiary(row.original.id));
          }}
        >
          <img
            src={closeGreySvg}
            alt={`${row.id} close icon`}
            className={style.closeIcon}
          />
        </button>
      </td>}
    </tr>
  );
}

DiaryProductsListItem.propTypes = {
  rowItem: PropTypes.objectOf(PropTypes.object),
};
