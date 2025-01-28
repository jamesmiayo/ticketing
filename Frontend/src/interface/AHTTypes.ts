import { ChartOptions } from 'chart.js';
import { ReactNode } from 'react';

export interface AHTChartOptions extends ChartOptions<'line'> {
  responsive: boolean;
  plugins: {
    legend: {
      position: 'top' | 'bottom' | 'left' | 'right';
    };
    title: {
      display: boolean;
      text: string;
    };
  };
}

export interface TicketLog {
  status: number;
  assignee?: {
    name: string;
  };
  ticket_status: string;
  time_difference: string;
  created_at: string;
}

export interface AHTModalData {
  ticket_id: ReactNode;
  ticket_logs: TicketLog[];
}

export interface Column {
  field: string;
  headerName: string;
  width: number;
  renderCell: (params: { row: TicketLog }) => string;
}

export interface TotalStatus {
  title: string;
  content: number;
  backgroundColor: string;
}

export interface AHTModalProps {
  data: AHTModalData;
}

export interface AHTStatItem {
  value: string | number;
  label: string;
}

export interface AHTStatsProps {
  data: AHTStatItem[];
  isLoading: boolean;
}

export interface AHTData {
  id: number;
  assignee?: {
    name: string;
  };
  profile: string;
  ticket_status: string;
  time_difference: string;
  created_at: string;
  [key: string]: any;
}

export interface AHTFormType {
  startDate: string;
  endDate: string;
  filter: string;
  [key: string]: any;
}

export interface RowData {
  row: AHTData;
}

export interface GlobalFilterProps {
  onSubmit: (formData: AHTFormType) => void;
}

export interface AHTTicketTableProps {
  data: AHTData[];
  loading: boolean;
  onRowClick: (params: RowData) => void;
}

export interface AHTTicketDataProps {
  rowData: AHTData | null;
}
