import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetprofile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const source = axios.CancelToken.source();// creating a cancel token so that the time mismatch between the id change can be avoided
    const fetchMyProfile = async () => {// it has access to the id defined in the outer function due to the concept of closures
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
          cancelToken: source.token
        });
        dispatch(getMyProfile(res.data.user))
        console.log("**useGetProfile**", res.data.user);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("Error fetching profile", error);
        }
      }
    }
    fetchMyProfile();
    return () => {
      source.cancel("Operation canceled due to new Request!")
    }
  }, [id, dispatch]);
};

export default useGetprofile;
