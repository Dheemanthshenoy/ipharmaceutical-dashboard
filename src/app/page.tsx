'use client'
import { drugCompanies, searchDrugs } from '@/actions/drug'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IDrug } from '@/types/drug'
import Pagination from '@/shared/Pagination'
import { Input } from '@/components/ui/input'
import Loading from '@/shared/Loading'
import { useDebounce } from 'use-debounce';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const Drugs = () => {
  const [keyword, setKeyword] = useState<string>("")
  const [debouncedKeyword] = useDebounce(keyword, 500);
  const [company, setCompany] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [companies, setCompanies] = useState<string[]>([])

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['drugs', debouncedKeyword, company, page, limit],
    queryFn: () => searchDrugs({
      page,
      limit,
      company,
      keyword: debouncedKeyword
    }),
  })

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await drugCompanies()
      if (data) {
        setCompanies(data.result)
      }
    }

    fetchCompanies()
  }, [])

  const dateFormatter = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString('de-DE');
    return formattedDate;
  };

  const clearFilters = () => {
    setCompany('')
    setKeyword('')
  }

  return (
    <div>

      <div>
        {isLoading && <Loading />}
      </div>

      <div>
        {
          error && <div>Error Loading</div>
        }
      </div>

      {
        !isLoading && response &&
        <div className='flex flex-col gap-y-6'>
          <div className='text-4xl font-bold'>
            Drugs <span className='text-lg'>({response.result.totalResults})</span>
          </div>
          <div className='flex flex-col gap-y-2'>
            <div className='flex items-end justify-between gap-x-2'>
              <Input className='flex-1' placeholder='Search drugs' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <Select value={company} onValueChange={(_value: string) => setCompany(_value)}>
                <SelectTrigger className='w-72'>
                  <SelectValue placeholder='Select a Company' />
                </SelectTrigger>
                <SelectContent className='bg-white w-72'>
                  {
                    companies.map((company: string) => (
                      <SelectItem key={company} value={company.toString()}>
                        {company}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <div className='text-sm flex items-center justify-between'>
              <div>
                <div className='flex items-center justify-between gap-x-2'>
                  {
                    company && <div className='py-1 px-3 rounded-lg bg-gray-100 flex items-center justify-between gap-x-1'>
                      {company}
                      <X className='size-4 cursor-pointer' onClick={() => setCompany('')} />
                    </div>
                  }
                  {
                    keyword && <div className='py-1 px-3 rounded-lg bg-gray-100 flex items-center justify-between gap-x-1'>
                      {keyword}
                      <X className='size-4 cursor-pointer' onClick={() => setKeyword('')} />
                    </div>
                  }
                </div>
              </div>
              <Button variant={'destructive'} onClick={clearFilters}>Clear Filters</Button>
            </div>
          </div>
          <div>
            <Table className='table-fixed w-full'>
              <TableHeader className='border border-gray-200 bg-gray-200'>
                <TableRow className='border border-gray-200 uppercase'>
                  <TableHead className="w-1/5 text-center">ID</TableHead>
                  <TableHead className="w-1/5 text-center">Code</TableHead>
                  <TableHead className="w-1/5">Name</TableHead>
                  <TableHead className="w-1/5">Company</TableHead>
                  <TableHead className="w-1/5 text-center">Launch Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='border border-gray-200'>
                {
                  response.result.results.map((drug: IDrug, index: number) => (
                    <TableRow className='border border-gray-200 hover:bg-gray-100 cursor-pointer' key={drug._id}>
                      <TableCell className="w-1/5 text-center">{index + 1}</TableCell>
                      <TableCell className="w-1/5 text-center">{drug.code}</TableCell>
                      <TableCell className="w-1/5">
                        <div title={drug.genericName + ' by ' + drug.brandName} className='overflow-hidden line-clamp-1 text-ellipsis'>
                          {drug.genericName} ({drug.brandName})
                        </div>
                      </TableCell>
                      <TableCell className="w-1/5">
                        <div title={drug.company} className='overflow-hidden line-clamp-1 text-ellipsis'>
                          {drug.company}
                        </div>
                      </TableCell>
                      <TableCell className="w-1/5 text-center">{dateFormatter(drug.launchDate)}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
          <Pagination
            setLimit={setLimit}
            setPage={setPage}
            result={response.result} />
        </div>
      }
    </div>
  )
}

export default Drugs