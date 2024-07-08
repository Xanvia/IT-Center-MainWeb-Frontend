'use client'
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Advisory Services for Public and Private Sectors
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Provide training and promote utilization of modern technologies related to ITC in all sectors of the University.</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
