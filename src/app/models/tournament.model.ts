export interface Tournament{
    id: number;
    name: string;
    permalink: string;
    begin: string;
    end: string;
    description: string;
    score: string;
    playoffs: boolean;
    groups: boolean;
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