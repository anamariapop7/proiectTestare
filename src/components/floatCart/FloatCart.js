import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../store/actions/floatCartActions';
import { updateCart } from '../../store/actions/updateCartActions';
import CartProduct from './CartProduct';
import persistentCart from "../../persistentCart";
import util from '../../util';
import { Modal, Button } from 'react-bootstrap';



class FloatCart extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modalIsOpen: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  };


  componentWillMount() {
    this.props.loadCart( JSON.parse(persistentCart().get()) || [] );
  };

  componentDidMount() {

    setTimeout(() => {
      this.props.updateCart(this.props.cartProducts);
    }, 0);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  };

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = (product) => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  removeProduct = (product) => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };
  proceedToCheckout = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal() {
    this.setState({modalIsOpen: false});
  };
  handleRedirect(){
    window.open("https://www.paypal.com/ro/home", "_blank");
    this.setState({modalIsOpen: false});
  };

  render() {
    const { cartTotals, cartProducts, removeProduct } = this.props;
    const { totalPrice, productQuantity } = this.props.cartTotals;
    let checkoutMessage = null;
    if (!productQuantity) {
      checkoutMessage = this.props.intlData.EmptyBag;
    }else {
     checkoutMessage = `Total: ${this.props.intlData.currencyFormat} ${util.formatPrice(totalPrice, this.props.intlData.currencyId)}`;
    }

    const products = cartProducts.map(p => {
      return (
        <CartProduct
          product={p}
          removeProduct={removeProduct}
          key={p.id}
          intlData={this.props.intlData}
        />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
          X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity"> {cartTotals.productQuantity} </span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">
                {cartTotals.productQuantity}
              </span>
            </span>
            <span className="header-title"> {this.props.intlData.Bag} </span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                 {this.props.intlData.EmptyBag}<br />:)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">{this.props.intlData.Subtotal}</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${this.props.intlData.currencyFormat} ${util.formatPrice(cartTotals.totalPrice, this.props.intlData.currencyId)}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotals.installments && (
                  <span>
                    {`${this.props.intlData.Upto} ${cartTotals.installments} x ${this.props.intlData.currencyFormat} ${util.formatPrice(cartTotals.totalPrice / cartTotals.installments, this.props.intlData.currencyId)}`}
                  </span>
                )}
              </small>
            </div>
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              {this.props.intlData.Checkout}
            </div>
          </div>
        </div>
         <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>  {this.props.intlData.ProceedToPayment} </Modal.Title>
          </Modal.Header>
          <Modal.Body> {checkoutMessage} </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.closeModal}>
                {this.props.intlData.Cancel}
              </Button>
            <Button variant="secondary" onClick={this.handleRedirect}>
              {this.props.intlData.Proceed}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

FloatCart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  newProduct: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
    intlData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cartProducts: state.cartProducts.items,
  newProduct: state.cartProducts.item,
  productToRemove: state.cartProducts.itemToRemove,
  cartTotals: state.cartTotals.item,
  intlData: state.filters.intlData
});

export default connect(mapStateToProps, { loadCart, updateCart, removeProduct})(FloatCart);

