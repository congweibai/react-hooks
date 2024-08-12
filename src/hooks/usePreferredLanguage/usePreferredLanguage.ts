// this requires react 18
// import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  window.addEventListener("languagechange", cb);
  return () => window.removeEventListener("languagechange", cb);
};

const getSnapshot = () => {
  return navigator.language;
};

const getServerSnapshot = () => {
  throw Error("usePreferredLanguage is a clinet-side only hook.");
};

// export default function usePreferredLanguage() {
//   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
// }
