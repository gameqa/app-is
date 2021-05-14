import { TextInputProps as RNTextInputProps } from "react-native";

export enum InputElementTypes {
	text,
	hidden,
	authCode,
}

export interface InputBaseInterface {
	required?: boolean;
	hidden?: boolean;
}

/**
 * TEXT INPUTS
 */

export interface TextInputBase extends InputBaseInterface {
	value: string;
	placeholder?: string;
	props?: RNTextInputProps;
}

export interface TextInputProps extends TextInputBase {
	onChange: (v: any) => void;
}

export interface TextInputRecipe extends TextInputBase {
	type: InputElementTypes.text;
	label: string;
}

/**
 * HIDDEN INPUTS
 */

export interface HiddenInputBase extends InputBaseInterface {
	value: string;
	placeholder?: string;
	props?: RNTextInputProps;
}

export interface HiddenInputProps extends HiddenInputBase {
	onChange: (v: any) => void;
}

export interface HiddenInputRecipe extends HiddenInputBase {
	type: InputElementTypes.hidden;
	label: string;
}

/**
 * AUTHCODE INPUTS
 */

export interface AuthCodeInputBase extends InputBaseInterface {
	value: string;
	length: number;
	props?: RNTextInputProps;
}

export interface AuthCodeInputProps extends AuthCodeInputBase {
	onChange: (v: string) => void;
}

export interface AuthCodeInputRecipe extends AuthCodeInputBase {
	type: InputElementTypes.authCode;
	label: string;
}

/**
 * Putting it all together
 */
export type InputElementProps = TextInputBase | HiddenInputBase | AuthCodeInputBase;

export type InputElementRecipe =
	| TextInputRecipe
	| HiddenInputRecipe
	| AuthCodeInputRecipe;

export type FormRecipe = { [key: string]: InputElementRecipe };
