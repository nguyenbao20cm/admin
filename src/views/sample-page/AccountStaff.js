import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AdvertisingPanel from "../../components/container/AdvertisingPanel/AdvertisingPanelCRUD"
import { BackTop } from 'antd';
import Account from "../Account/AccountStaffCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Tài khoản nhân viên" description="this is Sample page">

            <DashboardCard title="Tài khoản nhân viên">
                <Typography paragraph>
                    <Account />
                </Typography>
            </DashboardCard>  <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
        </PageContainer>
    );
};

export default SamplePage;
