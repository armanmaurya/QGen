import "./App.css";
// import QRCode from "react-qr-code";
import { PhysicalSize, getCurrent } from '@tauri-apps/api/window';
import { invoke } from "@tauri-apps/api/tauri"
import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";




function App() {



  // String that should be encoded
  const [content, setContent] = useState('')

  // set the value of last clipboard content 
  const clipboard = async () => {
    try {
      const response = await invoke("get_clipboard")
      console.log(response.length)
      calculate_size(response.length)
      setContent(response);

      await listen("tauri://blur", () => {
        appWindow.close();
      });


    } catch (err) {
      console.log(err);
      return null
    }

  }

  // Run the set content clipboard once
  useEffect(() => {
    clipboard();
  }, [])

  // const calculate_size = (length) => {
  //   const per_size = length / 3;
  //   const size = Math.round(per_size);
  //   console.log(size);
  //   getCurrent().setSize(new PhysicalSize(size, size))

  // }

  return (
    <div className="content">
      <QRCodeSVG includeMargin={true} className="qr" level="L" value={content} />
      <div data-tauri-drag-region className="drag"></div>

    </div>
  );
}

export default App;
