import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../features/user/userSlice';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const ProfileModel = ({setShowEdit}) => {

  const dispatch = useDispatch();
  const {getToken}= useAuth()

  const user = useSelector((state)=> state.user.value)
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      const {full_name, username, bio, location, profile_picture, cover_photo} = editForm

      userData.append('username', username);
      userData.append('bio', bio);
      userData.append('location', location);
      userData.append('full_name', full_name);
      profile_picture && userData.append('profile', profile_picture)
      cover_photo && userData.append('cover', cover_photo)

      const token = await getToken()
      dispatch(updateUser({userData,token}))

      setShowEdit(false)
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen overflow-y-scroll bg-black/50">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

          <form className="space-y-6" onSubmit={e=> toast.promise(
            handleSaveProfile(e),{loading:'Saving...'}
          )}>
            {/* Profile Picture */}
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="profile_picture" className="text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                id="profile_picture"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setEditForm({ ...editForm, profile_picture: e.target.files[0] })
                }
              />
              <div
                className="group relative w-24 h-24 cursor-pointer"
                onClick={() => document.getElementById("profile_picture").click()}
              >
                <img
                  src={
                    editForm.profile_picture
                      ? URL.createObjectURL(editForm.profile_picture)
                      : user.profile_picture
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="absolute inset-0 hidden group-hover:flex bg-black/40 rounded-full items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Cover Photo */}
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="cover_photo" className="text-sm font-medium text-gray-700">
                Cover Photo
              </label>
              <input
                type="file"
                id="cover_photo"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setEditForm({ ...editForm, cover_photo: e.target.files[0] })
                }
              />
              <div
                className="group relative w-80 h-40 cursor-pointer"
                onClick={() => document.getElementById("cover_photo").click()}
              >
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo
                  }
                  alt="Cover"
                  className="w-80 h-40 rounded-lg object-cover"
                />
                <div className="absolute inset-0 hidden group-hover:flex bg-black/30 rounded-lg items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Name
                </label>
                <input type="text"  className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter your full name'
                onChange={(e)=>setEditForm({...editForm, full_name : e.target.value})} value={editForm.full_name}/>
            </div>
             <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Username
                </label>
                <input type="text"  className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter your username'
                onChange={(e)=>setEditForm({...editForm, username : e.target.value})} value={editForm.username}/>
            </div>
             <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Bio
                </label>
                <textarea rows={3} className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter your bio'
                onChange={(e)=>setEditForm({...editForm, bio : e.target.value})} value={editForm.bio}/>
            </div>
             <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                   Loacation 
                </label>
                <input type="text"  className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter your location'
                onChange={(e)=>setEditForm({...editForm, location : e.target.value})} value={editForm.location}/>
            </div>

            <div className='flex justify-end space-x-3 pt-6'>
               <button onClick={()=>setShowEdit(false)} type='button' className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>Cancel</button>
               <button type='submit' className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer'>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;

