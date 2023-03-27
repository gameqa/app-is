import { InputElementTypes, FormRecipe } from "../../declerations";

export const Register: FormRecipe = {
	email: {
		type: InputElementTypes.text,
		value: "",
		placeholder: "[[translation:106400a5-1f09-4bea-9459-0c5704fa8450]]",
		label: "[[translation:dde6ca46-20e4-4ee9-b3ef-2fda486360d3]]",
	},
	username: {
		type: InputElementTypes.text,
		value: "",
		label: "[[translation:4ac83c4b-9397-4bb8-822c-f5759602cfe3]]",
		placeholder: "[[translation:4ac83c4b-9397-4bb8-822c-f5759602cfe3]]",
	},
	password: {
		type: InputElementTypes.hidden,
		value: "",
		label: "[[translation:3f6b302c-b013-4a7b-9f0c-057d1536fb18]]",
		placeholder: "[[translation:de0f29ad-e669-4cc8-94f5-13f37d3a6680]]",
	},
	password2: {
		type: InputElementTypes.hidden,
		value: "",
		label: "[[translation:f9afe8c8-ea5e-495b-a96c-0e1ab5007d44]]",
		placeholder: "[[translation:de0f29ad-e669-4cc8-94f5-13f37d3a6680]]",
	},
	allowEmail: {
		type: InputElementTypes.checkBox,
		value: false,
		label: "[[translation:580fe689-abd7-4716-a1bf-04ec426b5b46]]",
	},
};
