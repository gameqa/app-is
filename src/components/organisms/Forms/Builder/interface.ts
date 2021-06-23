import React from "react";
import { ColorType, InputElementRecipe } from "../../../../declerations";

export interface IProps<T extends {}, K extends {}> {
	onSubmit: (data: T, formValues:any) => void;
	buttonLabel: string;
	url: string;
	form: { [key in keyof K]: InputElementRecipe };
	HTTPmethod: "put" | "post" | "patch";
	buttonColor?: ColorType;
	children?: React.ReactNode;
}
