import "./Catalog.css";
import { Param } from "../types";
import { paramsData } from "./catalogParams";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CatalogProps {
	initialParams: Param[];
	onClose: (updatedParams: Param[]) => void;
}

const Catalog: React.FC<CatalogProps> = ({ initialParams, onClose }) => {
	const [params, setParams] = useState<Param[]>(initialParams);
	const [inputValues, setInputValues] = useState<Record<string, string>>({});

	const handleCheckboxChange = (paramName: string, isChecked: boolean) => {
		if (isChecked) {
			const paramToAdd = paramsData.find(
				(param) => param.paramName === paramName
			);
			if (paramToAdd) {
				let defaultValue = "";
				if (paramToAdd.options.includes("boolean")) {
					defaultValue = "true";
				} else if (paramToAdd.options.includes("numeric")) {
					defaultValue = "0";
				} else if (paramToAdd.options.length > 0) {
					defaultValue = paramToAdd.options[0];
				}

				const valueToUse = inputValues[paramName] || defaultValue;

				const updatedParams = [
					...params,
					{
						id: uuidv4(),
						key: paramToAdd.paramName,
						value: valueToUse,
						selected: true,
						addedByYou: true,
					},
				];
				setParams(updatedParams);

				setInputValues((prevValues) => ({
					...prevValues,
					[paramName]: valueToUse,
				}));

				onClose(updatedParams);
			}
		} else {
			const updatedParams = params.filter((param) => param.key !== paramName);
			setParams(updatedParams);
			onClose(updatedParams);
		}
	};

	const sortedParamsData = [...paramsData].sort((a, b) => {
		const isASelected = params.some((param) => param.key === a.paramName);
		const isBSelected = params.some((param) => param.key === b.paramName);
		if (isASelected && !isBSelected) return -1;
		if (!isASelected && isBSelected) return 1;
		return 0;
	});

	return (
		<div className="catalog">
			<h1>Parameter Catalog</h1>
			<table className="catalog-table">
				<thead>
					<tr>
						<th>Present</th>
						<th>Name</th>
						<th>Description</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{sortedParamsData.map((param, index) => (
						<tr key={index}>
							<td className="checkbox-cell">
								<input
									type="checkbox"
									checked={params.some((p) => p.key === param.paramName)}
									onChange={(e) =>
										handleCheckboxChange(param.paramName, e.target.checked)
									}
								/>
							</td>
							<td>{param.paramName}</td>
							<td className="description-cell">{param.description}</td>
							<td>
								{param.options.length === 1 &&
								param.options.includes("boolean") ? (
									<select
										className="input-dropdown"
										value={inputValues[param.paramName] || "true"}
										onChange={(e) =>
											setInputValues({
												...inputValues,
												[param.paramName]: e.target.value || "true",
											})
										}
									>
										<option value="true">true</option>
										<option value="false">false</option>
									</select>
								) : param.options.length === 1 &&
								  param.options.includes("numeric") ? (
									<input
										type="number"
										className="input-numeric-dropdown"
										value={inputValues[param.paramName] || "0"}
										onChange={(e) =>
											setInputValues({
												...inputValues,
												[param.paramName]: Number(e.target.value).toString(),
											})
										}
									/>
								) : (
									<select
										className="input-dropdown"
										value={inputValues[param.paramName] || param.options[0]}
										onChange={(e) =>
											setInputValues({
												...inputValues,
												[param.paramName]: e.target.value,
											})
										}
									>
										{param.options.map((option, idx) => (
											<option key={idx} value={option}>
												{option}
											</option>
										))}
									</select>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Catalog;
