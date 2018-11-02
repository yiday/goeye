import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import { MediaLibrary, Camera, Permissions, FileSystem } from 'expo';
import Layout from '../constants/Layout';

import styles from '../css/styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: null,
    type: Camera.Constants.Type.back,
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    const permission_status = await Permissions.askAsync(Permissions.CAMERA,
                                               Permissions.CAMERA_ROLL);
    const camera_status = permission_status.permissions.camera.status;
    const roll_status = permission_status.permissions.cameraRoll.status;
    this.setState({ 
      hasCameraPermission: camera_status === 'granted',
      hasCameraRollPermission: roll_status === 'granted'
    });
    
  }
  onPictureSaved = async photo => {
    
    const asset = await MediaLibrary.createAssetAsync(photo.uri);
    console.log('asset:', asset)
  }
  async snap(camera) {
    if (camera) {
      let photo = await camera.takePictureAsync();
      console.log('photo:', photo)
      this.onPictureSaved(photo)
    }
    console.log('finish..ffff.')
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera</Text>
    } else {
      return (
      <View style={styles.container}>
        <Camera 
          ref={ref => { this.camera = ref; }}
          style={{ flex: 1 }}
          flashMode={this.state.flash}
          type={this.state.type}
          autoFocus={this.state.autoFocus}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}>
          <View
              style={{
                flex: 1,
                
                flexDirection: 'row',
              }}>
              <TouchableWithoutFeedback
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.snap(this.camera);
                }}>
                <Image
                  style={ {
                     opacity: 0.95,
                     width: Layout.window.width, height: Layout.window.height}}
                  source={require('../assets/images/book.jpg')}
                />
                
              </TouchableWithoutFeedback>
            </View>

        </Camera>
      </View>
    );
    }
    
  }


 
}
