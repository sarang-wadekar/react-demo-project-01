import {addImage, editImage, getUsers, deleteUser, updateUser, getUser, addUser, updateImage  } from './actions';

import api from "../services/api";

export const editImages = () => {
    return (dispatch) => {
        // const formData = new FormData();
        // formData.append('imgCollection', images.imgCollection);
        // formData.append('email', images.email);
        // formData.append('password', images.password);
        // formData.append('name', images.name);
        // formData.append('role', images.role);
        api.get(`/api/user-profile/edit`,{
           
            // name: images.name,
            //  email: images.email,
          
        })
            .then(response => {
                // history.push("/dashboard", data);
                console.log(response);
                dispatch(editImage(response.data));
                // dispatch(getUsersAction());
            //    history.push("/dashboard")
                
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const updateImages = (data, id, history,user) => {
    return (dispatch) => {
        const formDatas = new FormData();
        formDatas.append('profileImg', data.profileImg);
        formDatas.append('email', data.email);
        // formData.append('password', data.password);
        formDatas.append('name', data.name);
        // formData.append('role', data.role);
        api.patch(`/api/user-profile/upadte/${id}`, formDatas,{
           
             name: data.name,
             profileImg: data.profileImg,
            //  email: data.email
          
        })
            .then(response => {
                   history.push("/editUser/"+user.id, data);
                console.log(response);
                dispatch(updateImage(response.data));
                 dispatch(editImage());
            //    history.push("/dashboard")
                
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const uploadImages = (images, history) => {
    return (dispatch) => {
                    const formData = new FormData();
                    formData.append('profileImg', images.profileImg);
                    formData.append('email', images.email);
                    formData.append('password', images.password);
                    formData.append('name', images.name);
                     formData.append('role', images.role);
             
        api.post('http://localhost:2001/api/user-profile', formData, {
            
        })
            .then(response => {
                console.log(response);
                dispatch(addImage(response.data))
                history.push("/dashboard");
            })
            .catch(error => {
                console.log("eror", error);
            });
    }
    
}

export const addUserAction = (user, history) => {
    return (dispatch) => {
        api.post('/v1/users', user, {
            sname: user.sname
        })
            .then(response => {
                console.log(response);
                dispatch(addUser(response.data))
                history.push("/dashboard");
            })
            .catch(error => {
                console.log("eror", error);
            });
    }
}

export const getUserAction = (id) => {
    return (dispatch) => {
        api.get(`/v1/users/${id}`)
            .then(response => {
                console.log(response);
                dispatch(getUser(response.data),
                // history.push("/update/"+user.id)
                );
            })
            .catch(error => {
                console.log(error);
            });
    }
}
 
export const getUsersAction = () => {
    return (dispatch) => {
        api.get('v1/users')
            .then(response => {
                console.log(response);
                /// dispatch function dispatches an action which triggers state changes in the store
                dispatch(getUsers(response.data))
                
            })
            .catch(error => {
                console.log(error);
            });
    }
}


export const deleteUserAction = (id, history) => {
    return (dispatch) => {
        api.delete(`/v1/users/${id}`)
            .then(response => {
                console.log(response);
                dispatch(deleteUser());
                dispatch(getUsersAction());
                history.push("/create")
            })
            .catch(error => {
                console.log(error);
            });
    }
}


export const updateUserAction = (data, id,user,history ) => {
    return (dispatch) => {
        api.patch(`/v1/users/${id}`,{
            
            name: data.name,
            // email: data.email,
          
        })
            .then(response => {
                // history.push("/dashboard", data);
                 console.log(response);
                dispatch(updateUser(response.data));
                // dispatch(getUsersAction());
                //   history.push("/dashboard",user)
                 history.push("/update/"+user.id);
                
            })
            .catch(error => {
                console.log(error);
            });
    }
}