import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import Account from "../Account/AccountStaffCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Tài khoản nhân viên" description="this is Sample page">

            <DashboardCard title="Tài khoản nhân viên">
                <Typography paragraph>
                    <Account />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};

export default SamplePage;
