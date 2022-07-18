import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DiaryProductsListItem from '../DiaryProductsListItem';
import { useSelector, useDispatch } from 'react-redux';
import userOperations from '../../redux/user/user-operation';
import productsSelectors from '../../redux/user/user-selector';
import i18n from '../../services/i18n/config';
import { useTable } from 'react-table';
import EllipsisText from "react-ellipsis-text";
import { t } from 'i18next';
import style from './DiaryProductsList.module.scss';

export default function DiaryProductsList() {

  const dispatch = useDispatch();
  const chosenDate = useSelector(productsSelectors.getChosenDate);

  useEffect(() => {
    dispatch(userOperations.getDayProducts(chosenDate))
  }, [chosenDate]);

  const products = useSelector(productsSelectors.getDiaryProducts);

  const productName = i18n.language === 'uk' ? "ua" : "en";

  const data = products.map((product) => ({
    id: product._id,
    name: product.productId.title[productName],
    grams: product.amount,
    calories: Math.round(product.productId.calories * product.amount / 100),
  }))
  

const columns = React.useMemo(() =>
  [
    {
      Header: "Product",
      accessor: "name",
      Cell: ({ cell: { value } }) => {
        return (
          <>
            <EllipsisText text={value} length={35} />
          </>
        );
      }
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
      {data.length > 0 ? (
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
  : <p>{t("diary.The list is empty")}</p>}
  </div>
  )
}

DiaryProductsList.propTypes = {
  cell: PropTypes.object,
  chosenDate: PropTypes.string
};

EllipsisText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  tail: PropTypes.string,
  tailClassName: PropTypes.string,
  tooltip: PropTypes.shape({
    copyOnClick: PropTypes.bool,
    onAppear: PropTypes.func,
    onDisapepear: PropTypes.func
  })
};