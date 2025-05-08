import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { YStack, Text, ScrollView, Card, Button } from "tamagui";

type Profile = {
  _id: any;
  name: string;
  email: string;
  gender: string;
  age: number;
  interests: string[];
  dateOfBirth: Date;
};

export default function ProfilesScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    if (Platform.OS === "web") return;

    let realm: any;
    let storedProfiles: any;

    (async () => {
      const { getRealm } = await import("../lib/realm.native");
      const r = getRealm();
      realm = r;
      storedProfiles = r.objects("Profile");

      const updateProfiles = () => {
        setProfiles([...storedProfiles]);
      };

      updateProfiles();
      storedProfiles.addListener(updateProfiles);

      // Cleanup
      return () => {
        storedProfiles?.removeListener(updateProfiles);
        realm?.close();
      };
    })();
  }, []);

  const deleteProfile = async (id: any) => {
    if (Platform.OS === "web") return;

    const { getRealm } = await import("../lib/realm.native");
    const r = getRealm();
    const { BSON } = await import("realm");

    r.write(() => {
      const profileToDelete = r.objectForPrimaryKey("Profile", new BSON.ObjectId(id));
      if (profileToDelete) r.delete(profileToDelete);
    });
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Text>
      <Text color="$gray10">{label}</Text>{" "}
      <Text color="$color12" fontWeight="500">
        {value}
      </Text>
    </Text>
  );

  if (Platform.OS === "web") {
    return (
      <YStack padding="$4" flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="$8" fontWeight="bold" color="$blue10">
          Saved Profiles (Web)
        </Text>
        <Text color="$gray10">Profile listing not available on web.</Text>
      </YStack>
    );
  }

  return (
    <ScrollView>
      <YStack padding="$4" space="$4">
        <Text fontSize="$8" fontWeight="bold">
          Saved Profiles
        </Text>

        {profiles.length === 0 ? (
          <Text color="$gray10">No profiles saved yet.</Text>
        ) : (
          profiles.map((profile) => (
            <Card
              key={profile._id.toString()}
              elevate
              bordered
              padding="$4"
              marginBottom="$4"
              borderWidth={1}
              borderRadius="$4"
              backgroundColor="$color1"
              borderColor="$color6"
            >
              <YStack space="$2">
                <Text fontSize="$6" fontWeight="600" color="$blue10">
                  {profile.name}
                </Text>
                <InfoRow label="Email:" value={profile.email} />
                <InfoRow label="Gender:" value={profile.gender} />
                <InfoRow label="Age:" value={profile.age.toString()} />
                <InfoRow label="Interests:" value={profile.interests.join(", ")} />
                <InfoRow label="DOB:" value={new Date(profile.dateOfBirth).toDateString()} />
                <Button
                  backgroundColor="$red10"
                  color="white"
                  marginTop="$3"
                  onPress={() => deleteProfile(profile._id)}
                >
                  Delete
                </Button>
              </YStack>
            </Card>
          ))
        )}
      </YStack>
    </ScrollView>
  );
}
