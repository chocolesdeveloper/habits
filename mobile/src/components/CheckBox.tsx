import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native"

import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated"

import { Feather } from "@expo/vector-icons"

import colors from "tailwindcss/colors"

interface Props extends TouchableOpacityProps {
  checked?: boolean
  title: string
}

export function CheckBox({ checked = false, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className="flex-row mb-2 item-center"
    >
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="w-8 h-8 bg-zinc-900 rounded-lg" />
      )}

      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}
