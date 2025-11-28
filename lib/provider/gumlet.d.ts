import { VideoInfo } from '../urlParser';

export interface GumletUrlParameters {
    [key: string]: any;
}

export type GumletMediaTypes = 'video';

export interface GumletVideoInfo extends VideoInfo<GumletUrlParameters, GumletMediaTypes> {
    provider: 'gumlet';
}

export type GumletParseResult = GumletVideoInfo | undefined;

