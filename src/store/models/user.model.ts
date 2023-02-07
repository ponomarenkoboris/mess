export interface IUser {
    id: number;
    name: string;
    position: string;
    imageSrc: string;
    username: string;
    email: string;
    skype: string;
    timezone: string;
    friends?: Array<string>;
    channels?: Array<string>;
    groups?: Array<string>;
}
