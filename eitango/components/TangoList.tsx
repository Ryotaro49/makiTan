'use client'
import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from 'next/link';
import useSWR from "swr";
import { Tango, zTangos } from "../app/phrases/type";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Props = {
  initialState: Tango[];
}
const fetcher = (url: string) => fetch(url).then(async (res) => {
  const data = await res.json();
  const phrases = zTangos.parse(data);
  return phrases;
});

const TangoList: React.FC<Props> = ({ initialState }) => {
  const { data } = useSWR('/api/phrase', fetcher, {
    suspense: true,
    fallbackData: initialState,
  });

  const columns: GridColDef[] = [
    { field: 'tango_id', headerName: 'ID', flex: 1 },
    { field: 'phrase', headerName: 'Phrase', flex: 1 },
    { field: 'meaning', headerName: 'Meaning', flex: 1 },
    // Add more columns as needed based on your data structure
  ];

  if (!data) {
    // Data is still loading
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        getRowId={(row) => row.tango_id} // Specify tango_id as the id
      />
    </div>
  );
};

export default TangoList;