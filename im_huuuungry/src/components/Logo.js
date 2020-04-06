import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={{url: 'https://avatars2.githubusercontent.com/u/50158126?s=400&u=903d9db65a8dc0d235fa3f42f83f655d80f7766f&v=4'}} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Logo);
