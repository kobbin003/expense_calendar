import { RefObject, useEffect } from "react";

export const useClickedOut = (ref: RefObject<HTMLElement>, cb: () => void) => {
	useEffect(() => {
		const targetEl = ref.current;
		const handleClick = (e: any) => {
			// when click outside of targetEl
			if (!targetEl?.contains(e.target)) {
				cb();
			}
		};

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, []);
};
