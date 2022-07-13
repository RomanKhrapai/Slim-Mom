import React from 'react';
import PropTypes from 'prop-types';
import DiaryProductsListItem from '../DiaryProductsListItem';
import { useTable } from 'react-table';
import { t } from 'i18next';
import style from './DiaryProductsList.module.scss';

export default function DiaryProductsList() {
  
  const data = React.useMemo(() => 
  [
    {
      id: '5d51694802b2373622ff553b',
      name: 'Яйце куряче (жовток сухий)',
      calories: 623,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554d',
      name: 'Горох маш Ярмарка Платинум',
      calories: 312,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554k',
      name: 'Горох маш Ярмарка Платинум',
      calories: 312,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554j',
      name: 'Горох маш Ярмарка Платинум',
      calories: 312,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554h',
      name: 'Горох маш Ярмарка Платинум',
      calories: 312,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554g',
      name: 'Горох маш Ярмарка Платинум',
      calories: 312,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554f',
      name: 'Горох маш Ярмарка Платинум',
      calories: 312,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554s',
      name: 'Горох маш Ярмарка Платинум',
      calories: 316,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554a',
      name: 'Горох маш Ярмарка Платинум',
      calories: 312,
      grams: 100
    },
    {
      id: '5d51694802b2373622ff554q',
      name: 'Горох маш Ярмарка Платинум',
      calories: 316,
      grams: 200
    }
  ], [])

const columns = React.useMemo(() =>
  [
    {
      Header: "Product",
      accessor: "name"
    },
    {
      Header: "Grams",
      accessor: "grams",
      Cell: ({ cell: { value } }) => {
        return (
          <>
            {value}&nbsp;{t("diary.g")}
          </>
        );
      }
    },
    {
      Header: "Calories",
      accessor: "calories",
      Cell: ({ cell: { value } }) => {
        return (
          <>
            {value} <span className={style.calories}>{t("diary.kcal")}</span>
          </>
        );
      }
    },
    {
      Header: "Remove",
      accessor: "remove"
    }
  ],
  [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });
  const TheadComponent = props => null;

  return (
    <div className={style.tableContainer}>
      {data ? (
        <table {...getTableProps()} className={style.table}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={i} {...column.getHeaderProps()}>
                  {/* {column.render("Header")} */}
                  {TheadComponent()}
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          
          {rows.map((rowItem, i) => {
            prepareRow(rowItem);
              return <DiaryProductsListItem key={i} row={rowItem} />
            })
          }
        </tbody>
          
      </table>
  )
  : null}
  </div>
  )
}

DiaryProductsList.propTypes = {
  cell: PropTypes.object
};
