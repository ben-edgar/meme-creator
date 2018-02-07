import React from 'react';
import {
  Modal,
  Alert,
  Button,
  CameraRoll,
  Keyboard,
  ImageBackground,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { takeSnapshotAsync } from 'expo';
import PropTypes from 'prop-types';

export default class MemeEditor extends React.Component {
  static propTypes = {
    photo: PropTypes.object,
    closeMemeModal: PropTypes.func
  };

  saveImage = async () => {
    const result = await takeSnapshotAsync(this.memeRef, {
      format: 'png',
      result: 'file',
    });
    await CameraRoll.saveToCameraRoll(result, 'photo');
    Alert.alert(
      'Success',
      'Meme Saved to the Gallery',
      [
        { text: 'Moar Memes!', onPress: () => this.props.closeMemeModal() },
      ],
      { cancelable: false }
    );
  }

  setMemeRef = (ref) => {
    this.memeRef = ref;
  }

  closeKeyboard = () => {
    Keyboard.dismiss();
  }

  renderMemeTextInput = () => {
    return (
      <TextInput
        autoCapitalize={'characters'}
        multiline={true}
        style={styles.memeText}
        numberOfLines={2}
        underlineColorAndroid={'transparent'}/>
    );
  }

  render = () => {
    return (
      <Modal animationType="slide" transparent={false}>
        <TouchableWithoutFeedback onPress={this.closeKeyboard}>
          <View style={styles.container}>
            <Text style={styles.baseFont}>
              Tap on the top and bottom of the image to add your Text. Then save your meme to the Gallery!
            </Text>
            <View
              style={styles.memeContainer}
              collapsable={false}
              ref={this.setMemeRef}>
              <ImageBackground
                source={{ uri: this.props.photo.uri }}
                style={styles.imageStyle}>
                {this.renderMemeTextInput()}
                {this.renderMemeTextInput()}
              </ImageBackground>
            </View>
            <View style={styles.buttons}>
              <Button title="Save Meme" onPress={this.saveImage} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  baseFont: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  container: {
    alignItems:'center',
    flex: 1,
    padding: 20
  },
  imageStyle: {
    width: 250,
    height: 350,
    justifyContent: 'space-between'
  },
  memeText: {
    margin: 10,
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 20,
    textDecorationLine: 'none',
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5
  },
  buttons: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    padding: 30,
  }
});
