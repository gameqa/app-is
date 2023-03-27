import { InputElementTypes, FormRecipe } from "../../declerations";

export const ResetPassword: FormRecipe = {
	email: {
		type: InputElementTypes.text,
		value: "",
		label:"[[translation:dde6ca46-20e4-4ee9-b3ef-2fda486360d3]]",
		placeholder: "[[translation:106400a5-1f09-4bea-9459-0c5704fa8450]]"
	},

}