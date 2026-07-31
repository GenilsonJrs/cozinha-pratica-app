jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const { View, Text, ScrollView, Image, FlatList } = require('react-native');

  function createAnimationBuilder() {
    const builder = {};
    const chain = () => builder;
    [
      'duration',
      'delay',
      'springify',
      'damping',
      'stiffness',
      'mass',
      'easing',
      'randomDelay',
      'withCallback',
      'withInitialValues',
      'reduceMotion',
      'build',
    ].forEach((method) => {
      builder[method] = chain;
    });
    return builder;
  }

  function createAnimatedComponent(Base, name) {
    const Component = React.forwardRef(function AnimatedMock(props, ref) {
      const { entering, exiting, layout, sharedTransitionTag, ...rest } = props;
      return React.createElement(Base, { ...rest, ref });
    });
    Component.displayName = `Animated.${name}`;
    return Component;
  }

  const Animated = {
    View: createAnimatedComponent(View, 'View'),
    Text: createAnimatedComponent(Text, 'Text'),
    ScrollView: createAnimatedComponent(ScrollView, 'ScrollView'),
    Image: createAnimatedComponent(Image, 'Image'),
    FlatList: createAnimatedComponent(FlatList, 'FlatList'),
    createAnimatedComponent: (Base) => createAnimatedComponent(Base, 'Custom'),
  };

  return {
    __esModule: true,
    default: Animated,
    FadeIn: createAnimationBuilder(),
    FadeOut: createAnimationBuilder(),
    FadeInDown: createAnimationBuilder(),
    FadeInUp: createAnimationBuilder(),
    FadeOutDown: createAnimationBuilder(),
    SlideInDown: createAnimationBuilder(),
    SlideOutDown: createAnimationBuilder(),
    Layout: createAnimationBuilder(),
    LinearTransition: createAnimationBuilder(),
    useReducedMotion: () => false,
    useSharedValue: (initial) => ({ value: initial }),
    useAnimatedStyle: () => ({}),
    useAnimatedRef: () => ({ current: null }),
    withTiming: (value) => value,
    withSpring: (value) => value,
    withDelay: (_delay, value) => value,
    withSequence: (...values) => values[values.length - 1],
    withRepeat: (value) => value,
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    interpolate: (value) => value,
    Easing: {
      linear: () => 0,
      ease: () => 0,
      quad: () => 0,
      cubic: () => 0,
      bezier: () => ({ factory: () => 0 }),
      in: (fn) => fn,
      out: (fn) => fn,
      inOut: (fn) => fn,
    },
  };
});
