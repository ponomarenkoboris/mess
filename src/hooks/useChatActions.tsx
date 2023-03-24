import { useTypedDispatch } from './storeHooks/storeHooks';
import { allChatActions } from '@store/chat/chatReducer';
import { bindActionCreators } from '@reduxjs/toolkit';

const useChatActions = () => {
    const dispatch = useTypedDispatch();
    return bindActionCreators(allChatActions, dispatch);
};

export default useChatActions;
