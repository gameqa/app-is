import { User } from "../../declerations";
import { PrizeCategory, PrizeCategoryNames, PrizeItem } from "./interface";

export const ALLIR_TAKA_THATT: PrizeCategoryNames = "Allir taka þátt";

export const PriceCategories: PrizeCategory[] = [
	{
		name: "Allir taka þátt",
		description: "",
		prereqDescription: "",
		name_tgf: "Allir taka þátt",
		name_tf: "Allir taka þátt",
	},
	{
		name: "Klíkan",
		description: "",
		prereqDescription: "komast í Lvl 5",
		name_tgf: "Klíkunni",
		name_tf: "Klíkuna",
	},
	{
		name: "Útvaldir",
		description: "",
		prereqDescription: "komast í Lvl 10",
		name_tgf: "Útvöldum",
		name_tf: "Útvalda",
	},
	{
		name: "Áhrifavaldar",
		description: "",
		prereqDescription: "fá 10 vini til þess að skrá sig á spurningar.is",
		name_tgf: "Áhrifavöldum",
		name_tf: "Áhrifavalda",
	},
];

export const mapCategoryNametoCategory = (categoryName: PrizeCategoryNames) =>
	PriceCategories.find((item) => item.name === categoryName);

export const getUnlockedAtRoundEnd = (user: User) => {
	let category: PrizeCategory | undefined;
	if (user.level === 5)
		category = PriceCategories.find((item) => item.name === "Klíkan");
	if (user.level === 10)
		category = PriceCategories.find((item) => item.name === "Útvaldir");
	return category;
};

export const getUpcomingUnlocks = (user: User) => {
	const outputArray: PrizeCategory[] = [];

	if (user.level < 5)
		outputArray.push(PriceCategories.find((item) => item.name === "Klíkan")!);
	else if (user.level < 10)
		outputArray.push(PriceCategories.find((item) => item.name === "Útvaldir")!);

	if (user.scoreCard.invites < 10)
		outputArray.push(PriceCategories.find((item) => item.name === "Áhrifavaldar")!);

	return outputArray;
};

export const PrizeItems: PrizeItem[] = [
	{
		category: "Allir taka þátt",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Allir taka þátt",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Allir taka þátt",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Allir taka þátt",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Klíkan",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Klíkan",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Klíkan",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Allir taka þátt",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Klíkan",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Klíkan",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Klíkan",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Útvaldir",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Útvaldir",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Útvaldir",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Útvaldir",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Útvaldir",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Útvaldir",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Útvaldir",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
	{
		category: "Áhrifavaldar",
		name: "Kassi af NOCCO",
		sponsor: "Core",
		imageURL:
			"https://www.fivestartrading-holland.eu/images/product_images/original_images/nocco%20tropical%20250%20tray.jpg",
	},
];

export const countPrizesPerCategory = (categoryName: PrizeCategoryNames) => {
	return PrizeItems.filter((item) => item.category === categoryName).length;
};

export const hasUnlockedCategory = (category: PrizeCategoryNames, user: User) => {
	switch (category) {
		case "Allir taka þátt":
			return true;
		case "Klíkan":
			return user.level >= 5;
		case "Útvaldir":
			return user.level >= 10;
		case "Áhrifavaldar":
			return user.scoreCard.invites >= 10;
		default:
			return false;
	}
};

export * from "./interface";
