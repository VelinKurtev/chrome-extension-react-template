import "./Catalog.css";
import { paramsData } from "./catalogParams";
//!! Add add functionality + rearrange present ones above all.
function Catalog() {
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
					{paramsData.map((param, index) => (
						<tr key={index}>
							<td className="checkbox-cell">
								<input type="checkbox" />
							</td>
							<td>{param.paramName}</td>
							<td className="description-cell">{param.description}</td>
							<td>
								{param.options.length === 1 &&
								param.options.includes("boolean") ? (
									<select className="input-dropdown">
										<option value="true">true</option>
										<option value="false">false</option>
									</select>
								) : param.options.length === 1 &&
								  param.options.includes("numeric") ? (
									<input type="number" value={0} className="input-numeric-dropdown" />
								) : (
									<select className="input-dropdown">
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
}

export default Catalog;
