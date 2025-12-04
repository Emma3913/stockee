import { Animated, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';

export const SkeletonProductCard = () => {
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
      <View style={styles.image} />

      <View style={styles.infoContainer}>
        <View style={styles.title} />
        <View style={styles.lineSmall} />
        <View style={styles.lineSmall} />
        <View style={styles.lineSmall} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e0e0e0',
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    width: '60%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 8,
  },

  lineSmall: {
    width: '40%',
    height: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 6,
  },
});
