import { useEffect, useState } from "react";

export default function useVisibilityChange() {
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setDocumentVisible(true);
      } else {
        setDocumentVisible(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return documentVisible;
}
