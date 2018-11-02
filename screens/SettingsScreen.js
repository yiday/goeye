import React from 'react';
import { ExpoConfigView } from '@expo/samples';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '设置',
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    }
  }


  render() {
    return (
      <ExpoConfigView />
    );
  }
}
