import React, { FC, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Space, Form, Input, Button, Popconfirm, PageHeader, Alert } from 'antd';

import { AddPhone } from '.';

import settings from 'settings';
import requests from 'requests';
import { IContact, ReactRouterHistory, ReactRouterMatch, ReactComponentEvent } from 'types';

interface IProps {
  history: ReactRouterHistory;
  match: ReactRouterMatch;
}

const Edit: FC<IProps> = ({ match, history }) => {
  const { id } = match.params;

  const [contact, setContact] = useState<IContact | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const updateForm = (data: any) => {
    setContact({
      ...contact,
      ...data,
    });
  };

  const fetchContact = async () => {
    const { data } = await requests.contact.fetch(id);
    setContact(data);
  };

  const updateContact = async () => {
    await requests.contact.update(id, contact);
    setIsSaved(true);

    setTimeout(
      () => {
        setIsSaved(false);
      },
      settings.alertTimeout,
    );
  };

  const deleteContact = async () => {
    const { status } = await requests.contact.delete(id);

    if (status === 200) {
      history.push('/contacts');
    }
  };

  const handleFieldChange = (name: string) => (event: ReactComponentEvent) => {
    const { value } = event.target;
    updateForm({ [name]: value });
  };

  const handlePhoneChange = (index: number) => (event: ReactComponentEvent) => {
    const { value } = event.target;

    if (contact) {
      updateForm({
        tels: contact.tels.map((tel: string, telIndex: number) => telIndex === index ? value : tel),
      });
    }
  };

  const handlePhoneRemove = (index: number) => () => {
    if (contact) {
      updateForm({
        tels: contact.tels.filter((tel: string, telIndex: number) => telIndex !== index),
      });
    }
  };

  const handlePhoneAdd = (phone: string) => {
    if (contact) {
      updateForm({
        tels: [
          ...contact.tels,
          phone,
        ],
      });
    }
  };

  const handleContactUpdate = () => {
    updateContact();
  };

  const handleContactDeleteConfirm = () => {
    deleteContact();
  };

  const handleBack = () => {
    history.push('/contacts');
  };

  useEffect(
    () => {
      fetchContact();
    },
    [],
  );

  return (
    <>
      <PageHeader
        title="Edit Contact"
        onBack={handleBack}
        extra={[
          <Button
            key={2}
            type="primary"
            onClick={handleContactUpdate}
          >
            Save
          </Button>,

          <Popconfirm
            key={1}
            title="Are you sure delete this contact?"
            onConfirm={handleContactDeleteConfirm}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger={true}>
              Delete
            </Button>
          </Popconfirm>,
        ]}
      />

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
      >
        <Form.Item label="Name">
          <Input
            value={contact?.name}
            onChange={handleFieldChange('name')}
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            value={contact?.surname}
            onChange={handleFieldChange('surname')}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            value={contact?.email}
            onChange={handleFieldChange('email')}
          />
        </Form.Item>

        <Form.Item label="Tels">
          <Space direction="vertical">
            {contact?.tels.map((tel: string, index: number) => (
              <div key={index}>
                <Space>
                  <Input
                    key={index}
                    value={tel}
                    onChange={handlePhoneChange(index)}
                  />

                  <Button
                    type="link"
                    size="small"
                    danger
                    onClick={handlePhoneRemove(index)}
                  >
                    Remove
                  </Button>
                </Space>
              </div>
            ))}

            <AddPhone onChange={handlePhoneAdd} />
          </Space>
        </Form.Item>
      </Form>

      {isSaved && (
        <Alert
          message="Contact data saved"
          type="success"
          showIcon
        />
      )}
    </>
  );
};

export default withRouter(Edit);
