import React, {useState} from 'react';
// import { formatDate } from '../../../../../src/services/format';
// import { createDataStore } from '../data_store';

import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
} from '@elastic/eui';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/


 const ExampleTable = () => {
  
  
  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      'data-test-subj': 'firstNameCell',
      mobileOptions: {
        render: (item) => (
          <span>
            {item.firstName}{' '}
            <EuiLink href="#" target="_blank">
              {item.lastName}
            </EuiLink>
          </span>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        fullWidth: true,
      },
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: true,
      render: (name) => (
        <EuiLink href="#" target="_blank">
          {name}
        </EuiLink>
      ),
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'github',
      name: 'Github',
    },
    {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date'
    },
    {
      field: 'nationality',
      name: 'Nationality',
      render: (countryCode) => {
        const country = 'Fiji';
        return `country`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
  ];

 

  const items = [
      {
        id: '1',
        firstName: 'john',
        lastName: 'doe',
        github: 'johndoe',
        dateOfBirth: Date.now(),
        nationality: 'NL',
        online: true
      },
      {
        id: '2',
        firstName: 'Gohn',
        lastName: 'Voe',
        github: 'shndoe',
        dateOfBirth: Date.now(),
        nationality: 'NL',
        online: true
      },

      {
        id: '3',
        firstName: 'Gohn',
        lastName: 'Voe',
        github: 'shndoe',
        dateOfBirth: Date.now(),
        nationality: 'NL',
        online: true
      }
  ]

//    const items = store.filter((user, index) => index < 10);

  const getRowProps = (item) => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => {},
    };
  };

  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${field}`,
      textOnly: true,
    };
  };
  
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortDirection, setSortDirection] = useState('desc');
   const [sortField, setSortField] = useState('firstName');

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;
    const { field: sortField, direction: sortDirection } = sort;

    console.log("triggering on change...")
    
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };


  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
    enableAllColumns: true
  };

  return (


    <EuiBasicTable
      items={items}
      rowHeader="firstName"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
      sorting={sorting}
      onChange={onTableChange}
    />



  );
};


export default ExampleTable; 