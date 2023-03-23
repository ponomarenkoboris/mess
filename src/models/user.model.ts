export type SocialNetworks = {
    skype?: string;
    telegram?: string;
    whatsapp?: string;
};

export interface UserData {
    id: number;
    name: string;
    position: string;
    imageSrc: string;
    username: string;
    email: string;
    socialNetworks: SocialNetworks;
    timezone: string;
}

export type IUser = UserData & {
    friends?: Array<string>;
    channels?: Array<string>;
    groups?: Array<string>;
};
