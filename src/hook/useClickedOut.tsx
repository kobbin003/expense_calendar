import { RefObject, useEffect } from "react";

export const useClickedOut = (ref: RefObject<HTMLElement>, cb: () => void) => {
	useEffect(() => {
		const targetEl = ref.current;
		const handleClick = (e: any) => {
			if (e.target !== targetEl) {
				cb();
			}
		};

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, []);
};
