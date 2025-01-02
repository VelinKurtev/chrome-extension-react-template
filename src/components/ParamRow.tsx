import React from "react";
import ParamInput from "./ParamInput";
import "./ParamRow.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface ParamRowProps {
  id: string;
  keyValue: string;
  value: string;
  selected: boolean;
  addedByYou: boolean;
  onChange: (id: string, field: "key" | "value", value: string) => void;
  onKeyPress: (id: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCheckboxChange: (id: string) => void;
  onDelete: (id: string) => void;
}

const ParamRow: React.FC<ParamRowProps> = ({
  id,
  keyValue,
  value,
  selected,
  addedByYou,
  onChange,
  onKeyPress,
  onCheckboxChange,
  onDelete,
}) => {
  return (
		<div
			key={id}
			className={`param-row ${selected ? "selected" : ""} ${addedByYou ? "added" : ""}`}
			aria-label={`Parameter ${keyValue || "Key"} with value ${ value || "Value"}`}
		>
			<input
				type="checkbox"
				checked={selected}
				disabled={keyValue === '' || value === ''}
				onChange={() => onCheckboxChange(id)}
				className={`select-checkbox ${addedByYou ? "added" : ""} ${keyValue === '' || value === '' ? 'disabled' : ''}`}
			/>
			<ParamInput
				type="text"
				placeholder="Key"
				value={keyValue}
				addedByYou={addedByYou}
				onChange={(e) => onChange(id, "key", e.target.value)}
				onKeyPress={(e) => onKeyPress(id, e)}
			/>
			<ParamInput
				type="text"
				placeholder="Value"
				value={value}
				addedByYou={addedByYou}
				onChange={(e) => onChange(id, "value", e.target.value)}
				onKeyPress={(e) => onKeyPress(id, e)}
			/>
			<button onClick={() => onDelete(id)} className="delete-button">
				<FontAwesomeIcon icon={faTrash} />
			</button>
		</div>
	);
};

export default ParamRow;
