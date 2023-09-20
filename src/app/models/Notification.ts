export enum NotificationType {
    Error = 'error',
    Success =' success'
}
export interface NotificationData {
    type: NotificationType;
    message: string;
    timeout?: number;
}