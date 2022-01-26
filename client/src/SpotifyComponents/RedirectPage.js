import React from 'react';
import _, { isEmpty } from 'lodash';
import { getParamValues } from '../utils/functions';
import { useHistoryRouter } from 'react-router-dom';


export default class RedirectPage extends React.Component {
  componentDidMount() {
    const { setExpiryTime, history, location } = this.props;
    try {
      if (_.isEmpty(location.hash)) {
        console.log("isEmpty")
        return history.push('/');
      }

      const access_token = getParamValues(location.hash);
      const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      localStorage.setItem('params', JSON.stringify(access_token));
      localStorage.setItem('expiry_time', expiryTime);
      setExpiryTime(expiryTime);
      console.log(expiryTime)
      history.push('/');
    } catch (error) {
      console.log(error)
      history.push('/');
    }
  
  }

  render() {
    return null;
  }
}
