import { bindActionCreators } from '@reduxjs/toolkit';
import { useTypedDispatch } from './storeHooks/storeHooks';
import { allUserActions } from '@store/user/userReducer';

const useUserActions = () => {
    const dispatch = useTypedDispatch();
    return bindActionCreators(allUserActions, dispatch);
};

export default useUserActions;
