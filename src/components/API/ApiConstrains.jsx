  export const ApiConstrains = {
    admin: {
      login: "/admin/login", // POST
      getUsers: "/admin/users", // GET
      getConversations: (AdminID) => {
        return `/admin/conversations/${AdminID}`; // GET
      },
    },
    user: {
      registerOrLogin: "/user/register-or-login", //post
      getadmin: "/user/admins", //get
    },
    StartConversation: "/user/start-conversation", //post

    sendmassage: (conversationId) => {
      return `/conversation/send-message/` + conversationId; //post
    },
    GetMassages: (conversationId) => {
      return `/conversation/messages/` + conversationId; //get
    },
  };


