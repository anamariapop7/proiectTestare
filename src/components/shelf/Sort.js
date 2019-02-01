import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { updateSort } from '../../store/actions/sortActions';
import Selectbox from '../Selectbox';



class Sort extends Component {

  handleSort = (value) => {
    this.props.updateSort(value);
  }

  render() {
    const sortBy = [
  { value: '',           label: this.props.intlData.Select  },
  { value: 'lowestprice', label: this.props.intlData.OrderAsc },
  { value: 'highestprice', label: this.props.intlData.OrderDesc },
]
    return (
      <div className="sort">
        {this.props.intlData.Order} <Selectbox options={sortBy} handleOnChange={this.handleSort} />
      </div>
    );
  }
}

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  intlData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  sort: state.sort.item,
  intlData: state.filters.intlData
})

export default connect(mapStateToProps, { updateSort })(Sort);