import { showMessage } from 'react-native-flash-message';

export default function DisplayMessage(message, type, description = 'Information', position = 'top') {
    showMessage({
        message: message,
        description: description,
        type: type,
        icon: 'auto',
        position: position,
        // statusBarHeight: 30,
        autoHide: true,
    })
}