import { useEffect } from 'react';
import Header from '@components/Header';
import { getUserProfile } from '@redux/thunks/getUserProfile.thunk';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';

const profile = () => {
  const profile = useAppSelector((state) => state.user.profile);
  // const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function fetchUserProfile() {
      dispatch(getUserProfile);
    }
    fetchUserProfile();
  }, []);

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
          <div className="md:border-gray-50 md:pt-4 md:rounded-xl md:shadow-2xl md:border-1">
            <div className="flex justify-between mb-4 md:px-8 md:border-b-1 md:pt-4 md:pb-8">
              <div className="md:w-auto w-52">
                <p className="text-2xl mb-1">Profile</p>
                <span className="text-md text-gray-200">
                  Some info may be visible to other peaple
                </span>
              </div>
              <div>
                <button className="bg-indigo-700 w-24 h-10 rounded-lg border-gray-50 mt-4 hover:bg-indigo-800">
                  Edit
                </button>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 items-center md:px-8 md:justify-start">
                <div className="text-gray-300 uppercase text-sm md:w-52">
                  Photo
                </div>
                <img
                  className="w-24 h-24"
                  src="https://manmedicalinstitute.com/wp-content/uploads/2021/10/man.jpeg"
                />
              </div>
              <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 md:px-8 md:justify-start items-center">
                <div className="text-gray-300 uppercase text-sm md:w-52">
                  Name
                </div>
                <div className="text-lg font-bold">{profile?.name}</div>
              </div>
              <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 md:px-8 md:justify-start items-center">
                <div className="text-gray-300 uppercase text-sm md:w-52">
                  Bio
                </div>
                <div className="text-lg font-bold">{profile?.bio}</div>
              </div>
              <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 md:px-8 md:justify-start items-center">
                <div className="text-gray-300 uppercase text-sm md:w-52">
                  Phone
                </div>
                <div className="text-lg font-bold">{profile?.phone}</div>
              </div>
              <div className="flex justify-between mb-2 py-10  md:px-8 md:justify-start items-center">
                <div className="text-gray-300 uppercase text-sm md:w-52">
                  Email
                </div>
                <div className="text-lg font-bold">{profile?.email}</div>
              </div>
              {/* <div className="flex justify-between py-10 border-gray-200 md:px-8 md:justify-start items-center">
              <div className="text-gray-300 uppercase text-sm md:w-52">
                Password
              </div>
              <div className="text-lg font-bold">********</div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

profile.protected = true;

export default profile;
