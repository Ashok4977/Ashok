'use strict'

const components = new Map([
  [
    'ActionList',
    {
      stories: [
        {
          id: 'components-actionlist--default',
          name: 'Default',
        },
        {
          id: 'components-actionlist-features--block-description',
          name: 'Block Description',
        },
        {
          id: 'components-actionlist-features--disabled-item',
          name: 'Disabled Item',
        },
        {
          id: 'components-actionlist-features--inline-description',
          name: 'Inline Description',
        },
        {
          id: 'components-actionlist-features--inside-overlay',
          name: 'Inside Overlay',
        },
        {
          id: 'components-actionlist-features--item-dividers',
          name: 'Item Dividers',
        },
        {
          id: 'components-actionlist-features--links',
          name: 'Links',
        },
        {
          id: 'components-actionlist-features--multi-select',
          name: 'Multi Select',
        },
        {
          id: 'components-actionlist-features--simple-list',
          name: 'Simple List',
        },
        {
          id: 'components-actionlist-features--single-divider',
          name: 'Single Divider',
        },
        {
          id: 'components-actionlist-features--single-select',
          name: 'Single Select',
        },
        {
          id: 'components-actionlist-features--text-wrap-and-truncation',
          name: 'Text Wrap And Truncation',
        },
        {
          id: 'components-actionlist-features--with-avatars',
          name: 'With Avatars',
        },
        {
          id: 'components-actionlist-features--with-icons',
          name: 'With Icons',
        },
      ],
    },
  ],
  [
    'AvatarStack',
    {
      stories: [
        {
          id: 'components-avatarstack--avatar-stack-story',
          name: 'AvatarStack',
        },
      ],
    },
  ],
  [
    'AvatarToken',
    {
      stories: [
        {
          id: 'components-avatartoken--default-token',
          name: 'Default',
        },
      ],
    },
  ],
  [
    'Button',
    {
      stories: [
        {
          id: 'components-button--playground',
          name: 'Playground',
        },
        {
          id: 'components-button-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-button-features--default',
          name: 'Default',
        },
        {
          id: 'components-button-features--disabled',
          name: 'Disabled',
        },
        {
          id: 'components-button-features--invisible',
          name: 'Invisible',
        },
        {
          id: 'components-button-features--large',
          name: 'Large',
        },
        {
          id: 'components-button-features--leading-visual',
          name: 'Leading Visual',
        },
        {
          id: 'components-button-features--medium',
          name: 'Medium',
        },
        {
          id: 'components-button-features--outline',
          name: 'Outline',
        },
        {
          id: 'components-button-features--primary',
          name: 'Primary',
        },
        {
          id: 'components-button-features--small',
          name: 'Small',
        },
        {
          id: 'components-button-features--trailing-counter',
          name: 'Trailing Counter',
        },
        {
          id: 'components-button-features--trailing-visual',
          name: 'Trailing Visual',
        },
      ],
    },
  ],
  [
    'Checkbox',
    {
      stories: [
        {
          id: 'components-forms-checkbox--default',
          name: 'Default',
        },
      ],
    },
  ],
  [
    'IconButton',
    {
      stories: [
        {
          id: 'components-iconbutton--playground',
          name: 'Playground',
        },
        {
          id: 'components-iconbutton-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-iconbutton-features--default',
          name: 'Default',
        },
        {
          id: 'components-iconbutton-features--disabled',
          name: 'Disabled',
        },
        {
          id: 'components-iconbutton-features--invisible',
          name: 'Invisible',
        },
        {
          id: 'components-iconbutton-features--large',
          name: 'Large',
        },
        {
          id: 'components-iconbutton-features--medium',
          name: 'Medium',
        },
        {
          id: 'components-iconbutton-features--primary',
          name: 'Primary',
        },
        {
          id: 'components-iconbutton-features--small',
          name: 'Small',
        },
      ],
    },
  ],
  [
    'LinkButton',
    {
      stories: [
        {
          id: 'components-linkbutton--playground',
          name: 'Playground',
        },
        {
          id: 'components-linkbutton-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-linkbutton-features--default',
          name: 'Default',
        },
        {
          id: 'components-linkbutton-features--invisible',
          name: 'Invisible',
        },
        {
          id: 'components-linkbutton-features--large',
          name: 'Large',
        },
        {
          id: 'components-linkbutton-features--leading-visual',
          name: 'Leading Visual',
        },
        {
          id: 'components-linkbutton-features--medium',
          name: 'Medium',
        },
        {
          id: 'components-linkbutton-features--outline',
          name: 'Outline',
        },
        {
          id: 'components-linkbutton-features--primary',
          name: 'Primary',
        },
        {
          id: 'components-linkbutton-features--small',
          name: 'Small',
        },
        {
          id: 'components-linkbutton-features--trailing-visual',
          name: 'Trailing Visual',
        },
        {
          id: 'components-linkbutton-features--with-react-router',
          name: 'With React Router',
        },
      ],
    },
  ],
  [
    'RadioGroup',
    {
      stories: [
        {
          id: 'components-forms-radiogroup-examples--default',
          name: 'Default',
        },
      ],
    },
  ],
  [
    'UnderlineNav',
    {
      stories: [
        {
          id: 'drafts-components-underlinenav-examples--profile-page',
          name: 'Profile Page',
        },
        {
          id: 'drafts-components-underlinenav-examples--pull-request-page',
          name: 'Pull Request Page',
        },
        {
          id: 'drafts-components-underlinenav-examples--repos-page',
          name: 'Repos Page',
        },
        {
          id: 'drafts-components-underlinenav-features--counters-loading-state',
          name: 'Counters Loading State',
        },
        {
          id: 'drafts-components-underlinenav-features--default',
          name: 'Default',
        },
        {
          id: 'drafts-components-underlinenav-features--overflow-template',
          name: 'Overflow Template',
        },
        {
          id: 'drafts-components-underlinenav-features--with-counter-labels',
          name: 'With Counter Labels',
        },
        {
          id: 'drafts-components-underlinenav-features--with-icons',
          name: 'With Icons',
        },
      ],
    },
  ],
  [
    'TreeView',
    {
      stories: [
        {
          id: 'components-treeview--default',
          name: 'Default',
        },
        {
          id: 'components-treeview-features--empty-directories',
          name: 'Empty Directories',
        },
        {
          id: 'components-treeview-features--files',
          name: 'Files',
        },
        {
          id: 'components-treeview-features--files-changed',
          name: 'Files Changed',
        },
      ],
    },
  ],
])

module.exports = {
  components,
}
