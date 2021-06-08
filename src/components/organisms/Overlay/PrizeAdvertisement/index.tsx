import React, { useEffect, useState, useCallback } from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../actions";
import * as Atoms from "../../../atoms";
import styles from "./styles";

import { ChestsImages } from "./../../../../static/";
const COUNT_DOWN = 10;

const PrizeAdvertisement = () => {

    const [count, setCount] = useState(COUNT_DOWN);
    const [hasLoaded, setHasLoaded] = useState(false);

    const dispatch = useDispatch();

    const handleHide = useCallback(() => {
		if (hasLoaded) dispatch(Actions.Overlay.dequeOverlay());
	}, [count]);

    console.log("ég er hér");
    useEffect(() => {
		if (!hasLoaded) return;

		const MS_IN_S = 1000;
		console.log(`count`, count);
		if (count === 0) handleHide();
		else {
			const interval = setInterval(() => {
				setCount((c) => c - 1);
			}, MS_IN_S);
			return () => {
				clearInterval(interval);
			};
		}
	}, [count, handleHide, hasLoaded]);



    return (
        <View style={styles.outer}>
            {hasLoaded ? (
				<View style={styles.counterOuter}>
                <Atoms.Text.Para>{count}</Atoms.Text.Para>
            </View>                
            ): null}
            <TouchableOpacity onPress={handleHide}>
                <Image
                    onLoad={() => setHasLoaded(true)}
                    source={{
                        uri:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fnocco.com%2Fis%2Fblast%2F&psig=AOvVaw1m6A36Vnj5a3SBS8K3Kmx7&ust=1623255493930000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLD4koy4iPECFQAAAAAdAAAAABAD"
                    }}
                    style={styles.image}
                    resizeMode="cover"
                    />
            </TouchableOpacity>
        </View>
    );
};

export default PrizeAdvertisement;