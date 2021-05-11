import React, { useState } from "react";
import { View, Text } from "react-native";
import { IProps } from "./interface";
import { Atoms } from "../../..";
// import { Form } from "./styles";
import { LOAD_TIMER_MS } from "./utils";
import Api from "../../../../api";
import { Inputs } from "../../../atoms";

export const FormBuilder = <T extends {}, K = {}>({
	form,
	onSubmit,
	buttonLabel,
	url,
	HTTPmethod,
}: IProps<T, K>) => {
	const [formObject, setFormObject] = useState(form);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onChange = (accessor: keyof K, newValue: any) => {
		const element = formObject[accessor];
		element.value = newValue;
		const updatedForm = { ...formObject };
		updatedForm[accessor] = element;
		setFormObject(updatedForm);
	};

	const handleSubmit = async () => {
		if (isLoading) return;
		setIsLoading(true);
		const formValues: { [key in keyof K]: any } = { ...form };
		for (const key in formValues) formValues[key] = formObject[key].value;
		try {
			const res = await Api[HTTPmethod]<T>(url, formValues);
			onSubmit(res.data);
			setFormObject({ ...form });
		} catch (error) {
			setErrorMessage(error.response?.data.message ?? "Unknown error");
		} finally {
			setTimeout(() => setIsLoading(false), LOAD_TIMER_MS);
		}
	};

	return (
		<View>
			{Object.keys(formObject).map((key: any) => (
				<Atoms.Inputs.Factory
					key={key}
					inputField={{
						// @ts-ignore
						...form[key],
					}}
					onChange={(value) => onChange(key, value)}
				/>
			))}
			<Atoms.Buttons.Base label={buttonLabel} />
		</View>
	);
};
export default FormBuilder;
