import { View, Text, Dimensions } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Card from "./Card";
import { Colors } from "../colors";

const Chart = () => {
  return (
    <Card style={{ margin: 5, overflow: "hidden", padding: 5 }}>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 60} // from react-native
        height={220}
        withVerticalLines={false}
        yAxisLabel="Rs."
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: Colors.secondary,
          backgroundGradientFrom: Colors.secondary,
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: Colors.secondary,
          backgroundGradientToOpacity: 1,
          fillShadowGradient: "#9D60D5",
          fillShadowGradientOpacity: 1,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "2",
            strokeWidth: "1",
            stroke: Colors.white,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </Card>
  );
};

export default Chart;
