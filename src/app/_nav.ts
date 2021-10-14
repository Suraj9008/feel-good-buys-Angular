import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard', ///dashboard
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    },

  },

  {
    title: true,
    name: 'Extras',
  },

  {
    name: "Company",
    url: '/company',
    icon: 'fa fa-building-o',
    children: [
      {
        name: 'Add Company',
        url: '/home/company/add-company',
        icon: 'fa fa-plus-square-o',
        permissions:["add_company"],
      },
      {
        name: 'Company List',
        url: '/home/company/company-list',
        icon: 'fa fa-list-alt',
        permissions:["add_company", "view_company", "update_company", "delete_company"]
      },
      {
        name: 'Edit Company',
        url: '/home/company/edit-company',
        icon: 'fa fa-pencil-square-o',
        permissions:["update_company"]
      },
      {
        name: 'View Company Details',
        url: '/home/company/view-company-details',
        icon: 'fa fa-newspaper-o',
        permissions:["view_company"]
      },
      {
        name: 'Demo',
        url: '/home/company/demo',
        icon: 'fa fa-newspaper-o',
        permissions:["add_company", "view_company", "update_company", "delete_company"]
      }
    ]
  },
  {
    name: "Contacts",
    url: '/home/contact',
    icon: 'fa fa-address-book-o',
    children: [
      {
        name: 'Add Contact',
        url: '/home/contact/add-contact',
        icon: 'fa fa-plus-square-o',
        permissions:["add_contact"]
      },
      {
        name: 'Contact List',
        url: '/home/contact/contact-list',
        icon: 'fa fa-list-alt',
        permissions:["view_contact", "add_contact", "update_contact", "delete_contact"]
      },
      {
        name: 'View Contact Details',
        url: '/home/contact/view-contact-details',
        icon: 'fa fa-address-card-o',
        permissions:["view_contact"]
      },
      {
        name: 'Edit Contact',
        url: '/home/contact/edit-contact',
        icon: 'fa fa-pencil-square-o',
        permissions:["update_contact"]
      },
      {
        name: "Import Contact",
        url: '/home/contact/import',
        icon: 'fa fa-cloud-download',
        permissions:["view_contact", "add_contact", "update_contact", "delete_contact"]
      },
    ]
  },
  {
    name: 'User',
    url: '/user',
    icon: 'icon-user',
    children: [
      {
        name: 'Add User',
        url: '/home/user/add-user',
        icon: 'fa fa-user-plus',
        permissions:["user_create",]
      },
      {
        name: 'User Profile List',
        url: '/home/user/profile-list',
        icon: 'fa fa-list-alt',
        permissions:["user_read", "user_create", "user_update", "user_delete"]
      },
      {
        name: 'Edit Profile',
        url: '/home/user/edit-profile',
        icon: 'icon-people',
        permissions:["user_update"]
      },
      {
        name: 'User Role',
        url: '/home/user/user-role',
        icon: 'icon-options',
        permissions:["user_read", "user_create", "user_update", "user_delete"]
      },
      {
        name: 'User Permission',
        url: '/home/user/user-permission',
        icon: 'icon-user-following',
        permissions:["user_read", "user_create", "user_update", "user_delete"]
      }
    ]
  },
  {
    name: 'Email',
    url: '/home/email',
    icon: 'icon-envelope',
    children: [
      {
        name: 'Send Greetings',
        url: '/home/email/email',
        icon: 'fa fa-commenting-o',
        permissions:["send_greeting"]
      },
      {
        name: 'Email Logs',
        url: '/home/email/email-logs',
        icon: 'fa fa-commenting-o',
        permissions:["email_read", "send_mail",]
      },
      {
        name: 'Mail Chimp',
        url: '/home/email/mail-chimp',
        icon: 'fa fa-pencil-square-o',
        permissions:["mailchimp_config"]
      },
      {
        name: 'Add New Template',
        url: '/home/email/new-email-template',
        icon: 'fa fa-address-card-o',
        permissions:["create_template"]
      },
      {
        name: 'Template List',
        url: '/home/email/template-list',
        icon: 'fa fa-address-card-o',
        permissions:["view_template", "create_template", "update_template", "delete_template"]
      },
      {
        name: 'Edit Template',
        url: '/home/email/template',
        icon: 'fa fa-address-card-o',
      }
    ]
  },
  {
    name: "Integration",
    url: '/integration',
    icon: 'fa fa-compress',
    children: [
      {
        name: 'Mail Integration',
        url: '/home/integration/mail-integration',
        icon: 'icon-envelope-letter',
        permissions:["email_read", "send_mail"]
      },
      {
        name: 'Facebook Pixel',
        url: '/home/integration/fb-pixel',
        icon: 'fa fa-facebook-square',
      },
      {
        name: 'Sms Integration',
        url: '/home/integration/sms-integration',
        icon: 'fa fa-comments-o',
        permissions:["sms_read", "sms_mail"]
      },
    ]
  },
  {
    name: "Sales Trekker",
    url: '/home/loans/add-loan',
    icon: 'fa fa-money',

  },
  {
    name: "Loan Logs",
    url: '/home/loans/loan-table',
    icon: 'fa fa-money',
    permissions:["view_loan"]
  },
  {
    name: 'Setting',
    url: '/setting',
    icon: 'icon-settings',
    children: [
      {
        name: 'taxonomy',
        url: '/home/setting/taxonomy',
        icon: 'fa fa-plus-square-o',
        children: [
          {
            name: 'Add Term',
            url: '/home/setting/taxonomy/add-term',
            icon: 'fa fa-plus-square-o',
            permissions:["add_term"]
          },
          {
            name: 'Tags',
            url: '/home/setting/taxonomy/tags',
            icon: 'fa fa-plus-square-o',
            permissions:["add_tags", "update_tags", "delete_tags","view_tags"]
          },
          {
            name: 'Term List',
            url: '/home/setting/taxonomy/term-list',
            icon: 'fa fa-plus-square-o',
            permissions:["add_term", "view_term", "update_term", "delete_term"]

          },
          {
            name: 'Social Media',
            url: '/home/setting/taxonomy/social-media',
            icon: 'fa fa-plus-square-o',
            // permissions:["user_read", "user_create", "user_update", "user_delete"]
          },
        ]
      },
    ]
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-docs',
    children: [
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-user-follow'
      },
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-login',
        // permissions:["user_read", "user_create", "user_update", "user_delete"]
      },
      {
        name: 'Forgot Password',
        url: '/forgotPassword',
        icon: 'fa fa-key',
        // permissions:["user_read", "user_create", "user_update", "user_delete"]
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'fa fa-exclamation-circle',
        // permissions:["user_read", "user_create", "user_update", "user_delete"]
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'fa fa-exclamation-circle',
        // permissions:["user_read", "user_create", "user_update", "user_delete"]
      }
    ]
  },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Components'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop'
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Navbars',
  //       url: '/base/navbars',
  //       icon: 'icon-puzzle'

  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Brand Buttons',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
];