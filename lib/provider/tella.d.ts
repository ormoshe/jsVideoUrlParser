import { VideoInfo } from '../urlParser';

export interface TellaUrlParameters {
    [key: string]: any;
}

export type TellaMediaTypes = 'video';

export interface TellaVideoInfo extends VideoInfo<TellaUrlParameters, TellaMediaTypes> {
    provider: 'tella';
}

export type TellaParseResult = TellaVideoInfo | undefined;
