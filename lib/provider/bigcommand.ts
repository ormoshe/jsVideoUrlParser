import { VideoInfo } from '../urlParser';

export interface BigcommandeUrlParameters {
    [key: string]: any;
}

export type BigcommandeMediaTypes = 'video';

export interface BigcommandeVideoInfo extends VideoInfo<BigcommandeUrlParameters, BigcommandeMediaTypes> {
    provider: 'bigcommande';
    channel: string;
}

export type VoomlyParseResult = BigcommandeVideoInfo | undefined;
