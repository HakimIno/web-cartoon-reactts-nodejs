import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  elapsedSec: number;
  totalSec: number ;
};

export default function ElapsedTimeTracker({ ...props }: Props) {
  const elapsedMin = Math.floor(props.elapsedSec / 60);
  const elapsedSec = Math.floor(props.elapsedSec % 60);
  

  const totalMin = Math.floor(props.totalSec / 60);
  const totalSec = Math.floor(props.totalSec % 60);

  

  return (
    <Flex
      align="center"
      className="elapsed-time-tracker"
      fontWeight="600"
      gap="4px"
      transition="500ms opacity"
      mt="-8px"
      p={0}
    >
      <Flex justify="end">
        <Text fontWeight={600} color="white">
          {elapsedMin}:
        </Text>
        <Text fontWeight={600} color="white">
          {elapsedSec.toString().padStart(2, "0")}
        </Text>

        <Text fontWeight={600} color="white" mx={2} fontSize={15}>
          /
        </Text>
        <Text fontWeight={600} color="white">
          {totalMin}:
        </Text>
        <Text fontWeight={600} color="white">
          {totalSec}
        </Text>
      </Flex>
    </Flex>
  );
}
