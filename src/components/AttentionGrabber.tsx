import { useEffect, useRef } from "react";

interface AttentionGrabberProps {
  awayTitle?: string;
}

const AttentionGrabber = ({ awayTitle = "Hey, over here! 👋" }: AttentionGrabberProps) => {
  const originalTitle = useRef<string>("");

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (document.title !== awayTitle) {
          originalTitle.current = document.title;
        }
        document.title = awayTitle;
      } else {
        if (originalTitle.current) {
          document.title = originalTitle.current;
        }
      }
    };

    const handleBlur = () => {
      if (document.title !== awayTitle) {
        originalTitle.current = document.title;
        document.title = awayTitle;
      }
    };

    const handleFocus = () => {
      if (originalTitle.current) {
        document.title = originalTitle.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [awayTitle]);

  return null;
};

export default AttentionGrabber;
