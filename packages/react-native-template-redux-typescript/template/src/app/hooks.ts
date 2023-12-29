import { useEffect, useRef } from "react"
import { Animated, useWindowDimensions } from "react-native"
import type { TypedUseSelectorHook } from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * Custom React hook for calculating viewport units
 * based on the current window dimensions.
 *
 * @returns An object containing the calculated viewport heigh and width values.
 */
export const useViewportUnits = () => {
  const { width, height } = useWindowDimensions()

  const vh = height / 100
  const vw = width / 100

  return { vh, vw }
}

/**
 * Custom React hook for creating a bounce animation effect.
 *
 * @param value - The maximum height to which the object should bounce. Defaults to 10 if not provided.
 * @returns The `Animated.Value` object that can be used to drive animations.
 */
export const useBounceAnimation = (value = 10) => {
  const bounce = useRef(new Animated.Value(0)).current

  bounce.interpolate({
    inputRange: [-300, -100, 0, 100, 101],
    outputRange: [300, 0, 1, 0, 0],
  })

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: value,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [bounce, value])

  return bounce
}
