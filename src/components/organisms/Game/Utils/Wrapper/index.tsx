import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { StoreState } from "../../../../../reducers";
import { IProps } from "./interface";

const GameWrapper = ({ type, children }: IProps) => {
	const state = useSelector((state: StoreState) => state.game);

	if (state.current !== type) return null;
	return <React.Fragment>{children}</React.Fragment>;
};

export default GameWrapper;

const styles = StyleSheet.create({});
