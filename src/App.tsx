import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import ParamRow from "./components/ParamRow";
import { Param } from "./types";
import ReactLoading from "react-loading";

async function getCurrentTab(): Promise<chrome.tabs.Tab> {
	return (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
}

// * * Add Light/Dark Themes
// * * Add Params list with url things from Confluence Page
// * * Add inserted by you separated
function App() {
	const [params, setParams] = useState<Param[]>([]);
	const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();
	const [fetchedPresent, setFetchedPresent] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
					};
				});

			if (presentParams) {
				setParams((prevParams) => [
					...prevParams,
					...presentParams.filter((pp) => !prevParams.some((p) => p.key === pp.key)),
				]);
				setFetchedPresent(true);
			}
		}
	}, [currentTab, fetchedPresent]);

	useEffect(() => {
		localStorage.setItem("params", JSON.stringify(params));
	}, [params]);

	const handleInputChange = (id: string, field: "key" | "value", value: string) => {
		setParams((prevParams) =>
			prevParams.map((param) =>
				param.id === id ? { ...param, [field]: value } : param
			)
		);
	};

	const handleAddParam = () => {
		setParams((prevParams) => [
			...prevParams,
			{ id: uuidv4(), key: "", value: "", selected: false },
		]);
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

	const handleKeyPress = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setIsLoading(true);
			const updatedParams = params.map((param) => param.id === id && param.key && param.value ? { ...param, selected: true } : param);
			setParams(updatedParams);
			handleUrlParametersChange(updatedParams);
			setTimeout(() => {
				setIsLoading(false);
			}, 750);
		}
	};

	const handleCheckboxChange = (id: string) => {
		setIsLoading(true);
    	const updatedParams = params.map((param) => param.id === id ? { ...param, selected: !param.selected } : param);
		setParams(updatedParams);
		handleUrlParametersChange(updatedParams);
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
		<div>
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
			<button onClick={handleAddParam} className="add-button">
				Add Parameter
			</button>
		</div>
	);
}

export default App;
