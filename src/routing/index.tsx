import * as React from "react";
import {
	DefaultTheme,
	NavigationContainer,
	NavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import * as routes from "./routes";
import * as icons from "./icons";
import { Tabs } from "./declerations";
import * as Services from "../services";
import { useSelector } from "react-redux";
import { StoreState } from "../reducers";
import * as Hooks from "../hooks";

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const PrizeStack = createStackNavigator();
const GameStack = createStackNavigator();

const PrizeStackNavigator = () => (
	<PrizeStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		{routes.prizeStack.map((route) => (
			<PrizeStack.Screen
				name={route.id}
				component={route.Component}
			/>
		))}
	</PrizeStack.Navigator>
);

export const GameStackNavigator = () => (
	<GameStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		{routes.gameStack.map((route) => (
			<GameStack.Screen
				name={route.id}
				component={route.Component}
			/>
		))}
	</GameStack.Navigator>
);

export const TabNavigator = () => {
	const navigatorRef = React.useRef<NavigationContainerRef>(null);

	const activeColor = Services.Colors.MapToDark["highlight"];
	const inActiveColor = Services.Colors.MapToDark["grey"];

	const auth = useSelector((state: StoreState) => state.auth);

	// Hook to check if user interacts with notification
	Hooks.Notifications.useResponseListener((response) => {
		// Read data sent in notification
		const data = response.notification.request.content.data;
		const route = data.route;

		if (route && typeof route === "string") {
			try {
				navigatorRef.current?.navigate(route);
			} catch {
				console.log(`${route} does not exist in TabNavigator`);
			}
		}
	});
	if (auth.type === "guest") return null;

	return (
		<NavigationContainer ref={navigatorRef}>
			<Tab.Navigator
				screenOptions={({ route, navigation }) => ({
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							size={17}
							name={icons.mapTabToIcon[route.name as Tabs]}
							onPress={() => null}
							color={focused ? activeColor : inActiveColor}
						/>
					),
				})}
				tabBarOptions={{
					activeTintColor: activeColor,
					inactiveTintColor: inActiveColor,
				}}
			>
				{routes.tab.map((route) => (
					<Tab.Screen
						name={route.id}
						component={route.Component}
					/>
				))}
				<Tab.Screen
					name="prizes"
					component={PrizeStackNavigator}
				/>
				<Tab.Screen name="game" component={GameStackNavigator} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export const AuthStackNavigator = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	if (auth.type !== "guest") return null;
	return (
		<NavigationContainer>
			<AuthStack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{routes.authStack.map((route) => (
					<AuthStack.Screen
						name={route.id}
						component={route.Component}
					/>
				))}
			</AuthStack.Navigator>
		</NavigationContainer>
	);
};
