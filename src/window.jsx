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

// export function Tittlebar() {
//     return (
//         <div className="fixed select-none flex h-7" style={{ width: "100%", height: "2rem" }}>
//             <div data-tauri-drag-region className="tabs flex-1 cursor-move" style={{ flex: 1 }}></div>
//             <div className="buttons flex w-24" style={{ marginTop: "0.3rem" }}>
//                 <WindowButton
//                     icon="https://api.iconify.design/mdi:window-minimize.svg"
//                     type="minimize"
//                     onClick={() => appWindow.minimize()}
//                 />
//                 <WindowButton
//                     icon="https://api.iconify.design/mdi:window-maximize.svg"
//                     type="maximize"
//                     onClick={() => {
//                         appWindow.toggleMaximize();
//                     }}
//                 />
//                 <WindowButton
//                     icon="https://api.iconify.design/mdi:close.svg"
//                     type="close"
//                     onClick={() => appWindow.close()}
//                 />
//             </div>
//         </div>
//     );
// }


