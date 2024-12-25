import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import ParamRow from "./components/ParamRow";
import { Param } from "./types";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumpster, faSquarePlus, faTags } from "@fortawesome/free-solid-svg-icons";
import Catalog from "./components/Catalog";

async function getCurrentTab(): Promise<chrome.tabs.Tab> {
	return (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
}

// * * Change color on added by you
// * * Add script to rebuild for safari
// * * Add reminder for saving on key/ value change for enter
// * * Add rest of URL params, add checkbox, check present, fix UI table
function App() {
	const [params, setParams] = useState<Param[]>([]);
	const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();
	const [fetchedPresent, setFetchedPresent] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showCatalog, setShowCatalog] = useState(false);

	const saveCurrentTab = () => {
		getCurrentTab().then((tab) => {
			if (tab) {
				setCurrentTab(tab);
			} else {
				window.alert("Failed retrieving current tab!");
			}
		});
	};

	useEffect(() => {
		const savedParams = localStorage.getItem("params");
		if (savedParams) {
			setParams(JSON.parse(savedParams));
		}
	}, []);

	useEffect(() => {
		saveCurrentTab();

		if (currentTab && !fetchedPresent) {
			const presentParams: Param[] | undefined = currentTab.url
				?.match(/&([^&=]+)=([^&]*)/g)
				?.map((param) => {
					const [key, value] = param.substring(1).split("=");
					return {
						id: uuidv4(),
						key: key || "",
						value: value || "",
						selected: true,
						addedByYou: false,
					};
				});

			if (presentParams) {
				setIsLoading(true);

				const uniqueParamsMap = new Map<string, Param>();

				params
					.filter((pp) => pp.addedByYou)
					.forEach((pp) => {
						uniqueParamsMap.set(pp.key, pp);
					});

				presentParams.forEach((pp) => {
					if (!uniqueParamsMap.has(pp.key)) {
						uniqueParamsMap.set(pp.key, pp);
					}
				});

				const updatedParams = Array.from(uniqueParamsMap.values());
				setParams(updatedParams);
				setFetchedPresent(true);
				handleUrlParametersChange(updatedParams);

				setTimeout(() => {
					setIsLoading(false);
				}, 750);
			}
		}
	}, [currentTab, fetchedPresent]);

	useEffect(() => {
		localStorage.setItem("params", JSON.stringify(params));
	}, [params]);

	const handleInputChange = (
		id: string,
		field: "key" | "value",
		value: string
	) => {
		setParams((prevParams) =>
			prevParams.map((param) =>
				param.id === id ? { ...param, [field]: value } : param
			)
		);
	};

	const handleAddParam = () => {
		setIsLoading(true);
		setParams((prevParams) => {
			const uniqueParamsMap = new Map<string, Param>();
			prevParams.forEach((pp) => uniqueParamsMap.set(pp.key, pp));

			const newParam: Param = {
				id: uuidv4(),
				key: "",
				value: "",
				selected: false,
				addedByYou: true,
			};

			uniqueParamsMap.set(newParam.key, newParam);

			return Array.from(uniqueParamsMap.values());
		});
		setTimeout(() => {
			setIsLoading(false);
		}, 750);
	};

	const handleDeleteParam = (id: string) => {
		const param = params.find((param) => param.id === id);
		if (
			param &&
			window.confirm(
				`Are you sure you want to delete parameter with key: ${
					param.key || "blank"
				} and value: ${param.value || "blank"}?`
			)
		) {
			setIsLoading(true);
			const updatedParams = params.filter((param) => param.id !== id);
			setParams(updatedParams);
			handleUrlParametersChange(updatedParams);
			setTimeout(() => {
				setIsLoading(false);
			}, 750);
		}
	};

	const handleDeleteAllParams = () => {
		if (window.confirm(`Are you sure you want to delete all parameters ?`)) {
			setIsLoading(true);
			setParams([]);
			handleUrlParametersChange([]);
			setTimeout(() => {
				setIsLoading(false);
			}, 750);
		}
	};

	const handleKeyPress = (
		id: string,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Enter") {
			setIsLoading(true);
			const updatedParams = params.map((param) =>
				param.id === id && param.key && param.value
					? { ...param, selected: true, addedByYou: true }
					: param
			);
			setParams(updatedParams);
			handleUrlParametersChange(updatedParams);
			setTimeout(() => {
				setIsLoading(false);
			}, 750);
		}
	};

	const handleCheckboxChange = (id: string) => {
		setIsLoading(true);
		const updatedParams = params.map((param) =>
			param.id === id ? { ...param, selected: !param.selected } : param
		);
		setParams(updatedParams);
		handleUrlParametersChange(updatedParams);
		setTimeout(() => {
			setIsLoading(false);
		}, 750);
	};

	const handleOpenCatalog = () => {
		setIsLoading(true);
		setShowCatalog(!showCatalog);
		setTimeout(() => {
			setIsLoading(false);
		}, 750);
	};

	const handleUrlParametersChange = (parameters: Param[]) => {
		getCurrentTab().then((tab) => {
			if (tab) {
				const cleanedUrl = tab.url!.split("&")[0];
				const newUrl = parameters
					.filter((p) => p.selected)
					.reduce((url, p) => `${url}&${p.key}=${p.value}`, cleanedUrl);

				chrome.tabs.update(tab.id!, { url: newUrl });
			} else {
				window.alert("Failed to update the URL.");
			}
		});
	};

	return (
		<div className="app-container">
            <div className="url-params-manager">
                <h1>URL Parameters Manager</h1>
                {isLoading && (
                    <div className="loading-overlay">
                        <ReactLoading type="spin" color="#fff" height={50} width={50} />
                    </div>
                )}
                <div className={`params-container ${isLoading ? "loading" : ""}`}>
                    {params.map((param) => (
                        <ParamRow
                            key={param.id}
                            id={param.id}
                            keyValue={param.key}
                            value={param.value}
                            selected={param.selected}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            onCheckboxChange={handleCheckboxChange}
                            onDelete={handleDeleteParam}
                        />
                    ))}
                </div>
                <div className={`actions-container ${params.length < 1 ? "single" : ""}`}>
                    <button onClick={handleAddParam} className="add-button">
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </button>
                    {params.length > 0 && (
                        <>
                            <button onClick={handleDeleteAllParams} className="delete-button">
                                <FontAwesomeIcon icon={faDumpster} />
                            </button>
                            <button className="tags-button" onClick={handleOpenCatalog}>
                                <FontAwesomeIcon icon={faTags} />
                            </button>
                        </>
                    )}
                </div>
            </div>
            {showCatalog && <Catalog />}
        </div>
	);
}

export default App;
