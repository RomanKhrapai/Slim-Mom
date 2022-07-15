import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../services/i18n/config';
import style from './DiaryAddProductForm.module.scss';

const products = [
  {
      _id: "5d51694802b2373622ff567a",
      title: {
          en: "Pancakes with condensed milk",
          ua: "Млинці зі згущеним молоком"
      },
      сalories: 324
  },
  {
      _id: "5d51694902b2373622ff56fb",
      title: {
          en: "Pancakes with boiled condensed milk",
          ua: "Оладки з вареним згущеним молоком"
      },
      сalories: 299
  },
  {
      _id: "5d51694902b2373622ff5f31",
      title: {
          en: "Black tea with milk and sugar",
          ua: "Чай чорний з молоком і цукром"
      },
      сalories: 43
  }
]

export default function FindProducts ({requestName}) {
  const dispatch = useDispatch();
  // try {
    // const searchResult = dispatch(productsOperations.getRequestProducts(requestName)).then((data) => {
    //   return data
    // });
    // console.log(searchResult)

    return (
      // <div className={style.containerList}>
        <ul>
        </ul>
      //   {products.map(product => {
      //     const productName = (i18n.language === 'uk') ? product.title.ua : product.title.en;
      //     return <li key={product._id}>{productName}</li>
      //   })}
      // </div>
    )

  // } catch (error) {
  //   console.log(error)
  // }  
}

FindProducts.propTypes = {
  requestName: PropTypes.string,
}
