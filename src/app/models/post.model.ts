import { Pagination } from './common.model';

export interface Post {
    id: number;
    permalink: string;
    type: string;
    archive: string;
    image: string;
    title: string;
    previous?: Post;
    next?: Post;
    match_id: number;
    status: string;
    content: string;
    comment_status: string;
    comment_count: number;
    page_title: string;
    page_description: string;
    page_keywords: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    created_by: number;
    updated_by: number;
    deleted_by: number;
}

export interface PostBack {
    permalink: string;
    type: string;
    file: string | ArrayBuffer;
    filename: string;
    title: string;
    match_id: number;
    status: string;
    content: string;
    comment_status: string;
    page_title: string;
    page_description: string;
    page_keywords: string;
}

export interface Photo {
    src: string;
    caption: string;
    thumb: string;
}

export interface PostsList extends Pagination {
    results: Post[];
}
