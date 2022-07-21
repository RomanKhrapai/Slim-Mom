import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userOperations, productsSelectors } from '../../redux/user';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {confirmWindow} from '../ConfirmBox/ConfirmWindow'
import style from './DiaryProductsListItem.module.scss';
import closeGreySvg from '../../images/close-button-grey.svg';

export default function DiaryProductsListItem(rowItem) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
            const message = t('diary.Are you shure, that you want to delete this product?')
            confirmWindow( message, t('Yes'), t("No"), ()=>{dispatch(userOperations.removeProductFromDiary(row.original.id))})
            ;
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
