import React from 'react';
import {
  Modal,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

export default class MemeModal extends React.Component {
  static propTypes = {
    photo: PropTypes.object,
    closeMemeModal: PropTypes.func
  };

  saveImage = () => {
    
  };

  render() {
    return (
      <Modal animationType="slide" transparent={false}>
        <TouchableWithoutFeedback onPress={this.closeKeyboard}>
          <View style={styles.container}>
            <View
              style={styles.memeContainer}
              collapsable={false}>
              <Image
                source={{ uri: this.props.photo.uri }}
                style={styles.imageStyle}>
              </Image>
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
  /*memeContainer: {
    // I needed to add in a style to get this working. I don't know if this specific style is strictly needed or if the value needs to be this
    // This is based on playing with: https://snack.expo.io/SJRvlSxvb
    backgroundColor: '#ecf0f1',
  },*/
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