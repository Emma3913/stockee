import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

export const validateEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
