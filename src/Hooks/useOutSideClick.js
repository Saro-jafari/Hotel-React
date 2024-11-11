import { useEffect } from 'react';

const useOutSideClick = (ref, exceptionId, cb) => {
	useEffect(() => {
		const HandleOutSideClick = event => {
			if (ref.current && !ref.current.contains(event.target) && event.target.id !== exceptionId) {
				console.log('inside click');
				cb();
			}
		};
		document.addEventListener('mousedown', HandleOutSideClick);
		return () => {
			document.removeEventListener('mousedown', HandleOutSideClick);
		};
	}, [ref, cb]);
};

export default useOutSideClick;

