import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavGroup from './NavGroup/NavGroup'; import { NavLink } from 'react-router-dom';
import {
  ListItemText, useTheme, styled
} from '@mui/material';
import PropTypes from 'prop-types'; import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';
import { ListSubheader } from '@mui/material';
import {
  ListItemIcon,
  ListItem,
} from '@mui/material';
import Buttonside from "./Buttonside"
const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const Icon = IconAperture;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          }
          else
            if (item.bbb == null && item.aaa == null) {
              return (
                <NavItem item={item} key={item.id} pathDirect={pathDirect} />
              );
            }
        })}
        <ListSubheaderStyle>Product</ListSubheaderStyle>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
            button
            component={NavLink}
            target={''}
          >
            <ListItemIcon
              sx={{
                minWidth: '36px',
                p: '3px 0',
                color: 'inherit',
              }}
            >
              {itemIcon}
            </ListItemIcon>
            <ListItemText>
              <>Product</>
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails>
            {Menuitems.map((item) => {
              if (item.bbb == false) {
                return (
                  <Buttonside item={item} key={item.id} pathDirect={pathDirect} />
                );
              }
            })}
          </AccordionDetails>
        </Accordion>
        <ListSubheaderStyle>Report</ListSubheaderStyle>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
            button
            component={NavLink}
            target={''}
          >
            <ListItemIcon
              sx={{
                minWidth: '36px',
                p: '3px 0',
                color: 'inherit',
              }}
            >
              {itemIcon}
            </ListItemIcon>
            <ListItemText>
              <>Report</>
            </ListItemText>
          </AccordionSummary>
          <AccordionDetails>
            {Menuitems.map((item) => {
              if (item.bbb == true) {
                return (
                  <Buttonside item={item} key={item.id} pathDirect={pathDirect} />
                );
              }
            })}
          </AccordionDetails>
        </Accordion>
        <ListSubheaderStyle>Onther Function</ListSubheaderStyle>
        {Menuitems.map((item) => {

          if (item.aaa == true) {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
