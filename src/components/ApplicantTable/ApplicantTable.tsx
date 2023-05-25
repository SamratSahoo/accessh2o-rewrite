import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    TextField,
    MenuItem,
    InputAdornment,
    Menu,
    TableFooter
} from '@mui/material'
import Link from 'next/link'
import { Announcement, MoreVert } from '@mui/icons-material'
import {
    Applicant,
    ApplicantStatus,
    ApplicantStatusColor
} from 'src/utils/types'
import { ApplicantModal } from 'src/components/ApplicantModal/ApplicantModal'
import classes from 'src/components/ApplicantTable/ApplicantTable.module.css'
import { NotesModal } from 'src/components/NotesModal/NotesModal'
import { removeClient } from 'src/actions/Client'
import SearchIcon from '@mui/icons-material/Search'
import Router from 'next/router'
import urls from 'src/utils/urls'

interface PropTypes {
    isUtilityView: boolean
    infoSubmissionEndpoint: string
    applicants: Applicant[]
}

/**
 * Paginates an applicant array.
 *
 * @param array the input array
 * @param page the current page (zero indexed)
 * @param rowsPerPage the number of rows to display per page
 */
const paginate = (
    array: Applicant[],
    page: number,
    rowsPerPage: number
): Applicant[] => {
    return rowsPerPage > 0
        ? array.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        : array
}

