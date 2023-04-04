import React, { useState, useEffect } from "react";
import { LayoutChangeEvent, View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./styles";
import { IProps } from "./interface";
import * as Services from "../../../../services";

const MIN_DATA_ITEM_COUNT = 2;

const CustomLineChart = ({ datasets, labels, height }: IProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [width, setWidth] = useState(0);

	const handleWidthChange = (e: LayoutChangeEvent) => {
		setWidth(e.nativeEvent.layout.width);
	};

	const screenWidth = Dimensions.get("window").width;

	useEffect(() => {
		const TIMEOUT = 1250;
		if (width > 0 && isLoading) {
			const t = setTimeout(() => {
				setIsLoading(false);
			}, TIMEOUT);
			return () => {
				clearTimeout(t);
			};
		}
	}, [width]);

	return (
		<View
			style={{ height: height, ...styles.outer }}
			onLayout={handleWidthChange}
		>
			
			<LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

			
		</View>
	);
};

export default CustomLineChart;
