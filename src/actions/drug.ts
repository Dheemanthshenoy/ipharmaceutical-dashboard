'use server'

import api from "@/interceptors/api"
import { IDrug } from "@/types/drug"
import { SearchResults } from "@/types/search"

interface Props {
    page: number
    limit: number
    company: string
    keyword: string
}

export const searchDrugs = async ({
    page,
    limit,
    company,
    keyword
}: Props): Promise<SearchResults<IDrug> | null> => {
    const response = await api.post(`/search-drugs?page=${page}&limit=${limit}`, { company, keyword })

    if (response.status == 200) {
        return response.data
    }

    return null
}

export const drugCompanies = async (): Promise<{ result: string[] } | null> => {
    const response = await api.get("/drug-companies")

    if (response.status == 200) {
        return response.data
    }

    return null
}