import { VideoInfo } from '../urlParser';

export interface GoogleDriveUrlParameters {
    [key: string]: any;
}

export type GoogleDriveMediaTypes = 'video';

export interface GoogleDriveVideoInfo extends VideoInfo<GoogleDriveUrlParameters, GoogleDriveMediaTypes> {
    provider: 'google';
    channel: string;
}

export type VoomlyParseResult = GoogleDriveVideoInfo | undefined;
