import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { updateLanguage } from '../store/actions/filterActions';
import LoginBtn from './LoginBtn';

class Header extends Component {

  handleChangeToRomanian = () => {
    this.props.updateLanguage("ro");
  }
  handleChangeToEnglish = () => { 

    this.props.updateLanguage("en");
  }
  render() {
    return (
       <header className="appHeader">
          <LoginBtn intlData={this.props.intlData} />
            <div className="flags">
              <ul>
                <li><a href="#" onClick={this.handleChangeToRomanian}><img alt="Romanian" src="http://cdn2.iconfinder.com/data/icons/flags/flags/32/Romania.png" /></a></li>
                <li><a href="#" onClick={this.handleChangeToEnglish}><img alt="English" src="http://cdn2.iconfinder.com/data/icons/flags/flags/32/England.png" /></a></li>
              </ul>
            </div>
          </header>
    );
  }
}

Header.propTypes = {
  updateLanguage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  language: state.filters.language,
  intlData: state.filters.intlData
})
export default connect(mapStateToProps, { updateLanguage })(Header);

