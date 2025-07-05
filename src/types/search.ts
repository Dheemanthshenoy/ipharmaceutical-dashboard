export interface SearchResults<T> {
    result: {
        results: T[]
        totalResults: number
        page: number
        limit: number
        totalPages: number
        hasNextPage: boolean
        hasPreviousPage: boolean
        nextPage: number
        previousPage: number
        isLastPage: boolean
    }
}