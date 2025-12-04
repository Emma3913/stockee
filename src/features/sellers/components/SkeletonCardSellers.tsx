import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { globalColors } from '../../../ui/styles/globalStyles';

export const SkeletonCardSellers = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.cardHeader}>
        <View style={styles.skeletonNombre} />
      </View>
      <View style={styles.skeletonEmail} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: globalColors.light,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 8,
  },

  skeletonNombre: {
    width: '70%',
    height: 22,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
  },
  skeletonEmail: {
    width: '50%',
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
  },
});
