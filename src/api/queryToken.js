import { useQuery as useReactQuery } from "react-query";
import axios from "./axiosToken";
// import { useAxios } from './axios';

export const useQuery = (queryKey, queryFn, options) => {
    //   const axios = useAxios();
    return useReactQuery(
        queryKey,
        (queryContext) => queryFn(queryContext, axios),
        options
    );
};
