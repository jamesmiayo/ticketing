// TicketList.tsx
import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import TicketCard from './TicketCard'
import { OverviewAPI } from '../../api/services/getOverview'

// Define the structure of each ticket status item
interface TicketStatus {
  label: any
  value: number
}

const TicketList: React.FC = () => {
  const [data, setData] = useState<TicketStatus[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await OverviewAPI.getAllData()
        if (result && Array.isArray(result.total_ticket_count)) {
          setData(result.total_ticket_count)
        } else {
          console.warn('Unexpected data structure:', result)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        p: 3,
      }}
    >
      {data.map((status, index) => (
        <TicketCard key={index} title={status.label} count={status.value} />
      ))}
    </Box>
  )
}

export default TicketList
