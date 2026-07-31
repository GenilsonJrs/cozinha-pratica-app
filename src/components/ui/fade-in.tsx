import { ReactNode, useEffect, useState } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  scaleFrom?: number;
  style?: StyleProp<ViewStyle>;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 460,
  distance = 18,
  scaleFrom = 1,
  style,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(1);
      return;
    }

    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [progress, reducedMotion, delay, duration]);

  const transform = [
    { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) },
    ...(scaleFrom === 1
      ? []
      : [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [scaleFrom, 1] }) }]),
  ];

  return <Animated.View style={[style, { opacity: progress, transform }]}>{children}</Animated.View>;
}
