import React, { useState } from 'react';
import { YStack, Text, Button, Card } from 'tamagui';

const quotes = [
  "Innovation distinguishes between a leader and a follower. – Steve Jobs",
  "Code is like humor. When you have to explain it, it’s bad. – Cory House",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
];

export default function AboutScreen() {
  const [quote, setQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <YStack f={1} jc="center" ai="center" space="$4" p="$4">
      <Text fontSize="$7" fontWeight="900" color="$blue10">Quote of the Moment</Text>
      <Card elevate bordered p="$4" w={300}>
        <Text fontSize="$5" fontStyle="italic" ta="center">
          “{quote}”
        </Text>
      </Card>
      <Button size="$4" onPress={getRandomQuote}>Get New Quote</Button>
    </YStack>
  );
}
