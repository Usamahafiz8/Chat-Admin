export const ApiConstrains = {
  admin: {
    login: "/admin/login", // POST
    getUsers: "/admin/users", // GET
    getConversations: (AdminID) => {
      return `/admin/conversations/${AdminID}`; // GET
    },
    sendMassage: (conversationId) => {
      return `/admin/conversation/send-message/` + conversationId; //post
    },
  },
  user: {
    registerOrLogin: "/user/register-or-login", //post
    getadmin: "/user/admins", //get
  },
  StartConversation: "/user/start-conversation", //post

  sendmassage: (conversationId) => {
    return `/user/conversation/send-message/` + conversationId; //post
  },
  GetMassages: (conversationId) => {
    return `/conversations/messages/` + conversationId; //get
  },
  Users: {
    startConversation: `/user/start-conversation`, //post
    getMassages: (conversationId) => {
      return `/conversations/messages/`+conversationId; //get
    },
    sendMassage: (conversationId) => {
      return `/user/send-message/` + conversationId; //post
    },
  },
};


// api/user/conversation/send-message/:conversationId