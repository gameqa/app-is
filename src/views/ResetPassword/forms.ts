import { InputElementTypes, FormRecipe } from "../../declerations";

export const ResetPassword: FormRecipe = {
    password: {
		type: InputElementTypes.hidden,
		value: "",
		label: "Nýtt lykilorð",
		placeholder: "Nýtt lykilorð",
	},
	password2: {
		type: InputElementTypes.hidden,
		value: "",
		label: "Nýtt lykilorð (aftur)",
		placeholder: "Nýtt lykilorð",
	},
}