// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Tooltip} from 'react-bootstrap';
import {useIntl, FormattedMessage} from 'react-intl';

import OverlayTrigger from 'components/overlay_trigger';

import ToggleModalButtonRedux from 'components/toggle_modal_button_redux';
import InvitationModal from 'components/invitation_modal';

import {ModalIdentifiers} from 'utils/constants';

type Props = {
    buttonType: string;
};

const InviteUsersButton: React.FC<Props> = (props: Props): JSX.Element | null => {
    const intl = useIntl();

    const tooltip = (
        <Tooltip
            id='new-group-tooltip'
            className='hidden-xs'
        >
            <FormattedMessage
                id={'sidebar_left.inviteUsers'}
                defaultMessage='Invite Users'
            />
        </Tooltip>
    );

    const OpenModal = (props: {children: React.ReactNode}) => {
        return (
            <ToggleModalButtonRedux
                accessibilityLabel={intl.formatMessage({id: 'sidebar_left.inviteUsers', defaultMessage: 'Invite Users'})}
                id='introTextInvite'
                className='intro-links color--link cursor--pointer'
                modalId={ModalIdentifiers.INVITATION}
                dialogType={InvitationModal}
            >
                {props.children}
            </ToggleModalButtonRedux>
        );
    };

    const userIcon = (
        <OverlayTrigger
            delayShow={500}
            placement='top'
            overlay={tooltip}
        >
            <OpenModal>
                <button
                    className='SidebarChannelNavigator_inviteUsers'
                    aria-label={intl.formatMessage({id: 'sidebar_left.sidebar_channel_navigator.inviteUsers', defaultMessage: 'Invite Users'})}
                >
                    <i className='icon-account-plus-outline'/>
                </button>
            </OpenModal>
        </OverlayTrigger>
    );

    const stickyButton = (
        <OpenModal>
            <li
                className='SidebarChannelNavigator_inviteUsersSticky'
                aria-label={intl.formatMessage({id: 'sidebar_left.sidebar_channel_navigator.inviteUsers', defaultMessage: 'Invite Members'})}
            >
                <i className='icon-plus-box'/>
                <FormattedMessage
                    id={'sidebar_left.inviteMembers'}
                    defaultMessage='Invite Members'
                />
            </li>
        </OpenModal>
    );

    let inviteButton;

    switch (props.buttonType) {
        case 'icon-button':
            inviteButton = userIcon;
        break;
        case 'sticky-button':
            inviteButton = stickyButton;
        break;
        default:
            inviteButton = userIcon;
        break;
    }

    return (
        <div>
            {inviteButton}
        </div>
    );
};

export default InviteUsersButton;
