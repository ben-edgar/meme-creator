import React from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import MemeModal from './components/MemeModal';
import { Permissions, ImagePicker } from 'expo';

const welcomeScreen = "WELCOME";
const memeScreen = "MEME";

export default class MemeCreator extends React.Component {
  state = {
    screen: welcomeScreen,
    hasCameraPermission: null,
    photo: null,
  };

  async componentWillMount() {
    const result1 = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: result1.status === 'granted' });
  }
  
  takePhoto = () => {
    
  };
  
  getExternalStoragePermission = async () => {
    await ImagePicker.launchImageLibraryAsync();
  }
  
  androidExternalStorageSection = () => {
    return (
      <View>
        <Text style={styles.baseFont}>
          {'(Android Only): We need external storage permission and Expo doesn\'t gracefully give it to us:'}
        </Text>
        <Button title={'Allow External Storage Access'} onPress={this.getExternalStoragePermission} />
      </View>
    );
  }

  render() {
    const { screen, hasCameraPermission } = this.state;
    if (!hasCameraPermission) {
      return <Text>No access to camera</Text>;
    } else {
      if (screen === welcomeScreen) {
        return (
          <View style={styles.container}>
            <Text style={styles.baseFont}>
              Welcome to the MemeCreator! Lets build a meme.
            </Text>
            <Button
              title={'Take a new picture'}/>
            { Platform.OS === 'ios' ? null : this.androidExternalStorageSection() }
          </View>
        );
      } else {
        return <MemeModal />;
      }
    }
  }
}

// React Native recomends wrapping styles in StyleSheet.create to improve performance.
const styles = StyleSheet.create({
  baseFont: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-around'
  }
});
