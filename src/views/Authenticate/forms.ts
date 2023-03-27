import { InputElementTypes, FormRecipe } from "../../declerations";

export const Authenticate: FormRecipe = {
	email: {
		type: InputElementTypes.text,
		value: "",
		placeholder: "[[translation:106400a5-1f09-4bea-9459-0c5704fa8450]]",
		label: "[[translation:dde6ca46-20e4-4ee9-b3ef-2fda486360d3]]",
	},
	password: {
		type: InputElementTypes.hidden,
		value: "",
		label: "[[translation:3f6b302c-b013-4a7b-9f0c-057d1536fb18]]",
		placeholder: "[[translation:de0f29ad-e669-4cc8-94f5-13f37d3a6680]]",
	},
};
