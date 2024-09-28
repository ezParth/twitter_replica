import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetprofile = (id) => {
  const dispatch = useDispatch();
  const { otherUsers } = useSelector(store => store.user);

  useEffect(() => {
    // Check if the user is already in otherUsers
    const userInStore = otherUsers?.find(user => user._id === id);

    if (userInStore) {
      // If user exists in the store, update the profile directly
      console.log("User found in store:", userInStore);
      dispatch(getMyProfile(userInStore));
    } else {
      // Fetch from API if not found in the store
      console.log("Fetching user profile from API");
      const source = axios.CancelToken.source();

      const fetchMyProfile = async () => {
        try {
          const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
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

      fetchMyProfile();
      return () => {
        source.cancel("Operation canceled due to new request");
      };
    }
  }, [id, otherUsers, dispatch]);
};

export default useGetprofile;
