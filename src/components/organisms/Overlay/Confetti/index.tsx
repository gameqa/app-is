import React from "react";
import ConfettiCannon from "react-native-confetti-cannon";

const Confetti = () => {
	const COUNT = 200;
	const X_origin = -10;
	const Y_origin = 0;
	return (
		<ConfettiCannon
			count={COUNT}
			origin={{ x: X_origin, y: Y_origin }}
		/>
	);
};

export default Confetti;
