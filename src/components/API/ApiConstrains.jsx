export const ApiConstrains = {
    admin: {
      login: '/admin/login',
      getUsers: '/admin/users',
      createAdmin: '/admins',
      getConversations: '/admin/conversations',
      getMessages: '/admin/messages/:conversationId',
      getMessageByUserId: '/admin/messages/user/:userId',
      sendMessage: '/admin/send-message',
      sendMessageToUser: '/admin/send-message-to-user',
    },
    user: {
      registerOrLogin: '/user/register-or-login',
      startConversation: '/user/start-conversation',
      getUserDetails: '/user/details',
      getAvailableAdmins: '/user/available-admins',
      getUserConversations: '/user/conversations/:adminId',
      sendMessageToAdmin: '/user/send-message-to-admin',
    },
  };