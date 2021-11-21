import {
  createContext,
  ReactChild,
  ReactChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MediaBreakpoints } from "../../../constants/enums/MediaBreakpoints";

export type ViewportContextType = {
  width: number | null;
  height: number | null;
  isMobile: boolean | null;
};

const ViewportContext = createContext<ViewportContextType>({
  width: null,
  height: null,
  isMobile: false,
});

type ViewportProviderProps = {
  children?: ReactNode | ReactNode[] | ReactChild | ReactChildren;
};

const ViewportProvider = ({ children }: ViewportProviderProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setMobile] = useState(false);

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth < MediaBreakpoints.MOBILE) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  useEffect(() => {
    handleWindowResize();
  }, [handleWindowResize]);

  return (
    <ViewportContext.Provider value={{ width, height, isMobile }}>
      {children}
    </ViewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height, isMobile } =
    useContext<ViewportContextType>(ViewportContext);
  return {
    width,
    height,
    isMobile,
  };
};

export { ViewportProvider, useViewport };
