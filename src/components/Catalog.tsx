import "./Catalog.css";
import { paramsData } from "./catalogParams";

function Catalog() {
//! Add checkboxes, numeric input, fix UI, 
	return (
        <div className="catalog">
            <h1>Parameter Catalog</h1>
            <table className="catalog-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {paramsData.map((param, index) => (
                        <tr key={index}>
                            <td>{param.paramName}</td>
                            <td>{param.description}</td>
                            <td>
                                <select className="input-dropdown">
                                    {param.options.map((option, idx) => (
                                        <option key={idx} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Catalog;
