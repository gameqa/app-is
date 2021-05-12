import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import * as routes from "./routes";
import * as icons from "./icons";
import { Tabs } from "./declerations";
import * as Services from "../services";
import { useSelector } from "react-redux";
import { StoreState } from "../reducers";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigator = () => {
	const activeColor = Services.Colors.MapToDark["highlight"];
	const inActiveColor = Services.Colors.MapToDark["light-grey"];
	const auth = useSelector((state: StoreState) => state.auth);
	if (auth.type === "guest") return null;
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						// You can return any component that you like here!
						return (
							<FontAwesome
								size={17}
								name={icons.mapTabToIcon[route.name as Tabs]}
								onPress={() => null}
								color={focused ? activeColor : inActiveColor}
							/>
						);
					},
				})}
				tabBarOptions={{
					activeTintColor: activeColor,
					inactiveTintColor: inActiveColor,
				}}
			>
				{routes.tab.map((route) => (
					<Tab.Screen name={route.id} component={route.Component} />
				))}
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: Services.Colors.MapToDark["highlight"],
	},
};

export const StackNavigator = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	if (auth.type !== "guest") return null;
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{routes.stack.map((route) => (
					<Stack.Screen name={route.id} component={route.Component} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
};
