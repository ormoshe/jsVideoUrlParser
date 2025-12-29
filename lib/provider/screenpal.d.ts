import { VideoInfo } from '../urlParser';

export interface ScreenPalUrlParameters {
    [key: string]: any;
}

export type ScreenPalMediaTypes = 'video';

export interface ScreenPalVideoInfo extends VideoInfo<ScreenPalUrlParameters, ScreenPalMediaTypes> {
    provider: 'screenpal';
}

export type ScreenPalParseResult = ScreenPalVideoInfo | undefined;

