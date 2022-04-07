import { useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import Header from '@components/Header';
import { getUserProfile } from '@redux/thunks/getUserProfile.thunk';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { User } from '@models/user.model';
import ProfileInfo from '@components/ProfileInfo';
import EditProfileForm from '@components/EditProfileForm';

const profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const profile = useAppSelector((state) => state.user.profile);
  // const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function fetchUserProfile() {
      dispatch(getUserProfile);
    }
    fetchUserProfile();
  }, []);

  const toggleEditMode = () => {
    setIsEdit(!isEdit);
  };

  return (
    <section className="min-h-screen w-full text-white">
      <Header />
      <div className="px-8">
        <div className="pt-10 w-full md:w-170 mx-auto mb-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold mb-1">Personal Info</h1>
            <h2 className="text-md font-thin text-gray-200">
              Basic info, like your named and photo
            </h2>
          </div>

          <div className="md:border-gray-50 md:pt-4 md:rounded-xl md:shadow-2xl md:border-1 relative">
            {isEdit && (
              <span
                className="absolute left-0 -top-8 flex items-center cursor-pointer text-sky-500"
                onClick={toggleEditMode}
              >
                <ChevronLeftIcon className="w-5 h-5" />
                Back
              </span>
            )}

            <div
              className={`flex justify-between mb-4 md:px-8 ${
                isEdit ? 'mb-3' : 'md:border-b-1 mb-4'
              } md:pt-4 md:pb-8`}
            >
              <div className="md:w-auto w-52">
                <p className="text-2xl mb-1">Profile</p>
                <span className="text-md text-gray-200">
                  Some info may be visible to other peaple
                </span>
              </div>
              <div>
                {!isEdit && (
                  <button
                    className="bg-indigo-700 w-24 h-10 rounded-lg border-gray-50 mt-4 hover:bg-indigo-800"
                    onClick={toggleEditMode}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {isEdit ? (
              <EditProfileForm />
            ) : (
              <ProfileInfo profile={profile as User} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// profile.protected = true;

export default profile;
