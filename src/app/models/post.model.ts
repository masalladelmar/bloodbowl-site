export interface Post {
    id: number;
    type: string;
    archive: string;
    title: string;
    previous?: Post;
    next?: Post;
}

export interface Photo {
    src: string;
    caption: string;
    thumb: string;
}
