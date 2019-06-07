import { Pagination } from './common.model';

export interface Post {
    id: number;
    type: string;
    archive: string;
    title: string;
    previous?: Post;
    next?: Post;
    match_id: number;
    author: string;
}

export interface Photo {
    src: string;
    caption: string;
    thumb: string;
}

export interface PostsList extends Pagination {
    results: Post[];
}
