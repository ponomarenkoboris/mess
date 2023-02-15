export type SocialNetworks = {
    skype?: string;
    telegram?: string;
    whatsapp?: string;
};

export interface IUser {
    id: number;
    name: string;
    position: string;
    imageSrc: string;
    username: string;
    email: string;
    socialNetworks: SocialNetworks;
    timezone: string;
    friends?: Array<string>;
    channels?: Array<string>;
    groups?: Array<string>;
}
