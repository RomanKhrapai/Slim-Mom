import React from 'react';
import PropTypes from 'prop-types';
import style from "./DiaryProductsListItem.module.scss";
import closeGreySvg from '../../images/close-button-grey.svg';

export default function DiaryProductsListItem(rowItem) {
  const { row } = rowItem;
  return (
    <tr key={row.id} {...row.getRowProps()} className={style.tableRow}>
      {row.cells.map((cell, i) => {
      const { key, ...restCellProps } = cell.getCellProps();
        return (
          <td key={key} {...cell.getCellProps()} className={style.tableCell}>{cell.render('Cell')}</td>
        )
    })}
      <td className={style.tableCell}>
        <button data-id={row.id} className={style.closeButton}>
          <img src={closeGreySvg} alt={`${row.id} close icon`} className={style.closeIcon} />
        </button>
      </td>
    </tr>
  );
}

DiaryProductsListItem.propTypes = {
  rowItem: PropTypes.objectOf(PropTypes.object),
};
