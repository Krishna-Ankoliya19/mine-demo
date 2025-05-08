import React, { useState } from "react";
import { Platform } from "react-native";
import { getRealm } from "../lib/realm";
import { BSON } from "realm";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Input,
  Label,
  Button,
  YStack,
  XStack,
  Text,
  Checkbox,
  Select,
  ScrollView,
  Adapt,
  Sheet,
} from "tamagui";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    const realm = getRealm();
    realm.write(() => {
      realm.create("Profile", {
        _id: new BSON.ObjectId(),
        name,
        email,
        gender,
        age: parseInt(age),
        interests,
        dateOfBirth: dob,
      });
    });
    console.log("Profile saved!");
    const allProfiles = realm.objects("Profile");
    console.log("Total profiles in DB:", allProfiles.length);
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <ScrollView>
      <YStack
        space="$4"
        padding="$4"
        backgroundColor="$background"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$color6"
        shadowColor="$shadowColor"
        elevation="$2"
      >
        <Label>Name</Label>
        <Input
          value={name}
          onChangeText={setName}
          borderColor="$color7"
          borderWidth={1}
          borderRadius="$4"
          padding="$2"
          backgroundColor="$color1"
        />

        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          borderColor="$color7"
          borderWidth={1}
          borderRadius="$4"
          padding="$2"
          backgroundColor="$color1"
        />

        <Label>Gender</Label>
        <Select
          value={gender}
          onValueChange={setGender}
          size="$4"
        >
          <Select.Trigger width="100%" borderColor="$color7" borderWidth={1} borderRadius="$4">
            <Select.Value />
          </Select.Trigger>

          <Adapt when="sm" platform="touch">
            <Sheet modal dismissOnSnapToBottom>
              <Sheet.Frame>
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay />
            </Sheet>
          </Adapt>

          <Select.Content>
            <Select.Viewport>
              {["Male", "Female", "Other"].map((value, index) => (
                <Select.Item key={value} index={index} value={value}>
                  <Select.ItemText>{value}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select>

        <Label>Age</Label>
        <Input
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          borderColor="$color7"
          borderWidth={1}
          borderRadius="$4"
          padding="$2"
          backgroundColor="$color1"
        />

        <Label>Interests</Label>
        <YStack space="$2">
          {["Music", "Sports", "Travel", "Reading"].map((interest) => (
            <XStack key={interest} alignItems="center" space="$2">
              <Checkbox
                size="$4"
                checked={interests.includes(interest)}
                onCheckedChange={() => toggleInterest(interest)}
              >
                <Checkbox.Indicator>
                  <Text>✓</Text>
                </Checkbox.Indicator>
              </Checkbox>
              <Text>{interest}</Text>
            </XStack>
          ))}
        </YStack>

        <Label>Date of Birth</Label>
        <Button
          onPress={() => setShowDatePicker(true)}
          theme="blue"
          borderRadius="$4"
        >
          {dob.toDateString()}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setDob(date);
            }}
          />
        )}

        <Button
          theme="active"
          onPress={handleSubmit}
          backgroundColor="$blue10"
          color="white"
          borderRadius="$6"
          padding="$3"
        >
          Submit
        </Button>
      </YStack>
    </ScrollView>
  );
}
