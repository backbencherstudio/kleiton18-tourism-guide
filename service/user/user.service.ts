import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../lib/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const UserService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const data = {
      email: email,
      password: password,
    };
    return await Fetch.post("/users/login", data, config);
  },
  confirmOTP: async ({ email, otp }: { email: string; otp: string }) => {
    const data = {
      email: email,
      otp: otp,
    };
    return await Fetch.post("/users/verify-otp", data, config);
  },
  updatePassword: async ({
    email,
    newPassword,
  }: {
    email: string;
    newPassword: string;
  }) => {
    console.log(newPassword);

    const data = {
      email: email,
      newPassword: newPassword,
    };
    return await Fetch.post("/users/reset-password", data, config);
  },
  forgotEmail: async ({ email }: { email: string }) => {
    const data = {
      email: email,
    };
    return await Fetch.post("/users/send-otp", data, config);
  },
addHotel: async (formData: any,token:any) => {
  
  if (!token) {
  throw new Error("User token not found. Please login again.");
}
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    },
  };
  return await Fetch.post("/hotel/add", formData, config);
},
// add resturant=============
addRestaurant: async (formData: any,token:any) => {
  
  if (!token) {
  throw new Error("User token not found. Please login again.");
}
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    },
  };
  return await Fetch.post("/restaurant/add", formData, config);
},
// add TrandingDish =========================
addTrandingDish: async (formData: any,token:any) => {
  
  if (!token) {
  throw new Error("User token not found. Please login again.");
}
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    },
  };
  return await Fetch.post("/traditional-dish/add", formData, config);
},
// add visited area================
addVisitedAerea: async (formData: any,token:any) => {
  
  if (!token) {
  throw new Error("User token not found. Please login again.");
}
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    },
  };
  return await Fetch.post("/visit-area/add", formData, config);
},
// add fevorite area================
addFavorite: async (data: any,token:any) => {
  
  if (!token) {
  throw new Error("User token not found. Please login again.");
}
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  };
  return await Fetch.post("/favorites/add/", data, config);
},
//================================
// delete visit area==========
  deleteVisitArea: async (id:any,  token: any) => {
    
    const _config = {
      headers: {
        "Content-Type": "application/json",
       'Authorization': token,
       
      },
    };

    return await Fetch.delete(`/visit-area/delete/${id}`, _config);
  },
// delete restaurant==========
  deleteRestaurant: async (id:any,  token: any) => {
    console.log("==========",id);
    
    const _config = {
      headers: {
        "Content-Type": "application/json",
       'Authorization': token,
       
      },
    };

    return await Fetch.delete(`/restaurant/delete/${id}`, _config);
  },
// delete Tranding Dish==========
  deleteDish: async (id:any,  token: any) => {
    
    const _config = {
      headers: {
        "Content-Type": "application/json",
       'Authorization': token,
       
      },
    };
    return await Fetch.delete(`/traditional-dish/delete/${id}`, _config);
  },
// delete hotel ==========
  deleteHotel: async (id:any, token: any) => {
    
    const _config = {
      headers: {
        "Content-Type": "application/json",
       'Authorization': token,
       
      },
    };
    return await Fetch.delete(`/hotel/delete/${id}`, _config);
  },
// delete unfavorite ==========
  deleteFavorite: async (id:any,type:any, token: any) => {
    
    const _config = {
      headers: {
        "Content-Type": "application/json",
       'Authorization': token,
       
      },
    };
    return await Fetch.delete(`/favorites/remove/${id}/${type}`, _config);
  },

  //=======================

  onRegister: async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const data = {
      fullName: username,
      email: email,
      password: password,
    };
    return await Fetch.post("/users/register", data, config);
  },

  logout: (context = null) => {
    CookieHelper.destroy({ key: "token", context });
  },
  // get user details
  getAllUser: async ({ token = "", context = null,page,limit }) => {
    // const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },}

    return await Fetch.get(`/users/all?page=${page}&limit=${limit}`, _config);
  },
  // get hotel details
  getAllHotel: async ({ token = "", context = null,page,limit }) => {
    // const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    };

    return await Fetch.get(`/hotel/get?page=${page}&limit=${limit}`, _config);
  },
  // get hotel details
  getAllHotels: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    };

    return await Fetch.get(`/hotel/get`, _config);
  },
  getAllRestaurant: async ({ token = "", context = null,page,limit }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
      const _config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },}

    return await Fetch.get(`/restaurant/get?page=${page}&limit=${limit}`, _config);
  },
  // all resturants=============
  getAllRestaurants: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
      const _config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },}

    return await Fetch.get(`/restaurant/get`, _config);
  },
  getAlltraditionalDish: async ({ token = "", context = null,page , limit }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
     const _config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },}
    return await Fetch.get(`/traditional-dish/get?page=${page}&limit=${limit}`, _config);
  },
  getAllVisitArea: async ({ token = "", context = null,page,limit }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
     const _config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },}

    return await Fetch.get(`/visit-area/get?page=${page}&limit=${limit}`, _config);
  },
  // get fevorite =====================
  getAllFavorite: async ({ token = "", context = null,}) => {
    // const userToken = CookieHelper.get({ key: "token", context });
  
    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    return await Fetch.get(`/favorites/list`, _config);
  },

  getUserDetails: async ({ token = "", context = null }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token;

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/me`, _config);
  },

  findAll: async (context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user`, _config);
  },

  findOne: async (id: number, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/${id}`, _config);
  },

  findOneByUsername: async ({
    username,
    token = "",
    context = null,
  }: {
    username: string;
    token?: string;
    context?: any;
  }) => {
    // const userToken = CookieHelper.get({ key: "token", context });
    const userToken = token || CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/user/profile/${username}`, _config);
  },
  
  
  update: async (
    {
      fname,
      lname,
      date_of_birth,
      city,
      country,
      organization,
      recipient_name,
      recipient_zip_code,
      recipient_country,
      recipient_state,
      recipient_city,
      recipient_address,
      recipient_phone_number,
    }: {
      fname: string;
      lname: string;
      date_of_birth: string;
      city: string;
      country: string;
      organization: string;
      recipient_name: string;
      recipient_zip_code: string;
      recipient_country: string;
      recipient_state: string;
      recipient_city: string;
      recipient_address: string;
      recipient_phone_number: string;
    },
    context = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      fname: fname,
      lname: lname,
      date_of_birth: date_of_birth,
      city: city,
      country: country,
      organization: organization,
      recipient_name: recipient_name,
      recipient_zip_code: recipient_zip_code,
      recipient_country: recipient_country,
      recipient_state: recipient_state,
      recipient_city: recipient_city,
      recipient_address: recipient_address,
      recipient_phone_number: recipient_phone_number,
    };

    return await Fetch.patch(`/user`, data, _config);
  },

  updateAvatar: async (data: any, context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
        "content-type": "multipart/form-data",
      },
    };

    return await Fetch.patch(`/user/avatar`, data, _config);
  },

  //
  create: async (
    {
      fname,
      lname,
      username,
      email,
      role_id,
    }: {
      fname: string;
      lname: string;
      username: string;
      email: string;
      role_id: number;
    },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      role_id: role_id,
    };

    return await Fetch.post(`/user`, data, _config);
  },

  // TODO
  confirm: async (
    {
      id,
      token,
      email,
      password,
    }: { id: number; token: string; email: string; password: string },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      id: id,
      token: token,
      email: email,
      password: password,
    };

    return await Fetch.patch(`/user/${id}/password`, data, _config);
  },
};
