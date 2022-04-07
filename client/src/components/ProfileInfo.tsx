import { User } from '@models/user.model';

type ProfileInfoProps = {
  profile: User;
};

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div>
      <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 items-center md:px-8 md:justify-start">
        <div className="text-gray-300 uppercase text-sm md:w-52">Photo</div>
        <img
          className="w-14 h-14 rounded-md"
          src={`https://ui-avatars.com/api/?name=${profile?.name}`}
        />
      </div>
      <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 md:px-8 md:justify-start items-center">
        <div className="text-gray-300 uppercase text-sm md:w-52">Name</div>
        <div className="text-lg font-light">{profile?.name}</div>
      </div>
      <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 md:px-8 md:justify-start items-center">
        <div className="text-gray-300 uppercase text-sm md:w-52">Bio</div>
        <div className="text-lg font-light md:w-96 w-52 text-ellipsis overflow-hidden whitespace-nowrap">
          {profile?.bio}
        </div>
      </div>
      <div className="flex justify-between mb-2 py-10 border-b-1 border-gray-200 md:px-8 md:justify-start items-center">
        <div className="text-gray-300 uppercase text-sm md:w-52">Phone</div>
        <div className="text-lg font-light">{profile?.phone}</div>
      </div>
      <div className="flex justify-between mb-2 py-10  md:px-8 md:justify-start items-center">
        <div className="text-gray-300 uppercase text-sm md:w-52">Email</div>
        <div className="text-lg font-light">{profile?.email}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
