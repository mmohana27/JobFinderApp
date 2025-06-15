import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function HomeScreen() {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const bounce = useSharedValue(0);
  const fadeIn = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, { duration: 500 }), -1, true);

    rotate.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 300 }),
        withTiming(-10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1
    );

    bounce.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1
    );

    fadeIn.value = withTiming(1, { duration: 1500 });
  }, []);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const briefcaseStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
    marginTop: 20,
  }));

  const rocketStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
    marginTop: 20,
  }));

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  return (
    <LinearGradient
      colors={['#6a11cb', '#ffffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <HelloWave />

        <Animated.View style={[fadeInStyle]}>
          <ThemedText type="title" style={styles.welcome}>
            Welcome to <ThemedText type="title" style={styles.highlight}>Job Finder App</ThemedText>
          </ThemedText>
        </Animated.View>

        <ThemedText style={styles.subtitle}>Find your dream job effortlessly</ThemedText>

        <Animated.View style={[heartStyle, styles.emoji]}>
          <ThemedText style={styles.emojiText}>❤️</ThemedText>
        </Animated.View>

        <Animated.View style={[rocketStyle, styles.emoji]}>
          <ThemedText style={styles.emojiText}>🚀</ThemedText>
        </Animated.View>

        <Animated.View style={[briefcaseStyle, styles.emoji]}>
          <ThemedText style={styles.emojiText}>💼</ThemedText>
        </Animated.View>

        <ThemedText style={styles.footer}>Made with love & React Native </ThemedText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
    color: '#fff',

  },
  highlight: {
    color: '#fde68a', 
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    //color: '#f1f5f9',
    color:'#000000',
    textAlign: 'center',
  },
  emoji: {
    marginTop: 16,
  },
  emojiText: {
    fontSize: 32,
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
});
