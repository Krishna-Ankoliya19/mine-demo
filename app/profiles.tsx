import React, { useEffect, useState } from 'react';
import { getRealm } from '../lib/realm';
import { BSON } from 'realm';
import { Profile } from '../models/User';
import { YStack, Text, ScrollView, Card, Button } from 'tamagui';

export default function ProfilesScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const realm = getRealm();
    const storedProfiles = realm.objects<Profile>('Profile');

    const updateProfiles = () => {
      setProfiles([...storedProfiles]);
    };

    // Initial load
    updateProfiles();

    // Attach listener
    storedProfiles.addListener(updateProfiles);

    // Cleanup listener on unmount
    return () => {
      storedProfiles.removeListener(updateProfiles);
      realm.close();
    };
  }, []);

  const deleteProfile = (id: BSON.ObjectId) => {
    const realm = getRealm();
    realm.write(() => {
      const profileToDelete = realm.objectForPrimaryKey<Profile>('Profile', id);
      if (profileToDelete) realm.delete(profileToDelete);
    });
    // No need to manually refresh — listener will handle it
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Text>
      <Text color="$gray10">{label}</Text>{' '}
      <Text color="$color12" fontWeight="500">
        {value}
      </Text>
    </Text>
  );

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
              key={profile._id.toHexString()}
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
                <InfoRow label="Interests:" value={profile.interests.join(', ')} />
                <InfoRow label="DOB:" value={profile.dateOfBirth.toDateString()} />
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
