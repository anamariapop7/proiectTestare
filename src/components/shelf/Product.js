import React from 'react';
import PropTypes from "prop-types";

import Thumb from '../Thumb';
import util from '../../util';


const Product = (props) => {
  const product = props.product;

  // Um componente de input pode alterar a quantidade no futuro
  product.quantity = 1;
  let price = props.language === "ro" ? product.price*4.5 : product.price;
  let formattedPrice = util.formatPrice(price, props.intlData.currencyId);
  
  let productInstallment;
   // let price = props.language === "ro" ? product.price*4.5 : product.price;
   // console.error("price", price);
  if(!!product.installments) {
    const installmentPrice = (price / product.installments);

    productInstallment = (
      <div className="installment">
        <span>{props.intlData.or} {product.installments} x</span><b> {props.intlData.currencyFormat} {util.formatPrice(installmentPrice, props.intlData.currencyId)}</b>
      </div>
    );
  }

  return (
    <div className="shelf-item" data-sku={product.sku}>
      {product.isFreeShipping && 
        <div className="shelf-stopper">{props.intlData.Free}</div>
      }
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../static/products/${product.sku}_1.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val"><small>{props.intlData.currencyFormat}</small>
          <b>
            {formattedPrice.substr(0, formattedPrice.length - 3)}
          </b>
          <span>
            {formattedPrice.substr(formattedPrice.length - 3, 3)}
          </span>
        </div>
        {productInstallment}
      </div>
      <div onClick={() => props.addProduct(product)} className="shelf-item__buy-btn"> {props.intlData.AddToCart} </div>
    </div>
  );
}


Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;