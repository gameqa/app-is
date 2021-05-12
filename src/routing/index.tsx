import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import routes from "./routes";
import * as icons from "./icons";
import { Tabs } from "./declerations";
import * as Services from "../services";

const Tab = createBottomTabNavigator();

const Routing = () => {
	const activeColor = Services.Colors.MapToDark["highlight"];
	const inActiveColor = Services.Colors.MapToDark["light-grey"];
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
				{routes.map((route) => (
					<Tab.Screen name={route.id} component={route.Component} />
				))}
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Routing;
