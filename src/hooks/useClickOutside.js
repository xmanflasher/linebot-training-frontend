import { useEffect } from 'react';

export default function useClickOutside(ref, handler, listenEvent = 'mousedown') {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) return;
            handler(event);
        };

        document.addEventListener(listenEvent, listener);
        return () => document.removeEventListener(listenEvent, listener);
    }, [ref, handler, listenEvent]);
}