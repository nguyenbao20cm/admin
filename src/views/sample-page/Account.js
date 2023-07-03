import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import Account from "../Account/AccountCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Tài khoản khách hàng" description="this is Sample page">

            <DashboardCard title="Tài khoản khách hàng ">
                <Typography paragraph>
                    <Account />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};

export default SamplePage;
