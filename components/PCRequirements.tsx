import { ChevronDown } from "@tamagui/lucide-icons";
import { Accordion, Square, Text } from "tamagui";

const PCRequirements = (props) => {
  const { platforms } = props;

  const pcRequirements = platforms?.find((item) => item.platform.slug === "pc")
    ?.requirements;

  if (!pcRequirements || Object.keys(pcRequirements).length === 0) return;

  const pcRequirementsMinimumArray = pcRequirements?.minimum?.split(".");
  const pcRequirementsRecommendedArray =
    pcRequirements?.recommended?.split(".");

  return (
    <Accordion
      type="multiple"
      theme="blue"
      marginTop={10}
    >
      <Accordion.Item value="pc">
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
        >
          {({ open }) => (
            <>
              <Text>PC Requirements</Text>
              <Square
                animation="quick"
                rotate={open ? "180deg" : "0deg"}
              >
                <ChevronDown />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content gap={5}>
          {pcRequirementsMinimumArray?.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}

          {pcRequirementsRecommendedArray?.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default PCRequirements;
