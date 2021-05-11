import { InputElementTypes, FormRecipe } from "../../declerations";

export const Authenticate: FormRecipe = {
	email: {
		type: InputElementTypes.text,
		value: "",
		placeholder: "eg@netfang.is",
		label: "Netfang",
	},
	password: {
		type: InputElementTypes.text,
		value: "",
		label: "Lykilorð",
		placeholder: "Mitt lykilorð",
	},
};

export const Register: FormRecipe = {
	email: {
		type: InputElementTypes.text,
		value: "",
		placeholder: "eg@netfang.is",
		label: "Netfang",
	},
	username: {
		type: InputElementTypes.text,
		value: "",
		label: "Notendanafn",
		placeholder: "Notendanafn",
	},
	password: {
		type: InputElementTypes.hidden,
		value: "",
		label: "Lykilorð",
		placeholder: "Mitt lykilorð",
	},
	password2: {
		type: InputElementTypes.hidden,
		value: "",
		label: "Lykilorð (aftur)",
		placeholder: "Mitt lykilorð",
	},
};
