import { useState } from "react"

import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native"

import { BackButtom } from "../components/BackButtom"
import { CheckBox } from "../components/CheckBox"

import { Feather } from "@expo/vector-icons"

import colors from "tailwindcss/colors"
import { api } from "../lib/axios"

const avaiableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sabado",
]

export function New() {
  const [title, setTitle] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      //retira do array o dia
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      )
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim()) {
        return Alert.alert("Ops", "Parece que você esqueceu o titulo")
      }

      if (weekDays.length === 0) {
        return Alert.alert(
          "Vamos com calma",
          "Informe os dias que pretender fazer isso!"
        )
      }

      await api.post("/habits", { title, weekDays })

      setTitle("")
      setWeekDays([])

      Alert.alert("Boa", "Criamos seu novo Hábito")
    } catch (error) {
      console.log(`Error: ${error}`)
      Alert.alert("Vish", "Algo deu errado, tente novamente mais tarde")
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButtom />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-3 rounded-lg mt-3 bg-zinc-800 text-white border-2 border-zinc-700 focus:border-2 focus:border-green-600"
          placeholder="Ex.: Exercícios, dormi, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {avaiableWeekDays.map((weekDay, index) => (
          <CheckBox
            onPress={() => handleToggleWeekDay(index)}
            key={`${weekDay}-${index}`}
            checked={weekDays.includes(index)}
            title={weekDay}
          />
        ))}

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