const ApplicantTable = ({
    isUtilityView,
    infoSubmissionEndpoint,
    applicants
}: PropTypes): JSX.Element => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('Any')
    const [searchBy, setSearchBy] = useState('All')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [filteredApplicants, setfilteredApplicants] = useState(applicants)
    const [accountID, setAcccountID] = useState('')
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent): void => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (): void => {
        setAnchorEl(null)
    }

    useEffect(() => {
        const statusApplicants = applicants.filter(
            (applicant) => statusFilter === 'Any' || applicant.status === statusFilter
        )
        let dateApplicants = statusApplicants
        if (fromDate !== '' && toDate !== '') {
            dateApplicants = dateApplicants.filter((applicant) => {
                const applicantDate = new Date(applicant.applied)
                return (
                    applicantDate > new Date(fromDate) && applicantDate < new Date(toDate)
                )
            })
        }
        let searchedApplicants = dateApplicants
        const caseInsensitiveSearch = search.toLowerCase()
        if (!isUtilityView) {
            if (searchBy === 'All') {
                searchedApplicants = searchedApplicants.filter(
                    (applicant) =>
                        applicant.name.toLowerCase().includes(caseInsensitiveSearch) ||
                        applicant.utilityCompany
                            .toLowerCase()
                            .includes(caseInsensitiveSearch)
                )
            } else if (searchBy === 'Name') {
                searchedApplicants = searchedApplicants.filter((applicant) =>
                    applicant.name.toLowerCase().includes(caseInsensitiveSearch)
                )
            } else if (searchBy === 'Utility Company') {
                searchedApplicants = searchedApplicants.filter((applicant) =>
                    applicant.utilityCompany.toLowerCase().includes(caseInsensitiveSearch)
                )
            }
        } else {
            searchedApplicants = searchedApplicants.filter((applicant) =>
                applicant.name.toLowerCase().includes(caseInsensitiveSearch)
            )
        }

        setfilteredApplicants(searchedApplicants)
    }, [search, statusFilter, searchBy, fromDate, toDate, page, rowsPerPage])

    function editNote(accountId: string): void {
        setAcccountID(accountId)
        setShowNotesModal(true)
    }

    const [showApplicantModal, setShowApplicantModal] = useState(false)
    const [showNotesModal, setShowNotesModal] = useState(false)

    const statusColor = (status: ApplicantStatus): string => {
        return ApplicantStatusColor[status]
    }

    const removeApplicant = async (accountId: string): Promise<void> => {
        await removeClient(accountId)
        window.location.reload()
    }

    const handleChangePage = (event: any, page: number): void => {
        setPage(page)
    }

    const handleChangeRowsPerPage = (event: any): void => {
        console.log(event)
        setRowsPerPage(parseInt(event.target.value))
        setPage(0)
    }

    return (
        <div className={classes.root}>
            <div
                className={classes.header}
                style={{
                    borderRight: 1,
                    borderBottom: 1,
                    borderLeft: 1,
                    borderColor: '#CBCBCB'
                }}
            >
                <div className={classes.searchBar}>
                    <TextField
                        className={classes.searchBox}
                        InputProps={{
                            className: classes.searchBox,
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="disabled" />
                                </InputAdornment>
                            )
                        }}
                        placeholder="Search"
                        style={{ background: '#EEEEEE', marginRight: '8px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {!isUtilityView && (
                        <TextField
                            className={classes.searchFilter}
                            InputProps={{
                                className: classes.searchFilterText
                            }}
                            label="Search By"
                            style={{ marginRight: '8px' }}
                            select
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value)}
                        >
                            <MenuItem key={'All'} value={'All'}>
                                {'All'}
                            </MenuItem>
                            <MenuItem key={'Utility Company'} value={'Utility Company'}>
                                {'Utility Company'}
                            </MenuItem>
                            <MenuItem key={'Name'} value={'Name'}>
                                {'Name'}
                            </MenuItem>
                        </TextField>
                    )}
                    <TextField
                        className={classes.searchFilter}
                        InputProps={{
                            className: classes.searchFilterText
                        }}
                        style={{ marginRight: '8px' }}
                        label="Status"
                        select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <MenuItem key={'Any'} value={'Any'}>
                            {'Any'}
                        </MenuItem>
                        {Object.values(ApplicantStatus).map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        className={classes.dateInput}
                        variant="outlined"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        type="date"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">From:</InputAdornment>
                            ),
                            className: classes.dateInputText
                        }}
                        style={{ marginRight: '8px' }}
                    />
                    <TextField
                        className={classes.dateInput}
                        variant="outlined"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        type="date"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">To:</InputAdornment>
                            ),
                            className: classes.dateInputText
                        }}
                    />
                </div>
                {!isUtilityView && (
                    <div>
                        <button
                            onClick={() => setShowApplicantModal(true)}
                            className={classes.addCustomerButton}
                        >
                            Add Customer
                        </button>
                        <ApplicantModal
                            shouldShowModal={showApplicantModal}
                            onClose={() => setShowApplicantModal(false)}
                        />
                    </div>
                )}
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell><span className={classes.tableHeaderText}>Name</span></TableCell>
                        <TableCell><span className={classes.tableHeaderText}>Utility Company</span></TableCell>
                        <TableCell><span className={classes.tableHeaderText}>Account ID</span></TableCell>
                        <TableCell><span className={classes.tableHeaderText}>Property Address</span></TableCell>
                        <TableCell><span className={classes.tableHeaderText}>Applied</span></TableCell>
                        <TableCell><span className={classes.tableHeaderText}>Status</span></TableCell>
                        <TableCell><span className={classes.tableHeaderText}>Notes</span></TableCell>
                    </TableHead>
                    <TableBody>
                        {paginate(filteredApplicants, page, rowsPerPage).map((applicant, index) => (
                            <TableRow
                                key={page}>
                                <TableCell>{applicant.name}</TableCell>
                                <TableCell>{applicant.utilityCompany}</TableCell>
                                <TableCell>{applicant.accountId}</TableCell>
                                <TableCell>{applicant.propertyAddress}</TableCell>
                                <TableCell>{(new Date(applicant.applied)).toDateString()}</TableCell>
                                <TableCell>
                                    <span
                                        className={classes.status}
                                        style={{
                                            backgroundColor: statusColor(applicant.status)
                                        }}
                                    >
                                        {applicant.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={'View notes'}>
                                        <IconButton
                                            onClick={() => editNote(applicant.accountId)}
                                        >
                                            <Announcement />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
                <NotesModal
                    shouldShowModal={showNotesModal}
                    onClose={() => setShowNotesModal(false)}
                    accountID={accountID}
                    infoSubmissionEndpoint={infoSubmissionEndpoint}
                />
            </TableContainer>
        </div>
    )
}

export default ApplicantTable
