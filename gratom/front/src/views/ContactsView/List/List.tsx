import React, { FC, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, PageHeader, Button, Popconfirm, Typography, Space } from 'antd';

import { IContact, ReactRouterHistory } from 'types';
import settings from 'settings';
import requests from 'requests';

interface IProps {
  history: ReactRouterHistory;
}

const List: FC<IProps> = ({ history }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const { data } = await requests.contacts.fetch();
    setContacts(data);
  };

  const deleteContact = async (id: string) => {
    try {
      const { status } = await requests.contact.delete(id);

      if (status === 200) {
        fetchContacts();
      }
    }

    catch (error) {
      console.error(error);
    }
  };

  const handleContactDeleteConfirm = (id: string) => () => {
    deleteContact(id);
  };

  const handleContactEdit = (id: string) => () => {
    history.push(`/contacts/${id}`);
  };

  useEffect(
    () => {
      fetchContacts()
    },
    [],
  );

  const contactsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phones',
      dataIndex: 'tels',
      key: 'tels',
      render: (tels: string[]) => (
        <Space direction="vertical">
          {tels.map((tel: string, index: number) => (
            <Typography.Text key={index}>
              {tel}
            </Typography.Text>
          ))}
        </Space>
      ),
    },
    {
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <>
          <Button
            size="small"
            type="link"
            onClick={handleContactEdit(id)}
          >
            Edit
          </Button>

          <Popconfirm
            key={1}
            title="Are you sure delete this contact?"
            onConfirm={handleContactDeleteConfirm(id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              danger
              size="small"
              type="link"
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Contacts" />

      <Table
        dataSource={contacts.map((item: IContact, index: number) => ({
          ...item,
          key: index,
        }))}
        columns={contactsColumns}
        pagination={{
          pageSize: settings.pageSize,
          total: contacts.length,
        }}
      />
    </>
  );
};

export default withRouter(List);
