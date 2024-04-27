import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/auth/actions';
import { me } from "../services/services";
import { RootState } from "../store";

function useUser() {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch();

  const getMe = async ()=>  {
    const user = await me();
    dispatch(setUser(user));
  }
  return { getMe,user }  
}

export default useUser;
