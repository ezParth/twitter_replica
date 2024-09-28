import axios from "axios";
import { TWEET_API_END_POINT} from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { otherUsers } = useSelector(store => store.user);

  useEffect(() => {
    const userInStore = otherUsers?.find(user => user._id === id);

    if (userInStore) {
      console.log("User found in store:", userInStore);
      dispatch(getMyProfile(userInStore));
    } else {
      console.log("Fetching user profile from API");
      const source = axios.CancelToken.source();

      const fetchMyTweets = async () => {
        try {
          const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
            withCredentials: true,
            cancelToken: source.token,
          });
          dispatch(getMyProfile(res.data.user));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log("Error fetching profile", error);
          }
        }
      };

      fetchMyTweets();
      return () => {
        source.cancel("Operation canceled due to new request");
      };
    }
  }, [id, otherUsers, dispatch]);
};

export default useGetMyTweets;
