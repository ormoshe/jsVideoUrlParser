import { VideoInfo } from '../urlParser';

export interface TevelloUrlParameters {
    [key: string]: any;
}

export type TevelloMediaTypes = 'video';

export interface TevelloVideoInfo extends VideoInfo<TevelloUrlParameters, TevelloMediaTypes> {
    provider: 'tevello';
    channel: string;
}

export type TevelloParseResult = TevelloVideoInfo | undefined;
