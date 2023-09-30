// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";
import { PreloadAPI } from "./preload-api";

const api: PreloadAPI = {
  fetch: async (url: string) => {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  },
};

contextBridge.exposeInMainWorld("api", api);
