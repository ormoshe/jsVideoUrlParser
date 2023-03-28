import { VideoInfo } from '../urlParser';

export interface VoomlyUrlParameters {
    [key: string]: any;
}

export type VoomlyMediaTypes = 'video';

export interface VoomlyVideoInfo extends VideoInfo<VoomlyUrlParameters, VoomlyMediaTypes> {
    provider: 'voomly';
    channel: string;
}

export type VoomlyParseResult = VoomlyVideoInfo | undefined;
