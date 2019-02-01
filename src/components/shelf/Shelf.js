import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchProducts } from '../../store/actions/productActions';
import { addProduct } from '../../store/actions/floatCartActions';

import Product from './Product';
import Filter from './Filter';
import ShelfHeader from './ShelfHeader';
import Clearfix from '../Clearfix';
import Spinner from '../Spinner';


class Shelf extends Component {
  state  = {
    loading: false,
  }

  componentWillMount() {
    const { filters, sort } = this.props;

    this.handleFetchProducts(filters, sort);
  }

  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters, sort: nextSort } = nextProps;

    if (nextFilters !== this.props.filters) {
      this.handleFetchProducts(nextFilters, undefined);
    }

    if (nextSort !== this.props.sort) {
      this.handleFetchProducts( undefined, nextSort);
    }
  }

  handleFetchProducts = (filters = this.props.filters, sort = this.props.sort) => {
    this.setState({ loading: true });
    this.props.fetchProducts(filters, sort, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { products } = this.props;
    const p = products.map(p => {
      return (
        <Product
          product={p}
          addProduct={this.props.addProduct}
          key={p.id}
          intlData={this.props.intlData}
          language={this.props.language}
        />
      );
    });

    return (
      <React.Fragment>
        {this.state.loading &&
          <Spinner />
        }
        <Filter />  
        <div className="shelf-container">
          <ShelfHeader productsLength={products.length} intlData={this.props.intlData}/>
          {p}
          <Clearfix />
        </div>
        <Clearfix />
      </React.Fragment>
    )

  }
}

Shelf.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  filters: PropTypes.array,
  sort: PropTypes.string,
  language: PropTypes.string,
  intlData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  products: state.products.items,
  filters: state.filters.items,
  language: state.filters.language,
  sort: state.sort.item,
  intlData: state.filters.intlData
})

export default connect(mapStateToProps, { fetchProducts, addProduct })(Shelf);
