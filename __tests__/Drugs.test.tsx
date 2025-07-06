import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as drugActions from '@/actions/drug'
import Drugs from '@/app/page'
import userEvent from '@testing-library/user-event'

jest.mock('@/actions/drug')

const mockSearchDrugs = drugActions.searchDrugs as jest.Mock
const mockDrugCompanies = drugActions.drugCompanies as jest.Mock

const renderWithClient = (ui: React.ReactElement) => {
    const queryClient = new QueryClient()
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('Drugs Filtering', () => {
    beforeEach(() => {
        mockSearchDrugs.mockResolvedValue({
            result: {
                results: [],
                totalResults: 0,
                limit: 10,
                page: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPreviousPage: false,
                nextPage: 1,
                previousPage: 1,
                isLastPage: true,
            }
        })

        mockDrugCompanies.mockResolvedValue({
            result: ['Velocity Pharma', 'Bryant Ranch Prepack']
        })
    })

    it('calls searchDrugs with keyword and company filter', async () => {
        renderWithClient(<Drugs />)
        const user = userEvent.setup()

        await waitFor(() => expect(mockDrugCompanies).toHaveBeenCalled())

        const searchInput = screen.getByPlaceholderText('Search drugs')
        fireEvent.change(searchInput, { target: { value: 'Bryonia Spongia' } })

        const companySelectTrigger = screen.getByText('Select a Company').closest('button')
        await user.click(companySelectTrigger!)

        await waitFor(() => {
            expect(screen.getByText('Velocity Pharma')).toBeInTheDocument()
        })

        await user.click(screen.getByText('Velocity Pharma'))

        await waitFor(() => {
            expect(mockSearchDrugs).toHaveBeenCalledWith(
                expect.objectContaining({
                    keyword: 'Bryonia Spongia',
                    company: 'Velocity Pharma',
                    page: 1,
                    limit: 10
                })
            )
        })
    })
})
