import { get } from "lodash-es";
import queryString, { StringifyOptions } from "query-string";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocationParams } from "./use-location-params";

const stringifyOptions: StringifyOptions = {
  skipEmptyString: true,
  arrayFormat: "bracket",
  arrayFormatSeparator: "|",
};

export const useRouterPush = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { query: params } = useLocationParams();

  const stringifyQuery = useCallback((query: Record<string, any>) => {
    return queryString.stringify(query, stringifyOptions);
  }, []);

  const stringifyUrl = useCallback(
    (url: string, query: Record<string, any>) => {
      return queryString.stringifyUrl(
        {
          url,
          query,
        },
        stringifyOptions
      );
    },
    []
  );

  const push = useCallback(
    (
      { url, query = {} }: { url?: string; query?: Record<string, any> },
      options?: { update?: boolean; replace?: boolean }
    ) => {
      const update = get(options, "update", false);
      const replace = get(options, "replace", false);

      const str = queryString.stringifyUrl(
        {
          url: url || pathname,
          query: update ? { ...params, ...query } : query,
        },
        stringifyOptions
      );

      if (window.location.href !== str) navigate(str, { replace });
    },
    [params, pathname]
  );

  return {
    push,
    stringifyUrl,
    stringifyQuery,
  };
};
