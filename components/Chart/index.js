import React, { useState } from "react";
import {
  Container,
  DateLabel,
  ValueLabel,
  ValueWrapper,
  PointerWrapper,
} from "./styles";
import { LineChart } from "react-native-gifted-charts";
import { Dimensions, Easing } from "react-native";
import { Colors } from "../../colors";

const PointerConfig = {
  pointerStripHeight: 130,
  pointerStripColor: "lightgray",
  pointerStripWidth: 2,
  pointerColor: "lightgray",
  radius: 6,
  pointerLabelWidth: 100,
  pointerLabelHeight: 90,
  activatePointersOnLongPress: true,
  autoAdjustPointerLabelPosition: false,
  pointerLabelComponent: (items) => {
    return (
      <PointerWrapper>
        <DateLabel>{items[0].date}</DateLabel>
        <ValueWrapper>
          <ValueLabel>{"Rs." + items[0].value + ".0"}</ValueLabel>
        </ValueWrapper>
      </PointerWrapper>
    );
  },
};
const { width, height } = Dimensions.get("window");

const Chart = ({ data }) => {
  return (
    <Container>
      <LineChart
        isAnimated
        curved
        areaChart={true}
        data={data}
        rotateLabel={false}
        width={width * 0.7}
        height={height * 0.25}
        hideDataPoints={false}
        dataPointsColor={Colors.secondary}
        spacing={20}
        color="#F32424"
        thickness={2.5}
        startFillColor="rgba(20,205,81,0.3)"
        endFillColor="rgba(20,85,81,0.01)"
        startOpacity={0.6}
        endOpacity={0.1}
        initialSpacing={0}
        noOfSections={7}
        maxValue={1000}
        yAxisColor="gray"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{ color: Colors.black }}
        xAxisLabelTextStyle={{ color: "red", fontSize: 20 }}
        pointerConfig={PointerConfig}
      />
    </Container>
  );
};

export default Chart;
