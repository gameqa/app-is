const IOS_BUILD_NUMBER =  "1.5.1";
const VERSION_NUMBER = 25;

export default {
	slug: "spurningar",
	owner: "njallis",
	extra: {
		eas: {
			projectId: "5523f3b6-7c14-42df-9f79-1d6ac15159e0",
		},
	},
	ios: {
		supportsTablet: true,
		googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
		bundleIdentifier: "com.spurningaris.Spurningar",
		buildNumber: IOS_BUILD_NUMBER,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#FFA800",
		},
		googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
		package: "com.spurningaris.Spurningar",
		permissions: [],
		versionCode: VERSION_NUMBER,
		config: {
			branch: {
				apiKey: "key_live_kkWb728Kh7lmtcY9KFBT9hdfwrlTN6eD",
			},
		},
	},
	version: IOS_BUILD_NUMBER,
	orientation: "portrait",
	icon: "./assets/icon.png",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#8950fc",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["*/"],
};
