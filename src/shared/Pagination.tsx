'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'

type Props = {
    setLimit: (limit: number) => void,
    setPage: (page: number) => void,
    result: {
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

const Pagination = (
    {
        setLimit,
        setPage,
        result: {
            totalResults,
            page,
            limit,
            totalPages,
            hasNextPage,
            hasPreviousPage,
            nextPage,
            previousPage,
        }
    }: Props) => {
    const renderPageNumbers = () => {
        const pages: (number | string)[] = []
        const visiblePages = 4

        for (let i = 1; i <= Math.min(visiblePages, totalPages); i++) {
            pages.push(i)
        }

        if (totalPages > visiblePages + 1) {
            if (page > visiblePages && page < totalPages - 1) {
                pages.push('...')
                pages.push(totalPages)
            } else if (page >= totalPages - 1) {
                pages.push('...')
                pages.push(totalPages - 1)
                pages.push(totalPages)
            } else {
                pages.push('...')
                pages.push(totalPages)
            }
        }

        if (!pages.includes(page) && page > visiblePages && page < totalPages - 1) {
            pages.splice(visiblePages, 0, page)
        }

        return pages.map((p, index) =>
            typeof p === 'string' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                    ...
                </span>
            ) : (
                <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    onClick={() => setPage(p)}
                    className={`mx-1 h-8 w-8 text-sm cursor-pointer ${p === page && 'bg-black text-white' }`}
                >
                    {p}
                </Button>
            )
        )
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between" >
            <div className='flex items-center gap-2'>
                <Label className='text-sm'>Results Per Page</Label>
                <Select value={limit.toString()} onValueChange={(val) => (setLimit(Number(val)), setPage(1))}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        {
                            [1, 10, 20, 30, 50, 100].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                    {value}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className='text-sm'>
                {page * limit - limit + 1}-{Math.min(page * limit, totalResults)} of {totalResults} results
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline" className='cursor-pointer h-8 w-8 mx-0' disabled={!hasPreviousPage} onClick={() => setPage(previousPage)}>
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                {renderPageNumbers()}
                <Button variant="outline" className='cursor-pointer h-8 w-8 mx-0' disabled={!hasNextPage} onClick={() => setPage(nextPage)}>
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>
        </div >
    )
}

export default Pagination