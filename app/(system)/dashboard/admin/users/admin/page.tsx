'use client'

import React, { useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";

export default function TableWithDelete() {
  const [tableData, setTableData] = useState([
    { id: "1", name: "Tony Reichert", role: "CEO", mail: "TonyReichert@gamil.com" },
    { id: "2", name: "Zoey Lang", role: "Technical Lead", mail: "ZoeyLang@gamil.com" },
    { id: "3", name: "Jane Fisher", role: "Senior Developer", mail: "JaneFisher@gamil.com" },
    { id: "4", name: "William Howard", role: "Community Manager", mail: "WilliamHoward@gamil.com" }
  ]);

  const handleDelete = (id: string) => {
    setTableData(tableData.filter(row => row.id !== id));
  };

  return (
    <Table aria-label="Example table with delete action">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>Mail</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {tableData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.mail}</TableCell>
            <TableCell>
              <Button 
                color="danger" 
                size="sm" 
                onPress={() => handleDelete(row.id)}
                aria-label={`Delete ${row.name}`}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

