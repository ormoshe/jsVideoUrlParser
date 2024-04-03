import { VideoInfo } from '../urlParser';

export interface SearchieUrlParameters {
    [key: string]: any;
}

export type SearchieMediaTypes = 'video';

export interface SearchieVideoInfo extends VideoInfo<SearchieUrlParameters, SearchieMediaTypes> {
    provider: 'searchie';
    channel: string;
}

export type VoomlyParseResult = SearchieVideoInfo | undefined;
