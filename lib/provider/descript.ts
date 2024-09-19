import { VideoInfo } from '../urlParser';

export interface DescriptUrlParameters {
    [key: string]: any;
}

export type DescriptMediaTypes = 'video';

export interface DescriptVideoInfo extends VideoInfo<DescriptUrlParameters, DescriptMediaTypes> {
    provider: 'descript';
    channel: string;
}

export type DescriptParseResult = DescriptVideoInfo | undefined;
