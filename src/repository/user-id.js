import cookie from 'cookie'
import uuid from 'uuid-v4';

export default function() {
    const cookieValue = cookie.parse(global.document.cookie);
    if(cookieValue.dsr_user_id) {
        console.log('welcome back', cookieValue.dsr_user_id);
        return cookieValue.dsr_user_id;
    }
    const userId = uuid();
    global.document.cookie = cookie.serialize('dsr_user_id', userId);
    return userId;
}