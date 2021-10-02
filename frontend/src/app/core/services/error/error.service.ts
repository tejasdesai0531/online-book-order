import { Injectable } from '@angular/core';
import { UIService } from '../ui/ui.service';

export enum CustomErrorCodes {
  UN_KNOWN = 0,
}

export enum RedirectionCode {
  HTTP_300_MULTIPLE_CHOICES = 300,
}

export enum ServerError {
  HTTP_500_INTERNAL_SERVER_ERROR = 500,
}

export enum SuccessCodes {
  HTTP_200_OK = 200,
}

export enum ClientError {
  HTTP_400_BAD_REQUEST = 400,
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _ui: UIService) { }

  whichError(erroCode: number, errorMessage: string) {
    // switch(errorCode) {
    //   case CustomErrorCodes.UN_KNOWN:
    //     this._ui.openErrorSnackBar(message: 'Server is down');
    //     break;
    //   case ClientError.HTTP_400_BAD_REQUEST:
    //     this._ui.openErrorSnackBar(message: 'Type correct credentials');
    //     break;
    //   default:
    //     alert('Unknown Error code')
    // }
  }

  userNotification(notificationCode: number, notification: string) {
    // switch(notificationCode) {
    //   case SuccessCodes.HTTP_200_OK:
    //     this._ui.openNotificationSnackBar(notification);
    //     break;
    //   default:
    //     alert('Unknown success Action')
    // }
  }
}
