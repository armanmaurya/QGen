import { useEffect, useState, useCallback } from "react";
import { appWindow } from "@tauri-apps/api/window";
// import WindowButton from "./window/button";


export function Window(props) {
    const { extraProp, ...divProps } = props;
    const [isWindowMaximized, setIsWindowMaximized] = useState(null);

    const updateIsWindowMaximized = useCallback(async () => {
        const resolvedPromise = await appWindow.isMaximized();
        setIsWindowMaximized(resolvedPromise);
    }, []);

    useEffect(() => {
        updateIsWindowMaximized();

        let unlisten = undefined;

        const listen = async () => {
            unlisten = await appWindow.onResized(() => {
                updateIsWindowMaximized();
            });
        };

        listen();

        return () => unlisten && unlisten();
    }, [updateIsWindowMaximized]);
    return (
        <div
            className={`${isWindowMaximized ? "" : "rounded-lg"} window`}
            {...divProps}
        />
    );
}


